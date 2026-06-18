import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import { database } from '../../../FireBaseConfig';

export default function MeusAgendamentosScreen() {

  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);
  const [agendamento, setAgendamento] = useState(null);

  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [])
  );

  async function carregarDados() {
    try {
      setLoading(true);

      const uid = getAuth().currentUser?.uid;

      if (!uid) {
        return;
      }

      const resultado = await getDocs(
        query(
          collection(database, 'Agendamento'),
          where('uid', '==', uid)
        )
      );

      const dados = resultado.docs.map(item => ({
        id: item.id,
        ...item.data()
      }));

      setLista(dados);

    } catch (erro) {
      console.log('Erro:', erro);
    } finally {
      setLoading(false);
    }
  }

  async function excluirAgendamento() {
    try {
      await deleteDoc(
        doc(database, 'Agendamento', agendamento.id)
      );

      setLista(
        lista.filter(item => item.id !== agendamento.id)
      );

      setAgendamento(null);

    } catch (erro) {
      console.log('Erro ao excluir:', erro);
    }
  }

  if (loading) {
    return (
      <View style={styles.centralizador}>
        <ActivityIndicator
          size="large"
          color="#2E8B57"
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>

      <ScrollView style={styles.container}>

        <Text style={styles.titulo}>
          Meus Agendamentos
        </Text>

        {lista.length === 0 ? (

          <Text style={styles.semItens}>
            Nenhum agendamento encontrado.
          </Text>

        ) : (

          lista.map(item => (

            <View
              key={item.id}
              style={styles.card}
            >

              <View style={styles.cardTopo}>

                <Text style={styles.servico}>
                  {item.servico}
                </Text>

                <Text style={styles.preco}>
                  {item.preco}
                </Text>

              </View>

              <Text style={styles.info}>
                🐾 {item.nomePet}
              </Text>

              <Text style={styles.info}>
                📅 {item.data} às {item.horario}
              </Text>

              <TouchableOpacity
                style={styles.botaoCancelar}
                onPress={() => setAgendamento(item)}
              >
                <Text style={styles.textoCancelar}>
                  Cancelar
                </Text>
              </TouchableOpacity>

            </View>

          ))

        )}

      </ScrollView>

      <Modal
        visible={agendamento !== null}
        transparent
        animationType="fade"
      >
        <View style={styles.overlay}>

          <View style={styles.modal}>

            <Text style={styles.modalTitulo}>
              Cancelar Agendamento
            </Text>

            <Text style={styles.modalTexto}>
              Deseja cancelar este agendamento?
            </Text>

            <View style={styles.modalBotoes}>

              <TouchableOpacity
                style={styles.botaoVoltar}
                onPress={() => setAgendamento(null)}
              >
                <Text style={styles.textoVoltar}>
                  Voltar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botaoConfirmar}
                onPress={excluirAgendamento}
              >
                <Text style={styles.textoConfirmar}>
                  Confirmar
                </Text>
              </TouchableOpacity>

            </View>

          </View>

        </View>

      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F4F7F5',
    padding: 24,
    paddingTop: 70,
  },

  centralizador: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  semItens: {
    textAlign: 'center',
    fontSize: 16,
    color: '#777',
  },

  card: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
  },

  cardTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  servico: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  preco: {
    color: '#2E8B57',
    fontWeight: 'bold',
  },

  info: {
    marginBottom: 5,
    color: '#444',
  },

  botaoCancelar: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#EF4444',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },

  textoCancelar: {
    color: '#EF4444',
    fontWeight: 'bold',
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },

  modal: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 20,
  },

  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  modalTexto: {
    marginBottom: 20,
    color: '#444',
  },

  modalBotoes: {
    flexDirection: 'row',
  },

  botaoVoltar: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 5,
  },

  textoVoltar: {
    fontWeight: 'bold',
  },

  botaoConfirmar: {
    flex: 1,
    backgroundColor: '#EF4444',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 5,
  },

  textoConfirmar: {
    color: '#FFF',
    fontWeight: 'bold',
  },

});