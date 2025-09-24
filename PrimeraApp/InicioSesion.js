import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import estilos from './estilos';

export default function InicioSesion({ navigation }) {
  const manejarLogin = () => {
    navigation.replace('RecetasInternacionales');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF3E0', padding: 24 }}>
      <View style={{ alignItems: 'center', marginBottom: 40 }}>
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png' }} style={{ width: 100, height: 100, marginBottom: 16 }} />
        <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#FF9800', marginBottom: 8 }}>Bienvenido</Text>
        <Text style={{ fontSize: 18, color: '#333', textAlign: 'center' }}>¡Explora recetas internacionales y colombianas!</Text>
      </View>
      <TouchableOpacity onPress={manejarLogin} style={{ backgroundColor: '#FF9800', paddingVertical: 16, paddingHorizontal: 40, borderRadius: 30, elevation: 3 }}>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}
