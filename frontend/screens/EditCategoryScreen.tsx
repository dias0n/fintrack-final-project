import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const EditCategoryScreen: React.FC = ({ route, navigation }) => {
  const { token } = useAuth();
  const { category } = route.params;
  const [name, setName] = useState(category.name);

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/categories/${category.id}/`,
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigation.goBack();
    } catch (error) {
      console.error('Ошибка при обновлении категории:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.mobileContainer}>
        <Text style={styles.title}>Редактировать категорию</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Название категории"
        />
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Сохранить</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F7FA',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  mobileContainer: {
    width: 360,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#5063BF',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#5063BF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#5063BF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EditCategoryScreen;
