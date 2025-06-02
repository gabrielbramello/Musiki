#!/bin/bash

# =============================================================================
# SCRIPT DE PARADA - PROJETO MUSIKI
# =============================================================================
# Ordem de parada respeitando dependências (inversa da inicialização):
# 1. Frontend (React) - spa-app
# 2. Backend (Spring Boot) - spring-app  
# 3. Database (PostgreSQL) - musiki-db
# =============================================================================

# Configurações
COMPOSE_FILE="docker-compose.prod.yml"

# Serviços na ordem inversa de dependência
FRONTEND_SERVICE="spa-app"
BACKEND_SERVICE="spring-app"
DB_SERVICE="musiki-db"

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

# Verificar se o arquivo compose existe
if [ ! -f "$COMPOSE_FILE" ]; then
    if [ -f "docker-compose.yml" ]; then
        COMPOSE_FILE="docker-compose.yml"
    else
        log_error "Nenhum arquivo docker-compose encontrado!"
        exit 1
    fi
fi

echo "=========================================="
echo "       PARANDO SISTEMA MUSIKI"
echo "=========================================="

# Verificar se há containers rodando
if ! docker compose -f $COMPOSE_FILE ps | grep -q "Up"; then
    log_info "Nenhum container está rodando."
    exit 0
fi

# Mostrar status atual
log_info "Status atual dos containers:"
docker compose -f $COMPOSE_FILE ps

echo ""

# =============================================================================
# OPÇÕES DE PARADA
# =============================================================================
echo "Escolha uma opção:"
echo "1) Parar todos os serviços (recomendado)"
echo "2) Parar apenas o frontend"
echo "3) Parar frontend + backend (manter banco)"
echo "4) Parada completa + limpeza (remove volumes)"
echo "5) Reiniciar todos os serviços"
echo ""
read -p "Digite sua opção (1-5): " option

case $option in
    1)
        log_step "Parando todos os serviços..."
        
        log_frontend "Parando React App..."
        docker compose -f $COMPOSE_FILE stop $FRONTEND_SERVICE
        
        log_backend "Parando Spring Boot..."
        docker compose -f $COMPOSE_FILE stop $BACKEND_SERVICE
        
        log_db "Parando PostgreSQL..."
        docker compose -f $COMPOSE_FILE stop $DB_SERVICE
        
        log_info "Todos os serviços foram parados."
        ;;
        
    2)
        log_step "Parando apenas o frontend..."
        log_frontend "Parando React App..."
        docker compose -f $COMPOSE_FILE stop $FRONTEND_SERVICE
        log_info "Frontend parado. Backend e banco continuam rodando."
        ;;
        
    3)
        log_step "Parando frontend e backend..."
        log_frontend "Parando React App..."
        docker compose -f $COMPOSE_FILE stop $FRONTEND_SERVICE
        
        log_backend "Parando Spring Boot..."
        docker compose -f $COMPOSE_FILE stop $BACKEND_SERVICE
        
        log_info "Frontend e backend parados. Banco continua rodando."
        ;;
        
    4)
        log_step "Parada completa com limpeza..."
        log_warn "Isso irá remover também os volumes (dados do banco)!"
        read -p "Tem certeza? (y/N): " confirm
        
        if [[ $confirm =~ ^[Yy]$ ]]; then
            docker compose -f $COMPOSE_FILE down --volumes --remove-orphans
            log_info "Sistema parado e volumes removidos."
        else
            log_info "Operação cancelada."
        fi
        ;;
        
    5)
        log_step "Reiniciando todos os serviços..."
        docker compose -f $COMPOSE_FILE restart
        log_info "Todos os serviços foram reiniciados."
        ;;
        
    *)
        log_error "Opção inválida!"
        exit 1
        ;;
esac

echo ""
log_info "Status final dos containers:"
docker compose -f $COMPOSE_FILE ps

echo ""
log_info "Comandos úteis:"
echo "  🔄 Iniciar novamente:   ./start.sh"
echo "  📋 Ver logs:            docker compose -f $COMPOSE_FILE logs [serviço]"
echo "  🔍 Status:              docker compose -f $COMPOSE_FILE ps"