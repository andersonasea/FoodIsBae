import { ChefHat, Heart, Leaf, Award } from 'lucide-react'
import type { ValueItem } from '../types'

const values: ValueItem[] = [
  {
    icon: ChefHat,
    title: 'Passion culinaire',
    text: 'Nos chefs créent chaque plat avec amour et expertise pour vous offrir une expérience inoubliable.',
  },
  {
    icon: Leaf,
    title: 'Ingrédients frais',
    text: "Nous sélectionnons soigneusement des produits locaux et de saison pour garantir fraîcheur et qualité.",
  },
  {
    icon: Heart,
    title: 'Ambiance chaleureuse',
    text: "Un cadre convivial où chaque client se sent comme chez soi, pour des moments de partage uniques.",
  },
  {
    icon: Award,
    title: 'Excellence du service',
    text: "Notre équipe dévouée s'assure que chaque visite soit une expérience exceptionnelle du début à la fin.",
  },
]

export default function About() {
  return (
    <div className="min-h-screen">
      <div className="bg-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">À propos de FoodIsBae</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Depuis notre ouverture, nous nous engageons à offrir une expérience
            culinaire authentique et mémorable.
          </p>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Notre histoire</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                FoodIsBae est né d'une idée simple : créer un lieu où la bonne
                cuisine et la convivialité se rencontrent. Fondé par des
                passionnés de gastronomie, notre restaurant est devenu un
                incontournable pour les amateurs de saveurs authentiques.
              </p>
              <p>
                Notre équipe de chefs talentueux puise son inspiration dans les
                cuisines du monde entier, tout en mettant en valeur les produits
                locaux et de saison. Chaque plat raconte une histoire, chaque
                bouchée est une découverte.
              </p>
              <p>
                Que vous veniez pour un déjeuner rapide, un dîner en famille ou
                une soirée entre amis, FoodIsBae vous accueille dans une
                ambiance chaleureuse et décontractée.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-12 text-center">
            <span className="text-8xl block mb-6">👨‍🍳</span>
            <p className="text-2xl font-bold text-dark">
              "La cuisine, c'est l'amour rendu visible."
            </p>
            <p className="text-gray-500 mt-2">— L'équipe FoodIsBae</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Nos valeurs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <v.icon className="text-primary" size={28} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-4xl font-bold text-primary">5+</p>
              <p className="text-gray-500 mt-1">Années d'expérience</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">10K+</p>
              <p className="text-gray-500 mt-1">Clients satisfaits</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">50+</p>
              <p className="text-gray-500 mt-1">Plats au menu</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">4.8</p>
              <p className="text-gray-500 mt-1">Note moyenne</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
