# User CRUD API

API REST para gerenciamento de usuários, com autenticação JWT, validação de dados e tratamento centralizado de erros.  
Desenvolvida em Node.js utilizando Express e banco de dados relacional.

## Tecnologias

- Node.js
- Express
- JWT
- Bcrypt
- Zod
- MySQL

## Funcionalidades

- Cadastro de usuários
- Autenticação com JWT
- Hash de senha
- CRUD de usuários
- Validação de dados com Zod
- Tratamento centralizado de erros

## Rotas principais

- POST /user — criar usuário
- POST /auth/login — autenticação
- GET /user — listar usuários
- PATCH /user/:id — atualizar usuário
- DELETE /user/:id — remover usuário


## Observações

Projeto foi desenvolvido com foco em boas práticas, separação de responsabilidades e simplicidade, visando aprendizado e preparação para vagas junior backend.



## Como executar o projeto

```bash
# clonar repositório
git clone https://github.com/ostwald-z/Projetos.git

# entrar na pasta
cd Projetos/CRUD-API

# instalar dependências
npm install

# configurar variáveis de ambiente
cp .env.example .env

# rodar aplicação
npm run dev