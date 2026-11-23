import { Link } from 'react-router-dom';

// Cabecalho: a barra de topo do Portfolio, com o nome e os links.
// Um componente e uma funcao que devolve JSX. O nome comeca com maiuscula.
function Cabecalho() {
  return (
    <header>
      <h1>Meu Portfólio</h1>
      <nav>
        <Link to="/">Início</Link>
        <Link to="/gestao">Gestão</Link>
      </nav>
    </header>
  );
}

export default Cabecalho;