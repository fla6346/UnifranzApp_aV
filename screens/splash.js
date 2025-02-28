import React, { useEffect, useRef } from 'react';
import { Animated, View, Text, StyleSheet, Dimensions, Image, ImageBackground } from 'react-native';
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
    <LinearGradient
      colors={['#ff5733', '#422780']} 
      style={styles.container}
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
          <Text style={styles.logoText}>MI APP</Text>
          <Image
            source={require('../assets/LOGO-FL.png')}
            style={styles.logo}
            onError={(error) => console.error('Error loading image', error)}
          />
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
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF5733',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  tagline: {
    fontSize: 18,
    color: 'white',
    fontWeight: '500',
    marginTop: 10,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});