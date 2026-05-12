import './Sidebar.css'

interface SidebarProps {
  currentPage: string
  onNavigate: (page: string) => void
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: '📊 Dashboard' },
    { id: 'clientes', label: '👥 Clientes' },
    { id: 'contas', label: '🏦 Contas' },
    { id: 'investimentos', label: '📈 Investimentos' },
  ]

  return (
    <aside className="sidebar">
      <nav>
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`menu-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}
