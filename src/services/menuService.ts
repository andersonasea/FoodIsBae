import { collection, getDocs, query, where } from 'firebase/firestore'
import { db, isConfigured } from './firebase'
import type { MenuItem, Category } from '../types'

const COLLECTION = 'menuItems'

function requireDb() {
  if (!isConfigured || !db) {
    throw new Error('Firebase n\'est pas configuré.')
  }
  return db
}

export async function getAllMenuItems(): Promise<MenuItem[]> {
  const firestore = requireDb()
  const snapshot = await getDocs(collection(firestore, COLLECTION))
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as MenuItem))
}

export async function getMenuItemsByCategory(category: string): Promise<MenuItem[]> {
  const firestore = requireDb()
  const q = query(
    collection(firestore, COLLECTION),
    where('category', '==', category)
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as MenuItem))
}

export const SAMPLE_MENU: MenuItem[] = [
  {
    id: '1',
    name: 'Burger Classic FoodIsBae',
    description: 'Bœuf grillé, cheddar fondant, laitue, tomate et sauce maison',
    price: 14.90,
    category: 'burgers',
    image: '🍔',
    popular: true,
  },
  {
    id: '2',
    name: 'Pizza Margherita',
    description: 'Sauce tomate, mozzarella di bufala, basilic frais',
    price: 12.50,
    category: 'pizzas',
    image: '🍕',
    popular: true,
  },
  {
    id: '3',
    name: 'Salade César',
    description: 'Romaine, poulet grillé, parmesan, croûtons et sauce César',
    price: 11.00,
    category: 'salades',
    image: '🥗',
    popular: false,
  },
  {
    id: '4',
    name: 'Pâtes Carbonara',
    description: 'Spaghetti, guanciale, pecorino, œuf et poivre noir',
    price: 13.50,
    category: 'pates',
    image: '🍝',
    popular: true,
  },
  {
    id: '5',
    name: 'Bowl Saumon',
    description: 'Riz vinaigré, saumon frais, avocat, edamame, sauce soja',
    price: 15.90,
    category: 'bowls',
    image: '🍣',
    popular: false,
  },
  {
    id: '6',
    name: 'Tacos Poulet',
    description: 'Tortilla de blé, poulet épicé, guacamole, pico de gallo',
    price: 10.50,
    category: 'tacos',
    image: '🌮',
    popular: true,
  },
  {
    id: '7',
    name: 'Tiramisu Maison',
    description: 'Mascarpone, café espresso, cacao et biscuits imbibés',
    price: 7.50,
    category: 'desserts',
    image: '🍰',
    popular: true,
  },
  {
    id: '8',
    name: 'Limonade Artisanale',
    description: 'Citron pressé, menthe fraîche, eau pétillante',
    price: 4.50,
    category: 'boissons',
    image: '🍋',
    popular: false,
  },
  {
    id: '9',
    name: 'Steak Frites',
    description: 'Entrecôte grillée, frites maison, beurre persillé',
    price: 19.90,
    category: 'plats',
    image: '🥩',
    popular: true,
  },
  {
    id: '10',
    name: 'Smoothie Tropical',
    description: 'Mangue, ananas, fruit de la passion et lait de coco',
    price: 5.90,
    category: 'boissons',
    image: '🥤',
    popular: false,
  },
]

export const CATEGORIES: Category[] = [
  { id: 'all', label: 'Tout' },
  { id: 'burgers', label: 'Burgers' },
  { id: 'pizzas', label: 'Pizzas' },
  { id: 'pates', label: 'Pâtes' },
  { id: 'salades', label: 'Salades' },
  { id: 'bowls', label: 'Bowls' },
  { id: 'tacos', label: 'Tacos' },
  { id: 'plats', label: 'Plats' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'boissons', label: 'Boissons' },
]
