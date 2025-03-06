import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  Dimensions, 
  Animated,
  ImageBackground,
  Platform
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { transform } from '@babel/core';

const { width, height } = Dimensions.get('window');

const Logo = () => (
  <View style={styles.logoWrapper}>
    <Image
      source={require('../assets/logo.jpg')}
      style={styles.logo}
      onError={(error) => console.error('Error loading image', error)}
    />
  </View>
);

const Button = ({ title, onPress, isPrimary }) => (
  <TouchableOpacity style={isPrimary ? styles.buttonPrimary : styles.buttonSecondary} onPress={onPress}>
    {isPrimary ? (
      <View
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.buttonGradient}
      >
        <Text style={styles.buttonTextPrimary} numberOfLines={1}>{title}</Text>
      </View>
    ) : (
      <Text style={styles.buttonTextSecondary} numberOfLines={1}>{title}</Text>
    )}
  </TouchableOpacity>
);

const DetailsScreen = ({ navigation }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(100));
  const [scaleAnim] = useState(new Animated.Value(0.9));
  
  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          useNativeDriver: true,
        })
      ]),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        />

        <Animated.View 
          style={[
            styles.logoContainer, 
            { 
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <Logo />
          <Text style={styles.title}>Mi Aplicación</Text>
          <Text style={styles.subtitle}>Bienvenido a la experiencia definitiva</Text>
        </Animated.View>
        
        <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
          <BlurView intensity={30} tint="dark" style={styles.buttonBlur}>
            <View style={styles.buttonContainer}>
              <Button title="Ingresa como invitado" onPress={() => navigation.navigate('Home')} isPrimary={true} /> {/* Cambiado a isPrimary={true} */}
            </View>
          </BlurView>
        </Animated.View>
        
        <Animated.View style={[styles.buttonContainerWrapper, 
            { transform : [{ translateY: slideAnim }] }
          ]}
        >
          { Platform.OS === 'ios' ? (
            <BlurView intensity={30} tint="dark" style={styles.buttonBlur}>
              <View style={styles.buttonContainer}>
                <Button title="Iniciar Sesión" onPress={() => navigation.navigate('')}  />
                <Button title="Registrarse" onPress={() => navigation.navigate('Register')} />
              </View>
            </BlurView>
          ) : (
            <View style={styles.buttonContainer}>
              <Button title="Iniciar Sesión" onPress={() => navigation.navigate('')}  />
              <Button title="Registrarse" onPress={() => navigation.navigate('Register')}  />
            </View>
          )}
        </Animated.View>
      
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left : 0,
    right: 0,
    bottom: 0,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoWrapper: {
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: 'black',
  },
  buttonContainerWrapper: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  buttonBlurContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  buttonPrimary: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  buttonSecondary: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
  },
  buttonGradient: {
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextPrimary: {
    color: 'black',
    fontWeight: 'bold',
  },
  buttonTextSecondary: {
    color: 'black',
  },
});

export default DetailsScreen;