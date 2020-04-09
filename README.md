# Projeto Musiki

## Sobre
O projeto Musiki é um sistema agregador de informações e curiosidade sobre bandas, álbuns e músicas. O sistema inicialmente utilizará a API do Spotify como fonte de informações, mas poderá utilizar outras fontes futuramente (outras APIs, banco de dados próprio e etc).

O projeto inicialmente possuirá dois módulos, o módulo **musikiReact** responsável pelo front-end
e o módulo **musikiAPI** que será a API REST responsável por fazer a comunicação com o musikiReact e com as outras APIs.

## Módulos

### MusikiReact

### MusikiAPI

## Arquitetura Inicial (beta)
![](/img/arquitetura.png)


## Como montar ambiente de desenvolvimento

Segue abaixo os passos a serem seguidos para a montagem do ambiente de desenvolvimento. Para alguns itens coloquei links relacionados que talvez ajude caso exista dificuldade na resolução do passo xD. 

### 0. Clone o projeto
#### Links de apoio
- https://gitlab.com/help/ssh/README#locating-an-existing-ssh-key-pair 

### 1. Iniciando musikiReact

#### 1.1 Instale a versão mais recente do nodejs e npm.
#### Links de apoio
- https://tecadmin.net/install-latest-nodejs-npm-on-linux-mint/
- https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04-pt
- https://nodejs.org/en/download/

#### 1.2 Instale as dependências.
- Na pasta do projeto musikiReact execute o comando `npm install` e aguarde instalar as dependências

#### 1.3 Starte a aplicação.
- Na pasta do projeto musikiReact execute o comando `npm start` para iniciar a aplicação na porta 3000 (padrão node) e começar a brincar :D

#### 1.4 Instale o VSCODE (Extra).
Pode ser utilizado outro editor mas recomendo utilizar o Virtual Studio Code hehe.

### 2. Iniciando musikiAPI

#### 2.1. Instale o Java na versão 11 ou +.

#### 2.2. Instale o Maven

#### 2.3. Instale a IDE Eclipse.

#### 2.4. Importe o Projeto para o Eclipse.
- Vá para File->Import
- Digite Maven no Wizard
- Selecione "Existing Maven Projects" e clique em next
- Clique em Browse e selecione o diretório do projeto musikiAPI
- Clique em Finish para importar o projeto

#### 2.5. Configure o Banco de Dados
- Instale o postgres na sua máquina 
- Crie um usuário e um banco para o projeto (pode usar o usuário postgres mesmo se quiser)
- Configure application.propertie dentro do projeto musikiAPI (/musikiAPI/src/main/resources/application.properties) colocando a url, username e password correspondentes da sua base no postgres 

#### 2.6. Starte a aplicação
- Execute a classe MusikiApiApplication (/musikiAPI/src/main/java/br/com/musiki/musikiAPI/MusikiApiApplication.java) para subir o tomcat com a aplicação na porta 8080.

