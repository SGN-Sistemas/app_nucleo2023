import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, FlatList, TextInput, StyleSheet, TouchableOpacity, Modal, ActivityIndicator, RefreshControl, Image, Text} from 'react-native';
import Chamado from '../chamado'
import { EvilIcons } from '@expo/vector-icons';
import {AuthContext} from '../../contexts/ContextApi';
import { Ionicons } from "@expo/vector-icons";
import styles from './styles'

function ListaChamados({navigation}) {

const [seach, setSeach] = useState('')
const [loading, setLoading] = useState(false)
const [chamados, setChamados] = useState([])
const [base, setBase] = useState([])
const [refreshing, setRefreshing] = useState(false);
const [baseChamado, setBaseChamado] = useState(null)

const {idUser, setIdUser, codPessoa, setCodPessoa, idEmpresa, setIdEmpresa, atualizaChamado, setAtualizaChamado} = useContext(AuthContext);

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const onRefresh = useCallback(() => {
    setRefreshing(true);
    puxaChamados();
    wait(2000).then(() => setRefreshing(false));
}, []);

function puxaChamados(){
    setLoading(true)
        fetch('http://login.sgnsistemas.com.br:8090/sgn_lgpd_nucleo/webservice_php_json/webservice_php_json.php?chamados', {
            method: 'POST',
            body: JSON.stringify({
                "user" : codPessoa,
                "empresa" : idEmpresa,
                "ip": "192.168.1.1"
                })
        })
        .then((resp) => resp.json())
        .then((json) => {
            setBase(json)
            setChamados(json)
            setLoading(false)
        } 

        )
        .catch((error) => {
            alert('error: ' + error)
            setLoading(false)
        }) 
}

useEffect(() => {
    
    puxaChamados();

}, [])

useEffect(() => {
    
    puxaChamados();

}, [atualizaChamado])

useEffect(() => {

    if(seach === ''){
        setChamados(base)
    }else{

        setChamados(
            base.filter(
                (item) => {
                    if(item.ticket.toLowerCase().indexOf(seach.toLowerCase()) > -1){
                        return true
                    }else{
                        return false
                    }
                }
        ))
    }

},[seach])

if(base.length>0){
    return (
        <View style={styles.container}>

            <Modal transparent={true} animationType="fadeIn" visible={loading} style={styles.modalArea}>
                <View style={styles.modalView}>
                    <ActivityIndicator color="white" size={150} />
                </View>
            </Modal>
            <View style={styles.areaInput}>
                <TouchableOpacity style={styles.containerBtn}>
                    <EvilIcons name="search" size={30} color="black" />
                </TouchableOpacity>    
                <TextInput 
                    style={styles.input}
                    value={seach}
                    onChangeText={(texto) => setSeach(texto)}
                    placeholder="Pesquisar por Ticket"
                />
            </View>
            <FlatList
                style={styles.lista}
                data={chamados}
                keyExtractor={(item) => item.cod_chamado.toString()}
                renderItem={ ({item}) => <Chamado data={item} />}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            /> 
            <TouchableOpacity style={styles.iconAdd}onPress={() => navigation.navigate('AddChamado')}>
                <Ionicons name="add-circle-sharp" size={45} color="#01A78F" />
            </TouchableOpacity>
        </View>
    );
}else{
    return(
        <View style={styles.container}>

         <FlatList
                style={styles.lista}
                data={chamados}
                keyExtractor={(item) => item.cod_chamado.toString()}
                renderItem={ ({item}) => <Chamado data={item} />}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            /> 
            <TouchableOpacity style={styles.iconAdd}onPress={() => navigation.navigate('AddChamado')}>
                <Ionicons name="add-circle-sharp" size={45} color="#01A78F" />
            </TouchableOpacity>
           
            {loading == false ?
            <View style={styles.containerImg}>
                <Image
                    source={require("../../assets/headset2.png")}
                    style={styles.img}
                />
                <Text style={styles.text}>
                    Sem chamados no momento
                </Text>
            </View>
            : null}
        </View>
        
    );
}
}



export default ListaChamados