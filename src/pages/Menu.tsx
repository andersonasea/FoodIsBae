import { useState } from 'react'
import { Plus, ShoppingCart } from 'lucide-react'
import { SAMPLE_MENU, CATEGORIES } from '../services/menuService'
import { useCart } from '../context/CartContext'
import type { MenuItem } from '../types'
import toast from 'react-hot-toast'

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('all')
  const { addItem } = useCart()

  const filteredItems =
    activeCategory === 'all'
      ? SAMPLE_MENU
      : SAMPLE_MENU.filter((item) => item.category === activeCategory)

  const handleAddToCart = (item: MenuItem) => {
    addItem(item)
    toast.success(`${item.name} ajouté au panier`)
  }

  return (
    <div className="min-h-screen bg-gray-light">
      <div className="bg-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Notre Menu</h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            Des plats savoureux préparés avec des ingrédients frais et de qualité.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat.id
                  ? 'bg-primary text-white'
                  : 'bg-white text-dark hover:bg-primary/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-4xl">{item.image}</span>
                  {item.popular && (
                    <span className="bg-secondary/10 text-secondary text-xs font-semibold px-2 py-1 rounded-full">
                      Populaire
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-bold text-xl">
                    {item.price.toFixed(2)} €
                  </span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-primary hover:bg-primary-dark text-white p-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium px-4"
                  >
                    <Plus size={16} />
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
            <p>Aucun plat dans cette catégorie pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}
