import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, Text, Snackbar } from 'react-native-paper';

export default function Register() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);

  const handleRegister = () => {
    // Validación simple
    if (!nombre || !email || !password) {
      setError('Todos los campos son obligatorios');
      setVisible(true);
      return;
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, ingresa un correo electrónico válido');
      setVisible(true);
      return;
    }

    // Aquí puedes manejar el registro, por ejemplo, enviando los datos a una API
    console.log('Nombre:', nombre);
    console.log('Email:', email);
    console.log('Contraseña:', password);

    // Limpiar los campos después del registro
    setNombre('');
    setEmail('');
    setPassword('');
  };

  const onDismissSnackBar = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        label="Nombre"
        value={nombre}
        onChangeText={text => setNombre(text)}
        style={styles.input}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        label="Contraseña"
        value={password}
        onChangeText={text => setPassword(text)}
        style={styles.input}
        secureTextEntry
      />
      <Button mode="contained" onPress={handleRegister} style={styles.button}>
        Registrarse
      </Button>

      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={3000}
      >
        {error}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});