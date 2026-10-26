// CardProjeto: exibe os dados do projeto a partir do objeto 'projeto' (Interface Projeto).
function CardProjeto({ projeto }) {
  return (
    <article className="card">
      <h3>{projeto.nome}</h3>
      <p className="meta">{projeto.tecnologias} · {projeto.ano}</p>
      <p>{projeto.descricao}</p>
      
      {/* O botão "Ver no GitHub" só é renderizado se existir link_github */}
      {projeto.link_github && (
        <a href={projeto.link_github} target="_blank" rel="noopener noreferrer">
          Ver no GitHub
        </a>
      )}
    </article>
  );
}

export default CardProjeto;