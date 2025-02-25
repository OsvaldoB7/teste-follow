import PropTypes from 'prop-types';
import DeleteButton from './DeleteButton';
import RenderAddressInfo from './RenderAddressInfo';

const formatCep = (cep) => {
  if (!cep || cep.length !== 8) return cep;
  return `${cep.slice(0, 5)}-${cep.slice(5)}`;
};

const HistoryItem = ({ item, onDelete }) => {
  

  return (
    <li>
      <details className="bg-gray-800 border border-gray-700 rounded">
        <summary className="w-full flex justify-between items-center px-3 py-2 text-white cursor-pointer hover:bg-gray-700">
          <span>CEP: {formatCep(item.cep)}</span>
          <svg
            className="h-5 w-5 text-gray-300"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </summary>
        <div className="p-3 flex flex-col gap-2 text-white">
          <RenderAddressInfo address={item.address} />
          <DeleteButton onDelete={onDelete} cep={item.cep} />
        </div>
      </details>
    </li>
  );
};

HistoryItem.propTypes = {
  item: PropTypes.shape({
    cep: PropTypes.string.isRequired,
    address: PropTypes.object,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default HistoryItem;