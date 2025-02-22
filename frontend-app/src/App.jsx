import AuthPage from './pages/AuthPage'
import DashboardPage from './pages/DashboardPage'
import { AuthContext } from './contexts/AuthContext';
import { useContext } from 'react';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {user ? <DashboardPage userId={user.id} /> : <AuthPage />}
    </div>
  )
}

export default App
