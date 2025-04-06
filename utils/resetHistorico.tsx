import AsyncStorage from '@react-native-async-storage/async-storage';

export const resetHistorico = async () => {
  try {
    await AsyncStorage.removeItem('historicoIMC');
    console.log('Histórico resetado com sucesso!');
  } catch (error) {
    console.error('Erro ao resetar histórico:', error);
  }
};
