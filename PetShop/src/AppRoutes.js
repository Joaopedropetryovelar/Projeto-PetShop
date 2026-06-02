import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Login from "./routes/screens/Login";
import Cadastro from "./routes/screens/Cadastro";
import Contatos from "./routes/screens/Contatos";
import HomeScreen from "./routes/screens/HomeScreen";
import MeusPetsScreen from "./routes/screens/MeusPetsScreen";
import DetalhePetScreen from "./routes/screens/DetalhePetScreen";
import CadastroPetScreen from "./routes/screens/CadastroPetSreen"; // typo no nome do arquivo
import AgendamentoScreen from "./routes/screens/AgendamentoScreen";
import ServicoScreen from "./routes/screens/ServicoScreen";
import PerfilPetScreen from "./routes/screens/PerfilPetScreen";

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Contatos" component={Contatos} />
        <Stack.Screen name="MeusPets" component={MeusPetsScreen} />
        <Stack.Screen name="DetalhePet" component={DetalhePetScreen} />
        <Stack.Screen name="CadastroPet" component={CadastroPetScreen} />
        <Stack.Screen name="Agendamentos" component={AgendamentoScreen} />
        <Stack.Screen name="Servicos" component={ServicoScreen} />
        <Stack.Screen name="PerfilPet" component={PerfilPetScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}