import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AddCategoryScreen: React.FC = ({ navigation }) => {
  const { token } = useAuth();
  const [name, setName] = useState('');

  const handleAddCategory = async () => {
    try {
      if (!token) {
        console.error('Нет токена, пользователь не авторизован');
        return;
      }

      await axios.post(
        'http://localhost:8000/api/categories/',
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigation.goBack();
    } catch (error) {
      console.error('Ошибка при добавлении категории:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mobileContainer}>
        <Text style={styles.title}>Добавить категорию</Text>

        <TextInput
          style={styles.input}
          placeholder="Название категории"
          value={name}
          onChangeText={setName}
          onSubmitEditing={() => {
            handleAddCategory();
            Keyboard.dismiss();
          }}
          returnKeyType="done"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleAddCategory}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Сохранить</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mobileContainer: {
    width: 360,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#5063BF',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    color: '#111827',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
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
    fontSize: 14,
    fontWeight: '600',
  },
});

export default AddCategoryScreen;
