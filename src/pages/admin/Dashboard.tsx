import { useEffect, useState } from 'react'
import {
  ShoppingBag,
  CalendarDays,
  UtensilsCrossed,
  DollarSign,
  Loader2,
} from 'lucide-react'
import { getDashboardStats } from '../../services/adminService'
import type { Order, Reservation } from '../../types'

interface Stats {
  totalOrders: number
  totalReservations: number
  totalMenuItems: number
  totalRevenue: number
  recentOrders: Order[]
  recentReservations: Reservation[]
}

const statusLabels: Record<string, string> = {
  confirmed: 'Confirmée',
  cancelled: 'Annulée',
  pending: 'En attente',
  delivered: 'Livrée',
}

const statusColors: Record<string, string> = {
  confirmed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  pending: 'bg-yellow-100 text-yellow-700',
  delivered: 'bg-blue-100 text-blue-700',
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDashboardStats()
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[50vh]">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="p-8 text-center text-gray-400">
        Impossible de charger les statistiques.
      </div>
    )
  }

  const cards = [
    { label: 'Commandes', value: stats.totalOrders, icon: ShoppingBag, color: 'bg-blue-500' },
    { label: 'Réservations', value: stats.totalReservations, icon: CalendarDays, color: 'bg-green-500' },
    { label: 'Plats au menu', value: stats.totalMenuItems, icon: UtensilsCrossed, color: 'bg-purple-500' },
    { label: 'Revenus', value: `${stats.totalRevenue.toFixed(2)} €`, icon: DollarSign, color: 'bg-primary' },
  ]

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Tableau de bord</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 text-sm font-medium">{card.label}</span>
              <div className={`${card.color} p-2 rounded-lg`}>
                <card.icon size={18} className="text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-semibold text-lg mb-4">Dernières commandes</h2>
          {stats.recentOrders.length === 0 ? (
            <p className="text-gray-400 text-sm">Aucune commande.</p>
          ) : (
            <div className="space-y-3">
              {stats.recentOrders.map((o) => (
                <div key={o.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-sm font-medium">#{o.id.slice(-6)}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(o.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-sm">{o.total.toFixed(2)} €</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${statusColors[o.status] || ''}`}>
                      {statusLabels[o.status] || o.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-semibold text-lg mb-4">Dernières réservations</h2>
          {stats.recentReservations.length === 0 ? (
            <p className="text-gray-400 text-sm">Aucune réservation.</p>
          ) : (
            <div className="space-y-3">
              {stats.recentReservations.map((r) => (
                <div key={r.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-sm font-medium">{r.name}</p>
                    <p className="text-xs text-gray-400">
                      {r.date} à {r.time} — {r.guests} pers.
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${statusColors[r.status] || ''}`}>
                    {statusLabels[r.status] || r.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
