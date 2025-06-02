#!/bin/bash

# =============================================================================
# SCRIPT DE INICIALIZAÇÃO - PROJETO MUSIKI (OTIMIZADO)
# =============================================================================
# Ordem de execução respeitando dependências:
# 1. Database (PostgreSQL) - musiki-db
# 2. Backend (Spring Boot) - spring-app  
# 3. Frontend (React) - spa-app
# =============================================================================

# Configurações
COMPOSE_FILE="docker-compose.prod.yml"
ENV_FILE=".env"

# Serviços na ordem de dependência
DB_SERVICE="musiki-db"
BACKEND_SERVICE="spring-app"
FRONTEND_SERVICE="spa-app"

# Timeouts (em segundos)
DB_TIMEOUT=60
BACKEND_TIMEOUT=120
FRONTEND_TIMEOUT=30

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Função para log colorido
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

log_db() {
    echo -e "${PURPLE}[DATABASE]${NC} $1"
}

log_backend() {
    echo -e "${CYAN}[BACKEND]${NC} $1"
}

log_frontend() {
    echo -e "${YELLOW}[FRONTEND]${NC} $1"
}

# Função melhorada para aguardar serviço
wait_for_service() {
    local service_name=$1
    local timeout=${2:-60}
    local attempt=1
    local max_attempts=$((timeout / 2))
    
    log_info "Aguardando $service_name estar saudável... (timeout: ${timeout}s)"
    
    while [ $attempt -le $max_attempts ]; do
        # Verificar se container está rodando
        if docker compose -f $COMPOSE_FILE ps $service_name 2>/dev/null | grep -q "Up"; then
            log_info "$service_name está rodando!"
            return 0
        fi
        
        # Verificar se container falhou
        if docker compose -f $COMPOSE_FILE ps $service_name 2>/dev/null | grep -q "Exit"; then
            log_error "$service_name falhou ao iniciar!"
            return 1
        fi
        
        echo -n "."
        sleep 2
        attempt=$((attempt + 1))
    done
    
    log_error "Timeout aguardando $service_name (${timeout}s)"
    return 1
}

# Função para verificar saúde específica do banco
wait_for_database() {
    local max_attempts=30
    local attempt=1
    
    log_db "Aguardando PostgreSQL aceitar conexões..."
    
    while [ $attempt -le $max_attempts ]; do
        # Tentar conectar no banco via Docker
        if docker compose -f $COMPOSE_FILE exec -T $DB_SERVICE pg_isready -U postgres >/dev/null 2>&1; then
            log_db "PostgreSQL está aceitando conexões!"
            return 0
        fi
        
        echo -n "."
        sleep 2
        attempt=$((attempt + 1))
    done
    
    log_error "PostgreSQL não está aceitando conexões"
    return 1
}

# Função para verificar saúde do backend
wait_for_backend() {
    local max_attempts=60
    local attempt=1
    
    log_backend "Aguardando Spring Boot responder..."
    
    while [ $attempt -le $max_attempts ]; do
        # Tentar acessar health endpoint
        if curl -s http://localhost:8081/actuator/health >/dev/null 2>&1; then
            log_backend "Spring Boot está respondendo!"
            return 0
        fi
        
        # Verificar se pelo menos o container está up
        if ! docker compose -f $COMPOSE_FILE ps $BACKEND_SERVICE | grep -q "Up"; then
            log_error "Container do backend parou de funcionar!"
            return 1
        fi
        
        echo -n "."
        sleep 2
        attempt=$((attempt + 1))
    done
    
    log_warn "Spring Boot pode ainda estar inicializando..."
    return 0  # Não falha, só avisa
}

# Função para verificar logs de erro
check_service_health() {
    local service_name=$1
    log_error "Verificando saúde do $service_name..."
    
    echo "Status do container:"
    docker compose -f $COMPOSE_FILE ps $service_name
    
    echo ""
    echo "Últimas 20 linhas do log:"
    docker compose -f $COMPOSE_FILE logs --tail=20 $service_name
}

# =============================================================================
# VALIDAÇÕES INICIAIS
# =============================================================================
log_step "Validações iniciais..."

# Verificar se o arquivo compose existe
if [ ! -f "$COMPOSE_FILE" ]; then
    log_error "Arquivo $COMPOSE_FILE não encontrado!"
    
    if [ -f "docker-compose.yml" ]; then
        log_warn "Usando docker-compose.yml como alternativa..."
        COMPOSE_FILE="docker-compose.yml"
    else
        log_error "Nenhum arquivo docker-compose encontrado!"
        exit 1
    fi
fi

# Verificar se Docker está rodando
if ! docker info > /dev/null 2>&1; then
    log_error "Docker não está rodando! Por favor, inicie o Docker primeiro."
    exit 1
fi

# Verificar se Docker Compose está disponível
if ! docker compose version > /dev/null 2>&1; then
    log_error "Docker Compose não está instalado!"
    exit 1
fi

log_info "Usando arquivo: $COMPOSE_FILE"
log_info "Iniciando projeto Musiki..."

# =============================================================================
# LIMPEZA INICIAL
# =============================================================================
log_step "Limpeza - Parando containers existentes..."
docker compose -f $COMPOSE_FILE down --remove-orphans

# =============================================================================
# FASE 1: DATABASE (PostgreSQL) - PRIORIDADE MÁXIMA
# =============================================================================
log_step "FASE 1/3 - Configurando Database..."

log_db "Iniciando PostgreSQL (musiki-db)..."
log_db "Porta: 5433 (host) -> 5432 (container)"

# Iniciar apenas o banco
docker compose -f $COMPOSE_FILE up -d $DB_SERVICE

# Aguardar container estar up
if wait_for_service $DB_SERVICE $DB_TIMEOUT; then
    # Aguardar banco aceitar conexões
    if wait_for_database; then
        log_db "✅ PostgreSQL totalmente pronto!"
    else
        log_error "❌ PostgreSQL não está aceitando conexões!"
        check_service_health $DB_SERVICE
        exit 1
    fi
else
    log_error "❌ Falha ao iniciar container do banco!"
    check_service_health $DB_SERVICE
    exit 1
fi

# =============================================================================
# FASE 2: BACKEND (Spring Boot) - DEPENDE DO BANCO
# =============================================================================
log_step "FASE 2/3 - Configurando Backend..."

log_backend "Construindo aplicação Spring Boot..."
log_backend "Portas: 8081 (HTTP), 8443 (HTTPS)"

# Construir o backend (sem cache para garantir última versão)
docker compose -f $COMPOSE_FILE build --no-cache $BACKEND_SERVICE

# Iniciar o backend
docker compose -f $COMPOSE_FILE up -d $BACKEND_SERVICE

# Aguardar container estar up
if wait_for_service $BACKEND_SERVICE $BACKEND_TIMEOUT; then
    # Aguardar aplicação responder
    if wait_for_backend; then
        log_backend "✅ Spring Boot totalmente pronto!"
    else
        log_backend "⚠️ Spring Boot pode ainda estar carregando..."
    fi
else
    log_error "❌ Falha ao iniciar backend!"
    check_service_health $BACKEND_SERVICE
    exit 1
fi

# =============================================================================
# FASE 3: FRONTEND (React) - DEPENDE DO BACKEND
# =============================================================================
log_step "FASE 3/3 - Configurando Frontend..."

log_frontend "Construindo aplicação React..."
log_frontend "Porta: 80 (host) -> 5000 (container)"

# Construir o frontend
docker compose -f $COMPOSE_FILE build --no-cache $FRONTEND_SERVICE

# Iniciar o frontend
docker compose -f $COMPOSE_FILE up -d $FRONTEND_SERVICE

# Aguardar frontend estar pronto
if wait_for_service $FRONTEND_SERVICE $FRONTEND_TIMEOUT; then
    # Verificar se o frontend está respondendo
    sleep 3
    if curl -s http://localhost:80 > /dev/null 2>&1; then
        log_frontend "✅ React App totalmente pronto!"
    else
        log_frontend "⚠️ Frontend pode ainda estar carregando..."
    fi
else
    log_error "❌ Falha ao iniciar frontend!"
    check_service_health $FRONTEND_SERVICE
    exit 1
fi

# =============================================================================
# VERIFICAÇÃO FINAL E STATUS
# =============================================================================
log_step "Verificação final - Status do sistema..."

echo ""
echo "=========================================="
echo "           MUSIKI - STATUS FINAL"
echo "=========================================="

# Status de todos os serviços
log_info "Status dos containers:"
docker compose -f $COMPOSE_FILE ps

echo ""
log_info "URLs de acesso:"
echo "  🌐 Frontend (React):      http://localhost"
echo "  🔧 Backend (Spring):      http://localhost:8081"
echo "  🔒 Backend (HTTPS):       https://localhost:8443"
echo "  🗄️  Database (PostgreSQL): localhost:5433"

echo ""
log_info "Comandos úteis:"
echo "  📋 Ver logs:              docker compose -f $COMPOSE_FILE logs -f [serviço]"
echo "  🔄 Reiniciar serviço:     docker compose -f $COMPOSE_FILE restart [serviço]"
echo "  🛑 Parar tudo:            docker compose -f $COMPOSE_FILE down"

echo ""
# Verificar se todos os serviços estão up
all_services_up=true
for service in $DB_SERVICE $BACKEND_SERVICE $FRONTEND_SERVICE; do
    if ! docker compose -f $COMPOSE_FILE ps $service | grep -q "Up"; then
        all_services_up=false
        log_error "Serviço $service não está rodando corretamente!"
    fi
done

if $all_services_up; then
    log_info "🎉 Todos os serviços estão rodando corretamente!"
    log_info "✨ Sistema Musiki iniciado com sucesso!"
    
    # Teste rápido de conectividade
    echo ""
    log_info "🔍 Teste rápido de conectividade:"
    
    # Frontend
    if curl -s http://localhost:80 >/dev/null 2>&1; then
        echo "  ✅ Frontend acessível"
    else
        echo "  ⚠️  Frontend não está respondendo"
    fi
    
    # Backend
    if curl -s http://localhost:8081/actuator/health >/dev/null 2>&1; then
        echo "  ✅ Backend API acessível"
    else
        echo "  ⚠️  Backend API não está respondendo"
    fi
    
    # Database (via backend)
    if docker compose -f $COMPOSE_FILE exec -T $DB_SERVICE pg_isready -U postgres >/dev/null 2>&1; then
        echo "  ✅ Database conectável"
    else
        echo "  ⚠️  Database não está respondendo"
    fi
    
else
    log_warn "⚠️  Alguns serviços podem ter problemas. Verifique os logs."
fi

echo ""
echo "=========================================="
read -p "Deseja acompanhar os logs em tempo real? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    log_info "Mostrando logs de todos os serviços..."
    log_info "Pressione Ctrl+C para sair (containers continuarão rodando)"
    echo "=========================================="
    docker compose -f $COMPOSE_FILE logs -f --tail=50
else
    log_info "✨ Script finalizado!"
    log_info "Use 'docker compose -f $COMPOSE_FILE logs -f [serviço]' para ver logs específicos."
    echo ""
fi