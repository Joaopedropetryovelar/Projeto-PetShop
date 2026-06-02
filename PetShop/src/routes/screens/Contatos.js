import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

export default function Contatos({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.txtLogo}>
          Pet <Text style={styles.txtLogoVerde}>Shop</Text>
        </Text>
        <Text style={styles.subTitulo}>Seu pet, nossa paixão</Text>
      </View>

      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>

        <Text style={styles.bemVindo}>Contatos</Text>
        <Text style={styles.descricao}>Fale com a gente! Estamos aqui para ajudar</Text>

        <CardContato
          icone={<FontAwesome5 name="whatsapp" size={24} color="#22c55e" />}
          titulo="WhatsApp"
          info="(11) 98765-4321"
          sub="Atendimento rápido"
        />

        <CardContato
          icone={<Ionicons name="call-outline" size={24} color="#1bd14f" />}
          titulo="Telefone"
          info="(11) 3456-7890"
          sub="Seg a Sex, 8h às 18h"
        />

        <CardContato
          icone={<MaterialIcons name="email" size={24} color="#1bd14f" />}
          titulo="E-mail"
          info="contato@petshop.com.br"
          sub="Respondemos em até 24h"
        />

        <CardContato
          icone={<Ionicons name="location-outline" size={24} color="#1bd14f" />}
          titulo="Endereço"
          info="Rua das Patinhas, 123"
          sub="São Paulo/SP"
        />

        <View style={styles.cardHorario}>
          <Ionicons name="time-outline" size={26} color="#1bd14f" />
          <View style={{ marginLeft: 14 }}>
            <Text style={styles.horarioTitulo}>Horário de atendimento</Text>
            <Text style={styles.horarioTexto}>Segunda a Sexta: 8h às 18h</Text>
            <Text style={styles.horarioTexto}>Sábado: 8h às 13h</Text>
          </View>
        </View>

        <View style={{ height: 100 }} />

      </ScrollView>

  

    </SafeAreaView>
  );
}

function CardContato({ icone, titulo, info, sub }) {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.caixaIcone}>{icone}</View>

      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitulo}>{titulo}</Text>
        <Text style={styles.cardInfo}>{info}</Text>
        <Text style={styles.cardSub}>{sub}</Text>
      </View>

      <Ionicons name="chevron-forward" size={22} color="#ccc" />
    </TouchableOpacity>
  );
}

function ItemMenu({ icon, label, ativo, onPress }) {
  return (
    <TouchableOpacity style={styles.itemMenu} onPress={onPress}>
      <Ionicons name={icon} size={22} color={ativo ? "#1bd14f" : "#9ca3af"} />
      <Text style={[styles.labelMenu, ativo && { color: "#1bd14f" }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: 45,
    backgroundColor: "#000033",
  },

  header: {
    paddingHorizontal: 15,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtLogo: {
    fontSize: 38,
    fontWeight: "bold",
    color: '#ffffff',
    letterSpacing: 1,
  },
  txtLogoVerde: {
    color: '#1bd14f',
    fontSize: 38,
  },
  subTitulo: {
    fontSize: 13,
    color: '#aaa',
    marginTop: 4,
  },

  form: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    paddingHorizontal: 22,
  },

  bemVindo: {
    fontSize: 22,
    fontWeight: "bold",
    color: '#000033',
    marginBottom: 4,
  },
  descricao: {
    fontSize: 13,
    color: '#888',
    marginBottom: 24,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fff9',
    borderWidth: 1.5,
    borderColor: '#d0f0dc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    gap: 12,
  },
  caixaIcone: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#e8fdf0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitulo: {
    fontSize: 16,
    fontWeight: "700",
    color: '#000033',
  },
  cardInfo: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  cardSub: {
    fontSize: 12,
    color: '#1bd14f',
    fontWeight: '500',
    marginTop: 2,
  },

  cardHorario: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fff9',
    borderWidth: 1.5,
    borderColor: '#d0f0dc',
    borderRadius: 12,
    padding: 18,
    marginBottom: 14,
  },
  horarioTitulo: {
    fontSize: 15,
    fontWeight: "700",
    color: '#000033',
    marginBottom: 4,
  },
  horarioTexto: {
    fontSize: 13,
    color: '#555',
    marginTop: 2,
  },

  menuInferior: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 72,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderTopWidth: 1.5,
    borderColor: '#d0f0dc',
  },
  itemMenu: {
    alignItems: 'center',
  },
  labelMenu: {
    marginTop: 4,
    fontSize: 11,
    color: '#9ca3af',
    fontWeight: '500',
  },

});
