-- ============================================
-- SETUP DO BANCO DWII
-- ============================================

-- Criar o banco caso não exista
CREATE DATABASE IF NOT EXISTS dwii_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;
-- Selecionar o banco
USE dwii_db;

-- ============================================
-- USUÁRIO DO BANCO
-- ============================================

-- Cria o usuário somente se ele ainda não existir.
-- O bloco abaixo funciona em MariaDB/MySQL.
CREATE USER IF NOT EXISTS 'dwii_user'@'localhost'
IDENTIFIED BY 'dwii2026';

-- Garante a senha correta caso o usuário já exista
ALTER USER 'dwii_user'@'localhost'
IDENTIFIED BY 'dwii2026';

-- Permissões
GRANT ALL PRIVILEGES ON dwii_db.* TO 'dwii_user'@'localhost';

FLUSH PRIVILEGES;

-- ============================================
-- TABELA: projetos
-- ============================================

CREATE TABLE IF NOT EXISTS projetos (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nome VARCHAR(120) NOT NULL,
    descricao TEXT NOT NULL,
    tecnologias VARCHAR(200) NOT NULL,
    link_github VARCHAR(300) NULL DEFAULT NULL,
    ano YEAR NOT NULL,
    status ENUM('rascunho', 'publicado', 'arquivado')
        NOT NULL DEFAULT 'rascunho',
    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME NULL DEFAULT NULL
        ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: tecnologias
-- ============================================

CREATE TABLE IF NOT EXISTS tecnologias (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    descricao TEXT,
    ano_criacao INT,
    status ENUM('ativo', 'inativo')
        NOT NULL DEFAULT 'ativo',
    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: contatos
-- ============================================

CREATE TABLE IF NOT EXISTS contatos (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nome VARCHAR(120) NOT NULL,
    email VARCHAR(180) NOT NULL,
    mensagem TEXT NOT NULL,
    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- DADOS: projetos
-- ============================================

INSERT INTO projetos
    (nome, descricao, tecnologias, link_github, ano, status)
VALUES
(
    'Portfolio Pessoal',
    'Site de portfolio responsivo com PHP, PDO e MariaDB, painel admin e login.',
    'PHP, MariaDB, CSS, Git',
    'https://github.com/usuario/portfolio',
    2026,
    'publicado'
),
(
    'Sistema de Biblioteca',
    'CRUD de acervo e emprestimos, com busca e relatorios.',
    'PHP, MariaDB, Bootstrap',
    'https://github.com/usuario/biblioteca',
    2025,
    'publicado'
),
(
    'App de Tarefas',
    'Lista de tarefas com categorias, prazos e filtro por status.',
    'JavaScript, HTML, CSS',
    'https://github.com/usuario/tarefas',
    2025,
    'publicado'
),
(
    'Loja Virtual (prototipo)',
    'Catalogo de produtos com carrinho e checkout simulado.',
    'PHP, MariaDB, JavaScript',
    'https://github.com/usuario/loja',
    2024,
    'publicado'
),
(
    'API de Clima',
    'Microsservico que consome uma API publica e devolve a previsao em JSON.',
    'PHP, REST',
    'https://github.com/usuario/clima',
    2026,
    'publicado'
),
(
    'Jogo da Velha (em construcao)',
    'Jogo da velha local - ainda em desenvolvimento.',
    'JavaScript, HTML',
    NULL,
    2026,
    'rascunho'
);

-- ============================================
-- DADOS: tecnologias
-- ============================================

INSERT INTO tecnologias
    (nome, categoria, descricao, ano_criacao)
VALUES
(
    'HTML',
    'Frontend',
    'Linguagem de marcacao para estrutura de paginas.',
    1993
),
(
    'CSS',
    'Frontend',
    'Linguagem de estilos para apresentacao visual.',
    1996
),
(
    'JavaScript',
    'Frontend',
    'Linguagem de programacao para o navegador.',
    1995
),
(
    'PHP',
    'Backend',
    'Linguagem server-side para web dinamica.',
    1994
),
(
    'MariaDB',
    'Banco de Dados',
    'SGBD relacional open-source.',
    2009
),
(
    'Git',
    'DevOps',
    'Sistema de controle de versao distribuido.',
    2005
);

-- ============================================
-- VERIFICAÇÃO
-- ============================================

SHOW TABLES;

SELECT
    id,
    nome,
    ano,
    status
FROM projetos;

SELECT
    id,
    nome,
    categoria,
    status
FROM tecnologias;

SELECT
    id,
    nome,
    email,
    criado_em
FROM contatos;