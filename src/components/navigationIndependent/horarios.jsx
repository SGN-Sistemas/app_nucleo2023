import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Horarios from '../horario';
import Historico from '../historicoHorario';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Horarios} options={{headerShown: false }} />
        <Stack.Screen name="Historico" component={Historico} options={{title:'Historico' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App; 
