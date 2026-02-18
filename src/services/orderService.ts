import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore'
import { db, isConfigured } from './firebase'
import type { Order, CartItem } from '../types'

const COLLECTION = 'orders'

function requireDb() {
  if (!isConfigured || !db) {
    throw new Error('Firebase n\'est pas configuré.')
  }
  return db
}

export async function createOrder(
  userId: string,
  items: CartItem[],
  total: number
): Promise<Order> {
  const firestore = requireDb()
  const order = {
    userId,
    items: items.map(({ name, quantity, price }) => ({ name, quantity, price })),
    total,
    status: 'pending' as const,
    createdAt: new Date().toISOString(),
  }
  const docRef = await addDoc(collection(firestore, COLLECTION), order)
  return { id: docRef.id, ...order }
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  const firestore = requireDb()
  const q = query(
    collection(firestore, COLLECTION),
    where('userId', '==', userId)
  )
  const snapshot = await getDocs(q)
  const orders = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Order))
  return orders.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}
