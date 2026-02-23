import { useEffect, useState } from 'react'
import { Loader2, ShoppingBag } from 'lucide-react'
import { getAllOrders, updateOrderStatus } from '../../services/adminService'
import type { Order } from '../../types'
import toast from 'react-hot-toast'

const statusOptions: { value: Order['status']; label: string }[] = [
  { value: 'pending', label: 'En attente' },
  { value: 'delivered', label: 'Livrée' },
  { value: 'cancelled', label: 'Annulée' },
]

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  delivered: 'bg-blue-100 text-blue-700',
  cancelled: 'bg-red-100 text-red-700',
}

export default function OrdersManager() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  const loadOrders = async () => {
    try {
      const data = await getAllOrders()
      setOrders(data)
    } catch (err) {
      console.error(err)
      toast.error('Erreur lors du chargement des commandes.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrders()
  }, [])

  const handleStatusChange = async (orderId: string, status: Order['status']) => {
    try {
      await updateOrderStatus(orderId, status)
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status } : o))
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
      <h1 className="text-2xl font-bold mb-8">Gestion des commandes</h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center text-gray-400">
          <ShoppingBag size={48} className="mx-auto mb-4 opacity-50" />
          <p>Aucune commande pour le moment.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <p className="font-semibold text-lg">Commande #{order.id.slice(-6)}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(order.createdAt).toLocaleString('fr-FR')}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Client : {order.userId.slice(0, 12)}...</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusColors[order.status]}`}>
                    {statusOptions.find((s) => s.value === order.status)?.label || order.status}
                  </span>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                    className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    {statusOptions.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3">
                <div className="space-y-1">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.name} <span className="text-gray-400">x{item.quantity}</span>
                      </span>
                      <span className="font-medium">{(item.price * item.quantity).toFixed(2)} €</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-3 pt-3 border-t border-gray-100">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-primary">{order.total.toFixed(2)} €</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
