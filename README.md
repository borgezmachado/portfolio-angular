# 🚀 Portfolio — Desenvolvimento Web II

Repositório desenvolvido para a disciplina **Desenvolvimento Web II**, do curso Técnico em Informática Integrado ao Ensino Médio do **Instituto Federal do Paraná (IFPR)**.

O projeto consiste no desenvolvimento de um portfólio pessoal, integrando tecnologias de desenvolvimento Front-end, Back-end e banco de dados, com o objetivo de apresentar projetos, conhecimentos técnicos e informações profissionais do estudante.

---

## 👨‍💻 Sobre o Estudante

| Informação | Dados |
|---|---|
| **Nome** | Felipe Martins Machado Borges |
| **Instituição** | IFPR — Centro de Referência Ponta Grossa |
| **Curso** | Técnico em Informática Integrado ao Ensino Médio |
| **Turma** | 3º ano |
| **Disciplina** | Desenvolvimento Web II |
| **Professora** | Berssa |
| **Ano letivo** | 2026 |

---

## 🛠️ Tecnologias Utilizadas

O projeto utiliza diferentes tecnologias para o desenvolvimento de suas aplicações e serviços.

### Front-end
- Angular
- React
- Vite
- HTML5
- CSS3
- JavaScript
- TypeScript

### Back-end
- Node.js
- Express
- PHP

### Banco de Dados
- MariaDB
- SQL
- PDO

### Ferramentas
- Visual Studio Code
- Git e GitHub
- GitHub Codespaces
- npm

---

## 📂 Estrutura do Repositório

```text
portfolio-angular/
│
├── portfolio-angular/       # Aplicação Front-end em Angular
│
├── portfolio-react/         # Versão do portfólio em React + Vite
│
├── api-node/                # API Back-end em Node.js
│   ├── server.js
│   └── db.js
│
├── api/                     # Endpoints legados em PHP
│   ├── projetos.php
│   └── tecnologias.php
│
├── sql/                     # Scripts do banco de dados
│   ├── setup.sql
│   └── usuarios.sql
│
├── conexao.php              # Conexão PDO com o banco de dados
│
└── .gitignore               # Arquivos ignorados pelo Git
```

---

## 🌐 Versão 1 — Portfólio em Angular

A primeira versão do projeto foi desenvolvida utilizando Angular, com páginas organizadas para apresentar informações pessoais, projetos e conhecimentos tecnológicos.

### Páginas disponíveis

| Página | Rota |
|---|---|
| 🏠 Início | `/` |
| 📁 Projetos | `/projetos` |
| 💻 Catálogo de Tecnologias | `/catalogo` |
| 👤 Sobre Mim | `/sobre` |
| ✉️ Contato | `/contato` |

**Endereço local:** `http://localhost:4200`

---

## ⚛️ Versão 2 — Portfólio em React + Vite

Na Aula 25, o portfólio foi recriado utilizando React com Vite, explorando uma nova abordagem para o desenvolvimento de interfaces modernas e componentes reutilizáveis.

### Como executar

**1. Acesse a pasta do projeto:**

```bash
cd portfolio-react
```

**2. Instale as dependências:**

```bash
npm install
```

**3. Inicie o servidor de desenvolvimento:**

```bash
npm run dev
```

**4. Acesse no navegador:**

```text
http://localhost:5173
```

---

## 🗄️ Banco de Dados — MariaDB

O projeto utiliza MariaDB para armazenamento e gerenciamento das informações.

### Inicialização do banco de dados

No terminal do GitHub Codespaces, execute:

**1. Inicie o serviço MariaDB:**

```bash
sudo service mariadb start
```

**2. Execute o script de configuração inicial:**

```bash
sudo mariadb < sql/setup.sql
```

**3. Execute o script de criação das tabelas de usuários:**

```bash
sudo mariadb dwii_db < sql/usuarios.sql
```

---

## 🔌 Back-end e APIs

O repositório possui duas implementações de acesso ao Back-end:

### Node.js + Express
Localizada na pasta `api-node/`, contém a implementação da API utilizando:
- `server.js` — servidor da aplicação.
- `db.js` — configuração de conexão com o MariaDB.

### PHP
Localizada na pasta `api/`, contém endpoints legados:
- `projetos.php` — endpoint relacionado aos projetos.
- `tecnologias.php` — endpoint relacionado às tecnologias.

O arquivo `conexao.php` contém a configuração de conexão PDO utilizada pela implementação em PHP.

---

## 🎯 Objetivos do Projeto

- Desenvolver um portfólio pessoal utilizando tecnologias modernas.
- Aplicar conceitos de desenvolvimento Front-end.
- Trabalhar com componentes e