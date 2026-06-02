import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

export default function PerfilPetScreen({ route }) {
  const { nome, imagem } = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imagem }}
        style={styles.image}
      />

      <Text style={styles.nome}>
        {nome}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },

  nome: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});