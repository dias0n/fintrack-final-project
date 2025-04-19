import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-svg-charts';
import { Circle, G, Line, Rect, Text as SvgText } from 'react-native-svg';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const HomeScreen: React.FC = ({ navigation }) => {
  const { logout, token } = useAuth();
  const [balance, setBalance] = useState<number | null>(null);
  const [balanceHistory, setBalanceHistory] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchBalance = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:8000/api/balance/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const history = res.data.history;
      setBalance(res.data.current_balance);
      setBalanceHistory(Array.isArray(history) && history.length > 0 ? history : [0]);
    } catch (err) {
      console.error('Ошибка при получении баланса:', err);
      setBalanceHistory([0]);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchBalance();
    }, [])
  );

  const Tooltip = ({ x, y }: any) => {
    if (selectedIndex === null) return null;
    const value = balanceHistory[selectedIndex];
    const cx = x(selectedIndex);
    const cy = y(value);

    return (
      <G>
        <Line x1={cx} y1={cy} x2={cx} y2={cy - 40} stroke="#797979" strokeWidth={1} />
        <Circle cx={cx} cy={cy} r={5} fill="#5063BF" />
        <Rect
          x={cx - 35}
          y={cy - 65}
          width={70}
          height={28}
          rx={6}
          fill="#FFFFFF"
          stroke="#5063BF"
        />
        <SvgText
          x={cx}
          y={cy - 50}
          fontSize="12"
          fill="#5063BF"
          fontWeight="bold"
          alignmentBaseline="middle"
          textAnchor="middle"
        >
          {value} ₸
        </SvgText>
      </G>
    );
  };

  const CustomDots = ({ x, y, data }: any) =>
    data.map((value: number, index: number) => (
      <Circle
        key={index}
        cx={x(index)}
        cy={y(value)}
        r={6}
        fill="#5063BF"
        onPress={() => setSelectedIndex(index)}
      />
    ));

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.mobileContainer}>
        <Text style={styles.header}>Dashboard</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#5063BF" />
        ) : (
          <>
            <Text style={styles.balanceLabel}>Текущий баланс</Text>
            <Text style={styles.balance}>{balance ?? 0} ₸</Text>

            <Text style={styles.chartLabel}>Изменение баланса</Text>

            {balanceHistory.length > 0 ? (
              <View style={styles.chartContainer}>
                <LineChart
                  style={styles.chart}
                  data={balanceHistory}
                  svg={{ stroke: '#5063BF', strokeWidth: 2 }}
                  contentInset={{ top: 40, bottom: 20 }}
                >
                  <CustomDots />
                  <Tooltip />
                </LineChart>
              </View>
            ) : (
              <Text style={styles.noDataText}>Нет данных для графика</Text>
            )}
          </>
        )}



        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Categories')}
        >
          <Text style={styles.buttonText}>Категории</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Transactions')}
        >
          <Text style={styles.buttonText}>Транзакции</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={logout}
        >
          <Text style={[styles.buttonText, styles.logoutText]}>Выйти</Text>
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
    width: 360, // условная ширина мобильного экрана
    paddingHorizontal: 20,
    backgroundColor: '#F5F7FA',
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#5063BF',
    textAlign: 'center',
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#797979',
    textAlign: 'center',
  },
  balance: {
    fontSize: 28,
    fontWeight: '700',
    color: '#5063BF',
    textAlign: 'center',
    marginBottom: 12,
  },
  chartLabel: {
    fontSize: 13,
    color: '#797979',
    marginBottom: 4,
  },
  noDataText: {
    textAlign: 'center',
    color: '#797979',
    fontSize: 14,
    marginVertical: 20,
  },
  chart: {
    height: 200,
    width: '100%',
  },
  chartContainer: {
    backgroundColor: '#F1F3FF',
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
  },  
  button: {
    backgroundColor: '#5063BF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#5063BF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#797979',
  },
  logoutText: {
    color: '#5063BF',
  },
});

export default HomeScreen;
