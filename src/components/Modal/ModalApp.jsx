import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from '../../contexts/ContextApi.jsx';

import React, { useState,useContext } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput
} from "react-native";

import { AntDesign, Feather } from "@expo/vector-icons";
import * as Linking from 'expo-linking';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "../../utils/url.js";

function ModalAppConfirma({ fechar, texto, textoBotao }) {
  const confirma = () => {
    fechar();
  };

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <Image
          style={styles.img}
          source={require("../../assets/checked.png")}
        />

        <Text style={styles.texto}>{texto}</Text>

        <TouchableOpacity style={styles.containerBotao} onPress={confirma}>
          <Text style={styles.textoBotao}>{textoBotao}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ModalAppErro({ fechar, texto, textoBotao }) {
  const error = () => {
    fechar();
  };

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <Image
          style={styles.img}
          source={require("../../assets/x-button.png")}
        />

        <Text style={styles.texto}>{texto}</Text>

        <TouchableOpacity style={styles.containerBotao} onPress={error}>
          <Text style={styles.textoBotao}>{textoBotao}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ModalAlertHorario({ fechar, modalOpen }) {
  const error = () => {
    
    fechar();
    modalOpen();

  };

  const close = () => {

    fechar();

  }

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <Image
          style={styles.img}
          source={require("../../assets/x-button.png")}
        />

        <Text style={styles.textoAlertHorario}>Sera cobrado o valor integral por está sendo cancelado menos de 12 horas antes da consulta </Text>

        <Text style={styles.texto}>
          
          Prosseguir com o cancelamento?

        </Text>

        <View style={styles.btnAreaNaoConf}>
          <TouchableOpacity
            style={styles.containerBotaoAgenNao}
            onPress={close}
          >
            <Text style={styles.textoBotaoAgen}>Não</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.containerBotaoAgenSim}
            onPress={error}
          >
            <Text style={styles.textoBotaoAgen}>Sim</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function ModalEnviaMotivo({ fechar,obj,abrir}) {

  const [inputMotivo,setInputMotivo] = useState("");

  const {idUser, setIdUser} = useContext(AuthContext);

  const error = () => {
    fechar();
  };

  const abrirAlert = () =>{

    abrir();

  }
  
  const enviarMotivoCancel = () =>{

    let count = 0;

    if(count == 0 ){

      enviarMotivo();

      count++;

    }

  

  }

  const enviarMotivo = async () => {

    await fetch( url + "cancelaAgendamento", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
      },
      body: JSON.stringify({
        
        "id_agendamento":obj.id,
        "motivo":inputMotivo,
        "idUser":idUser,
      }),
    })
    .then((response)=>{

      response.json();
      
    })
    .then((resp) => {

      error();

      abrirAlert();

    })
    .catch((error)=>{

    })

  }

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <Image
          style={styles.img}
          source={require("../../assets/x-button.png")}
        />
        <Text style={styles.texto}>Motivo do cancelamento?</Text>
        <TextInput
        style={styles.textInput}
          multiline={true}
          numberOfLines={4}
          maxLength={100}
          placeholder="Digite o motivo do cancelamento"
          onChangeText={setInputMotivo}
          value={inputMotivo}
        />
        <TouchableOpacity style={styles.containerBotao} onPress={enviarMotivoCancel}>
          <Text style={styles.textoBotao}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ModalAppConfirmaAgendamento({
  funcao,
  dataFormatada,
  horaFormatada,
  textoBotao,
  clinica,
  fechar,
  obj,
  abrirAlert
}) {
  const [accessToken, setAccessToken] = useState()
  const { att, setAtt } = useContext(AuthContext)
  const confirma = async () => {
    await fetch("https://api.ninsaude.com/v1/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
      },
      body: "grant_type=refresh_token&refresh_token=85f138ae6922c4b4101c6eec60ebf53e18f6d342eb1c5c84940a0e0d0fed65c93366e19253ada67819e1e3e15e24a0bf88254e2ce64bcda741cc63c501b51670",
    })
      .then((resp) => resp.json())
      .then((json) => {
        setAccessToken(() => json.access_token);
        let token = json.access_token;
        fetch(
          "https://api.ninsaude.com/v1/atendimento_agenda/alterar/status/agendamento/" +
            obj.id,
          {
            method: "PUT",
            headers: {
              'Authorization': 'bearer '+token,
              "Content-Type": "application/json",
              "cache-control": "no-cache",
            },
            body: JSON.stringify( {
              "id": obj.id,
              "accountUnidadeId": obj.accountUnidadeId,
              "accountUnidadeUnidade": obj.accountUnidadeUnidade,
              "accountUnidadeDescricao": obj.accountUnidadeDescricao,
              "profissionalId": obj.profissionalId,
              "profissionalNome": obj.profissionalNome,
              "profissionalAgendaCor": obj.profissionalAgendaCor,
              "profissionalAtivo": obj.profissionalAtivo,
              "profissionalFoto": obj.profissionalFoto,
              "data": obj.data,
              "horaInicial": obj.horaInicial,
              "horaFinal": obj.horaFinal,
              "horaChegada": obj.horaChegada,
              "pacienteId":obj.pacienteId,
              "pacienteNome": obj.pacienteNome,
              "pacienteNomeSocial": obj.pacienteNomeSocial,
              "pacienteEmail": obj.pacienteEmail,
              "pacienteDataNascimento": obj.pacienteDataNascimento,
              "pacienteSexo": obj.pacienteSexo,
              "pacienteProfissao": obj.pacienteProfissao,
              "pacienteFoneCelular": obj.pacienteFoneCelular,
              "pacienteFoneComercial": obj.pacienteFoneComercial,
              "pacienteFoneResidencial": obj.pacienteFoneResidencial,
              "pacienteFoto": obj.pacienteFoto,
              "status": 2,
              "convenioId": obj.convenioId,
              "convenioTitulo": obj.convenioTitulo,
              "convenioPlanoId": obj.convenioPlanoId,
              "convenioPlanoDescricao": obj.convenioPlanoDescricao,
              "convenioCarteira": obj.convenioCarteira,
              "convenioValidade": obj.convenioValidade,
              "servicoId": obj.servicoId,
              "servicoDescricao": obj.servicoDescricao,
              "especialidadeId": obj.especialidadeId,
              "especialidadeDescricao": obj.especialidadeDescricao,
              "encaminhadorId": obj.encaminhadorId,
              "encaminhadorNome": obj.encaminhadorNome,
              "salaId": obj.salaId,
              "salaDescricao": obj.salaDescricao,
              "salaAgendaCor": obj.salaAgendaCor,
              "hashRecurso": obj.hashRecurso,
              "acompanhanteNome": obj.acompanhanteNome,
              "acompanhanteTelefone": obj.acompanhanteTelefone,
              "servicoAdicionalId": obj.servicoAdicionalId,
              "tempoEspera": obj.tempoEspera,
              "canceladoProximoAgendamentoData": obj.canceladoProximoAgendamentoData,
              "prontuarioData": obj.prontuarioData,
              "prontuarioDuracao": obj.prontuarioDuracao,
              "prontuarioHoraInicial": obj.prontuarioHoraInicial,
              "prontuarioEncerrado": obj.prontuarioEncerrado,
              "enviadoConfirmacao": obj.enviadoConfirmacao,
          }),
          }
        )
          .then(async () => {
            const lgn = await AsyncStorage.getItem('login')

            fetch(url + "inserirLog", {
              method: "POST",
              body: JSON.stringify({
                'LOAC_ACESSO_APP_ID': idUser,
                'LOAC_TIPO': 'CONF',
                'LOAC_PRAZO_12H': 'N',
                'LOAC_ID_AGENDAMENTO': obj.id,
                'USER_NAME': lgn,
              })
            })
              .then(() => {
                setAtt(!att)
              })
              .catch(() => {
              })
            abrirAlert();
          })
          .catch((error) => alert("error: " + error));
      }
      ).catch((error) => alert('error: ' + error));
      fecharr();
  };
  const fecharr = () => {
    fechar();
  };

  return (
    <View style={styles.containerAgen}>
      <View style={styles.modalAgen}>
        <TouchableOpacity style={styles.iconConf} onPress={fecharr}>
          <Feather name="x" size={24} color="black" />
        </TouchableOpacity>
        <Image
          style={styles.imgAgen}
          source={require("../../assets/checked.png")}
        />

        <Text style={styles.textoAgen}>Confirmar presença?</Text>

        <Text style={styles.textoAgen}>
          Dia {dataFormatada} ás {horaFormatada}
        </Text>

        <Text style={styles.texto2Agen}>
          Endereço: AV PROF MAGALHÃES NETO,N 1450 - SALA 103 PITUBA -
          SALVADOR/BA
        </Text>

        <Text style={styles.texto2Agen}>Clínica: {clinica}</Text>

        <TouchableOpacity style={styles.containerBotaoAgen} onPress={confirma}>
          <Text style={styles.textoBotaoAgen}>{textoBotao}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
function ModalAlertConf({ modalOpen, modalCovid, textoBotao, texto }) {
  
  const confirma = () => {
    modalOpen();
    modalCovid();
  };

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <Image
          style={styles.img}
          source={require("../../assets/checked.png")} />  

        <Text style={styles.texto}>{texto}</Text>

        <TouchableOpacity style={styles.containerBotao} onPress={confirma}>
          <Text style={styles.textoBotao}>{textoBotao}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
function ModalAppNaoConfirmaAgendamento({
  fechar,
  dataFormatada,
  horaFormatada,
  clinica,
  abrirAlert
}) {

  const close = () => {
    fechar();
  };

  return (
    <View style={styles.containerAgen}>
      <View style={styles.modalAgen}>
        <Image
          style={styles.img}
          source={require("../../assets/x-button.png")}
        />

        <Text style={styles.textoAgen}>Cancelar presença?</Text>

        <Text style={styles.textoAgen}>
          Dia {dataFormatada} ás {horaFormatada}
        </Text>

        <Text style={styles.texto2Agen}>
          Endereço: AV PROF MAGALHÃES NETO,N 1450 - SALA 103 PITUBA -
          SALVADOR/BA
        </Text>

        <Text style={styles.texto2Agen}>Clínica: {clinica}</Text>
        <View style={styles.btnAreaNaoConf}>
          <TouchableOpacity
            style={styles.containerBotaoAgenNao}
            onPress={close}
          >
            <Text style={styles.textoBotaoAgen}>Não</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.containerBotaoAgenSim}
            onPress={() => { abrirAlert }}
          >
            <Text style={styles.textoBotaoAgen}>Sim</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
function ModalAlertNaoConf({ modalOpen, texto, textoBotao }) {
  const error = () => {
    modalOpen();
  };

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <Image
          style={styles.img}
          source={require("../../assets/x-button.png")}
        />

        <Text style={styles.texto}>{texto}</Text>

        <TouchableOpacity style={styles.containerBotao} onPress={error}>
          <Text style={styles.textoBotao}>{textoBotao}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ModalAlertConfCanc({ modalOpen, abrirAlert,obj }) {
  const fechar = () => {
    modalOpen();
  };

  const { horarioAlert12H, idUser,att,setAtt } = useContext(AuthContext)


  const confirma = async () => {
    await fetch("https://api.ninsaude.com/v1/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
      },
      body: "grant_type=refresh_token&refresh_token=85f138ae6922c4b4101c6eec60ebf53e18f6d342eb1c5c84940a0e0d0fed65c93366e19253ada67819e1e3e15e24a0bf88254e2ce64bcda741cc63c501b51670",
    })
      .then((resp) => resp.json())
      .then((json) => {
        let token = json.access_token;
        fetch(
          "https://api.ninsaude.com/v1/atendimento_agenda/alterar/status/agendamento/" +
          obj.id,
          {
            method: "PUT",
            headers: {
              'Authorization': 'bearer ' + token,
              "Content-Type": "application/json",
              "cache-control": "no-cache",
            },
            body: JSON.stringify({
              "id": obj.id,
              "accountUnidadeId": obj.accountUnidadeId,
              "accountUnidadeUnidade": obj.accountUnidadeUnidade,
              "accountUnidadeDescricao": obj.accountUnidadeDescricao,
              "profissionalId": obj.profissionalId,
              "profissionalNome": obj.profissionalNome,
              "profissionalAgendaCor": obj.profissionalAgendaCor,
              "profissionalAtivo": obj.profissionalAtivo,
              "profissionalFoto": obj.profissionalFoto,
              "data": obj.data,
              "horaInicial": obj.horaInicial,
              "horaFinal": obj.horaFinal,
              "horaChegada": obj.horaChegada,
              "pacienteId": obj.pacienteId,
              "pacienteNome": obj.pacienteNome,
              "pacienteNomeSocial": obj.pacienteNomeSocial,
              "pacienteEmail": obj.pacienteEmail,
              "pacienteDataNascimento": obj.pacienteDataNascimento,
              "pacienteSexo": obj.pacienteSexo,
              "pacienteProfissao": obj.pacienteProfissao,
              "pacienteFoneCelular": obj.pacienteFoneCelular,
              "pacienteFoneComercial": obj.pacienteFoneComercial,
              "pacienteFoneResidencial": obj.pacienteFoneResidencial,
              "pacienteFoto": obj.pacienteFoto,
              "status": 5,
              "convenioId": obj.convenioId,
              "convenioTitulo": obj.convenioTitulo,
              "convenioPlanoId": obj.convenioPlanoId,
              "convenioPlanoDescricao": obj.convenioPlanoDescricao,
              "convenioCarteira": obj.convenioCarteira,
              "convenioValidade": obj.convenioValidade,
              "servicoId": obj.servicoId,
              "servicoDescricao": obj.servicoDescricao,
              "especialidadeId": obj.especialidadeId,
              "especialidadeDescricao": obj.especialidadeDescricao,
              "encaminhadorId": obj.encaminhadorId,
              "encaminhadorNome": obj.encaminhadorNome,
              "salaId": obj.salaId,
              "salaDescricao": obj.salaDescricao,
              "salaAgendaCor": obj.salaAgendaCor,
              "hashRecurso": obj.hashRecurso,
              "acompanhanteNome": obj.acompanhanteNome,
              "acompanhanteTelefone": obj.acompanhanteTelefone,
              "servicoAdicionalId": obj.servicoAdicionalId,
              "tempoEspera": obj.tempoEspera,
              "canceladoProximoAgendamentoData": obj.canceladoProximoAgendamentoData,
              "prontuarioData": obj.prontuarioData,
              "prontuarioDuracao": obj.prontuarioDuracao,
              "prontuarioHoraInicial": obj.prontuarioHoraInicial,
              "prontuarioEncerrado": obj.prontuarioEncerrado,
              "enviadoConfirmacao": obj.enviadoConfirmacao,
            }),
          }
        )
          .then(async () => {
            const lgn = await AsyncStorage.getItem('login')

            fetch( url+"inserirLog", {
              method: "POST",
              body: JSON.stringify({
                'LOAC_ACESSO_APP_ID': idUser,
                'LOAC_TIPO': 'CANC',
                'LOAC_PRAZO_12H': horarioAlert12H,
                'LOAC_ID_AGENDAMENTO': obj.id,
                'USER_NAME': lgn,
              })
            })
              .then(() => {
                setAtt(!att)
              })
              .catch(() => {
              })

            abrirAlert();
            fechar();

          })
          .catch((error) => alert("error: " + error));
      }
      ).catch((error) => alert('error: ' + error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <Image
          style={styles.img}
          source={require("../../assets/x-button.png")}
        />

        <Text style={styles.texto}>Confirmar cancelamento?</Text>
        <View style={styles.btnAreaNaoConf}>
          <TouchableOpacity style={styles.containerBotaoAgenSim} onPress={confirma}>
            <Text style={styles.textoBotao}>Sim</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.containerBotaoAgenNao} onPress={fechar}>
            <Text style={styles.textoBotao}>Não</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function ModalAlertAtt({ modalOpen, texto, textoBotao,linking }) {
  const error = () => {
    Linking.openURL(linking);
    modalOpen();
  };

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <Image
          style={styles.img}
          source={require("../../assets/x-button.png")}
        />

        <Text style={styles.texto}>{texto}</Text>

        <TouchableOpacity style={styles.containerBotao} onPress={error}>
          <Text style={styles.textoBotao}>{textoBotao}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
function ModalAlertErroResp({ modalOpen, texto, textoBotao,back }) {
  const error = () => {
    modalOpen();
    back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <Image
          style={styles.img}
          source={require("../../assets/x-button.png")}
        />

        <Text style={styles.texto}>{texto}</Text>

        <TouchableOpacity style={styles.containerBotao} onPress={error}>
          <Text style={styles.textoBotao}>{textoBotao}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
function ModalAppCovid({ funcao }) {
  const fechar = () => {
    funcao();
  };
  return (
    <View style={styles.containerAgen}>
      <View style={styles.modalCovid}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          <View style={styles.ViewAreaCovid}>
            <TouchableOpacity style={styles.iconCovid} onPress={fechar}>
              <Feather name="x" size={24} color="black" />
            </TouchableOpacity>
            <Image
              style={styles.imgCovid}
              source={require("../../assets/incentivarLogo.png")}
            />

            <Text style={styles.textoCovid1}>
              Nós da Incentivar estimamos oferecer uma estrutura segura e
              adequada para o atual momento. Sendo assim gostariamos de
              solicitar seu apoio para seguirmos as medidas de segurança ao
              realizarmos nosso encontro presencial
            </Text>
            <View style={styles.liCovid}>
              <AntDesign
                name="caretright"
                size={14}
                style={styles.iconCovids}
                color="black"
              />
              <Text style={styles.textoCovid2}>
                É obrigatório o uso de mascara (por precaução levar uma de
                reserva)
              </Text>
            </View>
            <View style={styles.liCovid}>
              <AntDesign
                name="caretright"
                size={14}
                style={styles.iconCovids}
                color="black"
              />
              <Text style={styles.textoCovid2}>
                Não será permitido mais de um acompanhante evitar aglomeração
              </Text>
            </View>
            <View style={styles.liCovid}>
              <AntDesign
                name="caretright"
                size={14}
                style={styles.iconCovids}
                color="black"
              />
              <Text style={styles.textoCovid2}>
                Por gentileza evitr atrasos ou chegar com muita antecidência,
                para se evitar aglomeração na recepção
              </Text>
            </View>
            <View style={styles.liCovid}>
              <AntDesign
                name="caretright"
                size={14}
                style={styles.iconCovids}
                color="black"
              />
              <Text style={styles.textoCovid2}>
                Teve alguns dos sistomas da covid ou entrou em contato com
                pessoas que tiveram nos ultimos 4 dias ligue para a equipe e
                remarque o seu horario
              </Text>
            </View>
            <View style={styles.liCovid}>
              <AntDesign
                name="caretright"
                size={14}
                style={styles.iconCovids}
                color="black"
              />
              <Text style={styles.textoCovid2}>
                Lembrando que em caso de não compararecimento ou cancelamento
                com menos de 12 horas de antecidência ao agendamento, a consulta
                será computada.
              </Text>
            </View>
            <Text style={styles.textoCovid3}>
              A equipe Incentivar agradece a sua coloboração
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
const ModalPickerDep = ({ fechar, setData, dados }) => {
  const onPressItem = (itemEmp, itemId) => {
    setData(itemEmp, itemId);
    fechar();
  };

  const options = dados;

  const option = options.map((item, index) => {
    return (
      <TouchableOpacity
        style={styles.modalPickerButton}
        key={index}
        onPress={() => onPressItem(item.empresas, item.codigoEmpresa)}
      >
        <Text style={styles.modalPickerText}>{item.empresas}</Text>
      </TouchableOpacity>
    );
  });
  return (
    <View style={styles.containerPickerDep}>
      <View style={styles.modalPickerDep}>
        <ScrollView>{option}</ScrollView>
      </View>
    </View>
  );
};

const ModalPickerPrio = ({ fechar, setData }) => {
  const onPressItem = (item) => {
    setData(item);
    fechar();
  };

  const options = ["Baixa", "Média", "Alta"];
  const option = options.map((item, index) => {
    return (
      <TouchableOpacity
        style={styles.modalPickerButton}
        key={index}
        onPress={() => onPressItem(item)}
      >
        <Text style={styles.modalPickerText}>{item}</Text>
      </TouchableOpacity>
    );
  });
  return (
    <View style={styles.containerPickerDep}>
      <View style={styles.modalPickerDep}>
        <ScrollView>{option}</ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    maxHeight: "auto",
    opacity: 0.9,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.9)",
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    minHeight: "60%",
    height: "auto",
    backgroundColor: "white",
    padding: 6,
    borderRadius: 10,
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 60,
    margin: 20,
  },
  texto: {
    fontSize: 22,
    color: "black",
    textAlign: "center",
  },

  containerBotao: {
    width: "50%",
    height: 50,
    backgroundColor: "#23CF5C",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 50,
  },
  textoBotao: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 22,
    color: "white",
  },
  //Confirmar agendamento
  containerAgen: {
    width: "100%",
    height: "100%",
    opacity: 0.9,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.9)",
  },
  modalAgen: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: "60%",
    backgroundColor: "#FFFFFF",
    padding: 6,
    borderRadius: 10,
  },
  imgAgen: {
    width: 120,
    height: 120,
    borderRadius: 60,
    margin: 20,
  },
  textoAgen: {
    fontSize: 22,
    color: "black",
    textAlign: "center",
  },
  texto1Agen: {
    fontSize: 15,
    color: "black",
    textAlign: "center",
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
  },
  texto2Agen: {
    fontSize: 15,
    color: "black",
    textAlign: "center",
    marginLeft: 15,
    marginTop: 5,
    marginRight: 15,
  },
  containerBotaoAgen: {
    width: "50%",
    height: 50,
    backgroundColor: "#23CF5C",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 20,
  },
  textoBotaoAgen: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 22,
    color: "white",
  },
  btnAreaNaoConf: {
    display: "flex",
    flexDirection: "row",
  },
  containerBotaoAgenSim: {
    width: "40%",
    backgroundColor: "#20CF5C",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 20,
  },
  containerBotaoAgenNao: {
    width: "40%",
    backgroundColor: "#E21B1B",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 20,
    marginRight: 20,
  },
  iconConf: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  //Modal imgCovid
  imgCovid: {
    margin: 20,
    width: 200,
    height: 100,
    marginLeft: "auto",
    marginRight: "auto",
  },
  modalCovid: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: "90%",
    backgroundColor: "#FFFFFF",
    padding: 6,
    borderRadius: 10,
  },
  textoCovid1: {
    fontSize: 16,
    color: "black",
    textAlign: "justify",
    margin: 10,
  },
  textoCovid2: {
    fontSize: 14,
    marginRight: 10,
    color: "black",
    textAlign: "justify",
  },
  textoAlertHorario:{
    fontSize: 16,
    padding:10,
    color: "black",
    textAlign: "center",
  },
  liCovid: {
    display: "flex",
    flexDirection: "row",
    textAlign: "left",
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10,
  },
  textoCovid3: {
    fontSize: 18,
    color: "black",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  iconCovid: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  scrollView: {
    paddingRight: 20,
  },
  ViewAreaCovid: {
    width: "100%",
  },
  iconCovids: {
    marginRight: 5,
  },
  //Modal picker dep,
  containerPickerDep: {
    width: "100%",
    height: "100%",
    opacity: 0.9,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalPickerDep: {
    height: "auto",
    width: "auto",
    width: "80%",
    maxHeight: "60%",
    backgroundColor: "white",
    padding: 6,
    borderRadius: 10,
  },
  modalPickerButton: {
    alignItems: "flex-start",
  },
  modalPickerText: {
    margin: 20,
    fontSize: 20,
  },
  textoPicker: {
    margin: 20,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  textInput:{
    borderWidth:1,
    borderColor:"#00000055",
    borderRadius: 10,
    maxHeight:50,
    maxWidth:"90%",
    height: 50,
    width: "80%",
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:10,
    paddingRight:10,
    marginTop:20,
  }
});

export {
  ModalAppConfirma,
  ModalAppErro,
  ModalAlertConf,
  ModalAppConfirmaAgendamento,
  ModalAppNaoConfirmaAgendamento,
  ModalAppCovid,
  ModalPickerDep,
  ModalPickerPrio,
  ModalAlertNaoConf,
  ModalAlertErroResp,
  ModalAlertAtt,
  ModalEnviaMotivo,
  ModalAlertHorario,
  ModalAlertConfCanc
};
