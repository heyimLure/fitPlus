import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-chart-kit';
import { useFocusEffect } from 'expo-router';

type RegistroIMC = {
  imc: string;
  classificacao: string;
  data: string;
};

export default function Historico() {
  const [historico, setHistorico] = useState<RegistroIMC[]>([]);

  async function carregarHistorico() {
    try {
      const dados = await AsyncStorage.getItem('historicoIMC');
      if (dados) setHistorico(JSON.parse(dados));
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
    }
  }

  async function limparHistorico() {
    await AsyncStorage.removeItem('historicoIMC');
    setHistorico([]);
  }

  useFocusEffect(
    React.useCallback(() => {
      carregarHistorico();
    }, [])
  );

  const ultimos5 = historico.slice(0, 5).reverse(); // Pega os 5 mais recentes e exibe do mais antigo ao mais recente

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Histórico de IMC</Text>

      {historico.length === 0 ? (
        <Text style={styles.vazio}>Nenhum registro encontrado.</Text>
      ) : (
        <>
          <FlatList
            data={historico}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.texto}>
                  IMC: {item.imc} ({item.classificacao})
                </Text>
                <Text style={styles.data}>{item.data}</Text>
              </View>
            )}
          />

          <Text style={styles.graficoTitulo}>Gráfico de Evolução</Text>
          <LineChart
            data={{
              labels: ultimos5.map((item) => item.data.split(',')[0]),
              datasets: [
                {
                  data: ultimos5.map((item) => parseFloat(item.imc)),
                },
              ],
            }}
            width={Dimensions.get('window').width - 40}
            height={220}
            yAxisSuffix=""
            chartConfig={{
              backgroundColor: '#1c1c1c',
              backgroundGradientFrom: '#222',
              backgroundGradientTo: '#111',
              decimalPlaces: 2,
              color: () => '#00bfff',
              labelColor: () => '#ccc',
              propsForDots: {
                r: '4',
                strokeWidth: '1',
                stroke: '#00bfff',
              },
            }}
            bezier
            style={styles.grafico}
          />

          <TouchableOpacity style={styles.botao} onPress={limparHistorico}>
            <Text style={styles.textoBotao}>Limpar Histórico</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'Inter_700Bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  vazio: {
    fontSize: 16,
    color: '#aaa',
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    marginTop: 40,
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: 12,
    marginBottom: 10,
    borderRadius: 12,
  },
  texto: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  data: {
    color: '#cccccc',
    fontSize: 14,
    marginTop: 4,
    fontFamily: 'Inter_400Regular',
  },
  graficoTitulo: {
    marginTop: 24,
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: '#00bfff',
    textAlign: 'center',
  },
  grafico: {
    marginVertical: 16,
    borderRadius: 12,
  },
  botao: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 10,
    marginTop: 16,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#121212',
    fontWeight: 'bold',
    fontFamily: 'Inter_700Bold',
  },
});
