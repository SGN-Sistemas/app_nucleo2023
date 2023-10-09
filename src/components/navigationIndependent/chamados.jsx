import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Chamado from '../listaChamados';
import Chamado_detalhe from '../chamadoDetalhe';
import Responder_chamado from '../responderChamado';
import AddChamado from '../AddChamado';
import ListaDepartamentos from '../listaDepartamentos';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={ListaDepartamentos} options={{headerShown: false }} />
        <Stack.Screen name="Chamados" component={Chamado} options={{headerShown: false }} />
        <Stack.Screen name="Chamado_detalhe" options={{title:'Detalhe' }} component={Chamado_detalhe} />
        <Stack.Screen name="Responder_chamado" options={{title:'Responder' }} component={Responder_chamado} />
        <Stack.Screen name="AddChamado" options={{title:'Novo chamado' }}  component={AddChamado} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;