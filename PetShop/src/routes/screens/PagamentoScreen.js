import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Share,
  Alert,
  Clipboard
} from 'react-native';

import { doc, onSnapshot, updateDoc, serverTimestamp } from 'firebase/firestore';

import { database } from '../../../FireBaseConfig';

const CHAVE_PIX_FIXA = '10341637955';

export default function PagamentoScreen({ route, navigation }) {
  const {
    agendamentoId,
    servico,
    preco,
    data,
    hora,
    nomePet
  } = route?.params || {};

  const [status, setStatus] = useState('pendente_pagamento');
  const [carregando, setCarregando] = useState(true);
  const [jaInformou, setJaInformou] = useState(false);

  useEffect(() => {
    if (!agendamentoId) {
      setCarregando(false);
      return;
    }

    const referencia = doc(database, 'Agendamento', agendamentoId);

    const cancelarOuvinte = onSnapshot(
      referencia,
      snap => {
        const dados = snap.data();
        setStatus(dados?.status || 'confirmado');
        setJaInformou(!!dados?.pagamentoInformado);
        setCarregando(false);
      },
      erro => {
        console.log('Erro ao acompanhar pagamento:', erro);
        setCarregando(false);
      }
    );

    return () => cancelarOuvinte();
  }, [agendamentoId]);

  async function informarPagamento() {
    try {
      await updateDoc(doc(database, 'Agendamento', agendamentoId), {
        pagamentoInformado: true,
        informadoEm: serverTimestamp()
      });

      setJaInformou(true);

      Alert.alert(
        'Tudo certo!',
        'Avisamos o estabelecimento. Assim que o pagamento for confirmado, esta tela atualiza automaticamente.'
      );
    } catch (erro) {
      console.log('Erro ao informar pagamento:', erro);
      Alert.alert('Erro', 'Não foi possível registrar o aviso. Tente novamente.');
    }
  }

  function copiarChave() {
    try {
      Clipboard.setString(CHAVE_PIX_FIXA);
      Alert.alert('Copiado!', 'A chave Pix foi copiada.');
    } catch (erro) {
      console.log('Erro ao copiar:', erro);
    }
  }

  async function compartilharChave() {
    try {
      await Share.share({ message: CHAVE_PIX_FIXA });
    } catch (erro) {
      console.log('Erro ao compartilhar:', erro);
    }
  }

  if (carregando) {
    return (
      <View style={styles.centralizador}>
        <ActivityIndicator size="large" color="#2E8B57" />
      </View>
    );
  }

  if (!agendamentoId) {
    return (
      <View style={styles.centralizador}>
        <Text style={styles.semDados}>
          Não foi possível carregar os dados do pagamento.
        </Text>
      </View>
    );
  }

  if (status === 'confirmado') {
    return (
      <View style={styles.centralizador}>
        <Text style={styles.emojiGrande}>✅</Text>
        <Text style={styles.tituloSucesso}>Pagamento confirmado!</Text>
        <Text style={styles.textoSucesso}>
          Seu agendamento de {servico} para {nomePet} no dia {data} às {hora}{' '}
          está garantido.
        </Text>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('Principal')}
        >
          <Text style={styles.textoBotao}>Voltar para o início</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (status === 'cancelado') {
    return (
      <View style={styles.centralizador}>
        <Text style={styles.emojiGrande}>❌</Text>
        <Text style={styles.tituloSucesso}>Agendamento cancelado</Text>
        <Text style={styles.textoSucesso}>
          Este agendamento não foi confirmado. Caso tenha pago e isso seja um
          engano, entre em contato com o estabelecimento.
        </Text>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('Principal')}
        >
          <Text style={styles.textoBotao}>Voltar para o início</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Pagamento via Pix</Text>

      <View style={styles.resumo}>
        <View style={styles.linhaResumo}>
          <Text style={styles.labelResumo}>Serviço</Text>
          <Text style={styles.valorResumo}>{servico}</Text>
        </View>

        <View style={styles.linhaResumo}>
          <Text style={styles.labelResumo}>Pet</Text>
          <Text style={styles.valorResumo}>{nomePet}</Text>
        </View>

        <View style={styles.linhaResumo}>
          <Text style={styles.labelResumo}>Data</Text>
          <Text style={styles.valorResumo}>{data} às {hora}</Text>
        </View>

        <View style={[styles.linhaResumo, styles.linhaValorTotal]}>
          <Text style={styles.labelTotal}>Total</Text>
          <Text style={styles.valorTotal}>{preco}</Text>
        </View>
      </View>

      <Text style={styles.instrucao}>
        Abra o app do seu banco, escolha "Pix" → "Pagar com chave", cole a
        chave abaixo e digite o valor de {preco}.
      </Text>

      <Text style={styles.secaoPequena}>Chave Pix</Text>

      <View style={styles.codigoBox}>
        <Text style={styles.codigoTexto} selectable>
          {CHAVE_PIX_FIXA}
        </Text>
      </View>

      <TouchableOpacity style={styles.botaoSecundario} onPress={copiarChave}>
        <Text style={styles.textoBotaoSecundario}>Copiar chave</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoSecundario} onPress={compartilharChave}>
        <Text style={styles.textoBotaoSecundario}>Compartilhar chave</Text>
      </TouchableOpacity>

      <View style={styles.statusBox}>
        <ActivityIndicator size="small" color="#2E8B57" />
        <Text style={styles.statusTexto}>
          {jaInformou
            ? 'Aguardando a confirmação do estabelecimento...'
            : 'Aguardando o pagamento...'}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.botao, jaInformou && styles.botaoDesabilitado]}
        onPress={informarPagamento}
        disabled={jaInformou}
      >
        <Text style={styles.textoBotao}>
          {jaInformou ? 'Pagamento informado ✓' : 'Já fiz o pagamento'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.aviso}>
        A confirmação é feita manualmente pelo estabelecimento após verificar
        o recebimento. Esta tela atualiza sozinha quando isso acontecer.
      </Text>

      <View style={{ height: 50 }} />
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

  centralizador: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F7F5',
    padding: 30
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24
  },

  resumo: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 20,
    marginBottom: 24
  },

  linhaResumo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },

  labelResumo: {
    color: '#6B7280'
  },

  valorResumo: {
    fontWeight: 'bold',
    color: '#111827'
  },

  linhaValorTotal: {
    marginTop: 6,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    marginBottom: 0
  },

  labelTotal: {
    fontSize: 16,
    fontWeight: 'bold'
  },

  valorTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E8B57'
  },

  instrucao: {
    textAlign: 'center',
    color: '#6B7280',
    marginBottom: 24
  },

  secaoPequena: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 10
  },

  codigoBox: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 18,
    marginBottom: 14,
    alignItems: 'center'
  },

  codigoTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    letterSpacing: 1
  },

  botaoSecundario: {
    borderWidth: 1.5,
    borderColor: '#2E8B57',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 14
  },

  textoBotaoSecundario: {
    color: '#2E8B57',
    fontWeight: 'bold'
  },

  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF7E6',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    marginTop: 10,
    gap: 10
  },

  statusTexto: {
    color: '#92660A',
    fontWeight: '600'
  },

  botao: {
    backgroundColor: '#2E8B57',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 16
  },

  botaoDesabilitado: {
    backgroundColor: '#9CC6AC'
  },

  textoBotao: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  },

  aviso: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 12
  },

  emojiGrande: {
    fontSize: 60,
    marginBottom: 20
  },

  tituloSucesso: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center'
  },

  textoSucesso: {
    textAlign: 'center',
    color: '#6B7280',
    marginBottom: 30
  },

  semDados: {
    textAlign: 'center',
    color: '#777'
  }
});