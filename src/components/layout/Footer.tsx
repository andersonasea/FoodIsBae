import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🍽️</span>
              <span className="text-xl font-bold">
                Food<span className="text-primary">IsBae</span>
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Une expérience culinaire unique qui allie saveurs authentiques et ambiance chaleureuse.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><Link to="/" className="hover:text-primary transition-colors">Accueil</Link></li>
              <li><Link to="/menu" className="hover:text-primary transition-colors">Menu</Link></li>
              <li><Link to="/reservation" className="hover:text-primary transition-colors">Réservation</Link></li>
              <li><Link to="/order" className="hover:text-primary transition-colors">Commander</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">À propos</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Horaires</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-center gap-2">
                <Clock size={14} />
                <span>Lun - Ven : 11h - 22h</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={14} />
                <span>Sam - Dim : 10h - 23h</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-center gap-2">
                <MapPin size={14} />
                <span>123 Rue de la Gastronomie, Paris</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} />
                <span>01 23 45 67 89</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} />
                <span>contact@foodisbae.fr</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} FoodIsBae. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
