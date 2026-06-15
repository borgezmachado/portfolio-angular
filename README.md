# Portfolio Angular — Desenvolvimento Web II

Repositório da disciplina **Desenvolvimento Web II** — 2026 **Profe. Berssa** | IFPR — Centro de Referência Ponta Grossa

## 👤 Estudante

* **Nome:** Felipe Martins Machado Borges
* **Turma:** 3º ano — Técnico em Informática Integrado ao Ensino Médio
* **Ano:** 2026

## 📂 Estrutura do Repositório

| Pasta / Arquivo | Conteúdo |
| :--- | :--- |
| `portfolio-angular/` | Diretório raiz do projeto desenvolvido em Angular |
| `api/` | Endpoints da API em PHP (`projetos.php` e `tecnologias.php`) |
| `conexao.php` | Configuração da conexão PDO com o banco de dados MariaDB |
| `sql/` | Scripts de banco de dados (`setup.sql`) |

## 🌐 Páginas Publicadas / Principais Acessos (Front-end)

* 📄 [Página Inicial / Home](http://localhost:4200)
* 📄 [Sobre Mim](http://localhost:4200/sobre)
* 📄 [Projetos Acadêmicos](http://localhost:4200/projetos)
* 📄 [Contato](http://localhost:4200/contato)

---

## 🚀 Como Rodar a API Backend 

### 1. Pré-requisitos e Instalação
Certifique-se de estar em um ambiente com o PHP e o banco de dados MariaDB/MySQL configurados (como o ambiente padrão do GitHub Codespaces).
Execute: /usr/bin/php -S 0.0.0.0:8000
Após isso vá na aba PORTS, encaminhe a porta 8000, clique no globo 🌐 e acesse /api/projetos.php. Você deve ver os projetos publicados como JSON
Clone o repositório se ainda não o fez:
```bash
git clone [https://github.com/borgezmachado/portfolio-angular.git](https://github.com/borgezmachado/portfolio-angular.git)