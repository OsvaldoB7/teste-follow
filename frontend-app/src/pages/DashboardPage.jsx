import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCepInfo, getHistory, deleteCep } from '../service/cepService';
import DashboardHeader from '../components/DashBoardHeader';
import SearchForm from '../components/SearchForm';
import HistoryList from '../components/HistoryList';
import CepResult from '../components/CepResult';

const DashboardPage = ({userId}) => {
  const [cepInput, setCepInput] = useState('');
  const [cepResult, setCepResult] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  const handleSearchCep = async (e) => {
    e.preventDefault();
    setError(null);
    const cepSemTraco = cepInput.replace(/-/g, '');
    if (cepSemTraco.length !== 8) {
      setError("CEP inválido: Padrão do CEP deve ser 8 digitos");
      return;
    }
    try {
      const data = await getCepInfo(cepSemTraco, userId);
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
      <div className="w-full flex justify-end my-4"></div>
      <div className="w-full max-w-md mx-auto mt-6">
        <SearchForm
          value={cepInput}
          onChange={(e) => setCepInput(e.target.value)}
          onSubmit={handleSearchCep}
          error={error}
        />
        <CepResult result={cepResult} />
        <HistoryList history={history} onDelete={handleDelete} />
      </div>
    </div>
  );
};
DashboardPage.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default DashboardPage;