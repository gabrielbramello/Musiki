#!/bin/bash

# =============================================================================
# SCRIPT DE INICIALIZAÇÃO - PROJETO MUSIKI (OTIMIZADO COM NGINX E SSL)
# =============================================================================
# Ordem de execução respeitando dependências:
# 1. Database (PostgreSQL) - musiki-db
# 2. Backend (Spring Boot) - spring-app  
# 3. Frontend (React) - spa-app
# 4. Reverse Proxy (NGINX) - nginx
# 5. SSL Setup (Certbot-Init) - certbot-init
# 6. SSL Renewal (Certbot) - certbot
# =============================================================================

# Configurações
COMPOSE_FILE="docker-compose.prod.yml"
ENV_FILE=".env"

# Serviços na ordem de dependência
DB_SERVICE="musiki-db"
BACKEND_SERVICE="spring-app"
FRONTEND_SERVICE="spa-app"
NGINX_SERVICE="nginx"
CERTBOT_INIT_SERVICE="certbot-init"
CERTBOT_SERVICE="certbot"

# Timeouts (em segundos)
DB_TIMEOUT=60
BACKEND_TIMEOUT=120
FRONTEND_TIMEOUT=30
NGINX_TIMEOUT=30
CERTBOT_TIMEOUT=60

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
MAGENTA='\033[0;95m'
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

log_nginx() {
    echo -e "${MAGENTA}[NGINX]${NC} $1"
}

log_ssl() {
    echo -e "${GREEN}[SSL/CERTBOT]${NC} $1"
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
    
    log_backend "Aguardando Spring Boot responder internamente..."
    
    while [ $attempt -le $max_attempts ]; do
        # Verificar se o container está respondendo internamente (porta 8080)
        if docker compose -f $COMPOSE_FILE exec -T $BACKEND_SERVICE curl -s http://localhost:8080/actuator/health >/dev/null 2>&1; then
            log_backend "Spring Boot está respondendo internamente!"
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

# Função para verificar NGINX
wait_for_nginx() {
    local max_attempts=15
    local attempt=1
    
    log_nginx "Verificando se NGINX está respondendo..."
    
    while [ $attempt -le $max_attempts ]; do
        # Tentar acessar NGINX na porta 80
        if curl -s -o /dev/null -w "%{http_code}" http://localhost:80 | grep -q "200\|301\|302\|404"; then
            log_nginx "NGINX está respondendo!"
            return 0
        fi
        
        echo -n "."
        sleep 2
        attempt=$((attempt + 1))
    done
    
    log_warn "NGINX pode ainda estar carregando configuração..."
    return 0
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

# Função para verificar pré-requisitos do SSL
check_ssl_prerequisites() {
    log_ssl "Verificando pré-requisitos para SSL..."
    
    # Verificar se o diretório nginx existe
    if [ ! -d "./nginx" ]; then
        log_error "Diretório ./nginx não encontrado!"
        log_info "Criando estrutura de diretórios necessária..."
        mkdir -p ./nginx/certbot/{www,conf}
    fi
    
    # Verificar se nginx.conf existe
    if [ ! -f "./nginx/nginx.conf" ]; then
        log_warn "Arquivo nginx.conf não encontrado!"
        log_info "Você precisará criar o arquivo ./nginx/nginx.conf"
    fi
    
    # Criar diretórios do certbot se não existirem
    mkdir -p ./nginx/certbot/{www,conf}
    
    log_ssl "Estrutura de diretórios preparada"
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

# Verificar pré-requisitos do SSL
check_ssl_prerequisites

log_info "Usando arquivo: $COMPOSE_FILE"
log_info "Iniciando projeto Musiki com NGINX e SSL..."

# =============================================================================
# LIMPEZA INICIAL
# =============================================================================
log_step "Limpeza - Parando containers existentes..."
docker compose -f $COMPOSE_FILE down --remove-orphans

# =============================================================================
# FASE 1: DATABASE (PostgreSQL) - PRIORIDADE MÁXIMA
# =============================================================================
log_step "FASE 1/6 - Configurando Database..."

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
log_step "FASE 2/6 - Configurando Backend..."

log_backend "Construindo aplicação Spring Boot..."
log_backend "Porta interna: 8080 (exposta para NGINX)"

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
log_step "FASE 3/6 - Configurando Frontend..."

log_frontend "Construindo aplicação React..."
log_frontend "Porta interna: 3000 (exposta para NGINX)"

# Construir o frontend
docker compose -f $COMPOSE_FILE build --no-cache $FRONTEND_SERVICE

# Iniciar o frontend
docker compose -f $COMPOSE_FILE up -d $FRONTEND_SERVICE

# Aguardar frontend estar pronto
if wait_for_service $FRONTEND_SERVICE $FRONTEND_TIMEOUT; then
    log_frontend "✅ React App totalmente pronto!"
else
    log_error "❌ Falha ao iniciar frontend!"
    check_service_health $FRONTEND_SERVICE
    exit 1
fi

# =============================================================================
# FASE 4: NGINX - REVERSE PROXY
# =============================================================================
log_step "FASE 4/6 - Configurando NGINX..."

log_nginx "Iniciando NGINX Reverse Proxy..."
log_nginx "Portas: 80 (HTTP), 443 (HTTPS)"

# --- NOVO TRECHO PARA CRIAR CERTIFICADOS DUMMY SE NÃO EXISTIREM ---
CERT_DIR="./nginx/certbot/conf/live/samm.dev.br"
FULLCHAIN_PATH="${CERT_DIR}/fullchain.pem"
PRIVKEY_PATH="${CERT_DIR}/privkey.pem"

if [ ! -f "$FULLCHAIN_PATH" ] || [ ! -f "$PRIVKEY_PATH" ]; then
    log_warn "Certificados SSL não encontrados. Criando certificados dummy para permitir o NGINX iniciar."
    mkdir -p "${CERT_DIR}"
    # Gerar chaves dummy (expiram em 1 dia)
    openssl req -x509 -nodes -newkey rsa:2048 -days 1 \
            -keyout "${PRIVKEY_PATH}" \
            -out "${FULLCHAIN_PATH}" \
            -subj "/CN=samm.dev.br" # Ou um CN mais genérico, já que são dummy
    log_info "Certificados dummy criados. Certbot irá substituí-los."
else
    log_info "Certificados SSL já existem. Pulando criação de dummy."
fi

# Iniciar NGINX
docker compose -f $COMPOSE_FILE up -d $NGINX_SERVICE

# Aguardar NGINX estar pronto
if wait_for_service $NGINX_SERVICE $NGINX_TIMEOUT; then
    # Verificar se NGINX está respondendo
    if wait_for_nginx; then
        log_nginx "✅ NGINX totalmente pronto!"
    else
        log_nginx "⚠️ NGINX pode ter problemas de configuração"
        check_service_health $NGINX_SERVICE
    fi
else
    log_error "❌ Falha ao iniciar NGINX!"
    check_service_health $NGINX_SERVICE
    exit 1
fi

# =============================================================================
# FASE 5: SSL SETUP (CERTBOT-INIT) - PRIMEIRA OBTENÇÃO DO CERTIFICADO
# =============================================================================
log_step "FASE 5/6 - Configurando SSL (Primeira obtenção)..."

log_ssl "Verificando se certificado já existe..."

# Verificar se já existe certificado
if [ -d "./nginx/certbot/conf/live/samm.dev.br" ]; then
    log_ssl "✅ Certificado SSL já existe, pulando certbot-init"
else
    log_ssl "Obtendo certificado SSL inicial para samm.dev.br..."
    log_ssl "IMPORTANTE: Certifique-se que o domínio aponta para este servidor!"
    
    # Executar certbot-init para obter certificado inicial
    if docker compose -f $COMPOSE_FILE run --rm $CERTBOT_INIT_SERVICE; then
        log_ssl "✅ Certificado SSL obtido com sucesso!"
    else
        log_warn "⚠️ Falha ao obter certificado SSL inicial"
        log_warn "Verifique se o domínio samm.dev.br aponta para este servidor"
        log_warn "A aplicação continuará funcionando apenas com HTTP"
    fi
fi

# =============================================================================
# FASE 6: SSL RENEWAL (CERTBOT) - RENOVAÇÃO AUTOMÁTICA
# =============================================================================
log_step "FASE 6/6 - Configurando renovação automática SSL..."

log_ssl "Iniciando serviço de renovação automática de certificados..."

# Iniciar serviço de renovação automática
docker compose -f $COMPOSE_FILE up -d $CERTBOT_SERVICE

if wait_for_service $CERTBOT_SERVICE 10; then
    log_ssl "✅ Serviço de renovação SSL configurado!"
    log_ssl "Certificados serão renovados automaticamente a cada 6 horas"
else
    log_warn "⚠️ Problema ao iniciar serviço de renovação automática"
fi

# =============================================================================
# VERIFICAÇÃO FINAL E STATUS
# =============================================================================
log_step "Verificação final - Status do sistema..."

echo ""
echo "=============================================="
echo "         MUSIKI - STATUS FINAL (COM SSL)"
echo "=============================================="

# Status de todos os serviços
log_info "Status dos containers:"
docker compose -f $COMPOSE_FILE ps

echo ""
log_info "URLs de acesso:"
echo "  🌐 Frontend (HTTP):       http://localhost"
echo "  🔒 Frontend (HTTPS):      https://localhost"
echo "  🌍 Domínio (HTTP):        http://samm.dev.br"
echo "  🔐 Domínio (HTTPS):       https://samm.dev.br"
echo "  🗄️  Database (Direct):     localhost:5433"

echo ""
log_info "Serviços internos (via NGINX):"
echo "  🔧 Backend API:           Roteado via /api/*"
echo "  📱 Frontend SPA:          Roteado via /*"

echo ""
log_info "Comandos úteis:"
echo "  📋 Ver logs:              docker compose -f $COMPOSE_FILE logs -f [serviço]"
echo "  🔄 Reiniciar serviço:     docker compose -f $COMPOSE_FILE restart [serviço]"
echo "  🛑 Parar tudo:            docker compose -f $COMPOSE_FILE down"
echo "  🔐 Renovar SSL manual:    docker compose -f $COMPOSE_FILE run --rm certbot-init"

echo ""
# Verificar se todos os serviços principais estão up
all_services_up=true
for service in $DB_SERVICE $BACKEND_SERVICE $FRONTEND_SERVICE $NGINX_SERVICE; do
    if ! docker compose -f $COMPOSE_FILE ps $service | grep -q "Up"; then
        all_services_up=false
        log_error "Serviço $service não está rodando corretamente!"
    fi
done

if $all_services_up; then
    log_info "🎉 Todos os serviços principais estão rodando!"
    log_info "✨ Sistema Musiki iniciado com sucesso!"
    
    # Teste rápido de conectividade
    echo ""
    log_info "🔍 Teste rápido de conectividade:"
    
    # NGINX HTTP
    http_status=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:80 2>/dev/null || echo "000")
    if [ "$http_status" != "000" ]; then
        echo "  ✅ NGINX HTTP acessível (Status: $http_status)"
    else
        echo "  ⚠️  NGINX HTTP não está respondendo"
    fi
    
    # NGINX HTTPS (se certificado existir)
    if [ -d "./nginx/certbot/conf/live/samm.dev.br" ]; then
        https_status=$(curl -s -k -o /dev/null -w "%{http_code}" https://localhost:443 2>/dev/null || echo "000")
        if [ "$https_status" != "000" ]; then
            echo "  ✅ NGINX HTTPS acessível (Status: $https_status)"
        else
            echo "  ⚠️  NGINX HTTPS não está respondendo"
        fi
    else
        echo "  ℹ️  HTTPS não configurado (certificado não encontrado)"
    fi
    
    # Backend (via container interno)
    if docker compose -f $COMPOSE_FILE exec -T $BACKEND_SERVICE curl -s http://localhost:8080/actuator/health >/dev/null 2>&1; then
        echo "  ✅ Backend API acessível internamente"
    else
        echo "  ⚠️  Backend API não está respondendo internamente"
    fi
    
    # Database
    if docker compose -f $COMPOSE_FILE exec -T $DB_SERVICE pg_isready -U postgres >/dev/null 2>&1; then
        echo "  ✅ Database conectável"
    else
        echo "  ⚠️  Database não está respondendo"
    fi
    
    # Certificado SSL
    if [ -d "./nginx/certbot/conf/live/samm.dev.br" ]; then
        echo "  ✅ Certificado SSL configurado"
        
        # Verificar validade do certificado
        cert_expiry=$(docker compose -f $COMPOSE_FILE exec -T $CERTBOT_SERVICE openssl x509 -in /etc/letsencrypt/live/samm.dev.br/cert.pem -noout -dates 2>/dev/null | grep notAfter | cut -d= -f2 || echo "Data não disponível")
        if [ "$cert_expiry" != "Data não disponível" ]; then
            echo "  📅 Certificado válido até: $cert_expiry"
        fi
    else
        echo "  ⚠️  Certificado SSL não configurado"
    fi
    
else
    log_warn "⚠️  Alguns serviços podem ter problemas. Verifique os logs."
fi

echo ""
echo "=============================================="

# Avisos importantes
echo ""
log_warn "📋 AVISOS IMPORTANTES:"
echo "  • Para HTTPS funcionar, certifique-se que samm.dev.br aponta para este servidor"
echo "  • Verifique se as portas 80 e 443 estão abertas no firewall"
echo "  • Os certificados SSL são renovados automaticamente a cada 6 horas"
echo "  • Em caso de problema com SSL, verifique os logs do certbot"

echo ""
read -p "Deseja acompanhar os logs em tempo real? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    log_info "Mostrando logs de todos os serviços..."
    log_info "Pressione Ctrl+C para sair (containers continuarão rodando)"
    echo "=============================================="
    docker compose -f $COMPOSE_FILE logs -f --tail=30
else
    log_info "✨ Script finalizado!"
    log_info "Use 'docker compose -f $COMPOSE_FILE logs -f [serviço]' para ver logs específicos."
    echo ""
    log_info "Serviços disponíveis para logs: $DB_SERVICE, $BACKEND_SERVICE, $FRONTEND_SERVICE, $NGINX_SERVICE, $CERTBOT_SERVICE"
    echo ""
fi