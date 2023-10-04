import CepSearch from "./component/CepSearch";
import banner from './assets/banner.png'
import './global.css'

function App() {
  return (
    <div className="app-container">
      <img className="img" src={banner} alt="Imagem" />
      <span className="title">Buscar endereço</span>
      <CepSearch />
    </div>
  );
}

export default App;
