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


// PHONES
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



// LAPTOPS
const laptopsCollection = collection(db, "laptops")

export async function getLaptops() {
    const snapshot = await getDocs(laptopsCollection)
    const laptop = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return laptop
}

export async function getLaptop(id) {
    const docRef = doc(db, "laptops", id)
    const snapshot = await getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}


// TABLETS
const tabletsCollection = collection(db, "tablets")

export async function getTablets() {
    const snapshot = await getDocs(tabletsCollection)
    const tablet = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return tablet
}

export async function getTablet(id) {
    const docRef = doc(db, "tablets", id)
    const snapshot = await getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}


// GADGETS
const gadgetsCollection = collection(db, "gadgets")

export async function getGadgets() {
    const snapshot = await getDocs(gadgetsCollection)
    const gadget = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return gadget
}

export async function getGadget(id) {
    const docRef = doc(db, "gadgets", id)
    const snapshot = await getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}