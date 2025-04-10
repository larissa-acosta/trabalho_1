# 🧾 CRUD de Gerenciamento de Usuários

## 📋 Descrição do Projeto

Este projeto é uma aplicação **CRUD (Create, Read, Update, Delete)** para gerenciamento de usuários, desenvolvida com **Node.js** no backend e **React** no frontend. A aplicação permite adicionar, visualizar, editar e excluir usuários, utilizando um banco de dados **MySQL** para persistência de dados.

---

## 🚀 Tecnologias Utilizadas

### 🔧 Backend
- Node.js
- Express
- MySQL

### 🎨 Frontend
- React
- Material-UI

---

## 📁 Estrutura do Projeto

```
/project-root
├── /backend
│   ├── db.js               # Configuração do banco de dados
│   ├── /controllers        # Controladores para manipulação de usuários
│   ├── /routes             # Rotas da API
│   ├── server.js           # Configuração do servidor Express
│
├── /frontend
│   ├── /src
│   │   ├── /components     # Componentes React
│   │   ├── App.js          # Componente principal da aplicação
│   │   └── index.js        # Ponto de entrada da aplicação
│
├── package.json            # Dependências do projeto
└── README.md               # Este arquivo
```

---
## ▶️ Demonstração em Vídeo

Confira uma demonstração completa do projeto no YouTube:

📺 [Assista no YouTube](https://youtu.be/k4_7b6CXwU8)

---
## ⚙️ Como Rodar o Projeto

### ✅ Pré-requisitos

Certifique-se de ter instalado:

- Node.js (versão 14 ou superior)
- npm (geralmente vem com o Node.js)
- MySQL

---

### 📌 Passo 1: Configurar o Banco de Dados

1. Acesse o MySQL (via Workbench).
2. Crie o banco de dados:

```sql
CREATE DATABASE crud;
```

3. Selecione o banco e crie a tabela `usuarios`:

```sql
CREATE TABLE `usuarios` (
  `idusuarios` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  `idade` int DEFAULT NULL,
  `cpf` varchar(45) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `genero` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idusuarios`)
)
```

---

### 📦 Passo 2: Rodar o Backend

```bash
cd backend
npm install
```

Altere o arquivo `db.js` se necessário:

```js
// db.js
export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "sua_senha",
    database: "crud"
});
```

Inicie o servidor:

```bash
npm start
```

Servidor disponível por padrão em: `http://localhost:8800`

---

### 💻 Passo 3: Rodar o Frontend

Abra um novo terminal:

```bash
cd frontend
npm install
npm start
```

A aplicação React será iniciada em: `http://localhost:3000`

---

## 🔄 Rotas da API

| Método | Rota        | Descrição                          |
|--------|-------------|--------------------------------------|
| GET    | `/`         | Retorna todos os usuários            |
| GET    | `/:id`      | Retorna um usuário pelo ID           |
| POST   | `/`         | Adiciona um novo usuário             |
| PUT    | `/:id`      | Atualiza um usuário pelo ID          |
| DELETE | `/:id`      | Exclui um usuário pelo ID            |

---

## 🛠 Resolvendo Problemas

- **Erro de conexão ao banco de dados**: verifique se o MySQL está em execução e se as credenciais em `db.js` estão corretas.
- **Portas em uso**: altere as portas nos arquivos de configuração ou encerre processos que as utilizem (`8800` e `3000` por padrão).
