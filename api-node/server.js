const express = require('express');
const cors = require('cors');

const app = express();
const PORTA = 3000;

// Habilita o CORS para o Angular conseguir consumir a API
app.use(cors());

// Lista com seus projetos reais (6 campos: id, nome, descricao, tecnologias, link_github, ano)
const projetos = [
  {
    id: 1,
    nome: 'Portfolio Angular',
    descricao: 'Meu portfolio com Angular e Angular Material.',
    tecnologias: 'Angular, TypeScript',
    link_github: 'https://github.com/borgezmachado/portfolio-angular',
    ano: 2026
  },
  {
    id: 2,
    nome: 'API do Portfolio em PHP',
    descricao: 'Endpoints de projetos e catalogo com PDO e MariaDB.',
    tecnologias: 'PHP, MariaDB',
    link_github: null,
    ano: 2026
  },
  {
    id: 3,
    nome: 'Sistema de Cadastro v1',
    descricao: 'CRUD em PHP do 1o trimestre.',
    tecnologias: 'PHP, MariaDB, Bootstrap',
    link_github: null,
    ano: 2026
  }
];

// Lista com tecnologias (4 campos: nome, categoria, descricao, ano_criacao)
const tecnologias = [
  { id: 1, nome: 'HTML', categoria: 'Frontend', descricao: 'Linguagem de marcacao para estrutura de paginas.', ano_criacao: 1993 },
  { id: 2, nome: 'CSS', categoria: 'Frontend', descricao: 'Linguagem de estilos para apresentacao visual.', ano_criacao: 1996 },
  { id: 3, nome: 'JavaScript', categoria: 'Frontend', descricao: 'Linguagem de programacao para o navegador.', ano_criacao: 1995 },
  { id: 4, nome: 'PHP', categoria: 'Backend', descricao: 'Linguagem server-side para web dinamica.', ano_criacao: 1994 },
  { id: 5, nome: 'MariaDB', categoria: 'Banco de Dados', descricao: 'SGBD relacional open-source.', ano_criacao: 2009 },
  { id: 6, nome: 'Git', categoria: 'DevOps', descricao: 'Sistema de controle de versao distribuido.', ano_criacao: 2005 }
];

// Rotas da API
app.get('/api/projetos', (req, res) => {
  res.json(projetos);
});

app.get('/api/tecnologias', (req, res) => {
  res.json(tecnologias);
});

app.listen(PORTA, () => {
  console.log('API no ar em http://localhost:' + PORTA);
});