# API – Sistema de Tarefas Internas

API backend desenvolvida para simular um **sistema interno de gestão de tarefas**, com foco em **boas práticas de backend**, organização de código, segurança e arquitetura em camadas.

O objetivo do projeto é demonstrar domínio dos **fundamentos reais de uma API corporativa**, indo além de um CRUD simples.

---

## Funcionalidades

- Autenticação de usuários via **JWT**
- Controle de acesso baseado em **roles**
- CRUD completo de tarefas
- Validação de dados de entrada
- Tratamento centralizado de erros
- Middleware de autenticação e autorização
- Arquitetura em camadas (Controller / Service / Middleware)
- Banco de dados relacional (**MySQL**)

---

## Conceitos aplicados

Este projeto foi desenvolvido com foco em **pensamento sistêmico**, priorizando a compreensão do funcionamento da aplicação como um todo, e não apenas a implementação de endpoints.

Principais conceitos utilizados:

- **Separação de responsabilidades**
- **Fluxo de autenticação e autorização**
- **Validação de payloads**
- **Tratamento consistente de erros**
- **Organização de código para manutenção e escalabilidade**
- **Boas práticas de APIs REST**

---

## Arquitetura

A aplicação segue uma arquitetura em camadas:

- **Controllers**: Responsáveis por lidar com requisições e respostas
- **Services**: Contêm a lógica de negócio
- **Repo**: Repositório responsável pela comunicação com o banco mySQL
- **Middlewares**: Autenticação, autorização e validações
- **Validators**: Validação de dados usando schemas
- **Errors**: Classe de erro personalizada e handler global
- **Config**: Configurações gerais da aplicação

Essa estrutura facilita manutenção, testes e evolução do sistema.

---

## Tecnologias utilizadas

- **Node.js**
- **Express**
- **TypeScript**
- **MySQL**
- **JWT (JSON Web Token)**
- **Zod** (validação de dados)
- **Dotenv**

---

## Como executar o projeto

### Pré-requisitos
- Node.js
- MySQL

### Instalação

```bash
git clone https://github.com/ostwald-z/Projetos.git
cd Projetos
npm install


👤 Autor

Desenvolvido por [Ostwald Gerhardt]
Backend Developer