import { useState } from "react";
import { maskCep } from "../utils/cepMask";
import { useHttp } from "../hooks/useHttp";
import "./CepSearch.css";

function CepSearch() {
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const { get } = useHttp();

  const searchCep = async () => {
    if (!cep || cep.length < 9) {
      setToastMessage("Formato de CEP invalido");
      return;
    }

    try {
      const response = await get(`/address/${cep}`);

      setAddress(response.data);
      setToastMessage(null);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setToastMessage(`${error.response?.data?.message}`);
      } else {
        setToastMessage("Ocorreu um erro ao buscar dados.");
      }
      setAddress(null);
    }
  };

  return (
    <div className="search-container">
      <div className="input-end-button-container">
        <input
          className="input-text"
          value={cep}
          onChange={(e) => {
            const maskedValue = maskCep(e.target.value);
            setCep(maskedValue);
          }}
          placeholder="Digite o cep"
          maxLength={9}
          required={true}
        />
        <button onClick={searchCep} disabled={!cep}>
          Pesquisar
        </button>
      </div>

      {address && (
        <div className="address-container">
          <p>
            <span className="address-info">Logradouro:</span>{" "}
            {address.logradouro}
          </p>
          <p>
            <span className="address-info">Bairro:</span> {address.bairro}
          </p>
          <p>
            <span className="address-info">Municí­pio:</span>{" "}
            {address.localidade}
          </p>
        </div>
      )}

      {toastMessage && (
        <div className="toast">
          {toastMessage}
          <button
            className="button-toast-error"
            onClick={() => setToastMessage(null)}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
}

export default CepSearch;