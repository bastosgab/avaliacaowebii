import { useAuth } from '../hooks/useAuth'
import './DashboardPage.css'

export function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="dashboard">
      <h2>Bem-vindo, {user?.fullName || user?.email}! 👋</h2>
      
      <div className="dashboard-grid">
        <div className="card">
          <div className="card-icon">👥</div>
          <div className="card-content">
            <h3>Clientes</h3>
            <p>Gerenciar clientes do banco</p>
          </div>
        </div>

        <div className="card">
          <div className="card-icon">🏦</div>
          <div className="card-content">
            <h3>Contas Correntes</h3>
            <p>Visualizar e gerenciar contas</p>
          </div>
        </div>

        <div className="card">
          <div className="card-icon">📈</div>
          <div className="card-content">
            <h3>Investimentos</h3>
            <p>Acompanhar aplicações e resgates</p>
          </div>
        </div>

        <div className="card">
          <div className="card-icon">💸</div>
          <div className="card-content">
            <h3>Transferências</h3>
            <p>Fazer transferências PIX</p>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h3>ℹ️ Informações do Sistema</h3>
        <p>
          Este é um sistema bancário simples desenvolvido para demonstrar o BANIF
          com funcionalidades básicas de:
        </p>
        <ul>
          <li>Autenticação de usuários</li>
          <li>Gerenciamento de clientes</li>
          <li>Contas correntes com saldo</li>
          <li>Transferências via PIX</li>
          <li>Investimentos em diferentes modalidades</li>
        </ul>
      </div>
    </div>
  )
}
