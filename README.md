# Portfolio Angular — Desenvolvimento Web II

Repositório da disciplina **Desenvolvimento Web II** — 2026  
**Profe. Berssa** | IFPR — Centro de Referência Ponta Grossa

---

## 👤 Estudante

* **Nome:** Felipe Martins Machado Borges
* **Turma:** 3º ano — Técnico em Informática Integrado ao Ensino Médio
* **Ano:** 2026

---

## 📂 Estrutura do Repositório

| Pasta / Arquivo | Conteúdo |
| :--- | :--- |
| `portfolio-angular/` | Aplicação Front-end desenvolvida em Angular |
| `api-node/` | API Backend em Node.js com Express e MariaDB (`server.js`, `db.js`) |
| `api/` | Endpoints legados da API em PHP (`projetos.php` e `tecnologias.php`) |
| `sql/` | Scripts de banco de dados (`setup.sql`) |
| `conexao.php` | Configuração de conexão PDO para a API em PHP |
| `.gitignore` | Arquivos ignorados pelo Git (ex: `node_modules/`) |

---

## 🌐 Páginas do Front-end (Angular)

* 📄 **Home / Início:** `http://localhost:4200/`
* 📄 **Projetos:** `http://localhost:4200/projetos`
* 📄 **Catálogo / Tecnologias:** `http://localhost:4200/catalogo`
* 📄 **Sobre Mim:** `http://localhost:4200/sobre`
* 📄 **Contato:** `http://localhost:4200/contato`

---

## 🚀 Como Rodar o Projeto

### 1. Iniciar o Banco de Dados (MariaDB)
No terminal do Codespaces, inicie o banco de dados e execute o script SQL de configuração:

```bash
sudo service mariadb start
sudo mariadb < sql/setup.sql