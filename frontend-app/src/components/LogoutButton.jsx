import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const handleLogout = () => {
        logout();
        navigate('/');
    };
    
    return (
        <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded-xl"
      >
        Logout
      </button>
    );
}
export default LogoutButton;