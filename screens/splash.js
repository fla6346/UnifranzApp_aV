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

const HomeScreen = ({ navigation }) => {
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
          <BlurView intensity={30} tint="dark" style={styles.buttonBlurContainer}>
            <View style={styles.buttonContainer}>
              <Button title="Ingresa como invitado" onPress={() => navigation.navigate('Home')} isPrimary />
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
            <BlurView intensity={30} tint="dark" style={styles.buttonBlurContainer}>
              <View style={styles.buttonContainer}>
                <Button title="Iniciar Sesión" onPress={() => navigation.navigate('Details')} isPrimary />
                <Button title="Registrarse" onPress={() => {}} />
              </View>
            </BlurView>
          ) : (
            <View style={styles.buttonContainer}>
              <Button title="Iniciar Sesión" onPress={() => navigation.navigate('Home')} isPrimary />
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