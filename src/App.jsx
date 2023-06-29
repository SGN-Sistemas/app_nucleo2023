import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./components/login/";
import PreLogin from "./components/preLogin";
import RecuperarSenha from "./components/recuperarSenha";
import Home from "./components/navigationIndependent/home";
import { AuthContext } from "./contexts/ContextApi";

const App = () => {
  const Stack = createNativeStackNavigator();

  const [idUser, setIdUser] = useState("")
  const [modalResp, setModalResp] = useState(false)
  const [codPessoa, setCodPessoa] = useState("")
  const [idEmpresa, setIdEmpresa] = useState("")
  const [codigoUsuario, setCodigoUsuario] = useState("")
  const [atualizaResp,setAtualizaResp] = useState(0)
  const [atualizaChamado,setAtualizaChamado] = useState(false)
  const [atualizaChamadoDetalhe,setAtualizaChamadoDetalhe] = useState(false)
  const [horarioAlert12H, setHorarioAlert12H] = useState(false)
  const [att,setAtt] = useState(false)
  return (
<AuthContext.Provider value={{idUser, setIdUser, codPessoa, setCodPessoa, idEmpresa, setIdEmpresa,atualizaResp,
      setAtualizaResp, atualizaChamado, setAtualizaChamado, atualizaChamadoDetalhe, setAtualizaChamadoDetalhe, codigoUsuario, setCodigoUsuario, modalResp, setModalResp, horarioAlert12H, setHorarioAlert12H, att, setAtt
}}>
    <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="PreLogin"
              component={PreLogin}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RecuperarSenha"
              component={RecuperarSenha}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
    </NavigationContainer>
</AuthContext.Provider>
  );
}

export default App;