import React from 'react';
import { ScrollView, Text, Image } from 'react-native';
import estilos from './estilos';
import recetasColombianas from './recetasColombianas';

export default function DetalleReceta({ route }) {
  const { id } = route.params;
  const receta = recetasColombianas.find(r => r.id === id);
  if (!receta) return null;

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
      <Text style={estilos.titulo}>{receta.nombre}</Text>
      <Image source={{ uri: receta.imagen }} style={estilos.imagenDetalle} />
      <Text style={estilos.tituloSeccion}>Ingredientes:</Text>
      {receta.ingredientes.map((ing, idx) => (
        <Text key={idx} style={estilos.ingrediente}>{ing}</Text>
      ))}
      <Text style={estilos.tituloSeccion}>Preparación:</Text>
      <Text style={estilos.instrucciones}>{receta.preparacion}</Text>
    </ScrollView>
  );
}
