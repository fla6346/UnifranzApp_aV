// screens/UsuariosScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

const UsuariosScreen = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:3000/api/users'); // Cambia localhost por la IP de tu máquina si es necesario
        setUsuarios(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuarios</Text>
      <FlatList
        data={usuarios}
        keyExtractor={item => item.id.toString()} // Asegúrate de que 'id' sea un campo único
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text>{item.nombre}</Text> {/* Cambia 'nombre' por el campo que desees mostrar */}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userItem: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 10,
    elevation: 1,
    width: '100%', // Asegúrate de que ocupe el ancho completo
  },
});

export default UsuariosScreen;