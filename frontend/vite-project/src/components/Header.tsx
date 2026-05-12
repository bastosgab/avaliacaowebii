import { useAuth } from '../hooks/useAuth'
import './Header.css'

export function Header() {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    window.location.href = '/login'
  }

  return (
    <header className="header">
      <div className="header-content">
        <h1>💰 BANIF</h1>
        {user && (
          <div className="header-user">
            <span>{user.email}</span>
            <button onClick={handleLogout}>Sair</button>
          </div>
        )}
      </div>
    </header>
  )
}
