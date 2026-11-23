import { useEffect, useState } from 'react';
import API from './api.js';

function Catalogo() {
  const [tecnologias, setTecnologias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  async function buscarTecnologias() {
    try {
      if (!API) throw new Error('endereço da API ainda não configurado');
      const resposta = await fetch(API + '/api/tecnologias');
      if (!resposta.ok) {
        throw new Error('a API respondeu HTTP ' + resposta.status);
      }
      const dados = await resposta.json();
      if (!Array.isArray(dados)) throw new Error('a API não retornou uma lista');
      setTecnologias(dados);
    } catch (falha) {
      setTecnologias([]);
      setErro('Não deu para carregar as tecnologias: ' + falha.message + '.');
    } finally {
      setCarregando(false);
    }
  }

  function atualizarTecnologias() {
    setCarregando(true);
    setErro('');
    buscarTecnologias();
  }

  useEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect -- A Aula 27 sincroniza dados remotos por uma função assíncrona.
    buscarTecnologias();
  }, []);

  return (
    <section id="catalogo" className="catalogo" aria-labelledby="titulo-catalogo">
      <div className="catalogo-intro">
        <div>
          <p className="eyebrow"><span className="indice">03</span> / Tecnologias</p>
          <h2 id="titulo-catalogo">Catálogo de tecnologias</h2>
          <p className="texto-apoio">As tecnologias cadastradas no portfólio, reunidas em um só lugar.</p>
        </div>
        <button className="botao botao-secundario" type="button" onClick={atualizarTecnologias} disabled={carregando}>
          <span className="icone-atualizar" aria-hidden="true">↻</span>
          {carregando ? 'Atualizando...' : 'Atualizar catálogo'}
        </button>
      </div>
      <div className="catalogo-conteudo">
        <div className="estado-remoto" role="status" aria-live="polite" aria-atomic="true">
          {carregando && <p className="estado">Carregando tecnologias...</p>}
          {!carregando && !erro && tecnologias.length === 0 && <p className="estado">Nenhuma tecnologia cadastrada ainda.</p>}
          {!carregando && !erro && tecnologias.length > 0 && <p className="resumo-dados sucesso">{tecnologias.length} {tecnologias.length === 1 ? 'tecnologia no catálogo' : 'tecnologias no catálogo'}</p>}
        </div>
        {erro && <p className="estado erro" role="alert">{erro}</p>}
        <ul className="tecnologias" aria-busy={carregando}>
          {!carregando && !erro && tecnologias.map((tecnologia) => (
            <li key={tecnologia.id}>
              <h3>{tecnologia.nome}</h3>
              <p>{tecnologia.categoria}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Catalogo;
