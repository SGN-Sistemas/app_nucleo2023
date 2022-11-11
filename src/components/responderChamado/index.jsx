import React, { useState, useEffect, useContext } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {ModalAppConfirma} from '../Modal/ModalApp'
import { useNavigation } from '@react-navigation/native';
import {AuthContext} from '../../contexts/ContextApi';
import styles from "./styles";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  ActivityIndicator,
  ScrollView,
} from "react-native";

export default function RespChamado({ route }) {
  const chamado= route.params; 
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const[loading, setLoading] = useState(false)
  const[chme_cod, setChme_cod] = useState()
  const[isModalError, setisModalError] = useState(false)
  const navigation = useNavigation();

  const {idUser, setIdUser, codPessoa, setCodPessoa, idEmpresa, setIdEmpresa,
    atualizaChamadoDetalhe, setAtualizaChamadoDetalhe} = useContext(AuthContext)

  useEffect(() => {
    
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();

  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result);
    }
  };
  
  function enviarMensagem(){
    setLoading(true)
    fetch('http://sgnsistemas.ddns.net:65531/sgn_lgpd_nucleo/webservice_php_json/webservice_php_json.php?inserirMensagem', {
        method: 'POST',
        body: JSON.stringify({
            "idchamado": chamado.chamado.cod_chamado,
            "user" : codPessoa,
            "conteudo":text
            })
    }).then((response) => response.json())
    .then((responseJson) => {
      setChme_cod(responseJson)
      setLoading(false)

      if(image != null){
        sendImage(responseJson);
      }else{
        setisModalError(true)
      }

      setAtualizaChamadoDetalhe(!atualizaChamadoDetalhe)
      
    }).catch((error) => {
      console.warn(error);
      setLoading(false)

    });
  }


  async function sendImage(codMssg){
    let data = image;
    setLoading(true);
    var link = 'http://sgnsistemas.ddns.net:65531/sgn_lgpd_nucleo/webservice_php_json/webservice_php_json.php?uploadImage';
    var metodo = 'POST';
    var Autorizacao = 'Authorization';
    let array = data.uri.split('/')
    let formdata = new FormData();
      formdata.append('image', {
      uri: data.uri,
      type: 'image/png', 
      name: ""+codMssg+"",
      tmp_name: data.uri
    });
    fetch(link, {
        method: 'POST',
        body: formdata,
        headers: {
          'Content-Type': 'multipart/form-data',
        }
    }).then((response) => response.json())
    .then((data) => {
      if(data.INSERIDO){
        setisModalError(true)

      }else{
        alert("Não foi possivel inserir a imagem, tente novamente mais tarde!")
      }
      setLoading(false)
    }).catch((error) => {
      console.warn(error);
      setLoading(false)
    });
  }

  function backScreen(){
    setisModalError(false);
    navigation.goBack();
  }


  return (
    <View style={styles.container}>
      <Modal transparent={true} animationType="fadeIn" visible={isModalError} >
        <View style={styles.modalContainer}>
            <ModalAppConfirma fechar={() => backScreen()}
                      texto="Registrado com sucesso!" textoBotao="OK"/>
        </View>
      </Modal>
      <TouchableOpacity  style={styles.icons}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
            <View style={styles.textAreaHeader}>
              <Text style={styles.textoHeader}>Status: {chamado.deta_chamado.CHHI_STATUS}</Text>
              <Text style={styles.textoHeader}>Departamento: {chamado.deta_chamado.CHHI_DEPA_COD}</Text>
              <Text style={styles.textoHeader}>Assunto: {chamado.deta_chamado.CHAM_ASSUNTO}</Text>
            </View>
            <View style={styles.contentHeader}>
              <Text style={styles.textoContent1}>Ticket :</Text>
              <Text style={styles.textoContent2}>{chamado.deta_chamado.CHAM_TICKET}</Text>
              <Text style={styles.textoContent1}>Prioridade:</Text>
              <Text style={styles.textoContent2}>
              {
                chamado.chamado.prioridade == 1 ?
                    <FontAwesome name="exclamation-circle" size={16} color="green" />
                :
                chamado.chamado.prioridade == 2 ?
                    <FontAwesome name="exclamation-circle" size={16} color="#E8C548" />
                :
                    <FontAwesome name="exclamation-circle" size={16} color="red" />
              }
              </Text>
            </View>
          </View>
        <View style={styles.content}>
          <Text style={styles.text}>Mensagem :</Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            value={text}
            onChangeText={(texto) => {
              setText(texto);
            }}
            style={styles.textInput}
          />
          <Text style={styles.text}>Anexos :</Text>
          {image && (
            <View style={styles.imgArea}>
              <TouchableOpacity
                onPress={pickImage}
                style={styles.btnImg}
              >
                <Image
                  source={{ uri: image.uri }}
                  style={styles.imgContainer}
                />
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.viewBtnAnexo}>
              {image!= null? 
                    <TouchableOpacity style={styles.areaBtnAnexo} onPress={()=> setImage(null)}>
                        <Text style={styles.textoBtnAnexo}>Limpar</Text>
                        <Ionicons
                        style={styles.imgAnexo}
                        name="trash"
                        size={24}
                        color="black"
                        />
                    </TouchableOpacity>
                :
                    <TouchableOpacity style={styles.areaBtnAnexo} onPress={pickImage}>
                        <Text style={styles.textoBtnAnexo}>Adicionar</Text>
                        <Ionicons
                        style={styles.imgAnexo}
                        name="attach"
                        size={24}
                        color="black"
                        />
                    </TouchableOpacity>
            }
            
          </View>
          
        </View>

        <View style={styles.viewBtnRegistrar}>
          <TouchableOpacity onPress={()=> enviarMensagem()} style={styles.areaBtnRegistrar}>
            <Ionicons
              style={styles.imgRegistrar}
              name="ios-add"
              size={24}
              color="black"
            />
            <Text style={styles.textoBtnRegistrar}>Registrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal transparent={true} animationType="fadeIn" visible={loading} style={styles.modalLoading}>
        <View style={styles.modalLoadingArea}>
            <ActivityIndicator color="white" size={150} />
        </View>
      </Modal>
    </View>
  );
}

