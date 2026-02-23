import { useEffect, useState } from 'react'
import { Loader2, CalendarDays } from 'lucide-react'
import { getAllReservations, updateReservationStatus } from '../../services/adminService'
import type { Reservation } from '../../types'
import toast from 'react-hot-toast'

const statusOptions: { value: Reservation['status']; label: string }[] = [
  { value: 'confirmed', label: 'Confirmée' },
  { value: 'cancelled', label: 'Annulée' },
]

const statusColors: Record<string, string> = {
  confirmed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

export default function ReservationsManager() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)

  const loadReservations = async () => {
    try {
      const data = await getAllReservations()
      setReservations(data)
    } catch (err) {
      console.error(err)
      toast.error('Erreur lors du chargement des réservations.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadReservations()
  }, [])

  const handleStatusChange = async (id: string, status: Reservation['status']) => {
    try {
      await updateReservationStatus(id, status)
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      )
      toast.success('Statut mis à jour.')
    } catch (err) {
      console.error(err)
      toast.error('Erreur lors de la mise à jour.')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[50vh]">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Gestion des réservations</h1>

      {reservations.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center text-gray-400">
          <CalendarDays size={48} className="mx-auto mb-4 opacity-50" />
          <p>Aucune réservation pour le moment.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 text-left text-sm text-gray-500">
                <th className="px-6 py-4 font-medium">Client</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Heure</th>
                <th className="px-6 py-4 font-medium">Personnes</th>
                <th className="px-6 py-4 font-medium">Notes</th>
                <th className="px-6 py-4 font-medium">Statut</th>
                <th className="px-6 py-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((r) => (
                <tr key={r.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <p className="font-medium">{r.name}</p>
                    <p className="text-xs text-gray-400">{r.userId.slice(0, 12)}...</p>
                  </td>
                  <td className="px-6 py-4 text-sm">{r.date}</td>
                  <td className="px-6 py-4 text-sm">{r.time}</td>
                  <td className="px-6 py-4 text-sm">{r.guests}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-[150px] truncate">
                    {r.notes || '—'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusColors[r.status]}`}>
                      {statusOptions.find((s) => s.value === r.status)?.label || r.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={r.status}
                      onChange={(e) => handleStatusChange(r.id, e.target.value as Reservation['status'])}
                      className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/30"
                    >
                      {statusOptions.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
