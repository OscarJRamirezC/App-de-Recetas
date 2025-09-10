function RecipeCard({ image, name, onPress }) {
  return (
    <TouchableOpacity style={styles.recipeCardModern} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.recipeImageModern} />
      <View style={{ flex: 1 }}>
        <Text style={styles.recipeNameModern}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}
// Pantalla de inicio de sesión
function LoginScreen({ navigation }) {
  const handleLogin = () => {
    navigation.replace('RecetasInternacionales');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF3E0', padding: 24 }}>
      <View style={{ alignItems: 'center', marginBottom: 40 }}>
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png' }} style={{ width: 100, height: 100, marginBottom: 16 }} />
        <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#FF9800', marginBottom: 8 }}>Bienvenido</Text>
        <Text style={{ fontSize: 18, color: '#333', textAlign: 'center' }}>¡Explora recetas internacionales y colombianas!</Text>
      </View>
      <TouchableOpacity onPress={handleLogin} style={{ backgroundColor: '#FF9800', paddingVertical: 16, paddingHorizontal: 40, borderRadius: 30, elevation: 3 }}>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}
import * as React from 'react';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, ScrollView, TextInput, Alert } from 'react-native';

const Stack = createNativeStackNavigator();

// Pantalla Principal
function InternationalRecipesScreen({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then(res => res.json())
      .then(data => {
        setRecipes(data.meals || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} size="large" color="#FF9800" />;
  return (
    <View style={{ flex: 1, backgroundColor: '#FFF3E0' }}>
      <FlatList
        data={recipes}
        keyExtractor={item => item.idMeal}
        contentContainerStyle={{ padding: 16 }}
        ListHeaderComponent={
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.title}>Recetas Internacionales</Text>
            <TouchableOpacity onPress={() => navigation.replace('Login')} style={{ alignSelf: 'flex-end', marginBottom: 10 }}>
              <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 16 }}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => (
          <RecipeCard
            image={item.strMealThumb}
            name={item.strMeal}
            onPress={() => navigation.navigate('DetalleRecetaApi', { id: item.idMeal })}
          />
        )}
      />
    </View>
  );
}

// Pantalla de detalle de receta
function RecipeDetailApiScreen({ route }) {
  const { id } = route.params;
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => res.json())
      .then(data => {
        setRecipe(data.meals[0]);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} size="large" color="#FF9800" />;
  if (!recipe) return <Text style={{ margin: 20 }}>No se encontró la receta.</Text>;

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.title}>{recipe.strMeal}</Text>
      <Image source={{ uri: recipe.strMealThumb }} style={styles.detailImage} />
      <Text style={styles.sectionTitle}>Categoría: {recipe.strCategory}</Text>
      <Text style={styles.sectionTitle}>Área: {recipe.strArea}</Text>
      <Text style={styles.sectionTitle}>Ingredientes:</Text>
      {Array.from({ length: 20 }, (_, i) => i + 1)
        .map(i => recipe[`strIngredient${i}`] && recipe[`strIngredient${i}`].trim() ? (
          <Text key={i} style={styles.ingredient}>{recipe[`strIngredient${i}`]} {recipe[`strMeasure${i}`]}</Text>
        ) : null)
      }
      <Text style={styles.sectionTitle}>Preparación:</Text>
      <Text style={styles.instructions}>{recipe.strInstructions}</Text>
    </ScrollView>
  );
}
// Pantalla de categorías
const colombianRecipes = [
  {
    id: '1',
    nombre: 'Bandeja Paisa',
    imagen: 'https://cdn.colombia.com/gastronomia/2011/08/02/bandeja-paisa-1616-1.gif',
    ingredientes: [
      'Frijoles', 'Arroz', 'Carne molida', 'Chicharrón', 'Huevo', 'Plátano maduro', 'Arepa', 'Aguacate'
    ],
  preparacion: 'Remoja los frijoles desde la noche anterior. Cocínalos con cebolla, tomate y especias. Cocina el arroz aparte. Fríe la carne molida con ajo y cebolla. Fríe el chicharrón hasta que esté crocante. Fríe el plátano maduro y el huevo. Sirve todo en una bandeja junto con arepa y aguacate.'
  },
  {
    id: '2',
    nombre: 'Ajiaco',
    imagen: 'https://www.recetasnestle.com.co/sites/default/files/srh_recipes/f78cf6630b31638994b09b3b470b085c.jpg',
    ingredientes: [
      'Pollo', 'Papa criolla', 'Papa sabanera', 'Papa pastusa', 'Mazorca', 'Guascas', 'Alcaparras', 'Crema de leche'
    ],
  preparacion: 'Cocina el pollo en agua con cebolla y ajo. Agrega las papas criolla, sabanera y pastusa cortadas en trozos, junto con la mazorca. Cuando las papas estén blandas, añade guascas y cocina unos minutos más. Sirve el ajiaco con alcaparras, crema de leche y aguacate.'
  },
  {
    id: '3',
    nombre: 'Arepas',
    imagen: 'https://imag.bonviveur.com/arepas-colombianas-con-queso-partidas.jpg',
    ingredientes: [
      'Harina de maíz', 'Agua', 'Sal', 'Queso (opcional)'
    ],
  preparacion: 'Mezcla la harina de maíz con agua tibia y sal hasta formar una masa suave. Haz bolas y aplánalas para formar las arepas. Cocínalas en una plancha caliente hasta que estén doradas por ambos lados. Puedes rellenarlas con queso antes de cocinarlas.'
  },
  {
    id: '4',
    nombre: 'Sancocho',
    imagen: 'https://imag.bonviveur.com/sancocho-colombiano.jpg',
    ingredientes: [
      'Carne de res', 'Pollo', 'Yuca', 'Plátano', 'Papa', 'Mazorca', 'Cilantro'
    ],
  preparacion: 'En una olla grande, cocina la carne de res y el pollo con agua, cebolla, ajo y sal. Agrega yuca, plátano, papa y mazorca cortados en trozos. Cocina hasta que todo esté blando y el caldo tenga buen sabor. Sirve el sancocho caliente con arroz y aguacate.'
  },
  {
    id: '5',
    nombre: 'Empanadas',
    imagen: 'https://cdn.aarp.net/content/dam/aarp/food/recipes/2018/05/1140-colombian-empanadas-esp.jpg',
    ingredientes: [
      'Harina de maíz', 'Carne', 'Papa', 'Cebolla', 'Ajo', 'Comino', 'Aceite para freír'
    ],
  preparacion: 'Cocina la papa y la carne con cebolla, ajo y especias. Haz una masa con harina de maíz y agua. Forma discos, rellénalos con el guiso de carne y papa, ciérralos y fríelos en abundante aceite caliente hasta que estén dorados y crocantes.'
  }
];

function CategoriesScreen({ navigation }) {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={styles.title}>Recetas Favoritas</Text>
      <TouchableOpacity style={styles.categoryCard} onPress={() => navigation.navigate('RecetasFavoritas') }>
        <Image source={{ uri: 'https://www.themealdb.com/images/icons/flags/big/64/co.png' }} style={styles.categoryImage} />
        <Text style={styles.categoryName}>Colombianas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.categoryCard} onPress={() => navigation.navigate('RecetasInternacionales') }>
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/197/197374.png' }} style={styles.categoryImage} />
        <Text style={styles.categoryName}>Internacionales</Text>
      </TouchableOpacity>
    </View>
  );
}

// Pantalla de recetas por categoría
function RecipesScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFF3E0' }}>
      <FlatList
        data={colombianRecipes}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        ListHeaderComponent={<Text style={styles.title}>Recetas típicas colombianas</Text>}
        renderItem={({ item }) => (
          <RecipeCard
            image={item.imagen}
            name={item.nombre}
            onPress={() => navigation.navigate('DetalleReceta', { id: item.id })}
          />
        )}
      />
    </View>
  );
}

// Pantalla de detalle de receta
function RecipeDetailScreen({ route }) {
  const { id } = route.params;
  const receta = colombianRecipes.find(r => r.id === id);
  if (!receta) return <Text style={{ margin: 20 }}>No se encontró la receta.</Text>;

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.title}>{receta.nombre}</Text>
      <Image source={{ uri: receta.imagen }} style={styles.detailImage} />
      <Text style={styles.sectionTitle}>Ingredientes:</Text>
      {receta.ingredientes.map((ing, idx) => (
        <Text key={idx} style={styles.ingredient}>{ing}</Text>
      ))}
      <Text style={styles.sectionTitle}>Preparación:</Text>
      <Text style={styles.instructions}>{receta.preparacion}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  recipeCardModern: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    padding: 12,
    elevation: 4,
    shadowColor: '#FF9800',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  recipeImageModern: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginRight: 18,
    borderWidth: 2,
    borderColor: '#FF9800',
  },
  recipeNameModern: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 18,
    textAlign: 'center',
    color: '#FF9800',
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 12,
    padding: 10,
    elevation: 2,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  recipeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 12,
    padding: 10,
    elevation: 2,
  },
  recipeImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 16,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  detailImage: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 6,
    color: '#FF9800',
  },
  ingredient: {
    fontSize: 16,
    color: '#444',
    marginLeft: 8,
    marginBottom: 2,
  },
  instructions: {
    fontSize: 15,
    color: '#222',
    marginTop: 8,
    marginBottom: 20,
    lineHeight: 22,
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen 
          name="RecetasInternacionales" 
          component={InternationalRecipesScreen} 
          options={({ navigation }) => ({
            title: 'Recetas Internacionales',
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('RecetasFavoritas')} style={{ marginRight: 16 }}>
                <Text style={{ fontSize: 18, color: '#FF9800', fontWeight: 'bold' }}>Favoritos</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="RecetasFavoritas" component={RecipesScreen} options={{ title: 'Recetas Colombianas' }} />
        <Stack.Screen name="DetalleReceta" component={RecipeDetailScreen} options={{ title: 'Detalle Colombiana' }} />
        <Stack.Screen name="DetalleRecetaApi" component={RecipeDetailApiScreen} options={{ title: 'Detalle Internacional' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

