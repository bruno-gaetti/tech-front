# Gerenciamento de Biblioteca

Este é um projeto para gerenciar uma coleção de livros, permitindo visualizar, adicionar, editar, excluir e pesquisar livros. Ele utiliza uma aplicação **Node.js** com **Express** no backend e **React** no frontend. O banco de dados utilizado é o **MongoDB**.

## Funcionalidades

- Listar livros
- Adicionar novo livro
- Editar informações de um livro
- Excluir um livro
- Pesquisar livros por título, autor ou outras palavras-chave

## Requisitos

Antes de iniciar, certifique-se de ter instalado os seguintes programas:

- [Node.js](https://nodejs.org/) - versão 14 ou superior
- [MongoDB](https://www.mongodb.com/) - um banco de dados NoSQL
- [npm](https://www.npmjs.com/) - o gerenciador de pacotes do Node.js

## Estrutura do Projeto

### Backend (Node.js/Express)

- `server.js`: arquivo principal do servidor, que define as rotas da API para gerenciar livros.
- `models/Livro.js`: define o schema do modelo de livro.
- `routes/livros.js`: contém as rotas para as operações de CRUD dos livros.

### Frontend (React)

- `src/components/Home.js`: componente principal da página inicial.
- `src/components/ListBooks.js`: componente para listar os livros cadastrados.
- `src/components/AddBook.js`: componente para adicionar novos livros.
- `src/components/EditBook.js`: componente para editar livros existentes.
- `src/App.js`: configuração das rotas e navegação.

## Uso

Na página inicial, você pode navegar para visualizar a lista de livros ou adicionar um novo livro. Na lista de livros, você pode editar ou excluir livros existentes. A funcionalidade de pesquisa permite que você encontre livros com base em títulos, autores ou palavras-chave.

## Tecnologias Utilizadas

- **Backend**: Node.js, Express, MongoDB
- **Frontend**: React, React Router
- **Bibliotecas Adicionais**:
  - Axios (para chamadas HTTP)
  - Bootstrap (para estilização)

## Possíveis Erros e Soluções

- **Erro de conexão com MongoDB**:
  - Verifique se o MongoDB está rodando localmente e se a string de conexão está correta.

- **Problema com dependências do React**:
  - Verifique se as dependências estão instaladas corretamente rodando `npm install` na pasta do frontend.