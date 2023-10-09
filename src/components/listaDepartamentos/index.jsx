import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, FlatList, TouchableOpacity, Modal, ActivityIndicator, RefreshControl, Image, Text} from 'react-native';
import Chamado from '../chamado'
import {AuthContext} from '../../contexts/ContextApi';
import { Ionicons } from "@expo/vector-icons";
import styles from './styles'
import Departamento from '../departamento';
import mock from './mock.json';

function ListaDepartamentos({navigation}) {

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
    // setLoading(true)
    //     fetch(url + 'chamados', {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             "user" : codPessoa,
    //             "empresa" : idEmpresa,
    //             "ip": "192.168.1.1"
    //             })
    //     })
    //     .then((resp) => resp.json())
    //     .then((json) => {
    //         setBase(json)
    //         setChamados(json)
    //         setLoading(false)
    //     } 

    //     )
    //     .catch((error) => {
    //         alert('error: ' + error)
    //         setLoading(false)
    //     }) 
    setBase(mock);
    setChamados(mock);

}

useEffect(() => {
    (
    async ()=>{
        puxaChamados();
    }
    )();
}, [])

useEffect(() => {
    puxaChamados();
}, [atualizaChamado])

if(base.length>0){
    return (
        <View style={styles.container}>

            <Modal transparent={true} animationType="fadeIn" visible={loading} style={styles.modalArea}>
                <View style={styles.modalView}>
                    <ActivityIndicator color="white" size={150} />
                </View>
            </Modal>
            <FlatList
                style={styles.lista}
                data={chamados}
                keyExtractor={(item) => item.idEmpresa}
                renderItem={ ({item}) => <Departamento data={item} />}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            /> 
            
        </View>
    );
} else {
    return(
        <View style={styles.container}>

         <FlatList
                style={styles.lista}
                data={chamados}
                keyExtractor={(item) => item.idEmpresa}
                renderItem={ ({item}) => <Departamento data={item} />}
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
                    Sem departamentos
                </Text>
            </View>
            : null}
        </View>
        
    );
}
}



export default ListaDepartamentos