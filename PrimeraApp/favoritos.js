import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import TarjetaReceta from './TarjetaReceta';
import estilos from './estilos';
import { obtenerFavoritos, eliminarFavorito } from './helpersFirebase';

export default function Favoritos({ navigation }) {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const cargarFavoritos = async () => {
      const favs = await obtenerFavoritos('global');
      setFavoritos(favs);
    };
    cargarFavoritos();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF3E0' }}>
      <FlatList
        data={favoritos}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        ListHeaderComponent={<Text style={estilos.titulo}>Favoritos</Text>}
        renderItem={({ item }) => (
          <View>
            <TarjetaReceta
              imagen={item.strMealThumb}
              nombre={item.strMeal}
              onPress={() => navigation.navigate('DetalleRecetaApi', { id: item.idMeal })}
            />
            <TouchableOpacity
              onPress={async () => {
                await eliminarFavorito('global', item.id);
                const favs = await obtenerFavoritos('global');
                setFavoritos(favs);
              }}
              style={{ backgroundColor: 'red', borderRadius: 8, padding: 8, marginVertical: 4, alignSelf: 'flex-end' }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Eliminar de favoritos</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
