# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


architecture du projet

src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx        ← Navigation responsive avec panier + auth
│   │   └── Footer.jsx        ← Pied de page avec infos restaurant
│   ├── ui/                   ← (prêt pour vos composants réutilisables)
│   └── common/               ← (prêt pour Loader, ErrorBoundary, etc.)
├── context/
│   ├── AuthContext.jsx        ← Gestion de l'authentification
│   └── CartContext.jsx        ← Gestion du panier (add, remove, update)
├── pages/
│   ├── Home.jsx              ← Vitrine : hero, plats populaires, avis, CTA
│   ├── Menu.jsx              ← Carte complète avec filtres par catégorie
│   ├── Reservation.jsx       ← Formulaire de réservation de table
│   ├── Order.jsx             ← Panier et validation de commande
│   ├── Login.jsx             ← Connexion (email + Google)
│   ├── Register.jsx          ← Inscription avec confirmation mot de passe
│   ├── Profile.jsx           ← Historique réservations + commandes
│   ├── About.jsx             ← Histoire et valeurs du restaurant
│   └── Contact.jsx           ← Coordonnées + formulaire de contact
├── services/
│   ├── firebase.js           ← Configuration Firebase
│   ├── authService.js        ← Inscription, connexion, déconnexion, Google
│   ├── reservationService.js ← CRUD réservations Firestore
│   ├── orderService.js       ← CRUD commandes Firestore
│   └── menuService.js        ← Données menu + catégories
├── hooks/                    ← (prêt pour vos hooks personnalisés)
├── utils/                    ← (prêt pour vos fonctions utilitaires)
├── App.jsx                   ← Routage principal
├── main.jsx                  ← Point d'entrée
└── index.css                 ← Tailwind + thème personnalisé


configuration de la Base de donne firebase

rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Les utilisateurs connectés peuvent lire/écrire leurs propres données
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Réservations : un utilisateur connecté peut créer, et lire/modifier les siennes
    match /reservations/{reservationId} {
      allow create: if request.auth != null;
      allow read, update: if request.auth != null && resource.data.userId == request.auth.uid;
    }
    
    // Commandes : même logique
    match /orders/{orderId} {
      allow create: if request.auth != null;
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
    }
    
    // Menu : lisible par tous
    match /menuItems/{itemId} {
      allow read: if true;
    }
  }
}


variable d'environnement

VITE_FIREBASE_API_KEY="AIzaSyC1JcWr5xKr2CXDtONUtUWMNI47PLOksHk"
VITE_FIREBASE_AUTH_DOMAIN="project-14a2a6b2-1d04-42-67119.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="project-14a2a6b2-1d04-42-67119"
VITE_FIREBASE_STORAGE_BUCKET="project-14a2a6b2-1d04-42-67119.firebasestorage.app"
VITE_FIREBASE_MESSAGING_SENDER_ID="688109906565"
VITE_FIREBASE_APP_ID="1:688109906565:web:46f7abad0bc960fdadd7ec"
VITE_FIREBASE_MEASUREMENT_ID="G-JWK9YB1KMG"

