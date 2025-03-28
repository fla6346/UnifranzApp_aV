import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen'; // Asegúrate de que la ruta sea correcta
import DetailsScreen from './screens/DetailsScreen'; // Asegúrate de que la ruta sea correcta
import SplashScreen from './screens/splash';
import RegisterU from './screens/RegisterU';
import Sliders from "./components/slide";
import UsuariosScreen from './screens/UsuariosScreen';
const Stack = createNativeStackNavigator();

const App = () => {
  const [isSplashComplete, setIsSplashComplete] = useState(false);
  
  if (!isSplashComplete) {
    return <SplashScreen onFinish={() => setIsSplashComplete(true)} />;
   
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Details">
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen} 
          options={{ 
            title: 'Ingreso',
            headerStyle: {
              backgroundColor: '#e9590c',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            title: 'Inicio',
            headerStyle: {
              backgroundColor: '#e9590c',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
        name="Register" 
          component={RegisterU} 
          options={{ 
            title: 'Registro',
            headerStyle: {
              backgroundColor: '#e9590c',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
        </Stack.Screen>
        <Stack.Screen
        name="Usuarios" 
          component={UsuariosScreen} 
          options={{ 
            title: 'Usuarios',
            headerStyle: {
              backgroundColor: '#e9590c',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
        </Stack.Screen>
         
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;