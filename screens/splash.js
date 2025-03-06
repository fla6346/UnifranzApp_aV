import React, { useEffect, useRef } from 'react';
import { Animated, View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ onFinish }) {
  // Referencias para las animaciones
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const translateYAnim = useRef(new Animated.Value(height / 4)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(1500),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onFinish) {
        onFinish();
      }
    });
  }, []);

  return (
    <View
      style={[styles.container,{backgroundColor:'#E35916'}]}
    >
      <StatusBar hidden />
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              { translateY: translateYAnim }
            ],
          },
        ]}
      >
        <View style={styles.logo}>
          <Image
            source={require('../assets/logo.jpg')}
            style={styles.logoImage}
            onError={(error) => console.error('Error loading image', error)}
          />
          <Text style={styles.logoText}>MI APP</Text>
        </View>
        <Animated.Text
          style={[
            styles.tagline,
            {
              opacity: Animated.multiply(fadeAnim, fadeAnim),
            },
          ]}
        >
          Bienvenido a la experiencia
        </Animated.Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 220,
    height: 220,
    backgroundColor: 'white', // Fondo blanco para el logo
    borderRadius:10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  logoImage: {
    width: 130,
    height: 130,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tagline: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
    marginTop: 10,
  },
  fondo:{
    backgroundColor: '#E35916',
  }
});