import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListaAgendamentos from "../listaAgendamentos";
import { EscolherPacientes } from "../EscolharPacientes";

const Stack = createNativeStackNavigator();
//EscolherPacientes
function Agendamentos() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="EscolherPacientes"
          component={EscolherPacientes}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ListaAgendamentos"
          component={ListaAgendamentos}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Agendamentos;
