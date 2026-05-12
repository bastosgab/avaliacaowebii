import { useState, useEffect } from 'react'
import { useApi } from '../hooks/useApi'
import type { Cliente } from '../types/index'
import './ClientesPage.css'

export function ClientesPage() {
  const { data: clientes, isLoading, error, get, post } = useApi<Cliente[]>()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    rua: '',
    numero: '',
    cidade: '',
    estado: '',
    senha: '',
  })

  useEffect(() => {
    get('/clientes')
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await post('/clientes', formData)
      setFormData({
        nome: '',
        email: '',
        cpf: '',
        rua: '',
        numero: '',
        cidade: '',
        estado: '',
        senha: '',
      })
      setShowForm(false)
      get('/clientes')
    } catch (err) {
      console.error('Erro ao criar cliente:', err)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="page">
      <div className="page-header">
        <h2>👥 Clientes</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Cancelar' : '+ Novo Cliente'}
        </button>
      </div>

      {error && <div className="error-message">{error.message}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="form-card">
          <div className="form-grid">
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              value={formData.nome}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="cpf"
              placeholder="CPF"
              value={formData.cpf}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="senha"
              placeholder="Senha"
              value={formData.senha}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="rua"
              placeholder="Rua"
              value={formData.rua}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="numero"
              placeholder="Número"
              value={formData.numero}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="cidade"
              placeholder="Cidade"
              value={formData.cidade}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="estado"
              placeholder="Estado"
              value={formData.estado}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Salvar Cliente
          </button>
        </form>
      )}

      {isLoading ? (
        <p>Carregando...</p>
      ) : clientes && clientes.length > 0 ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>CPF</th>
                <th>Cidade</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.nome}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.cpf}</td>
                  <td>{cliente.cidade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="empty-state">Nenhum cliente cadastrado</p>
      )}
    </div>
  )
}
