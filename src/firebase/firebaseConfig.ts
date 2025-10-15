import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth,GoogleAuthProvider,GithubAuthProvider} from 'firebase/auth';
import {getStorage} from 'firebase/storage';
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
console.log(import.meta.env.VITE_FIREBASE_APP_ID)
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();
// // const githubProvider = new GithubAuthProvider();
// githubProvider.addScope('repo');        
// githubProvider.addScope('read:org');     
// githubProvider.addScope('user');         
// githubProvider.addScope('read:user');  
// githubProvider.addScope('read:project'); 
// githubProvider.addScope('admin:repo_hook');
// githubProvider.setCustomParameters({
//   prompt: "consent" 
// });


export {db, auth, storage, googleProvider};