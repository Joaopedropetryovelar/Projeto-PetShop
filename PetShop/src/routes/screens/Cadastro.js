import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';
import app from '../../../FireBaseConfig';

export default function Cadastro({ navigation }) {

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');


  const CriarConta=()=>{
    if(!nome || !email || !telefone || !senha){
      Alert.alert("preencha todos os campos!!!")
      return;
    }
          const auth = getAuth(app);
          createUserWithEmailAndPassword(auth, email, senha)
          .then((userCredential) => {
              console.log('conta criada');
          // Signed up 
          const user = userCredential.user;
          console.log(user)
          navigation.navigate('Principal')
          // ...
          })
           .catch((error) => {
              console.log(error);
              Alert.alert(error.message);
          // ..
        });
      }

  return (
    <View style={styles.container}>

      
      <View style={styles.header}>
        <Text style={styles.txtLogo}>
          Pet <Text style={styles.txtLogoVerde}>Shop</Text>
        </Text>

        {/* <Image
          source={require("../../../Sources/petshop-removebg-preview.png")}
          style={styles.imgLogo}
        /> */}
      </View>

    
      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>

        <Text style={styles.bemVindo}>Criar conta</Text>
        <Text style={styles.subTitulo}>Preencha os dados para se cadastrar</Text>

     
        <Text style={styles.label}>Nome</Text>
        <View style={styles.caixaInput}>
         
          <TextInput
            placeholder="digite seu nome..."
            placeholderTextColor="#aaa"
            style={styles.input}
            value={nome}
            onChangeText={setNome}
          />
        </View>

      
        <Text style={styles.label}>Email</Text>
        <View style={styles.caixaInput}>

          <TextInput
            placeholder="digite seu email..."
            placeholderTextColor="#aaa"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

       
        <Text style={styles.label}>Telefone</Text>
        <View style={styles.caixaInput}>
         
          <TextInput
            placeholder="(00) 00000-0000"
            placeholderTextColor="#aaa"
            style={styles.input}
            keyboardType="phone-pad"
            value={telefone}
            onChangeText={setTelefone}
          />
        </View>

     
        <Text style={styles.label}>Senha</Text>
        <View style={styles.caixaInput}>
         
          <TextInput
            placeholder="Crie sua senha..."
            placeholderTextColor="#aaa"
            style={styles.input}
            secureTextEntry={!mostrarSenha}
            value={senha}
            onChangeText={setSenha}
          />
          <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
            <Text style={styles.icone}>{mostrarSenha ? '🙈' : '👁'}</Text>
          </TouchableOpacity>
        </View>

     
        <TouchableOpacity style={styles.botao} activeOpacity={0.8} onPress={CriarConta}>
          <Text style={styles.txtBotao}>Cadastrar</Text>
        </TouchableOpacity>

       
        <View style={styles.linhaCadastro}>
          <Text style={styles.registerText}>Já possui conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.cadastro}>entrar</Text>
          </TouchableOpacity>
        </View>

       
        <View style={{ height: 30 }} />

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: 45,
    backgroundColor: "#000033",
  },

 
  header: {
    paddingHorizontal: 15,
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtLogo: {
    fontSize: 38,
    fontWeight: "bold",
    color: '#ffffff',
    letterSpacing: 1,
  },
  txtLogoVerde: {
    color: '#1bd14f',
    fontSize: 38,
  },
  imgLogo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
    marginTop: 8,
  },

  form: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    paddingHorizontal: 22,
  },

  bemVindo: {
    fontSize: 22,
    fontWeight: "bold",
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
    fontWeight: "600",
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
    marginBottom: 16,
    gap: 8,
  },
 
  input: {
    flex: 1,
    fontSize: 15,
    color: '#111',
  },


  botao: {
    backgroundColor: "#1bd14f",
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 20,
    marginTop: 4,
  },
  txtBotao: {
    fontSize: 16,
    fontWeight: "bold",
    color: '#fff',
    letterSpacing: 0.5,
  },


  linhaCadastro: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontSize: 15,
    fontWeight: "500",
    color: '#555',
    textAlign: 'center',
  },
  cadastro: {
    color: '#1bd14f',
    fontWeight: 'bold',
    fontSize: 15,
  },

});