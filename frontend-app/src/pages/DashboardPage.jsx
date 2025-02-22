import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCepInfo, getHistory, deleteCep } from '../service/cepService';
import DashboardHeader from '../components/DashBoardHeader';

const DashboardPage = ({userId}) => {
  const [cepInput, setCepInput] = useState('');
  const [cepResult, setCepResult] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  const handleSearchCep = async () => {
    setError(null);
    setCepResult(null);
    if (!cepInput.trim()) {
      setError("Por favor, informe um CEP válido");
      return;
    }
    try {
      const data = await getCepInfo(cepInput, userId);
      setCepResult(data);
      fetchHistory();
    } catch (err) {
      setError(err.message || "Erro ao buscar CEP");
    }
  };

  const fetchHistory = async () => {
    try {
      const data = await getHistory(userId);
      setHistory(data);
    } catch (err) {
      console.error("Erro ao buscar histórico:", err);
    }
  };

  const handleDelete = async (cep) => {
    try {
      await deleteCep(cep, userId);
      fetchHistory();
    } catch (err) {
      console.error("Erro ao deletar CEP:", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 ">
      <DashboardHeader />
      <div className="w-full flex justify-end my-4">
      </div>
      
      <div className="w-full max-w-md mx-auto mt-6">
        <div className="flex mb-4">
          <input 
            type="text"
            placeholder="Digite o CEP..."
            value={cepInput}
            onChange={(e) => setCepInput(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-l focus:outline-none"
          />
          <button 
            onClick={handleSearchCep}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r"
          >
            Buscar
          </button>
        </div>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        {cepResult && (
          <div className="mb-6 p-4 bg-gray-800 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Resultado do CEP: {cepResult.cep}</h2>
            <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(cepResult, null, 2)}</pre>
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold mb-4">Histórico de Consultas</h2>
          {history.length === 0 ? (
            <p>Nenhum CEP pesquisado ainda.</p>
          ) : (
            <ul className="space-y-2">
              {history.map((item) => (
                <li key={item.id} className="flex justify-between items-center bg-gray-800 p-3 rounded">
                  <span>CEP: {item.cep}</span>
                  <button 
                    onClick={() => handleDelete(item.cep)}
                    className="text-red-400 hover:text-red-600"
                  >
                    Deletar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
DashboardPage.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default DashboardPage;