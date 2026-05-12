import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import './LoginPage.css'

interface LoginPageProps {
    onLoginSuccess: () => void
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
    const [isSignup, setIsSignup] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const { login, signup } = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            if (isSignup) {
                await signup(email, password, fullName)
                setEmail('')
                setPassword('')
                setFullName('')
                setIsSignup(false)
                setError('Conta criada! Faça login agora.')
            } else {
                await login(email, password)
                onLoginSuccess()
            }
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h1> Banif </h1>
                <h2>{isSignup ? 'Criar Conta' : 'Fazer Login'}</h2>

                {error && <div className={`message ${error.includes('criada') ? 'success' : 'error'}`}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    {isSignup && (
                        <div className="form-group">
                            <label>Nome Completo</label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label>Senha</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Carregando...' : isSignup ? 'Criar Conta' : 'Entrar'}
                    </button>
                </form>

                <p className="toggle">
                    {isSignup ? 'Já tem conta?' : 'Não tem conta?'}
                    <button
                        type="button"
                        onClick={() => {
                            setIsSignup(!isSignup)
                            setError('')
                        }}
                        disabled={loading}
                    >
                        {isSignup ? 'Faça login' : 'Crie uma'}
                    </button>
                </p>
            </div>
        </div>
    )
}
