import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCepInfo, getHistory, deleteCep } from '../service/cepService';
import DashboardHeader from '../components/DashBoardHeader';
import DeleteButton from '../components/DeleteButton';
import SearchForm from '../components/SearchForm';

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
    <div className="min-h-screen bg-gray-900 text-white p-4">
    <DashboardHeader />
    <div className="w-full flex justify-end my-4">{/* LogoutButton, se houver... */}</div>
    
    <div className="w-full max-w-md mx-auto mt-6">
      <SearchForm
        value={cepInput}
        onChange={(e) => setCepInput(e.target.value)}
        onSubmit={handleSearchCep}
        error={error}
      />
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
              <li
                key={item.id}
                className="flex justify-between items-center bg-gray-800 p-3 rounded"
              >
                <span>CEP: {item.cep}</span>
                <DeleteButton onDelete={handleDelete} cep={item.cep} />
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