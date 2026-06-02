import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';

// import * as ImagePicker from 'expo-image-picker';

export default function CadastroPetScreen() {
  const [imagem, setImagem] = useState(null);

  const [nome, setNome] = useState('');
  const [raca, setRaca] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [sexo, setSexo] = useState('');
  const [castrado, setCastrado] =
    useState('');

  const [alergia, setAlergia] =
    useState('');

  const [obs, setObs] = useState('');

  async function selecionarImagem() {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        'Permissão necessária'
      );

      return;
    }

    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,

        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  }

  function salvarPet() {
    if (!nome || !raca) {
      Alert.alert(
        'Erro',
        'Preencha os campos principais'
      );

      return;
    }

    Alert.alert(
      'Sucesso ',
      'Pet cadastrado com sucesso!'
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        Cadastro do Pet 
      </Text>

      <TouchableOpacity
        style={styles.imageContainer}
        onPress={selecionarImagem}
      >
        {imagem ? (
          <Image
            source={{ uri: imagem }}
            style={styles.image}
          />
        ) : (
          <Text style={styles.imageText}>
            Adicionar Foto
          </Text>
        )}
      </TouchableOpacity>

      <TextInput
        placeholder="Nome do Pet"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        placeholder="Raça"
        style={styles.input}
        value={raca}
        onChangeText={setRaca}
      />

      <TextInput
        placeholder="Idade"
        style={styles.input}
        value={idade}
        onChangeText={setIdade}
      />

      <TextInput
        placeholder="Peso"
        style={styles.input}
        value={peso}
        onChangeText={setPeso}
      />

      <Text style={styles.section}>
        Sexo
      </Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={[
            styles.option,
            sexo === 'Macho' &&
              styles.selected,
          ]}
          onPress={() =>
            setSexo('Macho')
          }
        >
          <Text>Macho</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            sexo === 'Fêmea' &&
              styles.selected,
          ]}
          onPress={() =>
            setSexo('Fêmea')
          }
        >
          <Text>Fêmea</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.section}>
        Castrado?
      </Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={[
            styles.option,
            castrado === 'Sim' &&
              styles.selected,
          ]}
          onPress={() =>
            setCastrado('Sim')
          }
        >
          <Text>Sim</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            castrado === 'Não' &&
              styles.selected,
          ]}
          onPress={() =>
            setCastrado('Não')
          }
        >
          <Text>Não</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Possui alergia?"
        style={styles.input}
        value={alergia}
        onChangeText={setAlergia}
      />

      <TextInput
        placeholder="Observações"
        style={[
          styles.input,
          styles.textArea,
        ]}
        multiline
        value={obs}
        onChangeText={setObs}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={salvarPet}
      >
        <Text style={styles.buttonText}>
          Salvar Pet
        </Text>
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

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  imageContainer: {
    width: 160,
    height: 160,
    borderRadius: 100,
    backgroundColor: '#E5E7EB',

    justifyContent: 'center',
    alignItems: 'center',

    alignSelf: 'center',
    marginBottom: 30,

    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  imageText: {
    color: '#6B7280',
    fontWeight: 'bold',
  },

  input: {
    backgroundColor: '#FFF',
    padding: 18,
    borderRadius: 18,
    marginBottom: 18,
  },

  section: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 14,
    marginTop: 10,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  option: {
    backgroundColor: '#FFF',
    width: '47%',
    padding: 18,
    borderRadius: 18,
    alignItems: 'center',
  },

  selected: {
    backgroundColor: '#86EFAC',
  },

  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },

  button: {
    backgroundColor: '#2E8B57',
    padding: 22,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
});