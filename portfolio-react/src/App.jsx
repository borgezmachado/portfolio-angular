import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import API from './api.js';
import Cabecalho from './Cabecalho.jsx';
import Gestao from './Gestao.jsx';
import Inicio from './Inicio.jsx';
import Rodape from './Rodape.jsx';

// App: o componente raiz. O cabecalho e o rodape ficam; o miolo depende do endereco.
function App() {
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
      <Cabecalho />
      <main>
        <Routes>
          <Route 
            path="/" 
            element={
              <Inicio 
                projetos={projetos} 
                carregando={carregando} 
                erro={erro} 
              />
            } 
          />
          <Route path="/gestao" element={<Gestao />} />
        </Routes>
      </main>
      <Rodape />
    </>
  );
}

export default App;