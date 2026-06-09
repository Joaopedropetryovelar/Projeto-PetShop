import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { database } from '../../../FireBaseConfig';

export default function MeusPetsScreen({ navigation }) {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    buscarPets();
  }, []);

  async function buscarPets() {
    try {
      const auth = getAuth();
      const usuario = auth.currentUser;

      if (!usuario) return;

      // Filtra apenas os pets do usuário logado pelo campo uid
      const q = query(collection(database, 'Pets'), where('uid', '==', usuario.uid));
      const resultado = await getDocs(q);
      const lista = resultado.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPets(lista);
    } catch (erro) {
      console.log(erro);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Meus Pets</Text>

      {pets.length === 0 && (
        <Text style={styles.semPets}>Você ainda não cadastrou nenhum pet.</Text>
      )}

      {pets.map((pet) => (
        <TouchableOpacity
          key={pet.id}
          style={styles.card}
          onPress={() => navigation.navigate('Informações Pet', { pet })}
        >
          <View>
            <Text style={styles.nomePet}>{pet.nome}</Text>
            <Text style={styles.racaPet}>{pet.raca}</Text>
          </View>
          <Text style={styles.seta}>→</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Cadastro Pet')}>
        <Text style={styles.textoBotao}>+ Adicionar Pet</Text>
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
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  semPets: {
    color: '#6B7280',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 10,
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
  nomePet: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  racaPet: {
    color: '#6B7280',
    marginTop: 5,
  },
  seta: {
    fontSize: 28,
    color: '#94A3B8',
  },
  botao: {
    backgroundColor: '#2E8B57',
    padding: 22,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotao: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
