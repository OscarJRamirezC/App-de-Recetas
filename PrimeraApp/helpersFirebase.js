// Eliminar receta por id
export const eliminarReceta = async (recetaId) => {
  await remove(ref(db, `recetas/${recetaId}`));
};
// helpersFirebase.js
import { db } from './firebaseConfig';
import { ref, push, remove, get, set } from 'firebase/database';

// Guardar favorito
export const guardarFavorito = async (userId, receta) => {
  // Puedes usar el userId si tienes auth, si no, usa 'global' o similar
  await push(ref(db, `favoritos/${userId}`), receta);
};

// Eliminar favorito (requiere el id del favorito en la base)
export const eliminarFavorito = async (userId, favoritoId) => {
  await remove(ref(db, `favoritos/${userId}/${favoritoId}`));
};

// Obtener favoritos
export const obtenerFavoritos = async (userId) => {
  const snapshot = await get(ref(db, `favoritos/${userId}`));
  if (snapshot.exists()) {
    const data = snapshot.val();
    // Devuelve un array de favoritos con su id
    return Object.entries(data).map(([id, receta]) => ({ id, ...receta }));
  }
  return [];
};

// Crear nueva receta
export const crearReceta = async (receta) => {
  await push(ref(db, 'recetas'), receta);
};

// Obtener todas las recetas creadas
export const obtenerRecetas = async () => {
  const snapshot = await get(ref(db, 'recetas'));
  if (snapshot.exists()) {
    const data = snapshot.val();
    return Object.entries(data).map(([id, receta]) => ({ id, ...receta }));
  }
  return [];
};
