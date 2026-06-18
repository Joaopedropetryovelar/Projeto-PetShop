import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import { database } from '../../../FireBaseConfig';
import { Profissionais } from '../../Data/Profissional';

const horariosPadrao = [
  '09:00',
  '10:00',
  '11:00',
  '11:30',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00'
];

const servicos = [
  { nome: 'Banho', preco: 'R$ 50,00' },
  { nome: 'Tosa', preco: 'R$ 70,00' },
  { nome: 'Vacina', preco: 'R$ 90,00' },
  { nome: 'Consulta', preco: 'R$ 120,00' }
];

function pegarDataHoje() {
  return new Date().toLocaleDateString('pt-BR');
}

function pegarDias() {
  const lista = [];
  const hoje = new Date();
  let contador = 0;

  while (lista.length < 7) {
    const dia = new Date(hoje);
    dia.setDate(hoje.getDate() + contador);

    if (dia.getDay() !== 0) {
      lista.push(dia.toLocaleDateString('pt-BR'));
    }

    contador++;
  }

  return lista;
}

export default function AgendamentoScreen({ route, navigation }) {
  const petRecebido = route?.params?.pet;

  const [listaPets, setListaPets] = useState([]);
  const [pet, setPet] = useState(petRecebido?.id || '');
  const [servico, setServico] = useState('');
  const [data, setData] = useState(pegarDataHoje());
  const [hora, setHora] = useState('');
  const [Profissional,SetProfissional]=useState('');
  const [horarios, setHorarios] = useState(horariosPadrao);

  const dias = pegarDias();

  useEffect(() => {
    carregarPets();
  }, []);

  useEffect(() => {
    carregarHorarios(data);
    setHora('');
  }, [data]);

  async function carregarPets() {
    try {
      const uid = getAuth().currentUser?.uid;

      if (!uid) {
        return;
      }

      const resultado = await getDocs(
        query(
          collection(database, 'Pets'),
          where('uid', '==', uid)
        )
      );

      const pets = resultado.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setListaPets(pets);

    } catch (erro) {
      console.log('Erro ao carregar pets:', erro);
    }
  }

  async function carregarHorarios(dataSelecionada) {
    try {
      const resultado = await getDocs(
        query(
          collection(database, 'Agendamento'),
          where('data', '==', dataSelecionada)
        )
      );

      const ocupados = resultado.docs.map(
        doc => doc.data().horario
      );

      const livres = horariosPadrao.filter(
        horario => !ocupados.includes(horario)
      );

      setHorarios(livres);

    } catch (erro) {
      console.log('Erro ao carregar horários:', erro);
    }
  }

  async function agendar() {
    if (!pet || !servico || !hora) {
      Alert.alert(
        'Erro',
        'Selecione o pet, serviço e horário.'
      );
      return;
    }

    const petSelecionado = listaPets.find(
      item => item.id === pet
    );

    const servicoSelecionado = servicos.find(
      item => item.nome === servico
    );

    try {
      const uid = getAuth().currentUser?.uid;

      await addDoc(
        collection(database, 'Agendamento'),
        {
          petId: petSelecionado.id,
          nomePet: petSelecionado.nome,
          servico: servico,
          preco: servicoSelecionado.preco,
          horario: hora,
          data: data,
          Profissional:Profissional,
          uid: uid
        }
      );

      Alert.alert(
        'Sucesso',
        `${servico} agendado para ${data} às ${hora}`
      );

      setPet('');
      setServico('');
      setHora('');

      carregarHorarios(data);
      navigation.navigate('Principal')

    } catch (erro) {
      console.log('Erro ao agendar:', erro);
    }
  }

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.titulo}>
        Agendamento
      </Text>

      <Text style={styles.secao}>
        Escolha o Pet
      </Text>

      <View style={styles.pickerBox}>
        <Picker
          selectedValue={pet}
          onValueChange={setPet}
          style={styles.picker}
        >
          <Picker.Item
            label="Selecione um pet"
            value=""
          />

          {listaPets.map(item => (
            <Picker.Item
              key={item.id}
              label={item.nome}
              value={item.id}
            />
          ))}
        </Picker>
      </View>

       <Text style={styles.secao}>
        Escolha o Profissional
      </Text>

       <ScrollView horizontal>
  {Profissionais.map(item => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.cardData,
        Profissional?.id === item.id &&
          styles.selecionado
      ]}
      onPress={() => SetProfissional(item)}
    >
      <Text
        style={[
          styles.textoData,
          Profissional?.id === item.id &&
            styles.textoSelecionado
        ]}
      >
        {item.nome}
      </Text>

      <Text
        style={[
          styles.textoData,
          Profissional?.id === item.id &&
            styles.textoSelecionado
        ]}
      >
        {item.Funcao}
      </Text>
    </TouchableOpacity>
  ))}
</ScrollView>

      <Text style={styles.secao}>
        Escolha o Serviço
      </Text>

      {servicos.map(item => (
        <TouchableOpacity
          key={item.nome}
          style={[
            styles.card,
            servico === item.nome && styles.selecionado
          ]}
          onPress={() => setServico(item.nome)}
        >
          <Text
            style={[
              styles.textoCard,
              servico === item.nome &&
                styles.textoSelecionado
            ]}
          >
            {item.nome}
          </Text>

          <Text
            style={[
              styles.preco,
              servico === item.nome &&
                styles.textoSelecionado
            ]}
          >
            {item.preco}
          </Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.secao}>
        Escolha a Data
      </Text>

      <ScrollView horizontal>
        {dias.map(item => (
          <TouchableOpacity
            key={item}
            style={[
              styles.cardData,
              data === item && styles.selecionado
            ]}
            onPress={() => setData(item)}
          >
            <Text
              style={[
                styles.textoData,
                data === item &&
                  styles.textoSelecionado
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

  
      <Text style={styles.secao}>
        Escolha o Horário
      </Text>

      <View style={styles.linhaHorarios}>
        {horarios.map(item => (
          <TouchableOpacity
            key={item}
            style={[
              styles.cardHorario,
              hora === item && styles.selecionado
            ]}
            onPress={() => setHora(item)}
          >
            <Text
              style={[
                styles.textoCard,
                hora === item &&
                  styles.textoSelecionado
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.botao}
        onPress={agendar}
       
      >
        <Text style={styles.textoBotao}>
          Confirmar Agendamento
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F4F7F5',
    padding: 24,
    paddingTop: 70
  },

  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30
  },

  secao: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 10
  },

  pickerBox: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    marginBottom: 20
  },

  picker: {
    width: '100%',
    height: 55
  },

  card: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 18,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  selecionado: {
    backgroundColor: '#2E8B57'
  },

  textoCard: {
    fontSize: 18,
    fontWeight: 'bold'
  },

  textoSelecionado: {
    color: '#FFF'
  },

  preco: {
    fontSize: 16,
    color: '#2E8B57',
    fontWeight: 'bold'
  },

  cardData: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 15
  },

  textoData: {
    fontWeight: 'bold'
  },

  linhaHorarios: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },

  cardHorario: {
    backgroundColor: '#FFF',
    width: '47%',
    padding: 20,
    borderRadius: 18,
    marginBottom: 15,
    alignItems: 'center'
  },

  botao: {
    backgroundColor: '#2E8B57',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50
  },

  textoBotao: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  }

});