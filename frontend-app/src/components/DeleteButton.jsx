
const DeleteButton = () => {

    
    return (
        <button
        onClick={() => handleDelete(item.cep)}
        className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
      >
        Logout
      </button>
    );
}
export default DeleteButton;