import Cabecalho from './Cabecalho.jsx';
import CardProjeto from './CardProjeto.jsx';
import Rodape from './Rodape.jsx';
import Secao from './Secao.jsx';

function App() {
  // Lista de projetos reais seguindo a interface do projeto.service.ts
  const listaProjetos = [
    {
      id: 1,
      nome: "Portfolio Angular",
      descricao: "Aplicação front-end desenvolvida em Angular com Angular Material e consumo de API REST.",
      tecnologias: "Angular, TypeScript, SCSS",
      link_github: "https://github.com/borgesmachado/portfolio-angular",
      ano: 2026
    },
    {
      id: 2,
      nome: "API Node.js & MariaDB",
      descricao: "Backend desenvolvido para servir os endpoints de projetos e utilizadores com autenticação.",
      tecnologias: "Node.js, Express, MariaDB",
      link_github: "https://github.com/borgesmachado/portfolio-angular",
      ano: 2026
    },
    {
      id: 3,
      nome: "API de Portfólio em PHP",
      descricao: "Endpoints legados de projetos e catálogo utilizando PHP PDO e banco de dados MariaDB.",
      tecnologias: "PHP, PDO, MariaDB",
      link_github: null, // Teste de renderização condicional (sem link)
      ano: 2026
    }
  ];

  return (
    <>
      <Cabecalho />
      
      <main className="container">
        <Secao titulo="Meus Projetos">
          <div className="cards">
            {listaProjetos.map((proj) => (
              <CardProjeto key={proj.id} projeto={proj} />
            ))}
          </div>
        </Secao>
      </main>

      <Rodape />
    </>
  );
}

export default App;