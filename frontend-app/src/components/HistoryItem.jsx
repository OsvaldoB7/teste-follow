import { useState } from 'react';
import PropTypes from 'prop-types';
import DeleteButton from './DeleteButton';

const HistoryItem = ({ item, onDelete }) => {
  const [open, setOpen] = useState(false);
  
  const toggleDropdown = () => setOpen(!open);

  return (
    <li className="border-b border-gray-700 pb-2">
      <button
        onClick={toggleDropdown}
        type="button"
        className="w-full flex justify-between items-center text-left px-3 py-2 rounded bg-gray-800 hover:bg-gray-700 focus:outline-none"
      >
        <span className="text-white">CEP: {item.cep}</span>
        <svg
          className={`h-5 w-5 text-gray-300 transform ${open ? 'rotate-180' : ''}`}
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
      </button>
      {open && (
        <div className="mt-2 px-3">
          <div className="text-sm text-gray-300 whitespace-pre-wrap">
            {JSON.stringify(item, null, 2)}
          </div>
            <DeleteButton onDelete={onDelete} cep={item.cep} />
        </div>
      )}
    </li>
  );
};

HistoryItem.propTypes = {
  item: PropTypes.shape({
    cep: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default HistoryItem;