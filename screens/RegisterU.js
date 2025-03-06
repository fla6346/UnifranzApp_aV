import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, Text, Snackbar } from 'react-native-paper';

const initialFormState = {
  nombre: '',
  email: '',
  password: '',
};

const initialErrorState = {
  nombre: '',
  email: '',
  password: '',
};

export default function Register() {
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState(initialErrorState);
  const [visible, setVisible] = useState(false);

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Limpiar el error al cambiar el valor
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...initialErrorState };

    if (!form.nombre) {
      newErrors.nombre = 'El nombre es obligatorio';
      valid = false;
    }
    if (!form.email) {
      newErrors.email = 'El correo electrónico es obligatorio';
      valid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        newErrors.email = 'Por favor, ingresa un correo electrónico válido';
        valid = false;
      }
    }
    if (!form.password) {
      newErrors.password = 'La contraseña es obligatoria';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleRegister = () => {
    if (!validateForm()) {
      setVisible(true);
      return;
    }

    // Aquí puedes manejar el registro, por ejemplo, enviando los datos a una API
    console.log('Registro exitoso:', form);

    // Limpiar los campos después del registro
    setForm(initialFormState);
  };

  const onDismissSnackBar = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        label="Nombre"
        value={form.nombre}
        onChangeText={text => handleChange('nombre', text)}
        style={styles.input}
        error={!!errors.nombre}
      />
      {errors.nombre ? <Text style={styles.error}>{errors.nombre}</Text> : null}

      <TextInput
        label="Email"
        value={form.email}
        onChangeText={text => handleChange('email', text)}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        error={!!errors.email}
      />
      {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

      <TextInput
        label="Contraseña"
        value={form.password}
        onChangeText={text => handleChange('password', text)}
        style={styles.input}
        secureTextEntry
        error={!!errors.password}
      />
      {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}
      <TextInput
        label="Contraseña"
        value={form.password}
        onChangeText={text => handleChange('w', text)}
        style={styles.input}
        secureTextEntry
        error={!!errors.password}
      />
      {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}

      <Button style={styles.contained} mode="contained" onPress={handleRegister}>
        Registrarse
      </Button>

      <Snackbar visible={visible} onDismiss={onDismissSnackBar} duration={3000}>
        {Object.values(errors).filter(Boolean).join(', ')}
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
  error: {
    color: 'red',
    marginBottom: 8,
  },
  contained: {
    backgroundColor: '#E45916' },
}); 