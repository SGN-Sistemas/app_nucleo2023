import React, { useEffect, useState } from "react";
import {
  View,
  ImageBackground,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  Alert,
  BackHandler,
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ModalAppConfirma, ModalAppErro } from "../Modal/ModalApp";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { validatePassword } from "../../utils/validPassword";
import { url } from "../../utils/url";

function TradePassword({ navigation, route }) {
  const [email, setEmail] = useState("");
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const [isModalError, setIsModalError] = useState(false);
  const [senha, setSenha] = useState("");
  const [hidePass, setHidePass] = useState(true);
  const [textErr, setTextErr] = useState("");
  const [error, setError] = useState(true);

  const alteraSenha = () => {
    if (email === "" || senha === "") {
      setTextErr("Preencha todos os campos");
      setIsModalError(true);
    } else {
      const valid  = validatePassword(senha)
      setTextErr(valid)
      setError(valid)
      if (valid != false) {
        setIsModalError(true);
        return
      }

      fetch(
        url + "recuperarSenha",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            senha: senha,
          }),
        }
      )
        .then((resp) => resp.text())
        .then((json) => {
          if (json == '"Senha cadastrada com sucesso"') {
            setIsModalConfirm(true);
            return;
          }
          setTextErr(["Email nao cadastrado!"]);
          setIsModalError(true);
          setError(false)
        })
        .catch((error) => {
          setTextErr([error.message]);
          setIsModalError(true);
          setError(false)

        });
    }
  };

  const sairConf = () => {
    if(!error){
      navigation.navigate("Login");
    }
    setIsModalConfirm(false);
  };

  const sairError = () => {
    setIsModalError(false);
  };

  const backAction = () => {
      navigation.navigate("Login");
  
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <View style={styles.container}>
    <KeyboardAwareScrollView style={{flex:1}} contentContainerStyle={{flexGrow: 1}}>
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

        <TextInput
          style={styles.input}
          placeholder="Informe o e-mail cadastrado"
          value={email}
          onChangeText={(texto) => setEmail(texto)}
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

        <TouchableOpacity style={styles.btnSubmit} onPress={alteraSenha}>
          <Text style={styles.textSubmit}> Recuperar </Text>
        </TouchableOpacity>

        <Modal
          transparent={true}
          animationType="fadeIn"
          visible={isModalConfirm}>
          <View style={styles.modalContainer}>
            <ModalAppConfirma
              fechar={() => sairConf()}
              texto="Senha trocada com sucesso"
              textoBotao="OK"
            />
          </View>
        </Modal>

        <Modal transparent={true} animationType="fadeIn" visible={isModalError}>
          <View style={styles.modalContainer}>
            <ModalAppErro
              fechar={() => sairError()}
              texto={textErr}
              textoBotao="OK"
            />
          </View>
        </Modal>
      </ImageBackground>
      </KeyboardAwareScrollView>
    </View>
  );
}

export default TradePassword;
//reinaldo.santos@sgnsistemas.com.br
//Sgn@2022@