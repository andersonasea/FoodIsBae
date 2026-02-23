import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'
import { db, isConfigured } from './firebase'
import type { MenuItem, MenuItemFormData, Order, Reservation } from '../types'

function requireDb() {
  if (!isConfigured || !db) {
    throw new Error('Firebase n\'est pas configuré.')
  }
  return db
}

// ─── Menu CRUD ───

export async function addMenuItem(data: MenuItemFormData): Promise<MenuItem> {
  const firestore = requireDb()
  const docRef = await addDoc(collection(firestore, 'menuItems'), data)
  return { id: docRef.id, ...data }
}

export async function updateMenuItem(id: string, data: Partial<MenuItemFormData>): Promise<void> {
  const firestore = requireDb()
  await updateDoc(doc(firestore, 'menuItems', id), data)
}

export async function deleteMenuItem(id: string): Promise<void> {
  const firestore = requireDb()
  await deleteDoc(doc(firestore, 'menuItems', id))
}

export async function getFirebaseMenuItems(): Promise<MenuItem[]> {
  const firestore = requireDb()
  const snapshot = await getDocs(collection(firestore, 'menuItems'))
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as MenuItem))
}

// ─── Commandes (admin) ───

export async function getAllOrders(): Promise<Order[]> {
  const firestore = requireDb()
  const snapshot = await getDocs(collection(firestore, 'orders'))
  const orders = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Order))
  return orders.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export async function updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
  const firestore = requireDb()
  await updateDoc(doc(firestore, 'orders', orderId), { status })
}

// ─── Réservations (admin) ───

export async function getAllReservations(): Promise<Reservation[]> {
  const firestore = requireDb()
  const snapshot = await getDocs(collection(firestore, 'reservations'))
  const reservations = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Reservation))
  return reservations.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export async function updateReservationStatus(
  reservationId: string,
  status: Reservation['status']
): Promise<void> {
  const firestore = requireDb()
  await updateDoc(doc(firestore, 'reservations', reservationId), { status })
}

// ─── Stats ───

export async function getDashboardStats(): Promise<{
  totalOrders: number
  totalReservations: number
  totalMenuItems: number
  totalRevenue: number
  recentOrders: Order[]
  recentReservations: Reservation[]
}> {
  const [orders, reservations, menuItems] = await Promise.all([
    getAllOrders(),
    getAllReservations(),
    getFirebaseMenuItems(),
  ])

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0)

  return {
    totalOrders: orders.length,
    totalReservations: reservations.length,
    totalMenuItems: menuItems.length,
    totalRevenue,
    recentOrders: orders.slice(0, 5),
    recentReservations: reservations.slice(0, 5),
  }
}
