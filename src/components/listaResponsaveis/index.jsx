import React, { useEffect, useState, useContext } from "react";
import { View, Text, Image, StyleSheet,FlatList,TouchableOpacity,Modal } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import { ModalAlertConf } from "../Modal/ModalApp";
import styles from './styles'
import Responsavel from "./responsavel";
import { AuthContext } from '../../contexts/ContextApi';


export default function Responsaveis({route,navigation}) {

  const [responsaveis,setResponsaveis] = useState(null)
  const {atualizaResp,setAtualizaResp,codigoUsuario, setCodigoUsuario,modalResp, setModalResp} = useContext(AuthContext)

  const url = 'http://sgnsistemas.ddns.net:65531/sgn_lgpd_nucleo/webservice_php_json/webservice_php_json.php?ListResp'

  useEffect(() => {

      fetch(url,{
        method: 'post',
        body: JSON.stringify({"paciente":"" + codigoUsuario})
      })
      .then((resp) => resp.json())
      .then((json) => {

        //responsaveis.push(...json)
        setResponsaveis(json)
      })

  },[])

  useEffect(() => {

    fetch(url,{
      method: 'post',
      body: JSON.stringify({"paciente": ""+codigoUsuario})
    })
    .then((resp) => resp.json())
    .then((json) => {
      let result = json;
      var resp =
        result.filter((element) => {
          var resp_status = element.resp_status;
          if(resp_status == 1){
            return true;
          }
        })
        console.log(resp);
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
  if(responsaveis != "Sem registros no banco de dados!" && responsaveis != []){
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
        <TouchableOpacity style={styles.iconAdd} onPress={() => navigation.navigate('AddResponsavel')}>
          <Ionicons name="add-circle" size={45} color="#01A78F" />
        </TouchableOpacity>
      </View>
    )
  }
}

