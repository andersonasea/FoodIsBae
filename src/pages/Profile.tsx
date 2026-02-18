import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { User, CalendarDays, ShoppingBag, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { getUserReservations } from '../services/reservationService'
import { getUserOrders } from '../services/orderService'
import type { Reservation, Order } from '../types'
import toast from 'react-hot-toast'

type TabId = 'reservations' | 'orders'

const statusColors: Record<string, string> = {
  confirmed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  pending: 'bg-yellow-100 text-yellow-700',
  delivered: 'bg-blue-100 text-blue-700',
}

const statusLabels: Record<string, string> = {
  confirmed: 'Confirmée',
  cancelled: 'Annulée',
  pending: 'En attente',
  delivered: 'Livrée',
}

export default function Profile() {
  const { user, loading } = useAuth()
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [activeTab, setActiveTab] = useState<TabId>('reservations')
  const [dataLoading, setDataLoading] = useState(true)

  useEffect(() => {
    if (user) {
      Promise.all([getUserReservations(user.uid), getUserOrders(user.uid)])
        .then(([res, ord]) => {
          setReservations(res)
          setOrders(ord)
        })
        .catch((err) => {
          console.error('Erreur chargement profil:', err)
          toast.error('Erreur lors du chargement de vos données.')
        })
        .finally(() => setDataLoading(false))
    }
  }, [user])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    )
  }

  if (!user) return <Navigate to="/login" />

  const tabs: { id: TabId; label: string; icon: typeof CalendarDays }[] = [
    { id: 'reservations', label: 'Réservations', icon: CalendarDays },
    { id: 'orders', label: 'Commandes', icon: ShoppingBag },
  ]

  return (
    <div className="min-h-screen bg-gray-light">
      <div className="bg-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <User size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {user.displayName || 'Utilisateur'}
              </h1>
              <p className="text-gray-300">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'bg-white text-dark hover:bg-gray-100'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {dataLoading ? (
          <div className="text-center py-12">
            <Loader2 className="animate-spin text-primary mx-auto" size={32} />
          </div>
        ) : activeTab === 'reservations' ? (
          reservations.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center text-gray-400">
              <CalendarDays size={48} className="mx-auto mb-4 opacity-50" />
              <p>Aucune réservation pour le moment.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reservations.map((r) => (
                <div key={r.id} className="bg-white rounded-xl p-5 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{r.name}</p>
                    <p className="text-sm text-gray-500">
                      {r.date} à {r.time} — {r.guests} {Number(r.guests) > 1 ? 'personnes' : 'personne'}
                    </p>
                  </div>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusColors[r.status] || ''}`}>
                    {statusLabels[r.status] || r.status}
                  </span>
                </div>
              ))}
            </div>
          )
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center text-gray-400">
            <ShoppingBag size={48} className="mx-auto mb-4 opacity-50" />
            <p>Aucune commande pour le moment.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((o) => (
              <div key={o.id} className="bg-white rounded-xl p-5 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold">Commande #{o.id.slice(-6)}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(o.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusColors[o.status] || ''}`}>
                    {statusLabels[o.status] || o.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {o.items.map((item, i) => (
                    <span key={i}>
                      {item.name} x{item.quantity}
                      {i < o.items.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </div>
                <p className="text-primary font-bold mt-2">{o.total.toFixed(2)} €</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
