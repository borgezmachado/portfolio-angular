const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('./db');

const app = express();
const PORTA = 3000;
// A chave que assina os tokens. Fica aqui so ate a Aula 29, quando vai para o
const SEGREDO = 'troque-por-uma-frase-longa-que-so-voce-sabe';
app.use(cors());

app.use(express.json());
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

// POST /api/login: confere email e senha e devolve o token. A unica rota que
app.post('/api/login', async (req, res) => {
    try {
        const dados = req.body;
        if (!dados || !dados.email || !dados.senha) {
            return res.status(400).json({ erro: 'Informe email e senha' });
        }
        const [linhas] = await pool.execute('SELECT id, email, senha_hash FROM usuarios WHERE email = ?', [dados.email]);
        const usuario = linhas[0];
        if (!usuario) {
            return res.status(401).json({ erro: 'Email ou senha invalidos' });
        }
        const confere = await bcrypt.compare(dados.senha, usuario.senha_hash);
        if (!confere) {
            return res.status(401).json({ erro: 'Email ou senha invalidos' });
        }
        const token = jwt.sign({ id: usuario.id, email: usuario.email }, SEGREDO, { expiresIn: '1h' });
        res.json({ token });
    } catch (erro) {
        res.status(500).json({ erro: 'Falha no servidor: ' + erro.message });
    }
});

// Middleware: confere o token antes de a rota rodar. Entra so nas rotas que o
function autenticar(req, res, next) {
    const cabecalho = req.headers.authorization ?? '';
    const token = cabecalho.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ erro: 'Token ausente' });
    }
    try {
        req.usuario = jwt.verify(token, SEGREDO);
        next();
    } catch (erro) {
        return res.status(401).json({ erro: 'Token invalido ou expirado' });
    }
}
// O mesmo SELECT do api/projetos.php: so os publicados, do mais novo ao mais antigo
app.get('/api/projetos', autenticar, async (req, res) => {
  try {
    const sql = "SELECT id, nome, descricao, tecnologias, link_github, ano FROM projetos WHERE status = 'publicado' ORDER BY ano DESC, id DESC";
    const [projetos] = await pool.query(sql);
    res.json(projetos);
  } catch (erro) {
    res.status(500).json({ erro: 'Falha no servidor: ' + erro.message });
  }
});

// Um projeto pelo id. O ? e o mesmo do prepare do PHP: o valor nunca entra na query direto
// Rota para buscar um projeto por ID (Pública)
app.get('/api/projetos/:id', async (req, res) => {
  try {
    const sql = "SELECT id, nome, descricao, tecnologias, link_github, ano FROM projetos WHERE id = ? AND status = 'publicado'";
    const [linhas] = await pool.execute(sql, [req.params.id]);
    
    if (linhas.length === 0) {
      return res.status(404).json({ erro: 'Projeto nao encontrado' });
    }
    
    res.json(linhas[0]);
  } catch (erro) {
    res.status(500).json({ erro: 'Falha no servidor: ' + erro.message });
  }
});

// Rota para atualizar um projeto (Protegida por autenticação)
app.put('/api/projetos/:id', autenticar, async (req, res) => {
  try {
    // Insira aqui a lógica de atualização (UPDATE) no banco de dados
  } catch (erro) {
    res.status(500).json({ erro: 'Falha no servidor: ' + erro.message });
  }
});

// POST cria: os dados vem no corpo, em JSON, e o id nasce no banco.
app.post('/api/projetos', async (req, res) => {
  try {
    const dados = req.body;
    console.log(dados);
    if (!dados || !dados.nome) {
      return res.status(400).json({ erro: 'Informe pelo menos o nome do projeto' });
    }
    const sql = 'INSERT INTO projetos (nome, descricao, tecnologias, link_github, ano, status) VALUES (?, ?, ?, ?, ?, ?)';
    const [resultado] = await pool.execute(sql, [
      dados.nome,
      dados.descricao ?? '',
      dados.tecnologias ?? '',
      dados.link_github ?? '',
      dados.ano ?? new Date().getFullYear(),
      'publicado'
    ]);
    res.status(201).json({ id: resultado.insertId });
  } catch (erro) {
    res.status(500).json({ erro: 'Falha no servidor: ' + erro.message });
  }
});
// DELETE apaga: so precisa do id. Nao ha corpo no pedido, e a resposta tambem
app.delete('/api/projetos/:id', async (req, res) => {
  try {
    const [resultado] = await pool.execute('DELETE FROM projetos WHERE id = ?', [req.params.id]);
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: 'Projeto nao encontrado' });
    }
    res.status(204).end();
  } catch (erro) {
    res.status(500).json({ erro: 'Falha no servidor: ' + erro.message });
  }
});
// O catalogo, com o SELECT do api/tecnologias.php.
// POST cria: os dados vem no corpo, em JSON, e o id nasce no banco.
app.post('/api/projetos', async (req, res) => {
  try {
    const dados = req.body;
    console.log(dados);
    if (!dados || !dados.nome) {
      return res.status(400).json({ erro: 'Informe pelo menos o nome do projeto' });
    }
    const sql = 'INSERT INTO projetos (nome, descricao, tecnologias, link_github, ano, status) VALUES (?, ?, ?, ?, ?, ?)';
    const [resultado] = await pool.execute(sql, [
      dados.nome,
      dados.descricao ?? '',
      dados.tecnologias ?? '',
      dados.link_github ?? '',
      dados.ano ?? new Date().getFullYear(),
      'publicado'
    ]);
    res.status(201).json({ id: resultado.insertId });
  } catch (erro) {
    res.status(500).json({ erro: 'Falha no servidor: ' + erro.message });
  }
});

app.get('/api/tecnologias', async (req, res) => {
  try {
    const sql = "SELECT id, nome, categoria, descricao, ano_criacao FROM tecnologias WHERE status = 'ativo' ORDER BY categoria, nome";
    const [tecnologias] = await pool.query(sql);
    res.json(tecnologias);
  } catch (erro) {
    res.status(500).json({ erro: 'Falha no servidor: ' + erro.message });
  }
});


app.listen(PORTA, () => {
  console.log('API no ar em http://localhost:' + PORTA);
});