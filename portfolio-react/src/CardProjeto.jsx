// CardProjeto.jsx
function CardProjeto({ nome, descricao, tecnologias, link_github, ano }) {
  return (
    <article className="card">
      <h3>{nome}</h3>
      <p className="meta">{tecnologias} · {ano}</p>
      <p>{descricao}</p>
      
      {/* O botão "Ver no GitHub" só é renderizado se existir link_github */}
      {link_github && (
        <a href={link_github} target="_blank" rel="noopener noreferrer">
          Ver no GitHub
        </a>
      )}
    </article>
  );
}

export default CardProjeto;