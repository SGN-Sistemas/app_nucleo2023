import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'


import ListaAgendamentos from '../listaAgendamentos';
import Chamados from './chamados'
import Responsaveis from './responsavel';
import Horarios from './horarios';

const Tab = createBottomTabNavigator();

const icons = {

  Chamado: {
    name: 'md-add'
  },
  Agendamentos: {
    name: 'md-calendar'
  },
  Chamados: {
    name: 'md-headset'
  },
  ChamadoDetalhe: {
    name: 'md-headset'
  },
  Responsaveis: {
    name: 'person-circle-outline'
  },
  Horarios: {
    name: "alarm-outline"
  }
};

export default function Home() {
  return (
    <Tab.Navigator
      initialRouteName='ChamadoDetalhe'
      independent={true}
      screenOptions={
        ({ route }) => ({
          tabBarStyle: {
            backgroundColor: '#E8C548',
            padding: 7,
            height: 60
          },
          tabBarShowLabel: true,
          tabBarLabelStyle: { paddingBottom: 7, fontSize: 12 },
          tabBarActiveTintColor: 'white',
          tabBarIcon: ({ color, size }) => {
            const { name } = icons[route.name];
            return <Icon name={name} color={color} size={size} />
          }
        })
      }
    >
      <Tab.Screen
        name="Agendamentos"
        component={ListaAgendamentos}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Chamados"
        component={Chamados}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="Responsaveis"
        component={Responsaveis}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Horarios"
        component={Horarios}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}