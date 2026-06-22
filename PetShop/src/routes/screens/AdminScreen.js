import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Modal
} from 'react-native';

import {
  collection,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import { database } from '../../../FireBaseConfig';

const ABAS = [
  { chave: 'pendente_pagamento', titulo: 'Pendentes' },
  { chave: 'confirmado', titulo: 'Confirmados' },
  { chave: 'todos', titulo: 'Todos' }
];

export default function AdminScreen({ navigation }) {
  const [verificandoAcesso, setVerificandoAcesso] = useState(true);
  const [ehAdmin, setEhAdmin] = useState(false);
  const [lista, setLista] = useState([]);
  const [carregandoLista, setCarregandoLista] = useState(true);
  const [aba, setAba] = useState('pendente_pagamento');
  const [modalVisible, setModalVisible] = useState(false);
  const [agendamentoSelecionado, setAgendamentoSelecionado] = useState(null);

  useEffect(() => {
    verificarAcesso();
  }, []);

  async function verificarAcesso() {
    try {
      const usuario = getAuth().currentUser;

      if (!usuario) {
        setEhAdmin(false);
        setVerificandoAcesso(false);
        return;
      }

      const adminDoc = await getDoc(doc(database, 'Admins', usuario.uid));
      setEhAdmin(adminDoc.exists());

    } catch (erro) {
      console.log('Erro ao verificar acesso de admin:', erro);
      setEhAdmin(false);
    } finally {
      setVerificandoAcesso(false);
    }
  }

  useEffect(() => {
    if (!ehAdmin) {
      return;
    }

    const cancelarOuvinte = onSnapshot(
      collection(database, 'Agendamento'),
      snapshot => {
        const dados = snapshot.docs.map(item => ({
          id: item.id,
          ...item.data()
        }));

        dados.sort((a, b) => {
          const statusA = a.status || 'confirmado';
          const statusB = b.status || 'confirmado';

          if (statusA === statusB) return 0;
          if (statusA === 'pendente_pagamento') return -1;
          if (statusB === 'pendente_pagamento') return 1;
          return 0;
        });

        setLista(dados);
        setCarregandoLista(false);
      },
      erro => {
        console.log('Erro ao carregar agendamentos:', erro);
        setCarregandoLista(false);
      }
    );

    return () => cancelarOuvinte();
  }, [ehAdmin]);

  async function confirmarPagamento(item) {
    try {
      await updateDoc(doc(database, 'Agendamento', item.id), {
        status: 'confirmado',
        confirmadoEm: serverTimestamp()
      });
    } catch (erro) {
      console.log('Erro ao confirmar pagamento:', erro);
      Alert.alert('Erro', 'Não foi possível confirmar o pagamento.');
    }
  }

  function recusarAgendamento(item) {
    setAgendamentoSelecionado(item);
    setModalVisible(true);
  }

  function fecharModal() {
    setModalVisible(false);
    setAgendamentoSelecionado(null);
  }

  async function confirmarCancelamento() {
    try {
      await updateDoc(
        doc(database, 'Agendamento', agendamentoSelecionado.id),
        {
          status: 'cancelado'
        }
      );

      setModalVisible(false);
      setAgendamentoSelecionado(null);

    } catch (erro) {
      console.log('Erro ao cancelar:', erro);
      Alert.alert('Erro', 'Não foi possível cancelar o agendamento.');
    }
  }

  if (verificandoAcesso) {
    return (
      <View style={styles.centralizador}>
        <ActivityIndicator size="large" color="#2E8B57" />
      </View>
    );
  }

  if (!ehAdmin) {
    return (
      <View style={styles.centralizador}>
        <Text style={styles.emojiGrande}>🔒</Text>
        <Text style={styles.tituloRestrito}>Acesso restrito</Text>
        <Text style={styles.textoRestrito}>
          Esta área é exclusiva para administradores do Pet Shop.
        </Text>

        <TouchableOpacity
          style={styles.botaoVoltarRestrito}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.textoBotaoVoltar}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const listaFiltrada = lista.filter(item => {
    const status = item.status || 'confirmado';
    if (aba === 'todos') return true;
    return status === aba;
  });

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text style={styles.titulo}>Painel Administrativo</Text>
        <Text style={styles.subtitulo}>Confirmação manual de pagamentos</Text>

        <View style={styles.linhaAbas}>
          {ABAS.map(item => (
            <TouchableOpacity
              key={item.chave}
              style={[styles.aba, aba === item.chave && styles.abaSelecionada]}
              onPress={() => setAba(item.chave)}
            >
              <Text
                style={[
                  styles.textoAba,
                  aba === item.chave && styles.textoAbaSelecionada
                ]}
              >
                {item.titulo}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {carregandoLista ? (
          <ActivityIndicator size="large" color="#2E8B57" />
        ) : listaFiltrada.length === 0 ? (
          <Text style={styles.semItens}>Nenhum agendamento aqui.</Text>
        ) : (
          listaFiltrada.map(item => {
            const status = item.status || 'confirmado';

            return (
              <View key={item.id} style={styles.card}>
                <View style={styles.cardTopo}>
                  <Text style={styles.servico}>{item.servico}</Text>
                  <Text style={styles.preco}>{item.preco}</Text>
                </View>

                <Text style={styles.info}>🐾 {item.nomePet}</Text>
                <Text style={styles.info}>
                  📅 {item.data} às {item.horario}
                </Text>

                {item.Profissional?.nome ? (
                  <Text style={styles.info}>
                    👤 {item.Profissional.nome}
                  </Text>
                ) : null}

                {item.emailCliente ? (
                  <Text style={styles.info}>✉️ {item.emailCliente}</Text>
                ) : null}

                <View
                  style={[
                    styles.badge,
                    status === 'pendente_pagamento' && styles.badgePendente,
                    status === 'confirmado' && styles.badgeConfirmado,
                    status === 'cancelado' && styles.badgeCancelado
                  ]}
                >
                  <Text style={styles.textoBadge}>
                    {status === 'pendente_pagamento' && 'Pagamento pendente'}
                    {status === 'confirmado' && 'Confirmado'}
                    {status === 'cancelado' && 'Cancelado'}
                  </Text>
                </View>

                {item.pagamentoInformado && status === 'pendente_pagamento' ? (
                  <Text style={styles.avisoCliente}>
                    O cliente avisou que já efetuou o pagamento.
                  </Text>
                ) : null}

                {status === 'pendente_pagamento' && (
                  <View style={styles.linhaBotoes}>
                    <TouchableOpacity
                      style={styles.botaoRecusar}
                      onPress={() => recusarAgendamento(item)}
                    >
                      <Text style={styles.textoRecusar}>Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.botaoConfirmar}
                      onPress={() => confirmarPagamento(item)}
                    >
                      <Text style={styles.textoConfirmar}>
                        Confirmar pagamento
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          })
        )}

        <View style={{ height: 50 }} />
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={fecharModal}
      >
        <View style={styles.modalFundo}>
          <View style={styles.modalCaixa}>
            <Text style={styles.modalTitulo}>Cancelar agendamento?</Text>

            {agendamentoSelecionado ? (
              <Text style={styles.modalTexto}>
                Tem certeza que deseja cancelar o agendamento de{' '}
                <Text style={{ fontWeight: 'bold' }}>
                  {agendamentoSelecionado.servico}
                </Text>{' '}
                para o pet{' '}
                <Text style={{ fontWeight: 'bold' }}>
                  {agendamentoSelecionado.nomePet}
                </Text>{' '}
                em {agendamentoSelecionado.data} às{' '}
                {agendamentoSelecionado.horario}?
              </Text>
            ) : null}

            <View style={styles.modalLinhaBotoes}>
              <TouchableOpacity
                style={styles.modalBotaoNao}
                onPress={fecharModal}
              >
                <Text style={styles.modalTextoNao}>Não</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalBotaoSim}
                onPress={confirmarCancelamento}
              >
                <Text style={styles.modalTextoSim}>Sim, cancelar</Text>
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
    paddingTop: 70
  },

  centralizador: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F7F5',
    padding: 30
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold'
  },

  subtitulo: {
    color: '#6B7280',
    marginBottom: 20
  },

  linhaAbas: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 6,
    marginBottom: 20
  },

  aba: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center'
  },

  abaSelecionada: {
    backgroundColor: '#2E8B57'
  },

  textoAba: {
    fontWeight: 'bold',
    color: '#6B7280'
  },

  textoAbaSelecionada: {
    color: '#FFF'
  },

  semItens: {
    textAlign: 'center',
    color: '#777',
    marginTop: 20
  },

  card: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 20,
    marginBottom: 15
  },

  cardTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },

  servico: {
    fontSize: 18,
    fontWeight: 'bold'
  },

  preco: {
    color: '#2E8B57',
    fontWeight: 'bold'
  },

  info: {
    marginBottom: 5,
    color: '#444'
  },

  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginTop: 8,
    marginBottom: 4
  },

  badgePendente: {
    backgroundColor: '#FFF1C2'
  },

  badgeConfirmado: {
    backgroundColor: '#DCFCE7'
  },

  badgeCancelado: {
    backgroundColor: '#FEE2E2'
  },

  textoBadge: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#444'
  },

  avisoCliente: {
    fontSize: 12,
    color: '#92660A',
    marginBottom: 8
  },

  linhaBotoes: {
    flexDirection: 'row',
    marginTop: 10
  },

  botaoRecusar: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#EF4444',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginRight: 8
  },

  textoRecusar: {
    color: '#EF4444',
    fontWeight: 'bold'
  },

  botaoConfirmar: {
    flex: 1.4,
    backgroundColor: '#2E8B57',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center'
  },

  textoConfirmar: {
    color: '#FFF',
    fontWeight: 'bold'
  },

  emojiGrande: {
    fontSize: 50,
    marginBottom: 16
  },

  tituloRestrito: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10
  },

  textoRestrito: {
    textAlign: 'center',
    color: '#6B7280',
    marginBottom: 24
  },

  botaoVoltarRestrito: {
    backgroundColor: '#2E8B57',
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 16
  },

  textoBotaoVoltar: {
    color: '#FFF',
    fontWeight: 'bold'
  },

  modalFundo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24
  },

  modalCaixa: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 24,
    width: '100%'
  },

  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12
  },

  modalTexto: {
    color: '#444',
    marginBottom: 20,
    lineHeight: 20
  },

  modalLinhaBotoes: {
    flexDirection: 'row'
  },

  modalBotaoNao: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginRight: 8
  },

  modalTextoNao: {
    color: '#444',
    fontWeight: 'bold'
  },

  modalBotaoSim: {
    flex: 1.4,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center'
  },

  modalTextoSim: {
    color: '#FFF',
    fontWeight: 'bold'
  }
});