import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/Feather';

const CategoriesScreen: React.FC = ({ navigation }) => {
  const { token } = useAuth();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/api/categories/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Категории с сервера:', response.data);
      setCategories(response.data);
    } catch (error) {
      console.error('Ошибка при получении категорий:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = (category) => {
    Alert.alert(
      'Удалить категорию',
      `Вы действительно хотите удалить категорию "${category.name}"?`,
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: async () => {
            console.log('Удаление категории:', category.id);
            try {
              await axios.delete(`http://localhost:8000/api/categories/${category.id}/`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              console.log('Удаление выполнено');
              fetchCategories();
            } catch (error) {
              console.error('Ошибка при удалении категории:', error);
            }
          },
        },
      ]
    );
  };  

  useFocusEffect(
    useCallback(() => {
      fetchCategories();
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => navigation.navigate('EditCategory', { category: item })}>
          <Icon name="edit" size={20} color="#5063BF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteCategory(item)}>
          <Icon name="trash" size={20} color="#FFBE9D" style={{ marginLeft: 12 }} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.mobileContainer}>
        <Text style={styles.title}>Категории</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#5063BF" />
        ) : (
          <FlatList
            data={categories}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.list}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Категории пока не добавлены</Text>
            }
          />
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddCategory')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Добавить категорию</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    paddingTop: 40,
  },
  mobileContainer: {
    width: 360,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#5063BF',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    paddingRight: 60,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    position: 'relative',
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  actions: {
    flexDirection: 'row',
    position: 'absolute',
    right: 16,
    top: 16,
  },
  button: {
    backgroundColor: '#5063BF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#5063BF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: '#797979',
    marginTop: 24,
    fontSize: 14,
  },
});

export default CategoriesScreen;
