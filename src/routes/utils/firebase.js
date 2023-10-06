import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import {getFirestore, doc, getDoc , setDoc, collection, writeBatch, query, getDocs} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBmQZ61cpWMQq0pk956Ynv28TTMXnJ1uMg",
  authDomain: "sit313-stuff.firebaseapp.com",
  projectId: "sit313-stuff",
  storageBucket: "sit313-stuff.appspot.com",
  messagingSenderId: "852901023797",
  appId: "1:852901023797:web:dc4c26c3faf6c8bb4be17c",
  measurementId: "G-GWFFB47W9V"
};
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider(); 
   provider.setCustomParameters ({
    prompt:"select_account"
   });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const addCollectionAndDocument = async (collectionKey, objectsToAdd) =>{
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)
  objectsToAdd.forEach((object) =>{
    const docRef = doc(collectionRef, object.name.toLowerCase());
    batch.set(docRef, object)
  })
 await batch.commit()
 console.log('Transaction is successful!')
}

export const fetchStaffAndDocuments = async () =>{
  const collectionRef = collection(db, 'staff')
  const q = query(collectionRef)
  const querySnapshot = await getDocs(q);
   const staffMap = querySnapshot.docs.reduce((acc, docSnapshot) =>{
    const { name , ...items } = docSnapshot.data();
    acc[name.toLowerCase()] = items
    return acc;
   }, {})
   return staffMap;
}

export const createUserDocFromAuth= async (userAuth, additionalInformation ={}) =>{
  if (!userAuth) return;
  

  const userDocRef = doc (db, 'users', userAuth.uid );
 
  
  const userSnapshot = await getDoc(userDocRef);
 

  if (! userSnapshot.exists()){
    const {displayName , email} = userAuth;
    const createdAt = new Date();

  try {
    await setDoc(userDocRef, {
      displayName,
      email,
      createdAt,
      ...additionalInformation
    })
  }
  catch (error){
  console.log('error in creating ', error.message)
  }
}

  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) =>{
  if (!email || !password) return;
 return await createUserWithEmailAndPassword(auth, email, password)
}

export const signinAuthUserWithEmailAndPassword = async (email, password) =>{
  if (!email || !password) return;
 return await signInWithEmailAndPassword(auth, email, password)
}