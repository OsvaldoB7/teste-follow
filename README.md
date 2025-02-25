# **Teste Tecnico Follow**

Este projeto é composto por duas partes principais: o Backend e o Frontend, ambos localizados nas pastas correspondentes.

Backend: Localizado na pasta backend-app

Frontend: Localizado na pasta frontend-app

## **Requisitos**

Node.js versão 22.14.0

Docker e Docker Compose

# **Rodando a Aplicação**

## **Usando Docker Compose**

A aplicação backend vem configurada com um arquivo docker-compose.yml que automatiza a criação de toda a stack, incluindo a API, banco de dados (PostgreSQL) e o frontend.

Para subir todos os containers, siga os passos abaixo:

cd backend-app
Execute:

docker-compose up --build

isso irá construir os seguintes containers : 

Backend: Porta 3000
Frontend: Porta 3001
Banco de Dados PostgreSQL: Porta 5432

# **Executando Localmente sem Docker**:
Acesse ambas das pastas do projeto e rode:
npm install

Depois que instalar todas dependencias do projeto rode: 
npm run dev

.env de exemplo:

POSTGRES_USER=

POSTGRES_PASSWORD=

POSTGRES_DB=
