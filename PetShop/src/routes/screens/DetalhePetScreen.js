import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, ActivityIndicator, Modal
} from 'react-native';
import { collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { database } from '../../../FireBaseConfig';

export default function DetalhePetScreen({ route, navigation }) {
  const [pet, setPet] = useState(route?.params?.pet);
  const [agendamentos, setAgendamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [removendo, setRemovendo] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  useEffect(() => {
    if (route?.params?.pet) {
      setPet(route.params.pet);
    }
  }, [route?.params?.pet]);

  useEffect(() => {
    if (pet?.id) buscarAgendamentos();
  }, [pet]);

  async function buscarAgendamentos() {
    try {
      const resultado = await getDocs(
        query(collection(database, 'Agendamento'), where('petId', '==', pet.id))
      );
      setAgendamentos(resultado.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) {
      console.log('Erro ao buscar agendamentos:', e);
    } finally {
      setCarregando(false);
    }
  }

  async function removerPet() {
    if (!pet?.id) return;
    console.log('removerPet: iniciando remoção do pet', pet.id);
    setRemovendo(true);
    try {
      await deleteDoc(
        doc(database, 'Pets', pet.id)
      );

      navigation.navigate('Principal');

    } catch (erro) {
      console.log('Erro ao excluir:', erro);
    } finally {
      setRemovendo(false);
    }
  }

  function confirmarRemoverPet() {
    setConfirmVisible(true);
  }

  if (!pet) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Nenhum pet selecionado.</Text>
      </View>
    );
  }

  const infos = [
    { rotulo: 'Castrado', valor: pet.castrado || '-' },
    { rotulo: 'Alergia', valor: pet.alergia || '-' },
    { rotulo: 'Observações', valor: pet.obs || '-' },
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
          <Text style={styles.labelInfo}>Idade</Text>
        </View>
        <View style={styles.caixaInfo}>
          <Text style={styles.numeroInfo}>{pet.peso}</Text>
          <Text style={styles.labelInfo}>Peso</Text>
        </View>
      </View>

      <Text style={styles.secao}>Informações</Text>
      {infos.map(item => (
        <View key={item.rotulo} style={styles.card}>
          <Text style={styles.rotulo}>{item.rotulo}</Text>
          <Text style={styles.valorInfo}>{item.valor}</Text>
        </View>
      ))}

      <Text style={styles.secao}>Agendamentos</Text>
      {carregando ? (
        <ActivityIndicator color="#2E8B57" style={styles.activityIndicator} />
      ) : agendamentos.length === 0 ? (
        <View style={styles.card}>
          <Text style={styles.nenhumTexto}>Nenhum agendamento encontrado.</Text>
        </View>
      ) : (
        agendamentos.map(ag => (
          <View key={ag.id} style={styles.card}>
            <Text style={styles.servicoTitulo}>{ag.servico}</Text>
            <Text style={styles.servicoData}>{ag.data} às {ag.horario}</Text>
          </View>
        ))
      )}

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('Agendar Horário', { pet })}
      >
        <Text style={styles.textoBotao}>Agendar horário</Text>
      </TouchableOpacity>

      <View style={styles.linhaOpcoes}>
        <TouchableOpacity
          style={[styles.botaoOpcao, { backgroundColor: '#5B9DD9' }]}
          onPress={() => navigation.navigate('Cadastro Pet', { pet })}
        >
          <Text style={styles.textoBotaoOpcao}>✏️  Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.botaoOpcao, { backgroundColor: '#E74C3C' }]}
          onPress={confirmarRemoverPet}
          disabled={removendo}
        >
          <Text style={styles.textoBotaoOpcao}>
            {removendo ? 'Removendo...' : '🗑️  Remover'}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={confirmVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setConfirmVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirmar remoção</Text>
            <Text style={styles.modalMessage}>Tem certeza que deseja remover este pet?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                onPress={() => setConfirmVisible(false)}
                disabled={removendo}
              >
                <Text>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#E74C3C' }]}
                onPress={() => { setConfirmVisible(false); removerPet(); }}
                disabled={removendo}
              >
                <Text style={{ color: '#fff' }}>{removendo ? 'Removendo...' : 'Remover'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={{ height: 50 }} />
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
    fontSize: 15,
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
    color: '#111',
  },
  labelInfo: {
    color: '#6B7280',
    marginTop: 4,
    fontSize: 13,
  },
  secao: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 24,
    marginBottom: 14,
    marginTop: 8,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 20,
    marginHorizontal: 24,
    marginBottom: 14,
    borderRadius: 18,
  },
  rotulo: {
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 2,
  },
  valorInfo: {
    color: '#6B7280',
    marginTop: 2,
  },
  botao: {
    backgroundColor: '#2E8B57',
    padding: 18,
    marginHorizontal: 24,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 4,
  },
  textoBotao: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linhaOpcoes: {
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 24,
    marginVertical: 12,
  },
  botaoOpcao: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  textoBotaoOpcao: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  activityIndicator: {
    marginVertical: 20,
  },
  nenhumTexto: {
    color: '#888',
  },
  servicoTitulo: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  servicoData: {
    color: '#666',
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalMessage: {
    color: '#444',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 6,
  },
});