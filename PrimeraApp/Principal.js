import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import estilos from './estilos';

export default function Principal({ navigation }) {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={estilos.titulo}>Recetas Favoritas</Text>
      <TouchableOpacity style={estilos.tarjetaCategoria} onPress={() => navigation.navigate('Favoritos') }>
        <Image source={{ uri: 'https://www.themealdb.com/images/icons/flags/big/64/co.png' }} style={estilos.imagenCategoria} />
        <Text style={estilos.nombreCategoria}>Colombianas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={estilos.tarjetaCategoria} onPress={() => navigation.navigate('RecetasInternacionales') }>
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/197/197374.png' }} style={estilos.imagenCategoria} />
        <Text style={estilos.nombreCategoria}>Internacionales</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: '#FF9800',
          padding: 15,
          borderRadius: 8,
          marginBottom: 20,
        }}
        onPress={() => navigation.navigate('GestionRecetas')}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Gestionar Recetas</Text>
      </TouchableOpacity>
    </View>
  );
}
