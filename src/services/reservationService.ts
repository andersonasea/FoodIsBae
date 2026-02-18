import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from 'firebase/firestore'
import { db, isConfigured } from './firebase'
import type { Reservation, ReservationData } from '../types'

const COLLECTION = 'reservations'

function requireDb() {
  if (!isConfigured || !db) {
    throw new Error('Firebase n\'est pas configuré.')
  }
  return db
}

export async function createReservation(
  userId: string,
  reservationData: ReservationData
): Promise<Reservation> {
  const firestore = requireDb()
  const reservation = {
    userId,
    ...reservationData,
    status: 'confirmed' as const,
    createdAt: new Date().toISOString(),
  }
  const docRef = await addDoc(collection(firestore, COLLECTION), reservation)
  return { id: docRef.id, ...reservation }
}

export async function getUserReservations(userId: string): Promise<Reservation[]> {
  const firestore = requireDb()
  const q = query(
    collection(firestore, COLLECTION),
    where('userId', '==', userId)
  )
  const snapshot = await getDocs(q)
  const reservations = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Reservation))
  return reservations.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export async function cancelReservation(reservationId: string): Promise<void> {
  const firestore = requireDb()
  await updateDoc(doc(firestore, COLLECTION, reservationId), {
    status: 'cancelled',
  })
}
