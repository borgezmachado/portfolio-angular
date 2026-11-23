import { useEffect, useState } from 'react';
import API from './api.js';
import CardProjeto from './CardProjeto.jsx';
import Catalogo from './Catalogo.jsx';
import Contato from './Contato.jsx';

// Inicio: a tela publica do Portfolio. Mora no endereco "/".
function Inicio() {
  const [projetos, setProjetos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  // buscarProjetos: faz login para obter o token e busca a lista na API.
  async function buscarProjetos() {
    try {
      // 1. Faz login na API para obter o token
      const respLogin = await fetch(API + '/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: 'dono@portfolio.dev',
          senha: 'portfolio2026'
        })
      });

      if (!respLogin.ok) {
        throw new Error('Falha no login: ' + respLogin.status);
      }

      const dadosLogin = await respLogin.json();

      // 2. Usa o token recebido para buscar os projetos
      const resposta = await fetch(API + '/api/projetos', {
        headers: {
          'Authorization': 'Bearer ' + dadosLogin.token
        }
      });

      if (!resposta.ok) {
        throw new Error('a API respondeu ' + resposta.status);
      }

      const dados = await resposta.json();
      setProjetos(dados);
    } catch (falha) {
      setErro('Não deu para carregar os projetos: ' + falha.message);
    }
    setCarregando(false);
  }

  // O efeito roda depois que a tela foi desenhada.
  useEffect(() => {
    buscarProjetos();
  }, []);

  return (
    <>
      <h2>Projetos</h2>
      {carregando && <p>Carregando projetos...</p>}
      {erro && <p className="erro">{erro}</p>}
      <div className="cards">
        {projetos.map((p) => (
          <CardProjeto
            key={p.id}
            nome={p.nome}
            descricao={p.descricao}
            tecnologias={p.tecnologias}
            link_github={p.link_github}
            ano={p.ano}
          />
        ))}
      </div>
      <Catalogo />
      <Contato />
    </>
  );
}

export default Inicio;