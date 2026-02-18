export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  popular: boolean
}

export interface CartItem extends MenuItem {
  quantity: number
}

export interface Category {
  id: string
  label: string
}

export interface ReservationData {
  name: string
  date: string
  time: string
  guests: string
  notes?: string
}

export interface Reservation extends ReservationData {
  id: string
  userId: string
  status: 'confirmed' | 'cancelled'
  createdAt: string
}

export interface OrderItem {
  name: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  total: number
  status: 'pending' | 'delivered' | 'cancelled'
  createdAt: string
}

export interface UserProfile {
  displayName: string
  email: string
  phone: string
  createdAt: string
}

export interface Testimonial {
  name: string
  text: string
  rating: number
}

export interface ValueItem {
  icon: React.ComponentType<{ className?: string; size?: number }>
  title: string
  text: string
}
