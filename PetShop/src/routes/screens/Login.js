import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useState } from 'react';
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth';


export default function Login({ navigation }) {

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erroEmail, setErroEmail] = useState('');
  


   const EntrarNaConta=()=>{
    if(!email || !senha){
      Alert.alert("preencha todos os campos!!!")
      return;
    }
        const auth = getAuth();
         signInWithEmailAndPassword(auth, email, senha)
         .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    navigation.navigate('Principal')
    // ...
  })
  .catch((error) => {
   console.log(error);
   Alert.alert(error.message)
  });
    }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.txtLogo}>
          Pet <Text style={styles.txtLogoVerde}>Shop</Text>
        </Text>
      </View>

      <View style={styles.form}>

        <Text style={styles.bemVindo}>Bem-vindo de volta!</Text>
        <Text style={styles.subTitulo}>Acesse sua conta para continuar</Text>

        <Text style={styles.label}>Email</Text>
        <View style={[styles.caixaInput, erroEmail ? styles.caixaErro : null]}>
          <TextInput
            placeholder="digite seu email..."
            placeholderTextColor="#aaa"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(texto) => {
              setEmail(texto);
              if (erroEmail) setErroEmail(''); 
            }}
          />
        </View>
        {erroEmail ? <Text style={styles.txtErro}>{erroEmail}</Text> : null}

        <Text style={styles.label}>Senha</Text>
        <View style={styles.caixaInput}>
          <TextInput
            placeholder="digite sua senha..."
            placeholderTextColor="#aaa"
            style={styles.input}
            secureTextEntry={!mostrarSenha}
            value={senha}
            onChangeText={setSenha}
          />
          <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
            <Text style={styles.icone}>{mostrarSenha ? '👁' : '👁'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.botao} activeOpacity={0.8} onPress={EntrarNaConta}>
          <Text style={styles.txtBotao}>Acessar</Text>
        </TouchableOpacity>

        <View style={styles.linhaCadastro}>
          <Text style={styles.registerText}>Não possui conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
            <Text style={styles.cadastro}>cadastre-se</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: 45,
    backgroundColor: '#000033',
  },
  header: {
    paddingHorizontal: 15,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtLogo: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1,
  },
  txtLogoVerde: {
    color: '#1bd14f',
    fontSize: 38,
  },
  imgLogo: {
    width: 200,
    height: 120,
    resizeMode: 'contain',
    marginTop: 8,
  },
  form: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    paddingHorizontal: 22,
  },
  bemVindo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000033',
    marginBottom: 4,
  },
  subTitulo: {
    fontSize: 13,
    color: '#888',
    marginBottom: 24,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  caixaInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#d0f0dc',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 52,
    backgroundColor: '#f9fff9',
    marginBottom: 4, 
    gap: 8,
  },
  caixaErro: {
    borderColor: '#EF4444', 
  },
  txtErro: {
    color: '#EF4444',
    fontSize: 12,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#111',
  },
  icone: {
    fontSize: 18,
  },
  botao: {
    backgroundColor: '#1bd14f',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 20,
    marginTop: 8,
  },
  txtBotao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 0.5,
  },
  linhaCadastro: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  registerText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#555',
    textAlign: 'center',
  },
  cadastro: {
    color: '#1bd14f',
    fontWeight: 'bold',
  },
});