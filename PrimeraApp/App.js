import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text } from 'react-native';
import InicioSesion from './InicioSesion';
import RecetasInternacionales from './RecetasInternacionales';
import Favoritos from './favoritos';
import DetalleReceta from './DetalleReceta';
import DetalleRecetaApi from './DetalleRecetaApi';
import GestionRecetas from './GestionRecetas';
import GestionRecetas2 from './GestionRecetas2';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="InicioSesion">
        <Stack.Screen name="InicioSesion" component={InicioSesion} options={{ headerShown: false }} />
        <Stack.Screen 
          name="RecetasInternacionales" 
          component={RecetasInternacionales} 
          options={({ navigation }) => ({
            title: 'Recetas Internacionales',
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Favoritos')} style={{ marginRight: 16 }}>
                <Text style={{ fontSize: 18, color: '#FF9800', fontWeight: 'bold' }}>Favoritos</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="Favoritos" component={Favoritos} options={{ title: 'Favoritos' }} />
        <Stack.Screen name="DetalleReceta" component={DetalleReceta} options={{ title: 'Detalle Colombiana' }} />
        <Stack.Screen name="DetalleRecetaApi" component={DetalleRecetaApi} options={{ title: 'Detalle Internacional' }} />
        <Stack.Screen name="GestionRecetas" component={GestionRecetas} options={{ title: 'Gestionar Recetas' }} />
        <Stack.Screen name="GestionRecetas2" component={GestionRecetas2} options={{ title: 'Gestionar Recetas 2' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
