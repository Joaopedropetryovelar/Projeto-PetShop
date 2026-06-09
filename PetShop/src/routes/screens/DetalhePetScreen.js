import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { database } from '../../../FireBaseConfig';

export default function DetalhePetScreen({ route, navigation }) {
  const pet = route?.params?.pet;
  const [agendamentos, setAgendamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!pet?.id) return;
    buscarAgendamentos();
  }, [pet]);

  async function buscarAgendamentos() {
    try {
      const resultado = await getDocs(
        query(collection(database, 'Agendamento'), where('petId', '==', pet.id))
      );
      setAgendamentos(resultado.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (erro) {
      console.log('Erro:', erro);
    } finally {
      setCarregando(false);
    }
  }

  if (!pet) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Nenhum pet foi selecionado.</Text>
      </View>
    );
  }

  const infos = [
    { rotulo: 'Castrado',     valor: pet.castrado },
    { rotulo: 'Alergia',      valor: pet.alergia || 'Nenhuma' },
    { rotulo: 'Observações',  valor: pet.obs || 'Nenhuma observação' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.nomePet}>{pet.nome}</Text>
        <Text style={styles.racaPet}>{pet.raca} • {pet.sexo}</Text>
      </View>

      <View style={styles.linhaInfo}>
        <View style={styles.caixaInfo}>
          <Text style={styles.numeroInfo}>{pet.idade}</Text>
          <Text>Idade</Text>
        </View>
        <View style={styles.caixaInfo}>
          <Text style={styles.numeroInfo}>{pet.peso}</Text>
          <Text>Peso</Text>
        </View>
      </View>

      <Text style={styles.secao}>Informações</Text>
      {infos.map((item) => (
        <View key={item.rotulo} style={styles.card}>
          <Text style={styles.rotulo}>{item.rotulo}:</Text>
          <Text>{item.valor}</Text>
        </View>
      ))}

      <Text style={styles.secao}>Agendamentos</Text>
      {carregando ? (
        <ActivityIndicator size="large" color="#2E8B57" />
      ) : agendamentos.length === 0 ? (
        <View style={styles.card}>
          <Text style={{ color: '#888' }}>Nenhum agendamento encontrado.</Text>
        </View>
      ) : (
        agendamentos.map((ag) => (
          <View key={ag.id} style={styles.cardAgendamento}>
            <View style={styles.badgeServico}>
              <Text style={styles.textoServico}>{ag.servico}</Text>
            </View>
            <Text style={styles.dataHora}>{ag.data} às {ag.horario}</Text>
          </View>
        ))
      )}

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Agendar Horário', { pet })}>
        <Text style={styles.textoBotao}>Agendar Serviço</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F4F7F5',
  },

  cabecalho: {
    backgroundColor: '#2E8B57',
    paddingTop: 90,
    paddingBottom: 50,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  nomePet: {
    fontSize: 30,
    color: '#FFF',
    fontWeight: 'bold',
  },

  racaPet: {
    color: '#E5E7EB',
    marginTop: 8,
  },

  linhaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    marginBottom: 20,
  },

  caixaInfo: {
    backgroundColor: '#FFF',
    width: 130,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },

  numeroInfo: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  secao: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 24,
    marginBottom: 16,
    marginTop: 8,
  },

  card: {
    backgroundColor: '#FFF',
    padding: 20,
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 18,
  },

  rotulo: {
    fontWeight: 'bold',
    marginBottom: 5,
  },

  cardAgendamento: {
    backgroundColor: '#FFF',
    padding: 20,
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },

  badgeServico: {
    backgroundColor: '#E6F4EC',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
  },

  textoServico: {
    color: '#2E8B57',
    fontWeight: 'bold',
    fontSize: 15,
  },

  dataHora: {
    color: '#555',
    fontSize: 14,
  },

  botao: {
    backgroundColor: '#2E8B57',
    padding: 22,
    margin: 24,
    borderRadius: 18,
    alignItems: 'center',
  },

  textoBotao: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

});


