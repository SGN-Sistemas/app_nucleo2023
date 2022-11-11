import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import FlatListItem from "../flatList/flatListDetalhes";
import { MaterialIcons } from '@expo/vector-icons'; 
import RespChamado from './responderChamado'
export default function telaDetalhe({ funcao }) {

  const controller = () => {
    funcao();
  };
  const [modalResp,setModalResp] = useState(false);
  const modalRespController = () => {
    if(modalResp == false){
      setModalResp(true);
    }else{
      setModalResp(false);
    }
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={controller} style={styles.icons}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.header}>
        <View style={styles.textAreaHeader}>
          <Text style={styles.textoHeader}>Status:Em andamento</Text>
          <Text style={styles.textoHeader}>Departamento: Psicologiass</Text>
          <Text style={styles.textoHeader}>Assunto: Comportamento incomum</Text>
        </View>
        <View style={styles.contentHeader}>
          <Text style={styles.textoContent1}>Ticket :</Text>
          <Text style={styles.textoContent2}>10545F215B</Text>
          <Text style={styles.textoContent1}>Prioridade :</Text>
          <Text style={styles.textoContent2}>
            <FontAwesome name="circle" size={24} color="#E8C548" />
          </Text>
        </View>
      </View>
      <View style={styles.contentBody}>
        <FlatList data={flatList}
        style={{marginBottom:35,paddingBottom:10,marginTop:10}}
        showsVerticalScrollIndicator={false}

        renderItem={({item})=><FlatListItem item={item}/>}
        />
      </View>
      <TouchableOpacity style={styles.icon2}
        onPress={modalRespController}
      >
        <MaterialIcons  name="chat" size={30} color="white" />
      </TouchableOpacity>

      <Modal animationType="fadeIn" visible={modalResp}>
        <RespChamado
         funcao = {() => {modalRespController()}}
         />
      </Modal>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 10,
    paddingTop: 20,
    paddingBottom: 50,
    flex: 1,
    height: "100%",
  },
  icons: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  header: {
    backgroundColor: "#FFF",
    padding: 10,
    marginTop: 20,
    shadowColor: "#121210",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
    display: "flex",
    flexDirection: "row",
  },
  textoHeader: {
    fontSize: 15,
    marginRight: 2,
    marginTop: 5,
  },
  textAreaHeader: {
    flex: 2,
  },
  textoContent1: {
    textAlign: "center",
    color: "#12121299",
    marginTop: 2,
  },
  textoContent2: {
    textAlign: "center",
    marginTop: 2,
  },
  contentBody: {
    height: "90%",
  },
  image: {
    width: "100%",
    height: 500,
    resizeMode: "cover",
    marginTop: 10,
  },
  icon2:{
    zIndex:10000,
    position:"absolute",
    bottom:70,
    right: 30,
    width:50,
    height:50,
    borderRadius:25,
    backgroundColor:"#01A78F",
    alignItems: "center",
    justifyContent:"center",
  }
});
