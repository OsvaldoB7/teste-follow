import PropTypes from 'prop-types';
import HistoryItem from './HistoryItem';

const HistoryList = ({ history, onDelete }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Histórico de Consultas</h2>
      {history.length === 0 ? (
        <p>Nenhum CEP pesquisado ainda.</p>
      ) : (
        <ul className="space-y-2">
          {history.map((item) => (
            <HistoryItem key={item.cep} item={item} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </div>
  );
};

HistoryList.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      cep: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default HistoryList;