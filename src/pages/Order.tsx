import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { createOrder } from '../services/orderService'
import toast from 'react-hot-toast'

export default function Order() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart()
  const { user } = useAuth()

  const handleOrder = async () => {
    if (!user) {
      toast.error('Veuillez vous connecter pour commander.')
      return
    }
    if (items.length === 0) return

    try {
      await createOrder(user.uid, items, totalPrice)
      clearCart()
      toast.success('Commande passée avec succès !')
    } catch {
      toast.error('Erreur lors de la commande. Veuillez réessayer.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-light">
      <div className="bg-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Votre commande</h1>
          <p className="text-gray-300">
            Vérifiez votre panier et passez commande.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag size={64} className="mx-auto mb-4 text-gray-300" />
            <h2 className="text-xl font-semibold mb-2">Votre panier est vide</h2>
            <p className="text-gray-500 mb-6">
              Parcourez notre menu et ajoutez vos plats préférés.
            </p>
            <Link
              to="/menu"
              className="inline-block bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Voir le menu
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-4 p-4 ${
                    index < items.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <span className="text-3xl">{item.image}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{item.name}</h3>
                    <p className="text-primary font-medium">
                      {item.price.toFixed(2)} €
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="font-semibold w-20 text-right">
                    {(item.price * item.quantity).toFixed(2)} €
                  </span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-500">Sous-total</span>
                <span className="font-medium">{totalPrice.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-500">Frais de service</span>
                <span className="font-medium">Gratuit</span>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold">Total</span>
                <span className="text-lg font-bold text-primary">
                  {totalPrice.toFixed(2)} €
                </span>
              </div>

              {!user && (
                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-3 mb-4 text-center text-sm">
                  <Link to="/login" className="text-primary font-medium hover:underline">
                    Connectez-vous
                  </Link>{' '}
                  pour passer votre commande.
                </div>
              )}

              <button
                onClick={handleOrder}
                disabled={!user || items.length === 0}
                className="w-full bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Passer la commande
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
