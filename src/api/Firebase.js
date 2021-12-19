import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc } from 'firebase/firestore';

//Config
import firebaseConfig from '../../config/keys'

initializeApp(firebaseConfig)

const firestore = getFirestore();