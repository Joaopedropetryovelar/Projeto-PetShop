import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const listaServicos = [
  { emoji: '🛁', nome: 'Banho', descricao: 'Banho completo com produtos especiais', preco: 'R$ 50,00' },
  { emoji: '✂️', nome: 'Tosa', descricao: 'Tosa higiênica ou completa', preco: 'R$ 70,00' },
  { emoji: '💉', nome: 'Vacina', descricao: 'Vacinação com acompanhamento veterinário', preco: 'R$ 90,00' },
  { emoji: '🐾', nome: 'Consulta Vet', descricao: 'Consulta com veterinário especializado', preco: 'R$ 120,00' },
];

export default function ServicoScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Nossos Serviços</Text>
      <Text style={styles.subtitulo}>Escolha o melhor cuidado para o seu pet</Text>

      {listaServicos.map((item) => (
        <TouchableOpacity
          key={item.nome}
          style={styles.card}
          onPress={() => navigation.navigate('Agendar Horário')}
        >
          <Text style={styles.emoji}>{item.emoji}</Text>
          <View style={styles.info}>
            <Text style={styles.nomeServico}>{item.nome}</Text>
            <Text style={styles.descricao}>{item.descricao}</Text>
            <Text style={styles.preco}>{item.preco}</Text>
          </View>
          <Text style={styles.seta}>→</Text>
        </TouchableOpacity>
      ))}

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
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subtitulo: {
    color: '#6B7280',
    fontSize: 15,
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  emoji: {
    fontSize: 36,
  },
  info: {
    flex: 1,
  },
  nomeServico: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  descricao: {
    color: '#6B7280',
    fontSize: 13,
    marginTop: 3,
  },
  preco: {
    color: '#2E8B57',
    fontWeight: 'bold',
    marginTop: 5,
  },
  seta: {
    fontSize: 22,
    color: '#94A3B8',
  },
});