import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const UsuariosScreen = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:3000/api/usuarios'; // Cambia a ngrok si pruebas en dispositivo físico

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get(API_URL);
        setUsuarios(response.data);
        setLoading(false);
      } catch (err) {
        setError('No se pudieron cargar los usuarios');
        setLoading(false);
        console.error(err);
      }
    };

    fetchUsuarios();
  }, []);

  // Renderizar cada usuario
  const renderUsuario = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.nombre}</Text>
    </View>
  );

  // Mostrar mientras carga
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e9590c" />
        <Text>Cargando usuarios...</Text>
      </View>
    );
  }

  // Mostrar error si ocurre
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // Mostrar la lista de usuarios
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuarios</Text>
      <FlatList
        data={usuarios}
        renderItem={renderUsuario}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text>No hay usuarios para mostrar</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 15,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  item: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemText: {
    fontSize: 18,
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});

export default UsuariosScreen;