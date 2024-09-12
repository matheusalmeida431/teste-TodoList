import './App.css';
import { Header } from './components/Header';
import { Board } from './components/Board';

function App() {

  return (
    <div className="container">
      <Header />
      <Board />

      <div className="card-grid">
      {/*data?.map((atividade) => (
          <Card
            key={atividade.id} // Chave única para cada componente Card
            id={atividade.id}
            title={atividade.title} 
            description={atividade.description} 
            date={new Date(atividade.date)} // Convertendo string para objeto Date, se necessário
          />
      ))*/}

      </div>

      <footer className="app-footer">
        <p>&copy; 2024 - Meu Gerenciador de Tarefas</p>
      </footer>
    </div>
  );
}

export default App;

