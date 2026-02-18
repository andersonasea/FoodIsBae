import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock } from 'lucide-react'
import { loginUser, loginWithGoogle } from '../services/authService'
import toast from 'react-hot-toast'

interface LoginFormData {
  email: string
  password: string
}

export default function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>()

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true)
    try {
      await loginUser(data.email, data.password)
      toast.success('Connexion réussie !')
      navigate('/')
    } catch {
      toast.error('Email ou mot de passe incorrect.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle()
      toast.success('Connexion réussie !')
      navigate('/')
    } catch {
      toast.error('Erreur de connexion avec Google.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-light flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-xl shadow-sm p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-4xl">🍽️</span>
          <h1 className="text-2xl font-bold mt-4 mb-2">Bienvenue</h1>
          <p className="text-gray-500">Connectez-vous à votre compte FoodIsBae</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-dark mb-2">
              <Mail size={16} /> Email
            </label>
            <input
              type="email"
              {...register('email', {
                required: "L'email est requis",
                pattern: { value: /^\S+@\S+$/, message: 'Email invalide' },
              })}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              placeholder="votre@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-dark mb-2">
              <Lock size={16} /> Mot de passe
            </label>
            <input
              type="password"
              {...register('password', {
                required: 'Le mot de passe est requis',
                minLength: { value: 6, message: '6 caractères minimum' },
              })}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark disabled:opacity-50 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <hr className="flex-1" />
          <span className="text-gray-400 text-sm">ou</span>
          <hr className="flex-1" />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full border border-gray-200 hover:bg-gray-50 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-3"
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.63-.06-1.25-.16-1.84H9v3.49h4.84a4.14 4.14 0 0 1-1.8 2.71v2.26h2.92a8.78 8.78 0 0 0 2.68-6.62z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.83.86-3.04.86-2.34 0-4.32-1.58-5.03-3.71H.96v2.33A9 9 0 0 0 9 18z"/>
            <path fill="#FBBC05" d="M3.97 10.71A5.41 5.41 0 0 1 3.69 9c0-.59.1-1.17.28-1.71V4.96H.96A9 9 0 0 0 0 9c0 1.45.35 2.82.96 4.04l3.01-2.33z"/>
            <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.59C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.96l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"/>
          </svg>
          Continuer avec Google
        </button>

        <p className="text-center mt-6 text-sm text-gray-500">
          Pas encore de compte ?{' '}
          <Link to="/register" className="text-primary hover:underline font-medium">
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  )
}
