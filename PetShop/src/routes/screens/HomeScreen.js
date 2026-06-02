import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function HomeScreen({ navigation }) {

  const petDestaque = { nome: 'Bolinha', raca: 'Golden Retriever' }; // ← dado fixo do pet

  return (
    <ScrollView style={styles.container}>
    
      <View style={styles.header}>
        <View>
          <Text style={styles.hello}>Olá</Text>
          <Text style={styles.subtitle}>Bem-vindo de volta</Text>
        </View>
      </View>


      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>
          Seu pet merece{'\n'}o melhor cuidado 🐶
        </Text>
        <TouchableOpacity style={styles.bannerButton} onPress={() => navigation.navigate('Agendamentos')}>
          <Text style={styles.bannerButtonText}>Agendar agora</Text>
        </TouchableOpacity>
      </View>

      {/* SERVIÇOS */}
      <Text style={styles.section}>Serviços</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={styles.serviceCard} onPress={() => navigation.navigate('Servicos')}>
          <Text style={styles.serviceEmoji}>🛁</Text>
          <Text style={styles.serviceText}>Banho</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.serviceCard} onPress={() => navigation.navigate('Servicos')}>
          <Text style={styles.serviceEmoji}>✂️</Text>
          <Text style={styles.serviceText}>Tosa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.serviceCard} onPress={() => navigation.navigate('Servicos')}>
          <Text style={styles.serviceEmoji}>💉</Text>
          <Text style={styles.serviceText}>Vacina</Text>
        </TouchableOpacity>
      </ScrollView>

     
      <View style={styles.rowTitle}>
        <Text style={styles.section}>Meus Pets</Text>
        <TouchableOpacity onPress={() => navigation.navigate('MeusPets')}>
          <Text style={styles.seeMore}>Ver todos</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.petCard}
        onPress={() => navigation.navigate('DetalhePet', { pet: petDestaque })} // ← corrigido
      >
        <View style={styles.petImage}>
          <Text style={{ fontSize: 30 }}>🐶</Text>
        </View>
        <View>
          <Text style={styles.petName}>{petDestaque.nome}</Text>
          <Text style={styles.petInfo}>{petDestaque.raca}</Text>
        </View>
      </TouchableOpacity>

    
      <Text style={styles.section}>Próximo Agendamento</Text>
      <View style={styles.scheduleCard}>
        <View>
          <Text style={styles.scheduleTitle}>Banho e Tosa</Text>
          <Text style={styles.scheduleInfo}>Quinta • 14:00</Text>
        </View>
        <Text style={styles.scheduleEmoji}>📅</Text>
      </View>

       <View style={styles.linhaContatos}>
          <Text style={styles.registerText}>Dúvida ? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Contatos')}>
            <Text style={styles.clique}>Clique aqui</Text>
            </TouchableOpacity>
        </View>

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

  header: {
    marginBottom: 30,
  },

  hello: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
  },

  subtitle: {
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

  bannerTitle: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 38,
  },

  bannerButton: {
    backgroundColor: '#FFF',
    marginTop: 22,
    alignSelf: 'flex-start',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 16,
  },

  bannerButtonText: {
    color: '#2E8B57',
    fontWeight: 'bold',
    fontSize: 16,
  },

  section: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#111827',
  },

  serviceCard: {
    width: 110,
    height: 120,
    backgroundColor: '#FFF',
    borderRadius: 24,
    marginRight: 16,

    justifyContent: 'center',
    alignItems: 'center',
  },

  serviceEmoji: {
    fontSize: 34,
    marginBottom: 12,
  },

  serviceText: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  rowTitle: {
    marginTop: 35,
    marginBottom: 10,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  seeMore: {
    color: '#2E8B57',
    fontWeight: 'bold',
  },

  petCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 20,

    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 35,
  },

  petImage: {
    width: 70,
    height: 70,
    backgroundColor: '#DCFCE7',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 18,
  },

  petName: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  petInfo: {
    color: '#6B7280',
    marginTop: 5,
  },

  scheduleCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  scheduleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  scheduleInfo: {
    color: '#6B7280',
    marginTop: 6,
  },

  scheduleEmoji: {
    fontSize: 34,
  },
  linhaContatos: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  registerText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#555',
    textAlign: 'center',
  },
  clique: {
    color: '#1bd14f',
    fontWeight: 'bold',
  }
});