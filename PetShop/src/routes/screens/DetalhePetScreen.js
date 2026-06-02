import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function DetalhePetScreen({
  route,
  navigation,
}) {
  const { pet } = route.params ?? {};
  const nome = pet?.nome ?? 'Sem nome';

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.petName}>
          {pet.nome}
        </Text>

        <Text style={styles.petRace}>
          {pet.raca} • {pet.sexo}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoBox}>
          <Text style={styles.infoNumber}>
            {pet.idade}
          </Text>

          <Text>Idade</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoNumber}>
            {pet.peso}
          </Text>

          <Text>Peso</Text>
        </View>
      </View>

      <Text style={styles.historyTitle}>
        Histórico
      </Text>

      <View style={styles.historyCard}>
        <Text>Banho • 10/05</Text>
      </View>

      <View style={styles.historyCard}>
        <Text>Vacina • 02/04</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate(
            'Agendamentos'
          )
        }
      >
        <Text style={styles.buttonText}>
          Agendar Serviço
        </Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7F5',
  },

  header: {
    backgroundColor: '#2E8B57',
    paddingTop: 90,
    paddingBottom: 50,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  petName: {
    fontSize: 30,
    color: '#FFF',
    fontWeight: 'bold',
  },

  petRace: {
    color: '#E5E7EB',
    marginTop: 8,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },

  infoBox: {
    backgroundColor: '#FFF',
    width: 120,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },

  infoNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  historyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 24,
  },

  historyCard: {
    backgroundColor: '#FFF',
    padding: 22,
    marginHorizontal: 24,
    borderRadius: 18,
    marginBottom: 16,
  },

  button: {
    backgroundColor: '#2E8B57',
    padding: 22,
    margin: 24,
    borderRadius: 18,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});