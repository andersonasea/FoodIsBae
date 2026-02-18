import { useForm } from 'react-hook-form'
import { CalendarDays, Clock, Users } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { createReservation } from '../services/reservationService'
import { Link } from 'react-router-dom'
import type { ReservationData } from '../types'
import toast from 'react-hot-toast'

export default function Reservation() {
  const { user } = useAuth()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReservationData>()

  const onSubmit = async (data: ReservationData) => {
    if (!user) {
      toast.error('Veuillez vous connecter pour réserver.')
      return
    }
    try {
      await createReservation(user.uid, data)
      toast.success('Réservation confirmée !')
      reset()
    } catch (err) {
      console.error('Erreur réservation:', err)
      const message = err instanceof Error ? err.message : 'Erreur inconnue'
      toast.error(`Erreur : ${message}`)
    }
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="min-h-screen bg-gray-light">
      <div className="bg-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Réservation</h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            Réservez votre table en quelques clics et profitez d'un moment unique.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!user && (
          <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-4 mb-8 text-center">
            <p className="text-dark mb-2">
              Connectez-vous pour effectuer une réservation.
            </p>
            <Link
              to="/login"
              className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium"
            >
              Se connecter
            </Link>
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-xl shadow-sm p-8 space-y-6"
        >
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-dark mb-2">
              <Users size={16} /> Nom complet
            </label>
            <input
              type="text"
              {...register('name', { required: 'Le nom est requis' })}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              placeholder="Votre nom"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-dark mb-2">
                <CalendarDays size={16} /> Date
              </label>
              <input
                type="date"
                min={today}
                {...register('date', { required: 'La date est requise' })}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
              )}
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-dark mb-2">
                <Clock size={16} /> Heure
              </label>
              <select
                {...register('time', { required: "L'heure est requise" })}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              >
                <option value="">Choisir une heure</option>
                <option value="11:00">11:00</option>
                <option value="11:30">11:30</option>
                <option value="12:00">12:00</option>
                <option value="12:30">12:30</option>
                <option value="13:00">13:00</option>
                <option value="13:30">13:30</option>
                <option value="19:00">19:00</option>
                <option value="19:30">19:30</option>
                <option value="20:00">20:00</option>
                <option value="20:30">20:30</option>
                <option value="21:00">21:00</option>
                <option value="21:30">21:30</option>
              </select>
              {errors.time && (
                <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-dark mb-2">
              <Users size={16} /> Nombre de personnes
            </label>
            <select
              {...register('guests', { required: 'Le nombre de personnes est requis' })}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            >
              <option value="">Combien de personnes ?</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? 'personne' : 'personnes'}
                </option>
              ))}
            </select>
            {errors.guests && (
              <p className="text-red-500 text-sm mt-1">{errors.guests.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-dark mb-2 block">
              Demandes spéciales (optionnel)
            </label>
            <textarea
              {...register('notes')}
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
              placeholder="Allergies, occasion spéciale..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !user}
            className="w-full bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors"
          >
            {isSubmitting ? 'Réservation en cours...' : 'Confirmer la réservation'}
          </button>
        </form>
      </div>
    </div>
  )
}
