import { NavLink, Outlet } from 'react-router-dom'
import {
  LayoutDashboard,
  UtensilsCrossed,
  ShoppingBag,
  CalendarDays,
  ArrowLeft,
} from 'lucide-react'

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Tableau de bord', end: true },
  { to: '/admin/menu', icon: UtensilsCrossed, label: 'Menu' },
  { to: '/admin/orders', icon: ShoppingBag, label: 'Commandes' },
  { to: '/admin/reservations', icon: CalendarDays, label: 'Réservations' },
]

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-light flex">
      <aside className="w-64 bg-dark text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-lg font-bold">
            🍽️ Food<span className="text-primary">IsBae</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">Administration</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-300 hover:bg-white/10'
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <NavLink
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={18} />
            Retour au site
          </NavLink>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
