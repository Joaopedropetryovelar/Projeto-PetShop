import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { Pets } from '../../Data/Pets';

export default function MeusPetsScreen({
  navigation,
}) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        Meus Pets 
      </Text>

      {Pets.map((pet) => (
        <TouchableOpacity
          key={pet.id}
          style={styles.card}
          onPress={() =>
            navigation.navigate(
              'DetalhePet',
              { pet }
            )
          }
        >
          <View>
            <Text style={styles.petName}>
              {pet.nome}
            </Text>

            <Text style={styles.petInfo}>
              {pet.raca}
            </Text>
          </View>

          <Text style={styles.arrow}>
            →
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.navigate(
            'CadastroPet'
          )
        }
      >
        <Text style={styles.addText}>
          + Adicionar Pet
        </Text>
      </TouchableOpacity>
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

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  card: {
    backgroundColor: '#FFF',
    padding: 24,
    borderRadius: 20,
    marginBottom: 18,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  petName: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  petInfo: {
    color: '#6B7280',
    marginTop: 5,
  },

  arrow: {
    fontSize: 28,
    color: '#94A3B8',
  },

  addButton: {
    backgroundColor: '#2E8B57',
    padding: 22,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
  },

  addText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});