import { useState, useContext } from 'react'
import { AuthProvider, AuthContext } from './contexts/AuthContext'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { ClientesPage } from './pages/ClientesPage'
import { ContasPage } from './pages/ContasPage'
import { InvestimentosPage } from './pages/InvestimentosPage'
import './App.css'

function AppContent() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const authContext = useContext(AuthContext)

  if (!authContext) {
    return null
  }

  const { isAuthenticated, isLoading } = authContext

  if (isLoading) {
    return <div className="loading">Carregando...</div>
  }

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={() => setCurrentPage('dashboard')} />
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'clientes':
        return <ClientesPage />
      case 'contas':
        return <ContasPage />
      case 'investimentos':
        return <InvestimentosPage />
      default:
        return <DashboardPage />
    }
  }

  return (
    <div className="app-layout">
      <Header />
      <div className="app-body">
        <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
        <main className="app-content">{renderPage()}</main>
      </div>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App