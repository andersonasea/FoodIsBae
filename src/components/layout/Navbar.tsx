import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShoppingCart, Menu, X, User, LogOut, Settings } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { logoutUser } from '../../services/authService'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isAdmin } = useAuth()
  const { totalItems } = useCart()

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-colors duration-200 font-medium ${
      isActive ? 'text-primary' : 'text-dark hover:text-primary'
    }`

  const handleLogout = async () => {
    await logoutUser()
    setIsOpen(false)
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🍽️</span>
            <span className="text-xl font-bold text-dark">
              Food<span className="text-primary">IsBae</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={navLinkClass}>Accueil</NavLink>
            <NavLink to="/menu" className={navLinkClass}>Menu</NavLink>
            <NavLink to="/reservation" className={navLinkClass}>Réservation</NavLink>
            <NavLink to="/about" className={navLinkClass}>À propos</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/order" className="relative p-2 text-dark hover:text-primary transition-colors">
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            {user ? (
              <div className="flex items-center gap-3">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-1.5 text-sm font-medium bg-dark text-white px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <Settings size={14} />
                    Admin
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-dark hover:text-primary transition-colors"
                >
                  <User size={20} />
                  <span className="text-sm font-medium">{user.displayName || 'Profil'}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-primary transition-colors"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium"
              >
                Connexion
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-dark"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-3">
            <NavLink to="/" className={navLinkClass} onClick={() => setIsOpen(false)}>
              Accueil
            </NavLink>
            <NavLink to="/menu" className="block py-1" onClick={() => setIsOpen(false)}>
              Menu
            </NavLink>
            <NavLink to="/reservation" className="block py-1" onClick={() => setIsOpen(false)}>
              Réservation
            </NavLink>
            <NavLink to="/order" className="block py-1" onClick={() => setIsOpen(false)}>
              Commande ({totalItems})
            </NavLink>
            <NavLink to="/about" className="block py-1" onClick={() => setIsOpen(false)}>
              À propos
            </NavLink>
            <NavLink to="/contact" className="block py-1" onClick={() => setIsOpen(false)}>
              Contact
            </NavLink>
            <hr className="my-2" />
            {user ? (
              <>
                {isAdmin && (
                  <NavLink to="/admin" className="block py-1 font-semibold" onClick={() => setIsOpen(false)}>
                    Administration
                  </NavLink>
                )}
                <NavLink to="/profile" className="block py-1" onClick={() => setIsOpen(false)}>
                  Mon profil
                </NavLink>
                <button onClick={handleLogout} className="block py-1 text-primary">
                  Déconnexion
                </button>
              </>
            ) : (
              <NavLink to="/login" className="block py-1" onClick={() => setIsOpen(false)}>
                Connexion
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
