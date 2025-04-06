import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 26,
    color: 'white',
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Inter_700Bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#555',
    backgroundColor: '#1e1e1e',
    color: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontFamily: 'Inter_400Regular',
  },
  resultado: {
    marginTop: 20,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
  },
  botao: {
    backgroundColor: '#00bfff',
    padding: 12,
    borderRadius: 10,
    marginTop: 16,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Inter_700Bold',
  },
    logo: {
    width: 180, // antes: 140
    height: 180, // antes: 140
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 24, // antes: 16
    marginTop: -20, // novo: puxa um pouco pra cima se quiser mais centralizado
  },
  
  
});
