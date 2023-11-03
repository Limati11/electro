import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    doc,
    getDocs,
    getDoc,
    query,
    where,
    documentId
} from "firebase/firestore/lite";

const firebaseConfig = {
    apiKey: "AIzaSyBB5SQfK1UEzSfGYATxaIk3M_s1QPJQOrc",
    authDomain: "electro-8d68c.firebaseapp.com",
    projectId: "electro-8d68c",
    storageBucket: "electro-8d68c.appspot.com",
    messagingSenderId: "813772956803",
    appId: "1:813772956803:web:db42855b1ba0af43c7e7b6"
  };

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const phonesCollection = collection(db, "phones")

export async function getPhones() {
    const snapshot = await getDocs(phonesCollection)
    const phone = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return phone
}

export async function getPhone(id) {
    const docRef = doc(db, "phones", id)
    const snapshot = await getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}
