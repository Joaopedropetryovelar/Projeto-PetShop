import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import {
  collection,
  getDocs,
  doc,
  updateDoc,
} from 'firebase/firestore';

import { database } from '../../../FireBaseConfig';

export default function TelaAdminPagamento() {
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    carregarAgendamentos();
  }, []);

  async function carregarAgendamentos() {
    try {
      const snapshot = await getDocs(
        collection(database, 'Agendamento')
      );

      const lista = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));

      setAgendamentos(lista);
    } catch (error) {
      console.log(error);
    }
  }

  async function aprovarPagamento(id) {
    try {
      await updateDoc(
        doc(database, 'Agendamento', id),
        {
          statusPagamento: 'Pago',
        }
      );

      Alert.alert('Sucesso', 'Pagamento aprovado!');
      carregarAgendamentos();
    } catch (error) {
      console.log(error);
    }
  }

  async function recusarPagamento(id) {
    try {
      await updateDoc(
        doc(database, 'Agendamento', id),
        {
          statusPagamento: 'Recusado',
        }
      );

      Alert.alert('Sucesso', 'Pagamento recusado!');
      carregarAgendamentos();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Gerenciar Pagamentos
      </Text>

      <FlatList
        data={agendamentos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (

          <View style={styles.card}>
            <Text>Cliente: {item.nomeUsuario}</Text>
            
            <Text>Pet: {item.nomePet}</Text>

            <Text>
              Serviço: {item.servico}
            </Text>

            <Text>
              Data: {item.data}
            </Text>

            <Text>
              Horário: {item.horario}
            </Text>

            <Text>
              Valor: R$ {item.preco}
            </Text>

            <Text>
              Status: {item.statusPagamento}
            </Text>

            {item.statusPagamento === 'Pendente' && (
              <View style={styles.botoes}>
                <TouchableOpacity
                  style={styles.aprovar}
                  onPress={() =>
                    aprovarPagamento(item.id)
                  }
                >
                  <Text style={styles.textoBotao}>
                    Aprovar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.recusar}
                  onPress={() =>
                    recusarPagamento(item.id)
                  }
                >
                  <Text style={styles.textoBotao}>
                    Recusar
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
  },

  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  aprovar: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
    width: '45%',
  },

  recusar: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    width: '45%',
  },

  textoBotao: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});