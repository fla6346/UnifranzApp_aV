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

const { width, height } = Dimensions.get('window');

const Logo = () => (
  <View style={styles.logoWrapper}>
    <Image
      source={require('../assets/LOGO-FL.png')}
      style={styles.logo}
      onError={(error) => console.error('Error loading image', error)}
    />
  </View>
);

const Button = ({ title, onPress, isPrimary }) => (
  <TouchableOpacity style={isPrimary ? styles.buttonPrimary : styles.buttonSecondary} onPress={onPress}>
    {isPrimary ? (
      <LinearGradient
        colors={['#8E2DE2', '#4A00E0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.buttonGradient}
      >
        <Text style={styles.buttonTextPrimary} numberOfLines={1}>{title}</Text>
      </LinearGradient>
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
        source={{ uri: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=1000' }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['#ff5733', 'rgba(66, 39, 130, 0.92)']}
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
          <BlurView intensity={30} tint="dark" style={styles.buttonContainer}>
            <View style={styles.buttonContainer}>
              <Button title="Ingresa como invitado" onPress={() => navigation.navigate('Home')}  />
            </View>
          </BlurView>
        </Animated.View>
        
        <Animated.View 
          style={[
            styles.buttonContainerWrapper, 
            { transform : [{ translateY: slideAnim }] }
          ]}
        >
          { Platform.OS === 'ios' ? (
            <BlurView intensity={30} tint="dark" style={styles.buttonBlur}>
              <View style={styles.buttonContainer}>
                <Button title="Iniciar Sesión" onPress={() => navigation.navigate('Home')}  />
                <Button title="Registrarse" onPress={() => {}} />
              </View>
            </BlurView>
          ) : (
            <View style={styles.buttonContainer}>
              <Button title="Iniciar Sesión" onPress={() => navigation.navigate('Home')}  />
              <Button title="Registrarse" onPress={() => {}} />
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
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
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
    borderColor: '#fff',
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
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonTextSecondary: {
    color: '#fff',
  },
});

export default DetailsScreen;