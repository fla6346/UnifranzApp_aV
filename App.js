import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen'; // Asegúrate de que la ruta sea correcta
import DetailsScreen from './screens/DetailsScreen'; // Asegúrate de que la ruta sea correcta
import SplashScreen from './screens/splash';
import Sliders from "./components/slide";
const Stack = createNativeStackNavigator();

const App = () => {
  const [isSplashComplete, setIsSplashComplete] = useState(false);

  if (!isSplashComplete) {
    return <SplashScreen onFinish={() => setIsSplashComplete(true)} />;
   
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen} 
          options={{ 
            title: 'Detalles',
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
         
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;