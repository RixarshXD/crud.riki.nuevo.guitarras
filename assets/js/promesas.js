import { collection, addDoc ,getDocs, deleteDoc ,doc, updateDoc} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { db } from "./firebase.js";


export const registrarGuitarra = async(guitarras)=>{
    console.log(guitarras)
    const docRef = await addDoc(collection(db,'guitarras'),guitarras);
}

export const obtenerGuitarras = async() => {
    const referencia = collection(db, 'guitarras');
    const querySnapshot = await getDocs(referencia);
    let guitarras = [];
    querySnapshot.forEach((doc) => {
        guitarras.push({...doc.data(), id: doc.id});
    });
    return guitarras;
}

export const actualizarGuitarra = async(guitarras,id)=>{
    const referencia = doc(db,'guitarras',id);
    await updateDoc(referencia,guitarras);
}

export const eliminarGuitarra = async(id)=>{
    const referencia = doc(db,'guitarras',id);
    await deleteDoc(referencia);
}