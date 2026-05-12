import { useEffect } from 'react'
import { useApi } from '../hooks/useApi'
import type { ContaCorrente } from '../types/index'

export function ContasPage() {
  const { data: contas, isLoading, error, get } = useApi<ContaCorrente[]>()

  useEffect(() => {
    get('/contas')
  }, [])

  return (
    <div className="page">
      <div className="page-header">
        <h2>🏦 Contas Correntes</h2>
      </div>

      {error && <div className="error-message">{error.message}</div>}

      {isLoading ? (
        <p>Carregando...</p>
      ) : contas && contas.length > 0 ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Número Conta</th>
                <th>Agência</th>
                <th>Saldo</th>
              </tr>
            </thead>
            <tbody>
              {contas.map((conta) => (
                <tr key={conta.id}>
                  <td>{conta.numeroConta}</td>
                  <td>{conta.agencia}</td>
                  <td>R$ {conta.saldo.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="empty-state">Nenhuma conta cadastrada</p>
      )}
    </div>
  )
}
