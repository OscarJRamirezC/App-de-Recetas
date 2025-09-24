import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import estilos from './estilos';
import { crearReceta, obtenerRecetas, eliminarReceta } from './helpersFirebase';

export default function GestionRecetas() {
  const [nombre, setNombre] = useState("");
  const [ingredientes, setIngredientes] = useState("");
  const [pasos, setPasos] = useState("");
  const [recetas, setRecetas] = useState([]);

  useEffect(() => {
    cargarRecetas();
  }, []);

  const cargarRecetas = async () => {
    const data = await obtenerRecetas();
    setRecetas(data);
  };

  const handleCrear = async () => {
    if (!nombre || !ingredientes || !pasos) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }
    await crearReceta({ nombre, ingredientes, pasos });
    setNombre("");
    setIngredientes("");
    setPasos("");
    cargarRecetas();
    Alert.alert('Éxito', 'Receta creada');
  };

  const handleEliminar = async (id) => {
    await eliminarReceta(id);
    cargarRecetas();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF3E0', padding: 16 }}>
      <Text style={estilos.titulo}>Agregar Nueva Receta</Text>
      <TextInput
        value={nombre}
        onChangeText={setNombre}
        placeholder="Nombre de la receta"
        style={{ backgroundColor: '#fff', borderRadius: 8, padding: 10, fontSize: 16, marginBottom: 8, borderWidth: 1, borderColor: '#FF9800' }}
      />
      <TextInput
        value={ingredientes}
        onChangeText={setIngredientes}
        placeholder="Ingredientes"
        multiline
        numberOfLines={2}
        style={{ backgroundColor: '#fff', borderRadius: 8, padding: 10, fontSize: 16, marginBottom: 8, borderWidth: 1, borderColor: '#FF9800', minHeight: 40 }}
      />
      <TextInput
        value={pasos}
        onChangeText={setPasos}
        placeholder="Pasos de la receta"
        multiline
        numberOfLines={4}
        style={{ backgroundColor: '#fff', borderRadius: 8, padding: 10, fontSize: 16, marginBottom: 8, borderWidth: 1, borderColor: '#FF9800', minHeight: 60 }}
      />
      <TouchableOpacity onPress={handleCrear} style={{ backgroundColor: '#FF9800', borderRadius: 8, padding: 12, marginBottom: 16 }}>
        <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Crear receta</Text>
      </TouchableOpacity>
      <Text style={estilos.titulo}>Recetas Creadas</Text>
      <FlatList
        data={recetas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: '#fff', borderRadius: 10, marginBottom: 10, padding: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.nombre}</Text>
            <Text style={{ color: '#555', marginBottom: 4 }}><Text style={{ fontWeight: 'bold' }}>Ingredientes:</Text> {item.ingredientes}</Text>
            <Text style={{ color: '#888', marginBottom: 6 }}>{item.pasos}</Text>
            <TouchableOpacity onPress={() => handleEliminar(item.id)} style={{ backgroundColor: 'red', borderRadius: 8, padding: 8, alignSelf: 'flex-end' }}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
