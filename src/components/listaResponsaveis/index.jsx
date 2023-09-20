import React, { useEffect, useState, useContext } from "react";
import { View, Text, Image, ActivityIndicator,FlatList,TouchableOpacity,Modal } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import { ModalAlertConf } from "../Modal/ModalApp";
import styles from './styles'
import Responsavel from "./responsavel";
import { AuthContext } from '../../contexts/ContextApi';
import { url } from "../../utils/url";


export default function Responsaveis({route,navigation}) {

  const [responsaveis,setResponsaveis] = useState(null)
  const [loading, setLoading] = useState()
  const {atualizaResp,setAtualizaResp,codigoUsuario, setCodigoUsuario,modalResp, setModalResp} = useContext(AuthContext)

  useEffect(() => {
    
    fetch(url + "ListResp",{
      method: 'post',
      body: JSON.stringify({"paciente": ""+codigoUsuario})
    })
    .then((resp) => resp.json())
    .then((json) => {
      let result = json;
      setLoading(false)
      if(result === "Sem registros no banco de dados!"){
        setResponsaveis(result);
        return
      }
      var resp =
        result.filter((element) => {
          var resp_status = element.resp_status;
          if(resp_status == 1){
            return true;
          }
        })
      setResponsaveis(resp);
    })
},[atualizaResp])

  

  const addResponsavel = () => {
    navigation.navigate("AddResponsavel");
  }

  function openModalAlertConf(){
    if(modalResp == false){
      setModalResp(true);
    }else{
      setModalResp(false);
    }
}

  const renderItem = ({ item }) => (
    
    <Responsavel data={item}/>
  );
  if(loading){
    return (
      <ActivityIndicator size="large" />
    )
  }else if(responsaveis != "Sem registros no banco de dados!"){
    return ( 
        <View style={styles.container}>
          
          <FlatList
            style={{paddingLeft: 20,paddingRight: 20}}
            data={responsaveis}
            renderItem={({item}) => <Responsavel data={item}/>}
            keyExtractor={(item) =>item.cod_responsavel.toString()}
          />
          <TouchableOpacity style={styles.iconAdd} onPress={() => navigation.navigate('AddResponsavel')}>
            <Ionicons name="add-circle" size={45} color="#01A78F" />
          </TouchableOpacity>
          <Modal transparent={true} animationType="fadeIn" visible={modalResp}>
          <View style={styles.modalContainer}>
            <ModalAlertConf
              modalOpen={()=>openModalAlertConf()}
              modalCovid={() => {}}
              textoBotao="OK"
              texto="Responsavel excluido com sucesso"
            />
          </View>
        </Modal> 
        </View>
      );
    
  }else{ 
    return(
      <View style={styles.container}>

        <Text style={{color: "#121212",fontSize: 20,top: "50%", marginLeft: "auto", marginRight: "auto"}}>Sem dados para serem exibidos</Text>
        <TouchableOpacity style={styles.iconAdd} onPress={() => navigation.navigate('AddResponsavel')}>
          <Ionicons name="add-circle" size={45} color="#01A78F" />
        </TouchableOpacity>
      </View>
    )
  }
}

