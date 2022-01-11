import firebase from 'firebase'
import 'firebase/firestore'

let conf = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID
}

if (process.env.VUE_APP_FIREBASE_API_KEY == undefined) {
  alert('WARNING!! No firebase config!')
}

export const fb = firebase.initializeApp(conf)
export const db = fb.database();

export const messagesRef = db.ref("messages")
