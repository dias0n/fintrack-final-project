import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../context/AuthContext';

const AddTransactionScreen: React.FC = ({ navigation }) => {
  const { token } = useAuth();

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/categories/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке категорий:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleAddTransaction = async () => {
    if (!amount || !description || !category || !type) return;

    try {
      await axios.post(
        'http://localhost:8000/api/transactions/',
        { amount, description, category, type },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigation.goBack();
    } catch (err) {
      console.error('Ошибка при добавлении транзакции:', err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mobileContainer}>
        <Text style={styles.title}>Новая транзакция</Text>

        <Text style={styles.label}>Категория</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={category}
            onValueChange={(value) => setCategory(value)}
            style={styles.picker}
          >
            <Picker.Item label="Выберите категорию..." value="" />
            {categories.map((cat) => (
              <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Описание</Text>
        <TextInput
          style={styles.input}
          placeholder="Описание"
          value={description}
          onChangeText={setDescription}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
        />

        <Text style={styles.label}>Сумма</Text>
        <TextInput
          style={styles.input}
          placeholder="Сумма"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
        />

        <View style={styles.typeButtons}>
          <TouchableOpacity
            style={[styles.typeButton, type === 'income' && styles.selectedType]}
            onPress={() => setType('income')}
          >
            <Text style={type === 'income' ? styles.selectedText : styles.normalText}>
              Доход
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, type === 'expense' && styles.selectedType]}
            onPress={() => setType('expense')}
          >
            <Text style={type === 'expense' ? styles.selectedText : styles.normalText}>
              Расход
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAddTransaction}>
          <Text style={styles.buttonText}>Сохранить</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Назад</Text>
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
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    color: '#374151',
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
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  picker: {
    paddingHorizontal: 10,
  },
  typeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#5063BF',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  selectedType: {
    backgroundColor: '#5063BF',
  },
  selectedText: {
    color: '#fff',
    fontWeight: '600',
  },
  normalText: {
    color: '#5063BF',
  },
  button: {
    backgroundColor: '#5063BF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  backButton: {
    backgroundColor: '#9CA3AF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default AddTransactionScreen;