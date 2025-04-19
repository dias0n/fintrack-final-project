import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

const TransactionsScreen: React.FC = ({ navigation }) => {
  const { token } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/api/transactions/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions(response.data);
    } catch (error) {
      console.error('Ошибка при получении транзакций:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTransactions();
    }, [])
  );

  const renderItem = ({ item }) => {
    const amountStyle = [
      styles.amount,
      item.type === 'expense' && styles.expenseAmount,
    ];

    return (
      <View style={styles.card}>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={amountStyle}>{item.amount} ₸</Text>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.mobileContainer}>
        <Text style={styles.title}>Транзакции</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#5063BF" />
        ) : (
          <FlatList
            data={transactions}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.list}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Нет транзакций</Text>
            }
          />
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddTransaction')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Добавить транзакцию</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    paddingVertical: 24,
  },
  mobileContainer: {
    width: 360,
    paddingHorizontal: 20,
    backgroundColor: '#F5F7FA',
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#5063BF',
    marginBottom: 16,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#797979',
  },
  description: {
    fontSize: 16,
    color: '#797979',
    marginBottom: 4,
  },
  amount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34A853',
  },
  expenseAmount: {
    color: '#FBBF24',
  },
  button: {
    backgroundColor: '#5063BF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#5063BF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: '#797979',
    marginTop: 24,
    fontSize: 16,
  },
});

export default TransactionsScreen;