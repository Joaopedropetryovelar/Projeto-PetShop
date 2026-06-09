import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.ola}>Olá</Text>
        <Text style={styles.subtitulo}>Bem-vindo de volta</Text>
      </View>

      <View style={styles.banner}>
        <Text style={styles.textoBanner}>Seu pet merece{'\n'}o melhor cuidado 🐶</Text>
        <TouchableOpacity style={styles.botaoBanner} onPress={() => navigation.navigate('Agendar Horário')}>
          <Text style={styles.textoBotaoBanner}>Agendar agora</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.linhaTitulo}>
        <Text style={styles.secao}>Meus Pets</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Meus Pets')}>
          <Text style={styles.verTodos}>Ver todos</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.cardPet} onPress={() => navigation.navigate('Meus Pets')}>
        <View style={styles.fotoPet}>
          <Text style={{ fontSize: 30 }}>🐶</Text>
        </View>
        <View>
          <Text style={styles.nomePet}>Meus pets</Text>
          <Text style={styles.racaPet}>Toque para ver</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoAgendamentos} onPress={() => navigation.navigate('Agendamentos')}>
        <Text style={styles.textoBotaoAgendamentos}>📋 Meus Agendamentos</Text>
      </TouchableOpacity>


      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7F5',
    paddingHorizontal: 24,
    paddingTop: 70,
  },
  cabecalho: {
    marginBottom: 30,
  },
  ola: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
  },
  subtitulo: {
    color: '#6B7280',
    marginTop: 6,
    fontSize: 16,
  },
  banner: {
    backgroundColor: '#2E8B57',
    borderRadius: 28,
    padding: 28,
    marginBottom: 35,
  },
  textoBanner: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 38,
  },
  botaoBanner: {
    backgroundColor: '#FFF',
    marginTop: 22,
    alignSelf: 'flex-start',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 16,
  },
  textoBotaoBanner: {
    color: '#2E8B57',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secao: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#111827',
  },
  cardServico: {
    width: 110,
    height: 120,
    backgroundColor: '#FFF',
    borderRadius: 24,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 34,
    marginBottom: 12,
  },
  nomeServico: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  linhaTitulo: {
    marginTop: 35,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  verTodos: {
    color: '#2E8B57',
    fontWeight: 'bold',
  },
  cardPet: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 35,
  },
  fotoPet: {
    width: 70,
    height: 70,
    backgroundColor: '#DCFCE7',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
  },
  nomePet: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  racaPet: {
    color: '#6B7280',
    marginTop: 5,
  },
  linhaContato: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  textoNormal: {
    fontSize: 15,
    color: '#555',
  },
  link: {
    color: '#1bd14f',
    fontWeight: 'bold',
  },
  botaoAgendamentos: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1.5,
    borderColor: '#2E8B57',
  },
  textoBotaoAgendamentos: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E8B57',
  },
});
