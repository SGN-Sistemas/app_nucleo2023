import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  View,
  FlatList,
  Modal,
  ActivityIndicator,
  Image,
  Text,
  RefreshControl,
  BackHandler,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AuthContext } from "../../contexts/ContextApi";
import Agendamento from "../agendamentos/index.jsx";
import styles from "./styles";
import { FontAwesome } from '@expo/vector-icons'; 

function ListaAgendamentos({ navigation, route }) {
  const [token, setToken] = useState();
  const [cod, setCod] = useState();
  const [objetos, setObjetos] = useState();
  const [accessToken, setAccessToken] = useState();
  const [objImg, setObjImg] = useState();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { idUser, setIdUser, att } = useContext(AuthContext);

  const dataIdApolo = route.params.id ? route.params.id : idUser;

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    requisicao();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const requisicao = async () => {
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
          "https://api.ninsaude.com/v1/atendimento_agenda/listar/paciente/" +
            dataIdApolo,
          {
            method: "GET",
            headers: {
              Authorization: "bearer " + token,
              "Content-Type": "application/json",
              "cache-control": "no-cache",
            },
          }
        )
          .then((resp) => resp.json())
          .then((json) => {
            let pacientes_temp = json.result;
            let now = new Date();
            let dt_formatado = now.toISOString().slice(0, 10);
            setObjetos(
              pacientes_temp.filter((element) => {

                var data = element.data.toString();
                if (
                  (
                    element.status == 0 ||
                    element.status == 6 ||
                    element.status == 7
                  ) &&
                  data >= dt_formatado
                ) {
                  return true;
                } else {
                  return false;
                }
              })
            );

            setLoading(false);
          })
          .catch((error) => alert("error: " + error));
      })
      .catch((error) => alert("error: " + error));
  };

  useEffect(() => {
    setLoading(true);
    requisicao();
  }, [att]);

  useEffect(() => {
    return () => {
      setAccessToken({});
    };
  }, []);

  const backAction = () => {
    navigation.goBack();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        animationType="fadeIn"
        visible={loading}
        style={styles.modal}>
        <View style={styles.modalContainer}>
          <ActivityIndicator color="white" size={150} />
        </View>
      </Modal>
      {
        objetos == 0
        ? <>
            <Image
              source={require("../../assets/calendario.png")}
              style={styles.imagemCalen}
            />
            <Text style={styles.text}>Sem agendamentos no momento</Text>
          </>
        :<>
          <FlatList
            style={styles.flatList}
            data={objetos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Agendamento data={item} />}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </>
      }
      <TouchableOpacity style={styles.btnArea} onPress={()=>navigation.navigate('EscolherPacientes')}>
        <FontAwesome name="exchange" size={24}  color="#FFF"/>
      </TouchableOpacity>
    </View>
  );
}

export default ListaAgendamentos;
