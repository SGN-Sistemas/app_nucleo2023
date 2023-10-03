import React, { useEffect, useState, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Modal,
  Platform,
  BackHandler,
  Alert,
} from "react-native";
import styles from "./styles";
import {
  ModalAppConfirma,
  ModalAppErro,
  ModalAlertAtt,
} from "../Modal/ModalApp";
import { AuthContext } from "../../contexts/ContextApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import { url } from "../../utils/url";
import { CheckBox } from "../checkBoxTermo";

function Login({ navigation, route }) {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [hidePass, setHidePass] = useState(true);
  const [user, setUser] = useState();
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const [isModalError, setIsModalError] = useState(false);
  const [modalBlock, setModalBlock] = useState(false);
  const [modalAtt, setModalAtt] = useState(false);
  const [versao, setVersao] = useState(0);
  const [linking, setLinking] = useState("");
  const [nameIcon, setNameIcon] = useState(false);
  const [termoAceito, setTermAceito] = useState(false);
  const [tradePassword, setTradePassword] = useState(false);
  const {
    setIdUser,
    setCodPessoa,
    setIdEmpresa,
    setCodigoUsuario,
  } = useContext(AuthContext);
  const [textErr, setTextErr] = useState("");
  const storeData = async (login, password) => {
    try {
      await AsyncStorage.setItem("password", password);
      await AsyncStorage.setItem("login", login);
      await AsyncStorage.setItem("termAccept", "true");
    } catch (e) {
      alert("Error " + e);
    }
  };

  useEffect(() => {
    (async () => {
      biometricLogin();
      const lgn = await AsyncStorage.getItem("login");
      setLogin(lgn);
    })();
  }, []);

  function irRecuperarSenha() {
    navigation.navigate("RecuperarSenha");
  }
  const sairConf = () => {
    setIsModalConfirm(false);
  };

  const sairError = () => {
    setIsModalError(false);
  };
  if (versao == 0) {
    versaoVerificar();
  }
  function versaoVerificar() {
    verficarVersao();
    setVersao(1);
  }
  function verficarVersao() {
    let numberVersion = "";
    let platform = "";
    if (Platform.OS == "android") {
      numberVersion = 30;
      platform = "android";
    } else if (Platform.OS == "ios") {
      numberVersion = 18;
      platform = "ios";
    }

    fetch(url + "verificarVersaoApp", {
      method: "POST",
      body: JSON.stringify({
        numberVersion: numberVersion,
        platform: platform,
      }),
    })
      .then((resp) => resp.json())
      .then((json) => {
        if (json.atualizacao == 1) {
          setLinking(json.link);
          openModalAtt();
        }
      })
      .catch((e) => {});
  }

  function openModalAtt() {
    if (modalAtt == false) {
      setModalAtt(true);
    } else {
      setModalAtt(false);
    }
  }

  function openModalBlock() {
    if (modalBlock == false) {
      setModalBlock(true);
    } else {
      setModalBlock(false);
    }
  }

  const termVerification = async () => {
    const termAccept = await AsyncStorage.getItem("termAccept");
    if (termAccept === "true") {
      setTermAceito(true);
    } else {
      setTermAceito(false);
    }
  };

  useEffect(() => {
    (async () => {
      await termVerification();
    })();
  }, []);

  function entrar(login, senha, termoAceito) {
    var pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/;
    if (!termoAceito) {
      if (!nameIcon) {
        setTextErr("Aceite o termo");
        setIsModalError(true);
        return;
      }
    }
    if (login == "" || senha == "") {
      setTextErr("Preencha todos os campos");
      setIsModalError(true);
    } else {
      if (!pattern.test(senha)) {
        setTextErr(
          "Informamos que a nossa política de segurança foi atualizada, sua nova senha deve conter no mínimo 8 dígitos, uma letra maiúscula, um caractere especial (Ex: @#$%), um número e uma letra minúscula"
        );
        setTradePassword(true);
        setIsModalError(true);
        return;
      }
      const data = new Date();

      fetch(url + "login", {
        method: "POST",
        body: JSON.stringify({
          login: login,
          pswd: senha,
          data: data,
          ip: "192.168.1.119",
        }),
      })
        .then((resp) => {
          return resp.json();
        })
        .then((json) => {
          if (json.error) {
            openModalBlock();
          } else {
            setCodPessoa(json.cod_pessoa);
            setIdEmpresa(json.idempresa);
            setCodigoUsuario(json.codigo_usuario);

            if (json.id != "" && json.id != 0) {
              setIdUser(json.id);
              storeData(login, senha);
              navigation.navigate("Home");
            } else {
              buscarPaciente(json.cpf, json.telefone);
            }
          }
        })
        .catch((error) => {
          alert("3: " + url + "login " + error);
        });
    }
  }

  const biometricLogin = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();

    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    const termAccept = await AsyncStorage.getItem("termAccept");
    const termoAceite = termAccept === "true";

    const valuePassword = await AsyncStorage.getItem("password");
    const valueUSER = await AsyncStorage.getItem("login");

    if (valuePassword !== null && valueUSER !== null) {
      if (compatible) {
        if (savedBiometrics) {
          const validAuth = await LocalAuthentication.authenticateAsync({
            promptMessage: "Login com biometria",
          });

          if (validAuth.success) {
            entrar(valueUSER, valuePassword, termoAceite);
          } else {
            try {
              await AsyncStorage.setItem("password", "");
            } catch (e) {
              alert("Error " + e);
            }
          }
        }
      }
    }
  };

  async function buscarPaciente(cpf, telefone) {
    await fetch("https://api.ninsaude.com/v1/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
      },
      body:
        "grant_type=refresh_token&refresh_token=" + route.params.refresh_token,
    })
      .then((resp) => resp.json())
      .then(async (json) => {
        let access_token = json.access_token;

        await fetch(
          "https://api.ninsaude.com/v1/cadastro_paciente/listar?cpf=" +
            cpf +
            "&foneCelular=" +
            telefone,
          {
            headers: {
              Authorization: "bearer " + access_token,
              "Cache-Control": "no-cache",
              "Content-Type": "application/json",
            },
          }
        )
          .then((resp) => resp.json())
          .then((json) => {
            var result = json.result[0];

            if (result) {
              //alert(result.nome + ' parte 1')
              let nomeUsuario = result.nome;
              let idUsuario = result.id;
              setIdUser(idUsuario);
              enviarId(idUsuario, cpf, telefone);
              navigation.navigate("Home");
            } else {
              alert("Não existe esse paciente no nosso sistema!");
            }
          })
          .catch((error) =>
            alert(
              "Apolo: https://api.ninsaude.com/v1/cadastro_paciente/listar?cpf=" +
                cpf +
                "&foneCelular=" +
                telefone
            )
          );
      });
  }

  const enviarId = (id, cpf, telefone) => {
    fetch(url + "EnviaCodigo", {
      method: "POST",
      body: JSON.stringify({
        id: id,
        cpf: cpf,
        telefone: telefone,
      }),
    })
      .then((resp) => resp.json())
      .then((json) => {})
      .catch((error) => {});
  };

  const backAction = () => {
    Alert.alert("Atenção!", "Tem certeza que deseja sair?", [
      {
        text: "Cancelar",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "SIM",
        onPress: () => BackHandler.exitApp(),
      },
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <ImageBackground
        source={require("../../assets/lgpd_protecao_dados.png")}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.containerImagem}>
          <Image
            style={styles.imageLogo}
            source={require("../../assets/incentivarLogo.png")}
          />
        </View>

        <View style={styles.containerForm}>
          <TextInput
            style={styles.input}
            placeholder="Login"
            autoCorrect={false}
            value={login}
            onChangeText={(text) => setLogin(text)}
          />

          <View style={styles.inputAreaSenha}>
            <TextInput
              style={styles.inputSenha}
              secureTextEntry={hidePass}
              placeholder="Senha"
              autoCorrect={false}
              value={senha}
              onChangeText={(text) => setSenha(text)}
            />

            <TouchableOpacity
              style={styles.iconSenha}
              onPress={() => setHidePass(!hidePass)}>
              {hidePass ? (
                <Ionicons name="eye" size={25} />
              ) : (
                <Ionicons name="eye-off" size={25} />
              )}
            </TouchableOpacity>
          </View>
          {!termoAceito ? (
            <CheckBox nameIcon={nameIcon} setNameIcon={setNameIcon} />
          ) : (
            <></>
          )}
          <TouchableOpacity
            style={styles.btnSubmit}
            onPress={() => entrar(login, senha, termoAceito)}>
            <Text style={styles.textSubmit}> Acessar </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnRegister}
            onPress={irRecuperarSenha}>
            <Text style={styles.textRegister}> Recuperar Senha </Text>
          </TouchableOpacity>

          <Modal
            transparent={true}
            animationType="fadeIn"
            visible={isModalConfirm}>
            <View style={styles.modalContainer}>
              <ModalAppConfirma
                fechar={() => sairConf()}
                texto="Login efetuado com sucesso"
                textoBotao="OK"
              />
            </View>
          </Modal>

          <Modal
            transparent={true}
            animationType="fadeIn"
            visible={isModalError}>
            <View style={styles.modalContainer}>
              <ModalAppErro
                fechar={() => {
                  sairError();
                  if (tradePassword) {
                    navigation.navigate("RecuperarSenha");
                  }
                }}
                texto={textErr}
                textoBotao="OK"
              />
            </View>
          </Modal>

          <Modal transparent={true} animationType="fadeIn" visible={modalAtt}>
            <View style={styles.modalContainer}>
              <ModalAlertAtt
                modalOpen={() => openModalAtt()}
                textoBotao="Ir para loja"
                texto="Atualização do app liberada baixe para evitar mau funcionamento"
                linking={linking}
              />
            </View>
          </Modal>

          <Modal transparent={true} animationType="fadeIn" visible={modalBlock}>
            <View style={styles.modalContainer}>
              <ModalAppErro
                fechar={() => openModalBlock()}
                texto=" Login ou Senha incorretos ou usuário bloqueado!"
                textoBotao="OK"
              />
            </View>
          </Modal>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

export default Login;
