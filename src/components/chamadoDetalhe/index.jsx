import React, { useState, useEffect, useCallback, useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    Modal,
    ActivityIndicator,
    RefreshControl,
    Platform
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import FlatListItem from "../flatListDetalhes";
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/ContextApi.jsx';
import styles from './styles'

export default function App({ route }) {
    const navigation = useNavigation();
    const { chamado } = route.params;
    const [loading, setLoading] = useState(false)
    const [detalheChamado, setDetalheChamado] = useState(null)
    const [detalheMssgChamado, setDetalheMssgChamado] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    const [departamento, setDepartamento] = useState("");
    var depe = "";

    const { idUser, setIdUser, codPessoa, setCodPessoa, idEmpresa, setIdEmpresa, atualizaChamadoDetalhe,
        setAtualizaChamadoDetalhe, atualizaChamado, setAtualizaChamado } = useContext(AuthContext)

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        if (Platform.OS === 'ios') {

            puxaChamadoDetalheIos();

        } else {

            puxaChamadoDetalheAndroid();
        }

        wait(2000).then(() => setRefreshing(false));
    }, []);

    async function puxaChamadoDetalheAndroid() {

        setLoading(true)
        await fetch('http://login.sgnsistemas.com.br:8090/sgn_lgpd_nucleo/webservice_php_json/webservice_php_json.php?chamado_detalhe', {
            method: 'POST',
            body: JSON.stringify({
                "idchamado": chamado.cod_chamado,
                "user": codPessoa,
                "empresa": idEmpresa,
                "ip": "192.168.1.1"
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                setDepartamento(responseJson.CHHI_DEPA_COD.toLowerCase())
                depe = responseJson.CHHI_DEPA_COD.toLowerCase();
                setDetalheChamado(responseJson);
                setDetalheMssgChamado(responseJson.messages);
                setLoading(false)
            }).catch((error) => {
            });
    }

    async function puxaChamadoDetalheIos() {

        //setLoading(true)
        await fetch('http://login.sgnsistemas.com.br:8090/sgn_lgpd_nucleo/webservice_php_json/webservice_php_json.php?chamado_detalhe', {
            method: 'POST',
            body: JSON.stringify({
                "idchamado": chamado.cod_chamado,
                "user": codPessoa,
                "empresa": idEmpresa,
                "ip": "192.168.1.1"
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                setDepartamento(responseJson.CHHI_DEPA_COD.toLowerCase())
                depe = responseJson.CHHI_DEPA_COD.toLowerCase();
                setDetalheChamado(responseJson);
                setDetalheMssgChamado(responseJson.messages);
            }).catch((error) => {
            });
    }

    useEffect(() => {

        if (Platform.OS === 'ios') {

            puxaChamadoDetalheIos();

        } else {

            puxaChamadoDetalheAndroid();
        }

    }, [])

    useEffect(() => {

        if (Platform.OS === 'ios') {

            puxaChamadoDetalheIos();

        } else {

            puxaChamadoDetalheAndroid();
        }

        setAtualizaChamado(!atualizaChamado)

    }, [atualizaChamadoDetalhe])


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.textAreaHeader}>
                    <Text style={styles.textoHeader}>Status:{chamado.status}</Text>
                    <Text style={styles.textoHeader}>Departamento: {departamento}</Text>
                    <Text style={styles.textoHeader}>Assunto: {chamado.assunto}</Text>
                </View>
                <View style={styles.contentHeader}>
                    <Text style={styles.textoContent1}>Ticket :</Text>
                    <Text style={styles.textoContent2}>{chamado.ticket}</Text>
                    <Text style={styles.textoContent1}>Prioridade :</Text>
                    <Text style={styles.textoContent2}>
                        {
                            chamado.prioridade == 1 ?
                                <FontAwesome name="exclamation-circle" size={16} color="green" />
                                :
                                chamado.prioridade == 2 ?
                                    <FontAwesome name="exclamation-circle" size={16} color="#E8C548" />
                                    :
                                    <FontAwesome name="exclamation-circle" size={16} color="red" />
                        }

                    </Text>
                </View>
            </View>
            <View style={styles.contentBody}>
                <FlatList data={detalheMssgChamado}
                    style={{

                        marginTop: 0
                    }}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.cod_chamado_mssg.toString()}

                    renderItem={({ item }) => <FlatListItem item={item} />}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
            </View>
            <TouchableOpacity style={styles.icon2}
                onPress={() => navigation.navigate('Responder_chamado', { chamado: chamado, deta_chamado: detalheChamado })}
            >

                <MaterialCommunityIcons  name="message-reply" size={25} color="#fff" />
            
            </TouchableOpacity>

            <Modal transparent={true} animationType="fadeIn" visible={loading} style={styles.modalArea}>
                <View style={styles.containerModal}>
                    <ActivityIndicator color="white" size={150} />
                </View>
            </Modal>

        </View>
    );
}  