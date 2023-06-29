
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListaResponsaveis from '../listaResponsaveis';
import AddResponsavel from '../addResponsavel';
import EditResponsaveis from '../editResponsaveis';
import PerfilResponsaveis from '../perfilResp';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={ListaResponsaveis} options={{headerShown: false }} />
        <Stack.Screen name="AddResponsavel" component={AddResponsavel} options={{title:'Novo responsavel' }}/>
        <Stack.Screen name="EditResponsaveis" component={EditResponsaveis} options={{title:'Editar responsavel' }}/>
        <Stack.Screen name="PerfilResponsaveis" component={PerfilResponsaveis} options={{title:'Perfil responsavel' }}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App; 
