import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Image } from 'react-native';
import estilos from './estilos';

export default function DetalleRecetaApi({ route }) {
  const { id } = route.params;
  const [receta, setReceta] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => res.json())
      .then(data => {
        setReceta(data.meals ? data.meals[0] : null);
        setCargando(false);
      });
  }, [id]);

  if (cargando) return null;
  if (!receta) return null;

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
      <Text style={estilos.titulo}>{receta.strMeal}</Text>
      <Image source={{ uri: receta.strMealThumb }} style={estilos.imagenDetalle} />
      <Text style={estilos.tituloSeccion}>Categoría: {receta.strCategory}</Text>
      <Text style={estilos.tituloSeccion}>Área: {receta.strArea}</Text>
      <Text style={estilos.tituloSeccion}>Ingredientes:</Text>
      {Array.from({ length: 20 }, (_, i) => i + 1)
        .map(i => receta[`strIngredient${i}`] && receta[`strIngredient${i}`].trim() ? (
          <Text key={i} style={estilos.ingrediente}>{receta[`strIngredient${i}`]} {receta[`strMeasure${i}`]}</Text>
        ) : null)
      }
      <Text style={estilos.tituloSeccion}>Preparación:</Text>
      <Text style={estilos.instrucciones}>{receta.strInstructions}</Text>
    </ScrollView>
  );
}
