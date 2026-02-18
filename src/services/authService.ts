import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  type User,
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db, isConfigured } from './firebase'
import type { UserProfile } from '../types'

const googleProvider = new GoogleAuthProvider()

function requireFirebase() {
  if (!isConfigured || !auth || !db) {
    throw new Error('Firebase n\'est pas configuré. Ajoutez vos clés dans le fichier .env')
  }
  return { auth, db }
}

export async function registerUser(
  email: string,
  password: string,
  displayName: string
): Promise<User> {
  const fb = requireFirebase()
  const userCredential = await createUserWithEmailAndPassword(fb.auth, email, password)
  await updateProfile(userCredential.user, { displayName })
  await setDoc(doc(fb.db, 'users', userCredential.user.uid), {
    displayName,
    email,
    phone: '',
    createdAt: new Date().toISOString(),
  })
  return userCredential.user
}

export async function loginUser(email: string, password: string): Promise<User> {
  const fb = requireFirebase()
  const userCredential = await signInWithEmailAndPassword(fb.auth, email, password)
  return userCredential.user
}

export async function loginWithGoogle(): Promise<User> {
  const fb = requireFirebase()
  const result = await signInWithPopup(fb.auth, googleProvider)
  const userDoc = await getDoc(doc(fb.db, 'users', result.user.uid))
  if (!userDoc.exists()) {
    await setDoc(doc(fb.db, 'users', result.user.uid), {
      displayName: result.user.displayName,
      email: result.user.email,
      phone: '',
      createdAt: new Date().toISOString(),
    })
  }
  return result.user
}

export async function logoutUser(): Promise<void> {
  const fb = requireFirebase()
  await signOut(fb.auth)
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const fb = requireFirebase()
  const userDoc = await getDoc(doc(fb.db, 'users', uid))
  return userDoc.exists() ? (userDoc.data() as UserProfile) : null
}
