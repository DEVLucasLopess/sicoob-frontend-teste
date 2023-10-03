import { useState } from 'react';
import axios from 'axios';


function CepSearch() {
  const [cep, setCep] = useState('');  // Estado para armazenar o valor do CEP
  const [address, setAddress] = useState(null);  // Estado para armazenar o endereço retornado

  const searchCep = async () => {
    try {
      // Faça a requisição para o backend utilizando o valor do CEP
      const response = await axios.get(`http://localhost:3001/address/${cep}`);
      setAddress(response.data);
    } catch (error) { 
      if (error.response && error.response.status === 404) {
        alert('O CEP não foi encontrado');
      } else {
        alert('Ocorreu um erro ao buscar dados.' + error);
      }
      console.error("Error fetching CEP:", error);
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
    <div>
      <input 
        value={cep} 
        onChange={(e) => {
          const maskedValue = maskCep(e.target.value);
          setCep(maskedValue);
        }} 
        placeholder="Enter CEP" 
        maxLength={9}
        required={true}
      />
      <button onClick={searchCep}>Search</button>
      {address && (
        <div>
          <p>{address.logradouro}</p>
          <p>{address.bairro}</p>
          <p>{address.localidade}</p>
          {/* Adicione outros campos do endereço conforme necessário */}
        </div>
      )}
    </div>
  );
}

export default CepSearch;
