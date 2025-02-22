import PropTypes from 'prop-types';

const DeleteButton = ({ onDelete, cep }) => {
  return (
    <button
      onClick={() => onDelete(cep)}
      className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
    >
      Deletar
    </button>
  );
};

DeleteButton.propTypes = {
  onDelete: PropTypes.func.isRequired,
  cep: PropTypes.string.isRequired,
};

export default DeleteButton;