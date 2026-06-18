import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { database } from '../../../FireBaseConfig';

export default function CadastroPetScreen({ route, navigation }) {
  const pet = route?.params?.pet;

  const [nome, setNome] = useState('');
  const [raca, setRaca] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [sexo, setSexo] = useState('');
  const [castrado, setCastrado] = useState('');
  const [alergia, setAlergia] = useState('');
  const [obs, setObs] = useState('');

  useEffect(() => {
    if (pet) {
      setNome(pet.nome || '');
      setRaca(pet.raca || '');
      setIdade(pet.idade || '');
      setPeso(pet.peso || '');
      setSexo(pet.sexo || '');
      setCastrado(pet.castrado || '');
      setAlergia(pet.alergia || '');
      setObs(pet.obs || '');
    }
  }, [pet]);

 async function salvarPet() {

  if (
    !nome.trim() ||
    !raca.trim() ||
    !idade.trim() ||
    !peso.trim() ||
    !sexo ||
    !castrado
  ) {
    Alert.alert(
      "Campos obrigatórios",
      "Preencha Nome, Raça, Idade, Peso, Sexo e Castrado."
    );
    return;
  }

  const usuario = getAuth().currentUser;

  if (!usuario) {
    Alert.alert(
      "Erro",
      "Nenhum usuário está logado."
    );
    return;
  }

  try {

    const dadosPet = {
      nome,
      raca,
      idade,
      peso,
      sexo,
      castrado,
      alergia,
      obs,
      uid: usuario.uid
    };

    if (pet && pet.id) {
      const petAtualizado = {
        id: pet.id,
        ...dadosPet
      };

      await updateDoc(
        doc(database, 'Pets', pet.id),
        dadosPet
      );

      Alert.alert(
        'Sucesso',
        'Dados do pet atualizados.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate({
              name: 'Informações Pet',
              params: { pet: petAtualizado },
              merge: true
            })
          }
        ]
      );

    } else {

      await addDoc(
        collection(database, 'Pets'),
        dadosPet
      );

      setNome('');
      setRaca('');
      setIdade('');
      setPeso('');
      setSexo('');
      setCastrado('');
      setAlergia('');
      setObs('');

      Alert.alert(
        'Sucesso',
        'Pet cadastrado com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Principal')
          }
        ]
      );
    }

  } catch (erro) {
    console.log('Erro ao salvar pet:', erro);
    Alert.alert(
      'Erro',
      erro.message || 'Não foi possível salvar o pet.'
    );
  }
}

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>{pet ? 'Editar Pet' : 'Cadastro do Pet'}</Text>

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
        <Text style={styles.textoBotao}>{pet ? 'Salvar alterações' : 'Cadastrar Pet'}</Text>
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
