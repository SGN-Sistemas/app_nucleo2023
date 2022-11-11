import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, FlatList, StyleSheet, RefreshControl, Image, Text, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../contexts/ContextApi';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import HorarioComponent from './horarioComponent';
import styles from './styles';

export default function Horarios() {
    const [token, setToken] = useState()
    const [cod, setCod] = useState()
    const [objetos, setObjetos] = useState()
    const [accessToken, setAccessToken] = useState()
    const [objImg, setObjImg] = useState()
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false);
    const { idUser, setIdUser } = useContext(AuthContext)
    const navigation = useNavigation();

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        requisicao();
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const requisicao = async () => {

        await fetch('https://api.ninsaude.com/v1/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'cache-control': 'no-cache'
            },
            body: 'grant_type=refresh_token&refresh_token=85f138ae6922c4b4101c6eec60ebf53e18f6d342eb1c5c84940a0e0d0fed65c93366e19253ada67819e1e3e15e24a0bf88254e2ce64bcda741cc63c501b51670'
        })
            .then((resp) => resp.json())
            .then((json) => {
                setAccessToken(() => json.access_token)
                let token = json.access_token

                fetch('https://api.ninsaude.com/v1/atendimento_agenda/listar/paciente/' + idUser, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'bearer ' + token,
                        'Content-Type': 'application/json',
                        'cache-control': 'no-cache'
                    }
                })
                    .then((resp) => resp.json())
                    .then((json) => {
                        let pacientes_temp = json.result;
                        let now = new Date();
                        let dt_formatado = now.toISOString().slice(0, 10);
                        setObjetos(
                            pacientes_temp.filter((element) => {
                                var data = element.data.toString();
                                if (data >= dt_formatado) {
                                    return true;

                                } else {

                                    return false;
                                }
                            })
                        )

                        setLoading(false);

                    }
                    ).catch((error) => alert('error: ' + error))
            }
            )
            .catch((error) => alert('error: ' + error))

    }

    useEffect(() => {
        //const ac = new AbortController();
        // Capturar ACCESS TOKENg
        setLoading(true)

        requisicao()

        //return () => ac.abort();

    }, [])

    useEffect(() => {

        return () => {
            setAccessToken({});
        };

    }, [])

    if (objetos != 0) {
        return (
            <View style={styles.container}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    style={styles.flatList}
                    data={objetos}
                    renderItem={({ item }) => <HorarioComponent data={item} />}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal={true}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
                <TouchableOpacity
                    style={styles.icons}
                    onPress={() => navigation.navigate('Historico')}
                >
                    <AntDesign name="clockcircle" size={40} color="#01A78F" />
                </TouchableOpacity>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <Image
                    source={require("../../assets/relogio.png")}
                    style={styles.imagemCalen}
                />
                <Text style={styles.text}>Sem consulta nos proximos dias</Text>
                <TouchableOpacity
                    style={styles.icons}
                    onPress={() => navigation.navigate('Historico')}
                >
                    <AntDesign name="clockcircle" size={40} color="#01A78F" />
                </TouchableOpacity>
            </View>
        );
    }
}