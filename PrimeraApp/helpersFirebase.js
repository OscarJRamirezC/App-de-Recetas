
import { db, db2 } from './firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, push, remove, get, set } from 'firebase/database';

export const guardarFavorito = async (userId, receta) => {
  await push(ref(db, `favoritos/${userId}`), receta);
};

export const eliminarFavorito = async (userId, favoritoId) => {
  await remove(ref(db, `favoritos/${userId}/${favoritoId}`));
};

export const obtenerFavoritos = async (userId) => {
  const snapshot = await get(ref(db, `favoritos/${userId}`));
  if (snapshot.exists()) {
    const data = snapshot.val();
    return Object.entries(data).map(([id, receta]) => ({ id, ...receta }));
  }
  return [];
};

export const crearReceta = async (receta) => {
  await push(ref(db, 'recetas'), receta);
};

export const obtenerRecetas = async () => {
  const snapshot = await get(ref(db, 'recetas'));
  if (snapshot.exists()) {
    const data = snapshot.val();
    return Object.entries(data).map(([id, receta]) => ({ id, ...receta }));
  }
  return [];
};
export const eliminarReceta = async (recetaId) => {
  await remove(ref(db, `recetas/${recetaId}`));
};


export const crearReceta2 = async (receta) => {
  await addDoc(collection(db2, 'recetas'), receta);
};

export const obtenerRecetas2 = async () => {
  const querySnapshot = await getDocs(collection(db2, 'recetas'));
  const recetas = [];
  querySnapshot.forEach((docSnap) => {
    recetas.push({ id: docSnap.id, ...docSnap.data() });
  });
  return recetas;
};

export const eliminarReceta2 = async (recetaId) => {
  await deleteDoc(doc(db2, 'recetas', recetaId));
};

