import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Plus, Pencil, Trash2, X, Loader2, UtensilsCrossed } from 'lucide-react'
import {
  getFirebaseMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from '../../services/adminService'
import { CATEGORIES } from '../../services/menuService'
import type { MenuItem, MenuItemFormData } from '../../types'
import toast from 'react-hot-toast'

const categories = CATEGORIES.filter((c) => c.id !== 'all')

export default function MenuManager() {
  const [items, setItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<MenuItemFormData>()

  const loadItems = async () => {
    try {
      const data = await getFirebaseMenuItems()
      setItems(data)
    } catch (err) {
      console.error(err)
      toast.error('Erreur lors du chargement du menu.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadItems()
  }, [])

  const openAddForm = () => {
    setEditingItem(null)
    reset({ name: '', description: '', price: 0, category: '', image: '', popular: false })
    setShowForm(true)
  }

  const openEditForm = (item: MenuItem) => {
    setEditingItem(item)
    setValue('name', item.name)
    setValue('description', item.description)
    setValue('price', item.price)
    setValue('category', item.category)
    setValue('image', item.image)
    setValue('popular', item.popular)
    setShowForm(true)
  }

  const onSubmit = async (data: MenuItemFormData) => {
    try {
      data.price = Number(data.price)
      if (editingItem) {
        await updateMenuItem(editingItem.id, data)
        toast.success('Plat modifié avec succès.')
      } else {
        await addMenuItem(data)
        toast.success('Plat ajouté avec succès.')
      }
      setShowForm(false)
      setEditingItem(null)
      reset()
      await loadItems()
    } catch (err) {
      console.error(err)
      toast.error('Erreur lors de la sauvegarde.')
    }
  }

  const handleDelete = async (item: MenuItem) => {
    if (!confirm(`Supprimer "${item.name}" ?`)) return
    try {
      await deleteMenuItem(item.id)
      toast.success('Plat supprimé.')
      await loadItems()
    } catch (err) {
      console.error(err)
      toast.error('Erreur lors de la suppression.')
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
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Gestion du menu</h1>
        <button
          onClick={openAddForm}
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          Ajouter un plat
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">
                {editingItem ? 'Modifier le plat' : 'Nouveau plat'}
              </h2>
              <button
                onClick={() => { setShowForm(false); setEditingItem(null) }}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1">Nom du plat</label>
                <input
                  type="text"
                  {...register('name', { required: 'Requis' })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="text-sm font-medium block mb-1">Description</label>
                <textarea
                  {...register('description', { required: 'Requis' })}
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium block mb-1">Prix (€)</label>
                  <input
                    type="number"
                    step="0.01"
                    {...register('price', { required: 'Requis', min: { value: 0.01, message: 'Min 0.01' } })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                  {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Catégorie</label>
                  <select
                    {...register('category', { required: 'Requis' })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  >
                    <option value="">Choisir</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                  {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium block mb-1">Emoji / Image</label>
                <input
                  type="text"
                  {...register('image', { required: 'Requis' })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  placeholder="🍔"
                />
                {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...register('popular')} className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                <span className="text-sm font-medium">Plat populaire</span>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary-dark disabled:opacity-50 text-white py-2.5 rounded-lg font-semibold transition-colors"
              >
                {isSubmitting ? 'Enregistrement...' : editingItem ? 'Modifier' : 'Ajouter'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Menu items table */}
      {items.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center text-gray-400">
          <UtensilsCrossed size={48} className="mx-auto mb-4 opacity-50" />
          <p>Aucun plat dans la base de données.</p>
          <p className="text-sm mt-1">Cliquez sur "Ajouter un plat" pour commencer.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 text-left text-sm text-gray-500">
                <th className="px-6 py-4 font-medium">Plat</th>
                <th className="px-6 py-4 font-medium">Catégorie</th>
                <th className="px-6 py-4 font-medium">Prix</th>
                <th className="px-6 py-4 font-medium">Populaire</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.image}</span>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-gray-400 truncate max-w-[200px]">{item.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 capitalize">{item.category}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-primary">{item.price.toFixed(2)} €</td>
                  <td className="px-6 py-4">
                    {item.popular && (
                      <span className="bg-secondary/10 text-secondary text-xs font-medium px-2 py-1 rounded-full">
                        Oui
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditForm(item)}
                        className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
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
