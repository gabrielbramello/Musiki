#!/bin/bash

# =============================================================================
# SCRIPT DE INICIALIZAÇÃO - PROJETO MUSIKI (MELHORADO)
# =============================================================================

# Configurações
COMPOSE_FILE="docker-compose.prod.yml"
ENV_FILE=".env"

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

# Verificações iniciais
check_prerequisites() {
    log_step "Verificando pré-requisitos..."

    # Verificar Docker
    if ! docker info > /dev/null 2>&1; then
        log_error "Docker não está rodando!"
        exit 1
    fi

    # Verificar Docker Compose
    if ! docker compose version > /dev/null 2>&1; then
        log_error "Docker Compose não está instalado!"
        exit 1
    fi

    # Verificar arquivo compose
    if [ ! -f "$COMPOSE_FILE" ]; then
        log_error "Arquivo $COMPOSE_FILE não encontrado!"
        exit 1
    fi

    # Verificar arquivo .env
    if [ ! -f "$ENV_FILE" ]; then
        log_warn "Arquivo .env não encontrado!"
        log_info "Criando arquivo .env de exemplo..."
        create_env_example
    fi

    # Criar estrutura de diretórios
    create_directory_structure
}

create_env_example() {
    cat > .env << EOF
# Database Configuration
DB_NAME=musiki
DB_USER=postgres
DB_PASSWORD=postgres123
DB_PORT=5432

# Server Configuration
SERVER_PORT=8080

# Spotify API Configuration
SPOTIFY_CLIENT_ID=your_spotify_client_id_here
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here

# SSL Configuration
CERTBOT_EMAIL=your-email@example.com
NGINX_HOSTNAME=samm.dev.br
EOF
    
    log_warn "Arquivo .env criado! Configure suas variáveis antes de continuar."
    log_info "Especialmente: SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, CERTBOT_EMAIL"
}

create_directory_structure() {
    log_info "Criando estrutura de diretórios..."
    
    mkdir -p nginx/certbot/{www,conf}
    
    # Verificar se nginx.conf existe
    if [ ! -f "./nginx/nginx.conf" ]; then
        log_warn "Arquivo nginx.conf não encontrado!"
        log_info "Por favor, coloque o arquivo nginx.conf no diretório ./nginx/"
        log_info "Use o arquivo corrigido fornecido."
        exit 1
    fi
}

# Função para inicializar sem SSL
start_without_ssl() {
    log_step "Iniciando aplicação SEM SSL..."
    
    # Parar containers existentes
    docker compose -f $COMPOSE_FILE down --remove-orphans
    
    # Limpar volumes órfãos
    docker volume prune -f
    
    # Construir e iniciar serviços essenciais
    log_info "Construindo e iniciando serviços..."
    docker compose -f $COMPOSE_FILE up -d musiki-db spring-app spa-app nginx
    
    # Aguardar serviços ficarem prontos
    log_info "Aguardando serviços ficarem prontos..."
    sleep 30
    
    # Verificar status
    check_services_status
}

# Função para configurar SSL
setup_ssl() {
    log_step "Configurando SSL..."
    
    # Verificar se certificado já existe
    if [ -d "./nginx/certbot/conf/live/samm.dev.br" ]; then
        log_info "Certificado SSL já existe!"
        start_ssl_renewal
        return 0
    fi
    
    log_info "Obtendo certificado SSL..."
    log_warn "IMPORTANTE: Certifique-se que samm.dev.br aponta para este servidor!"
    
    # Obter certificado inicial
    if docker compose -f $COMPOSE_FILE --profile ssl-init run --rm certbot-init; then
        log_info "Certificado SSL obtido com sucesso!"
        
        # Recarregar NGINX
        docker compose -f $COMPOSE_FILE exec nginx nginx -s reload
        
        # Iniciar renovação automática
        start_ssl_renewal
        
        return 0
    else
        log_error "Falha ao obter certificado SSL!"
        log_warn "Continuando sem SSL..."
        return 1
    fi
}

start_ssl_renewal() {
    log_info "Iniciando renovação automática de SSL..."
    docker compose -f $COMPOSE_FILE --profile ssl-renewal up -d certbot
}

# Verificar status dos serviços
check_services_status() {
    log_step "Verificando status dos serviços..."
    
    services=("musiki-db" "spring-app" "spa-app" "nginx")
    all_healthy=true
    
    for service in "${services[@]}"; do
        if docker compose -f $COMPOSE_FILE ps $service | grep -q "Up"; then
            log_info "✅ $service está rodando"
        else
            log_error "❌ $service não está rodando"
            all_healthy=false
        fi
    done
    
    if $all_healthy; then
        log_info "🎉 Todos os serviços estão rodando!"
        show_access_info
    else
        log_warn "⚠️  Alguns serviços têm problemas. Verificando logs..."
        show_problematic_logs
    fi
}

show_access_info() {
    echo ""
    echo "=============================================="
    echo "         MUSIKI - INFORMAÇÕES DE ACESSO"
    echo "=============================================="
    
    # Testar conectividade
    http_status=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:80 2>/dev/null || echo "000")
    
    if [ "$http_status" != "000" ]; then
        echo "🌐 Aplicação disponível em:"
        echo "   HTTP:  http://localhost"
        echo "   HTTP:  http://samm.dev.br (se DNS configurado)"
        
        if [ -d "./nginx/certbot/conf/live/samm.dev.br" ]; then
            echo "   HTTPS: https://samm.dev.br"
        fi
    else
        echo "⚠️  Aplicação não está respondendo na porta 80"
    fi
    
    echo ""
    echo "🗄️  Database (externo): localhost:5433"
    echo ""
    echo "📋 Comandos úteis:"
    echo "   Ver logs:           docker compose -f $COMPOSE_FILE logs -f [serviço]"
    echo "   Parar aplicação:    docker compose -f $COMPOSE_FILE down"
    echo "   Reiniciar serviço:  docker compose -f $COMPOSE_FILE restart [serviço]"
    echo "=============================================="
}

show_problematic_logs() {
    services=("musiki-db" "spring-app" "spa-app" "nginx")
    
    for service in "${services[@]}"; do
        if ! docker compose -f $COMPOSE_FILE ps $service | grep -q "Up"; then
            echo ""
            log_error "Logs do $service:"
            docker compose -f $COMPOSE_FILE logs --tail=10 $service
        fi
    done
}

# Menu principal
show_menu() {
    echo ""
    echo "=============================================="
    echo "         MUSIKI - SCRIPT DE INICIALIZAÇÃO"
    echo "=============================================="
    echo ""
    echo "Escolha uma opção:"
    echo "1) Iniciar aplicação (HTTP apenas)"
    echo "2) Iniciar aplicação com SSL"
    echo "3) Renovar certificado SSL"
    echo "4) Ver logs dos serviços"
    echo "5) Parar aplicação"
    echo "6) Status dos serviços"
    echo "0) Sair"
    echo ""
    read -p "Digite sua escolha [0-6]: " choice
}

handle_menu_choice() {
    case $choice in
        1)
            start_without_ssl
            ;;
        2)
            start_without_ssl
            setup_ssl
            ;;
        3)
            setup_ssl
            ;;
        4)
            echo ""
            echo "Serviços disponíveis: musiki-db, spring-app, spa-app, nginx, certbot"
            read -p "Digite o nome do serviço (ou ENTER para todos): " service_name
            if [ -z "$service_name" ]; then
                docker compose -f $COMPOSE_FILE logs -f --tail=30
            else
                docker compose -f $COMPOSE_FILE logs -f --tail=30 $service_name
            fi
            ;;
        5)
            log_info "Parando aplicação..."
            docker compose -f $COMPOSE_FILE down
            log_info "Aplicação parada!"
            ;;
        6)
            check_services_status
            ;;
        0)
            log_info "Saindo..."
            exit 0
            ;;
        *)
            log_error "Opção inválida!"
            ;;
    esac
}

# =============================================================================
# EXECUÇÃO PRINCIPAL
# =============================================================================

# Verificar pré-requisitos
check_prerequisites

# Se argumentos foram passados, executar diretamente
if [ $# -gt 0 ]; then
    case $1 in
        "start")
            start_without_ssl
            ;;
        "start-ssl")
            start_without_ssl
            setup_ssl
            ;;
        "ssl-only")
            setup_ssl
            ;;
        "stop")
            docker compose -f $COMPOSE_FILE down
            ;;
        "status")
            check_services_status
            ;;
        *)
            echo "Uso: $0 [start|start-ssl|ssl-only|stop|status]"
            exit 1
            ;;
    esac
    exit 0
fi

# Menu interativo
while true; do
    show_menu
    handle_menu_choice
    echo ""
    read -p "Pressione ENTER para continuar..."
done