import { useState } from 'react';
import axios from 'axios';
import './CepSearch.css'

function CepSearch() {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const searchCep = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/address/${cep}`);
      setAddress(response.data);
    } catch (error) { 
      if (error.response && error.response.status === 404) {
        setToastMessage('Formato de CEP invalido');
      } else {
        setToastMessage('Ocorreu um erro ao buscar dados.');
      }
      setAddress(null);
    }
  };

  function maskCep(value) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .substring(0, 9);    
  }

  return (
    <div className='search-container'>
      <div className='input-end-button-container'>
        <input 
          className='input-text'
          value={cep} 
          onChange={(e) => {
            const maskedValue = maskCep(e.target.value);
            setCep(maskedValue);
          }} 
          placeholder="Digite ..." 
          maxLength={9}
          required={true}
        />
        <button onClick={searchCep} disabled={!cep}>Pesquisar</button>
      </div>
      {address && (
        <div className="address-container">
          <p><span className='address-info'>Logradouro:</span> {address.logradouro}</p>
          <p><span className='address-info'>Bairro:</span> {address.bairro}</p>
          <p><span className='address-info'>Município:</span> {address.localidade}</p>
        </div>
      )}
      {toastMessage && (
        <div className="toast">
            {toastMessage}
            <button className='button-toast-error' onClick={() => setToastMessage(null)}>X</button>
        </div>
      )}
    </div>
  );
}

export default CepSearch;
