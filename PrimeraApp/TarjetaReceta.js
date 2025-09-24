import React from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import estilos from './estilos';

export default function TarjetaReceta({ imagen, nombre, onPress }) {
  return (
    <TouchableOpacity style={estilos.tarjetaRecetaModerna} onPress={onPress}>
      <Image source={{ uri: imagen }} style={estilos.imagenRecetaModerna} />
      <View style={{ flex: 1 }}>
        <Text style={estilos.nombreRecetaModerna}>{nombre}</Text>
      </View>
    </TouchableOpacity>
  );
}
