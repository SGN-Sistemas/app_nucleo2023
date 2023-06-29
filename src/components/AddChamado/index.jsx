import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Modal, ScrollView } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { ModalAppConfirma, ModalAppErro, ModalPickerDep, ModalPickerPrio } from '../Modal/ModalApp'
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../../contexts/ContextApi.jsx';
import styles from './styles'

function Agendamento({ navigation }) {

    const [departamento, setDepartamento] = useState('Escolha o departamento')
    const [idDepartamento, setIdDepartamento] = useState('')
    const [prioridade, setPrioridade] = useState('Escolha a prioridade');
    const [idPrioridade, setIdPrioridade] = useState('');
    const [assunto, setAssunto] = useState('')
    const [mensagem, setMensagem] = useState('')
    const [isModalConfirm, setIsModalConfirm] = useState(false)
    const [isModalError, setIsModalError] = useState(false)
    const [image, setImage] = useState(null);
    const [modalDepPicker, setModalDepPicker] = useState(false);
    const [modalPickerPrio, setModalPickerPrio] = useState(false);
    const [dadosDepartamento, setDadosDepartamento] = useState([])

    const { idUser, setIdUser, codPessoa, setCodPessoa, idEmpresa, setIdEmpresa, atualizaChamado, setAtualizaChamado } = useContext(AuthContext)

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();

        buscaDepartamento(idEmpresa);
    }, []);

    function fmodalPicker() {
        if (modalDepPicker == false) {
            setModalDepPicker(true);
        } else if (modalDepPicker == true) {
            setModalDepPicker(false);
        }
    }
    function fmodalPickerPrio() {
        if (modalPickerPrio == false) {
            setModalPickerPrio(true);
        } else if (modalPickerPrio == true) {
            setModalPickerPrio(false);
        }
    }

    function registraChamado() {

        let num_prioridade = '';

        if (prioridade == 'Baixa') {
            num_prioridade = '1';
        } else if (prioridade == 'Média') {
            num_prioridade = '2';
        } else {
            num_prioridade = '3';
        }

        /* alert(JSON.stringify({
            "departament": idDepartamento,
            "priority": num_prioridade,
            "subject": assunto,
            "user": "1",
            "empresa": "1",
            "message": mensagem
         }))*/

        if (departamento == '' || prioridade == '' || assunto == '' || mensagem == '') {
            setIsModalError(true)
        } else {

            fetch('http://login.sgnsistemas.com.br:8090/sgn_lgpd_nucleo/webservice_php_json/webservice_php_json.php?enviarChamado', {
                method: 'POST',
                body: JSON.stringify({
                    "priority": num_prioridade,
                    "departament": idDepartamento,
                    "subject": assunto,
                    "user": codPessoa,
                    "idempresa": idEmpresa,
                    "message": mensagem
                })
            })
                .then((resp) => resp.text())
                .then((json) => {

                    if (image != null) {
                        sendImage(json);
                        //setIsModalConfirm(true)
                    } else {
                        //setIsModalImage(true)
                        setIsModalConfirm(true)
                    }
                    setAssunto('')
                    setMensagem('')
                    setDepartamento('Escolha o departamento')
                    setPrioridade('Escolha a prioridade')
                    setImage(null)
                    setAtualizaChamado(!atualizaChamado);
                    navigation.goBack();
                })
                .catch((error) => {
                    // alert('error: ' + error)
                    alert(error)
                    //setLoading(false)
                })

        }

    }

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


    async function sendImage(codMssg) {
        let data = image;
        // setLoading(true);
        var link = 'http://login.sgnsistemas.com.br:8090/sgn_lgpd_nucleo/webservice_php_json/webservice_php_json.php?uploadImage';
        /*var metodo = 'POST';
        var Autorizacao = 'Authorization';
        let array = data.uri.split('/')*/
        let formdata = new FormData();
        formdata.append('image', {
            uri: data.uri,
            type: 'image/png',
            name: "" + codMssg + "",
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
                if (data.INSERIDO) {
                    //setisModalError(true)
                    setIsModalConfirm(true)
                } else {
                    alert("Não foi possivel inserir a imagem, tente novamente mais tarde!")
                }
                //setLoading(false)
            }).catch((error) => {
                // setLoading(false)
            });
    }

    const sairConf = () => {
        setIsModalConfirm(false)
        setIsModalError(false);
    }

    const sairError = () => {
        setIsModalError(false)
    }
    const setData = (option1, option2) => {
        setDepartamento(option1);
        setIdDepartamento(option2);
    }
    const setData2 = (option) => {
        setPrioridade(option);
    }


    function buscaDepartamento(idempresa) {

        let url = 'http://login.sgnsistemas.com.br:8090/sgn_lgpd_nucleo/webservice_php_json/webservice_php_json.php?departamentoEmpresa';

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                "idempresa": idempresa
            })
        })
            .then((resp) => resp.json())
            .then((json) => {
                setDadosDepartamento(json)
            })
            .catch((error) => {
                alert('error: ' + error)
            })

    }
    return (

        <KeyboardAvoidingView style={styles.cont} animated={true}>
            <ScrollView>
                <View style={styles.container}>

                    <View style={styles.area}>
                        <View style={styles.input}>
                            <TouchableOpacity
                                onPress={fmodalPicker}
                                style={styles.modalPickerButton}
                            >
                                <Text>{departamento}</Text>
                                <AntDesign name="caretdown" size={10} color="black" style={styles.iconsModalPicker} />
                            </TouchableOpacity>
                            <Modal transparent={true} animationType="fadeIn" visible={modalDepPicker} >
                                <View style={styles.containerAlignCenter}>
                                    <ModalPickerDep
                                        fechar={() => fmodalPicker()}
                                        setData={setData}
                                        dados={dadosDepartamento}
                                    />
                                </View>
                            </Modal>
                        </View>
                    </View>

                    <View style={styles.area}>
                        <View style={styles.input}>
                            <TouchableOpacity
                                onPress={fmodalPickerPrio}
                                style={styles.modalPickerButton}
                            >
                                <Text>{prioridade}</Text>
                                <AntDesign name="caretdown" size={10} color="black" style={styles.iconsModalPicker} />
                            </TouchableOpacity>
                            <Modal transparent={true} animationType="fadeIn" visible={modalPickerPrio} >
                                <View style={styles.containerAlignCenter}>
                                    <ModalPickerPrio
                                        fechar={() => fmodalPickerPrio()}
                                        setData={setData2}
                                    />
                                </View>
                            </Modal>
                        </View>
                    </View>

                    <View style={styles.area}>
                        <Text style={styles.textoLabel}>Assunto</Text>
                        <TextInput
                            style={styles.input}
                            value={assunto}
                            onChangeText={(texto) => setAssunto(texto)}
                            placeholder="Ex: Paciente asmático"
                        />
                    </View>

                    <View style={styles.areaMensagem}>
                        <Text style={styles.textoLabel}>Mensagem</Text>
                        <TextInput
                            style={styles.inputMensagem}
                            multiline={true}
                            numberOfLines={8}
                            value={mensagem}
                            onChangeText={(texto) => setMensagem(texto)}
                        />
                    </View>

                    <View style={[styles.area, { marginTop: 6 }]}>
                        <Text style={styles.textoLabel}>Anexos</Text>

                        <View style={styles.viewBtnAnexo}>
                            <TouchableOpacity style={styles.areaBtnAnexo}
                                onPress={pickImage}
                            >
                                <Text style={styles.textoBtnAnexo}>Adicionar</Text>
                                <Ionicons style={styles.imgAnexo} name="attach" size={24} color="black" />
                            </TouchableOpacity>

                        </View>
                    </View>
                    {image &&
                        <View style={styles.containerAlignCenter}>
                            <TouchableOpacity onPress={pickImage} style={styles.touchableImg}>
                                <Image source={{ uri: image.uri }} style={styles.areaImg} />
                            </TouchableOpacity>
                        </View>}
                </View>

                <View style={styles.viewBtnRegistrar}>
                    <TouchableOpacity style={styles.areaBtnRegistrar} onPress={registraChamado}>
                        <Ionicons style={styles.imgRegistrar} name="ios-add" size={24} color="black" />
                        <Text style={styles.textoBtnRegistrar}>Registrar</Text>
                    </TouchableOpacity>
                </View>

                <Modal transparent={true} animationType="fadeIn" visible={isModalConfirm}>
                    <View style={styles.containerAlignCenter}>
                        <ModalAppConfirma fechar={() => sairConf()}
                            texto="Chamado criado com sucesso!" textoBotao="OK" />
                    </View>
                </Modal>

                <Modal transparent={true} animationType="fadeIn" visible={isModalError} >
                    <View style={styles.containerAlignCenter}>
                        <ModalAppErro fechar={() => sairError()}
                            texto="Preencha todos os campos!" textoBotao="OK" />
                    </View>
                </Modal>
            </ScrollView>
        </KeyboardAvoidingView>

    );
}

export default Agendamento