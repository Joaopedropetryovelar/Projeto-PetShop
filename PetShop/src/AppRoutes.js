import React from "react";
import { Image } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Login from "./routes/screens/Login";
import Cadastro from "./routes/screens/Cadastro";
import HomeScreen from "./routes/screens/HomeScreen";
import Contatos from "./routes/screens/Contatos";
import MeusPetsScreen from "./routes/screens/MeusPetsScreen";
import DetalhePetScreen from "./routes/screens/DetalhePetScreen";
import CadastroPetScreen from "./routes/screens/CadastroPetSreen";
import AgendamentoScreen from "./routes/screens/AgendamentoScreen";
import MeusAgendamentosScreen from "./routes/screens/MeusAgendamentosScreen";
import ServicoScreen from "./routes/screens/ServicoScreen";
import PagamentoScreen from "./routes/screens/PagamentoScreen";
import AdminScreen from "./routes/screens/AdminScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Pet Shop" 
        component={HomeScreen}
         options={{
          tabBarIcon: ({ size }) => (
            <Image
              source={require('../Sources/casa.png')}
              style={{ width: size, height: size }}
            />
          ),
        }}
        
      />
     <Tab.Screen
        name="Serviços"
        component={ServicoScreen}
        options={{
          tabBarIcon: ({ size }) => (
            <Image
              source={require('../Sources/patas.png')}
              style={{ width: size, height: size }}
            />
          ),
        }}
        
      />

       <Tab.Screen
        name="Contatos"
        component={Contatos}
         options={{
          tabBarIcon: ({ size }) => (
            <Image
              source={require('../Sources/telefone.png')}
              style={{ width: size, height: size }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
        />

        <Stack.Screen
          name="Principal"
          component={BottomTabs}
          options={{ headerShown: false }}
        />


        <Stack.Screen
          name="Meus Pets"
          component={MeusPetsScreen}
        />

        <Stack.Screen
          name="Informações Pet"
          component={DetalhePetScreen}
        />

        <Stack.Screen
          name="Cadastro Pet"
          component={CadastroPetScreen}
        />

        <Stack.Screen
          name="Agendar Horário"
          component={AgendamentoScreen}
        />

        <Stack.Screen
          name="Agendamentos"
          component={MeusAgendamentosScreen}
        />

        <Stack.Screen
          name="Pagamento"
          component={PagamentoScreen}
        />

        <Stack.Screen
          name="Admin"
          component={AdminScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}