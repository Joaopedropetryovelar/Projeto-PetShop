import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { database } from '../../../FireBaseConfig';

export default function CadastroPetScreen({navigation}) {
  const [nome, setNome] = useState('');
  const [raca, setRaca] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [sexo, setSexo] = useState('');
  const [castrado, setCastrado] = useState('');
  const [alergia, setAlergia] = useState('');
  const [obs, setObs] = useState('');

  async function salvarPet() {
    // Pega o usuário logado para associar o pet a ele
    const auth = getAuth();
    const usuario = auth.currentUser;

    if (!usuario) {
      Alert.alert('Erro', 'Nenhum usuário logado.');
      return;
    }

    try {
      await addDoc(collection(database, 'Pets'), {
        nome,
        raca,
        idade,
        peso,
        sexo,
        castrado,
        alergia,
        obs,
        uid: usuario.uid, // <-- salva o dono do pet
      });
      setNome(''); setRaca(''); setIdade(''); setPeso('');
      setSexo(''); setCastrado(''); setAlergia(''); setObs('');
      Alert.alert('Pet cadastrado com sucesso!');
      navigation.navigate('Principal')
    } catch (erro) {
      console.log('erro ao cadastrar', erro);
      Alert.alert('Erro ao cadastrar pet.');
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Cadastro do Pet</Text>

      <TextInput placeholder="Nome do Pet" style={styles.input} value={nome} onChangeText={setNome} />
      <TextInput placeholder="Raça" style={styles.input} value={raca} onChangeText={setRaca} />
      <TextInput placeholder="Idade" style={styles.input} value={idade} onChangeText={setIdade} />
      <TextInput placeholder="Peso" style={styles.input} value={peso} onChangeText={setPeso} />

      <Text style={styles.secao}>Sexo</Text>
      <View style={styles.linha}>
        {['Macho', 'Fêmea'].map((opcao) => (
          <TouchableOpacity
            key={opcao}
            style={[styles.opcao, sexo === opcao && styles.selecionado]}
            onPress={() => setSexo(opcao)}
          >
            <Text>{opcao}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.secao}>Castrado?</Text>
      <View style={styles.linha}>
        {['Sim', 'Não'].map((opcao) => (
          <TouchableOpacity
            key={opcao}
            style={[styles.opcao, castrado === opcao && styles.selecionado]}
            onPress={() => setCastrado(opcao)}
          >
            <Text>{opcao}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput placeholder="Possui alergia?" style={styles.input} value={alergia} onChangeText={setAlergia} />
      <TextInput
        placeholder="Observações"
        style={[styles.input, styles.areaTexto]}
        multiline
        value={obs}
        onChangeText={setObs}
      />

      <TouchableOpacity style={styles.botao} onPress={salvarPet}>
        <Text style={styles.textoBotao}>Cadastrar Pet</Text>
      </TouchableOpacity>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7F5',
    padding: 24,
    paddingTop: 70,
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#FFF',
    padding: 18,
    borderRadius: 18,
    marginBottom: 18,
  },
  secao: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 14,
    marginTop: 10,
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  opcao: {
    backgroundColor: '#FFF',
    width: '47%',
    padding: 18,
    borderRadius: 18,
    alignItems: 'center',
  },
  selecionado: {
    backgroundColor: '#86EFAC',
  },
  areaTexto: {
    height: 120,
    textAlignVertical: 'top',
  },
  botao: {
    backgroundColor: '#2E8B57',
    padding: 22,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotao: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
