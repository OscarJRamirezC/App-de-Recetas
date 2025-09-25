import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import TarjetaReceta from './TarjetaReceta';
import estilos from './estilos';
import { guardarFavorito } from './helpersFirebase';

export default function RecetasInternacionales({ navigation }) {
  const [recetas, setRecetas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");

  const manejarBusqueda = () => {
    setCargando(true);
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${busqueda}`)
      .then(res => res.json())
      .then(data => {
        setRecetas(data.meals || []);
        setCargando(false);
      });
  };

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then(res => res.json())
      .then(data => {
        setRecetas(data.meals || []);
        setCargando(false);
      });
  }, []);

  if (cargando) return <ActivityIndicator style={{ marginTop: 40 }} size="large" color="#FF9800" />;
  return (
    <View style={{ flex: 1, backgroundColor: '#FFF3E0' }}>
      <View style={{ flexDirection: 'row', margin: 16, marginBottom: 0 }}>
        <TextInput
          value={busqueda}
          onChangeText={setBusqueda}
          placeholder="Buscar receta internacional..."
          style={{ flex: 1, backgroundColor: '#fff', borderRadius: 8, padding: 10, fontSize: 16, marginRight: 8, borderWidth: 1, borderColor: '#FF9800' }}
        />
        <TouchableOpacity onPress={manejarBusqueda} style={{ backgroundColor: '#FF9800', borderRadius: 8, padding: 10 }}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Buscar</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={recetas}
        keyExtractor={item => item.idMeal}
        contentContainerStyle={{ padding: 16 }}
        ListHeaderComponent={
          <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={estilos.titulo}>Recetas Internacionales</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => navigation.navigate('GestionRecetas')} style={{ backgroundColor: '#FF9800', borderRadius: 8, padding: 8, marginRight: 8 }}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>Gestionar Recetas</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('GestionRecetas2')} style={{ backgroundColor: '#FF9800', borderRadius: 8, padding: 8, marginRight: 10 }}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>Gestionar Recetas 2</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.replace('InicioSesion')} style={{ alignSelf: 'flex-end' }}>
                <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 16 }}>Cerrar sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View>
            <TarjetaReceta
              imagen={item.strMealThumb}
              nombre={item.strMeal}
              onPress={() => navigation.navigate('DetalleRecetaApi', { id: item.idMeal })}
            />
            <TouchableOpacity
              onPress={() => guardarFavorito('global', {
                idMeal: item.idMeal,
                strMeal: item.strMeal,
                strMealThumb: item.strMealThumb
              })}
              style={{ backgroundColor: '#FF9800', borderRadius: 8, padding: 8, marginVertical: 4, alignSelf: 'flex-end' }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Agregar a favoritos</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
