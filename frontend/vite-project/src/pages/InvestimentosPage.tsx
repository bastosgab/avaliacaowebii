import { useState, useEffect } from 'react'
import { useApi } from '../hooks/useApi'
import type { Investimento } from '../types/index'

export function InvestimentosPage() {
  const { data: investimentos, isLoading, error, get } = useApi<Investimento[]>()
  const [clienteId, setClienteId] = useState('1')

  useEffect(() => {
    if (clienteId) {
      get(`/clientes/${clienteId}/investimentos`)
    }
  }, [clienteId])

  const getTipoLabel = (tipo: string) => {
    const labels: Record<string, string> = {
      poupanca: '💰 Poupança',
      titulos: '📄 Títulos',
      acoes: '📈 Ações',
    }
    return labels[tipo] || tipo
  }

  return (
    <div className="page">
      <div className="page-header">
        <h2>📈 Investimentos</h2>
      </div>

      <div className="filter-group">
        <label>Cliente ID:</label>
        <input
          type="number"
          value={clienteId}
          onChange={(e) => setClienteId(e.target.value)}
          placeholder="Digite o ID do cliente"
        />
      </div>

      {error && <div className="error-message">{error.message}</div>}

      {isLoading ? (
        <p>Carregando...</p>
      ) : investimentos && investimentos.length > 0 ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Valor Investido</th>
                <th>Data Aplicação</th>
                <th>Data Resgate</th>
              </tr>
            </thead>
            <tbody>
              {investimentos.map((inv) => (
                <tr key={inv.id}>
                  <td>{getTipoLabel(inv.tipo)}</td>
                  <td>R$ {inv.valorInvestido.toFixed(2)}</td>
                  <td>{new Date(inv.dataAplicacao).toLocaleDateString()}</td>
                  <td>
                    {inv.dataResgate
                      ? new Date(inv.dataResgate).toLocaleDateString()
                      : '❌ Não resgatado'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="empty-state">Nenhum investimento encontrado</p>
      )}
    </div>
  )
}
