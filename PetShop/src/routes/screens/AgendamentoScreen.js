import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';

export default function AgendamentoScreen() {
  const [servico, setServico] = useState('');
  const [horario, setHorario] = useState('');

  function confirmarAgendamento() {
    if (!servico || !horario) {
      Alert.alert(
        'Erro',
        'Selecione serviço e horário'
      );

      return;
    }

    Alert.alert(
      'Sucesso ',
      `Agendamento de ${servico} às ${horario} confirmado!`
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        Agendamento 
      </Text>

      <Text style={styles.section}>
        Escolha o serviço
      </Text>

      <TouchableOpacity
        style={[
          styles.card,
          servico === 'Banho' &&
            styles.selected,
        ]}
        onPress={() =>
          setServico('Banho')
        }
      >
        <Text style={styles.cardText}>
          Banho
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.card,
          servico === 'Tosa' &&
            styles.selected,
        ]}
        onPress={() =>
          setServico('Tosa')
        }
      >
        <Text style={styles.cardText}>
          Tosa
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.card,
          servico === 'Vacina' &&
            styles.selected,
        ]}
        onPress={() =>
          setServico('Vacina')
        }
      >
        <Text style={styles.cardText}>
          Vacina
        </Text>
      </TouchableOpacity>


       <TouchableOpacity
        style={[
          styles.card,
          servico === 'Consulta' &&
            styles.selected,
        ]}
        onPress={() =>
          setServico('Consulta')
        }
      >
        <Text style={styles.cardText}>
          Consulta
        </Text>
      </TouchableOpacity>


        

      <Text style={styles.section}>
        Escolha um horário
      </Text>

      <View style={styles.row}>
        {[
          '09:00',
          '10:00',
          '11:00',
          '11:30',
          '13:30',
          '14:00',
          '14:30',
          '15:00',
          '15:30',
          '16:00'
        ].map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.timeCard,
              horario === item &&
                styles.selected,
            ]}
            onPress={() =>
              setHorario(item)
            }
          >
            <Text style={styles.cardText}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={confirmarAgendamento}
      >
        <Text style={styles.buttonText}>
          Confirmar Agendamento
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

  section: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 18,
    marginTop: 10,
  },

  card: {
    backgroundColor: '#FFF',
    padding: 22,
    borderRadius: 18,
    marginBottom: 16,
  },

  selected: {
    backgroundColor: '#2E8B57',
  },

  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  timeCard: {
    backgroundColor: '#FFF',
    width: '47%',
    padding: 20,
    borderRadius: 18,
    marginBottom: 16,
    alignItems: 'center',
  },

  button: {
    backgroundColor: '#2E8B57',
    padding: 22,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 50,
  },

  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});