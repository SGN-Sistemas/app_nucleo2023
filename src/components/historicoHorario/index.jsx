import { Text, View, FlatList, Image, StyleSheet, RefreshControl, ActivityIndicator } from "react-native";
import React, { useState, useEffect, useContext, useCallback } from 'react';
import HistoricoComponent from "./historicoComponents";
import { AuthContext } from '../../contexts/ContextApi';
import styles from './styles'
export default function HistoricoHorario() {
    const horarios = [];
    const [horariosT, setHorariosT] = useState([]);
    const { idUser, setIdUser } = useContext(AuthContext)
    const [refreshing, setRefreshing] = useState(false);
    const [accessToken, setAccessToken] = useState()
    const [loading, setLoading] = useState(false)

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
                        let result = json.result;
                        console.log("id: " + idUser);
                        for (let i = 0; i < result.length; i++) {
                            horarios.push(result[i]);
                        }
                        setHorariosT(horarios)
                        console.log(horariosT);
                        setLoading(false);

                    }
                    ).catch((error) => alert('error: ' + error))
            }
            )
            .catch((error) => alert('error: ' + error))

    }

    if (loading == false) {

        if (horariosT.length > 0) {
            return (
                <View>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        style={styles.flatList}
                        data={horariosT}
                        keyExtractor={(item) => item.id.toString()}

                        renderItem={({ item }) => <HistoricoComponent data={item} />}
                    />
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <Image source={require("../../assets/clock.png")} style={styles.img} />
                    <Text style={styles.text}>Sem agendamento</Text>
                </View>
            );
        }
    } else {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
                <Text style={styles.text}>Carregando...</Text>
            </View>
        );
    }
}