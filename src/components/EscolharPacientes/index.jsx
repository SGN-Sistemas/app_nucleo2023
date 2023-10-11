import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
    Alert,
    BackHandler,
    FlatList,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { url } from "../../utils/url";
import { AuthContext } from "../../contexts/ContextApi";
import { styles } from "./styles";
import { EvilIcons } from "@expo/vector-icons";

const EscolherPacientes = ({navigation}) => {
    const { codPessoa, idUser,setIdUser } = useContext(AuthContext);
    const [searchText, setSearchText] = useState("");
    const [response, setResponse] = useState([]);
    const [responseFilter, setResponseFilter] = useState([]);
    const [idApolo, setIdApolo] = useState('')

    const backAction = () => {
        Alert.alert("Atenção!", "Tem certeza que deseja sair?", [
            {
                text: "Cancelar",
                onPress: () => null,
                style: "cancel",
            },
            {
                text: "SIM",
                onPress: () => {
                    navigation.goBack();
                    BackHandler.exitApp();
                },
            },
        ]);
        return true;
    };
    
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
    
        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);

    useEffect(() => {
        const data = {
            id_pessoa: codPessoa,
        };
        axios
            .post(url + "BuscarPaci", data)
            .then((response) => {  
                setResponse(response.data);
                setResponseFilter(response.data);
            })
            .catch((error) => {
                alert(error)
            });
    }, []);

    useEffect(() => {
        (async () => {
        if (searchText !== "") {
            setResponse(
            responseFilter.filter((item) => {

                const cpfNome = item.cpf + "-" + item.nome;
                const cpfNomeLower = cpfNome.toLowerCase();
                if (cpfNomeLower.indexOf(searchText.toLowerCase()) > -1) {
                    return true;
                }
                return false;
            })
            );
        }else {
            setResponse(responseFilter)
        }
        })();
    }, [searchText]);

    async function buscarPaciente(cpf, telefone,id) {
        await fetch("https://api.ninsaude.com/v1/oauth2/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "cache-control": "no-cache",
            },
            body: "grant_type=refresh_token&refresh_token=85f138ae6922c4b4101c6eec60ebf53e18f6d342eb1c5c84940a0e0d0fed65c93366e19253ada67819e1e3e15e24a0bf88254e2ce64bcda741cc63c501b51670",
        })
        .then((resp) => resp.json())
        .then(async (json) => {
            let access_token = json.access_token;
            await fetch(
                "https://api.ninsaude.com/v1/cadastro_paciente/listar?cpf=" + cpf,
                {
                    headers: {
                        Authorization: "bearer " + access_token,
                        "Cache-Control": "no-cache",
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((resp) => resp.json())
            .then((json) => {
                var result = json.result[0];
                if (result) {
                  //alert(result.nome + ' parte 1')
                    let idUsuario = result.id;
                    setIdApolo(idUsuario);
                    enviarId(idUsuario,id);
                } else {
                    alert("Não existe esse paciente no nosso sistema!");
                }
            })
            .catch((error) =>
                alert(
                    "Apolo: https://api.ninsaude.com/v1/cadastro_paciente/listar?cpf=" + cpf
                )
            );
        });
    }

    const enviarId = async (idApolo,id) => {
        const body = {
            id,
            idApolo
        }

        await axios.post( url + 'salvarIdApolo',body)
            .then((responses)=>{

                if(responses.data){
                    navigation.navigate("ListaAgendamentos",{
                        id: idApolo
                    });
                }
                
            })
            .catch((error)=>{
                alert(error)
            })
    }

    return (
        <View style={styles.area}>
            {
                response.length > 0
                ?<>
                    <View style={styles.inputArea}>
                        <TextInput
                        style={styles.input}
                        placeholder="Digite o nome do paciente"
                        value={searchText}
                        onChangeText={setSearchText}
                        />
                        <View style={styles.line} />
                        <TouchableOpacity>
                        <EvilIcons name="search" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={response}
                        renderItem={(item) => {
                            return (
                                <View>
                                    <TouchableOpacity 
                                        style={styles.areaBtn}
                                        onPress={()=>{
                                            if(item.item.id_apolo > 0 || item.item.id_apolo != null || item.item.id_apolo != "NULL"){
                                                navigation.navigate("ListaAgendamentos",{
                                                    id: item.item.id_apolo
                                                });
                                                return;
                                            }
                                            buscarPaciente(item.item.cpf, item.item.telefone,item.item.id)
                                        }}
                                    >
                                        <Text style={styles.txtBtn}>
                                            {item.item.nome} - {item.item.cpf}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        }}
                    />
                </>
                : ''
            }
        </View>
    );
};
export { EscolherPacientes };
