import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../service/authService';
import FormInput from '../components/FormInput';
import { AuthContext } from '../contexts/AuthContext';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '' });
    setMessage(null);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
        let data;
        if (isLogin) {
          data = await loginUser(formData.email, formData.password);
          setMessage({ type: 'success', text: 'Login realizado com sucesso!' });
          login(data.user);
          console.log('Usuário autenticado:', data);
            navigate('/dashboard');
            return
        }
        data = await registerUser(formData.name, formData.email, formData.password); 
        setMessage({ type: 'success', text: isLogin ? 'Login realizado com sucesso!' : 'Cadastro realizado com sucesso!' });
        login(data.user);
        console.log('Usuário autenticado:', data);
        navigate('/dashboard');
      } catch (err) {
        setMessage({
          type: 'error',
          text: err.message || 'Ocorreu um erro ao tentar autenticar.'
        });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          {isLogin ? 'Login' : 'Cadastro'}
        </h2>
        {message && (
          <div className={`mb-4 p-2 rounded ${message.type === 'error' ? 'bg-red-500' : 'bg-green-500'} text-white text-center`}>
            {message.text}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <FormInput
              label="Nome"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Seu nome"
              required
            />
          )}
          <FormInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="seuemail@exemplo.com"
            required
          />
          <FormInput
            label="Senha"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="********"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium"
          >
            {loading ? 'Carregando...' : (isLogin ? 'Entrar' : 'Cadastrar')}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button onClick={toggleForm} className="text-blue-500 hover:underline">
            {isLogin
              ? 'Não tem uma conta? Cadastre-se'
              : 'Já possui uma conta? Faça login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;