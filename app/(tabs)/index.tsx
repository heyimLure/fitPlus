import React, { useState } from 'react';
import { Image } from 'react-native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState('');

  const calcularIMC = async () => {
    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura) / 100;

    if (!pesoNum || !alturaNum || alturaNum === 0) {
      Alert.alert('Erro', 'Preencha peso e altura corretamente.');
      return;
    }

    const imc = pesoNum / (alturaNum * alturaNum);
    const imcStr = imc.toFixed(2);

    let classificacao = '';
    if (imc < 18.5) classificacao = 'Magreza';
    else if (imc < 24.9) classificacao = 'Normal';
    else if (imc < 29.9) classificacao = 'Sobrepeso';
    else if (imc < 39.9) classificacao = 'Obesidade';
    else classificacao = 'Obesidade grave';

    const resultadoFinal = `IMC: ${imcStr} (${classificacao})`;
    setResultado(resultadoFinal);

    const registro = {
      imc: imcStr,
      classificacao,
      data: new Date().toLocaleString(),
    };

    try {
      const historicoAtual = await AsyncStorage.getItem('historicoIMC');
      const lista = historicoAtual ? JSON.parse(historicoAtual) : [];
      lista.unshift(registro);
      await AsyncStorage.setItem('historicoIMC', JSON.stringify(lista));
    } catch (error) {
      console.error('Erro ao salvar no AsyncStorage:', error);
    }

    setPeso('');
    setAltura('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <Image
        source={require('../../assets/images/logo.png')}

        style={styles.logo}
      />

      <Text style={styles.titulo}>Calculadora de IMC</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu peso (kg)"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite sua altura (cm)"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        value={altura}
        onChangeText={setAltura}
      />

      <TouchableOpacity style={styles.botao} onPress={calcularIMC}>
        <Text style={styles.textoBotao}>Calcular IMC</Text>
      </TouchableOpacity>

      {resultado !== '' && <Text style={styles.resultado}>{resultado}</Text>}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 24,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 26,
    color: '#ffffff',
    marginBottom: 20,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Inter_700Bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#1f1f1f',
    color: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  botao: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Inter_700Bold',
  },
  resultado: {
    marginTop: 24,
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
  },
  logo: {
    width: 220, // antes: 140
    height: 220, // antes: 140
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 10, // antes: 16
    marginTop: -100, // novo: puxa um pouco pra cima se quiser mais centralizado
  },
  
});
