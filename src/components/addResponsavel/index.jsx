import React, { useState, useContext,useRef } from 'react';
import { View, Text,Image,TouchableOpacity,StyleSheet,TextInput,ScrollView,Modal } from 'react-native';
import { Entypo,MaterialCommunityIcons,FontAwesome5   } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../../contexts/ContextApi';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInputMask } from 'react-native-masked-text';
import { ModalAlertConf,ModalAlertNaoConf,ModalAlertErroResp } from "../Modal/ModalApp";
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import { url } from '../../utils/url';

export default function EditResponsaveis({navigation}) {
    const [image, setImage] = useState(null);
    const [imageNome,setImageNome]= useState(null);
    let d = new Date();
    d.setFullYear(d.getFullYear() - 18)
    const {codigoUsuario, setCodigoUsuario, atualizaResp, setAtualizaResp} = useContext(AuthContext)
    
    //Variaveis de input para
    const [inputNome,setInputNome] = useState("");
    const [inputIdade,setInputIdade] = useState(null);
    const [inputEmail,setInputEmail] = useState("");
    const [inputCPF,setInputCPF] = useState("");
    const [inputTelefone,setInputTelefone] = useState("");
    const [date, setDate] = useState(new Date(`${d}`));
    const [isPickerShow, setIsPickerShow] = useState(false);
    const [dtformatada,setDtFormatada] = useState("");

    const [modalAlertConf, setModalAlertConf] = useState(false);
    const [modalAlertNaoConf, setModalAlertNaoConf] = useState(false);
    const [modalAlertNaoConf1, setModalAlertNaoConf1] = useState(false);
    const [modalAlertNaoConf2, setModalAlertNaoConf2] = useState(false);
    const [modalAlertNaoConf3, setModalAlertNaoConf3] = useState(false);
    const [modalAlertNaoConf4, setModalAlertNaoConf4] = useState(false);
    const [modalAlertNaoConf5, setModalAlertNaoConf5] = useState(false);

    const [checkBox,setCheckBox] = useState(false);

    const cpfRef = useRef(null);
    const telRef = useRef(null);

    function openModalAlertConf(){
        if(modalAlertConf == false){
          setModalAlertConf(true);
        }else{
          setModalAlertConf(false);
        }
    }

    const showPicker = () => {
        setIsPickerShow(true);
    };

    const onChange = (event, selectedDate) => {
        
        const currentDate = selectedDate || date;

        if (Platform.OS === 'android') {
            
            setIsPickerShow(false);

        }
        let mes1    =   currentDate.getUTCMonth()+1

        let data    =   "";
        let mes     =   "";
        let ano     =   currentDate.getUTCFullYear();
        setDate(currentDate);
        if(currentDate.getUTCDate() <10){

            data    =   "0" + currentDate.getUTCDate();

        }else{

            data    =   currentDate.getUTCDate();

        }
        if(mes1    <   10){

            mes     =   "0" + mes1;

        }else{
            mes     =   mes1;
        }
        
        let dataNova = `${data}/${mes}/${ano}`;
        setDtFormatada(`${dataNova}`);

    };

    function openModalAlertNaoConf(){
        if(modalAlertNaoConf == false){
          setModalAlertNaoConf(true);
        }else{
          setModalAlertNaoConf(false);
        }
    }
    function openModalAlertNaoConf1(){
        if(modalAlertNaoConf1 == false){
          setModalAlertNaoConf1(true);
        }else{
          setModalAlertNaoConf1(false);
        }
    }
    function openModalAlertNaoConf2(){
        if(modalAlertNaoConf2 == false){
          setModalAlertNaoConf2(true);
        }else{
          setModalAlertNaoConf2(false);
        }
    }
    function openModalAlertNaoConf3(){
        if(modalAlertNaoConf3 == false){
          setModalAlertNaoConf3(true);
        }else{
          setModalAlertNaoConf3(false);
        }
    }
    function openModalAlertNaoConf4(){
        if(modalAlertNaoConf4 == false){
          setModalAlertNaoConf4(true);
        }else{
          setModalAlertNaoConf4(false);
        }
    }
    function openModalAlertNaoConf5(){
        if(modalAlertNaoConf5 == false){
          setModalAlertNaoConf5(true);
        }else{
          setModalAlertNaoConf5(false);
        }
    }

    async function sendImage(codMssg){
        let data = image;
        // setLoading(true);
        var link = url + 'uploadImageResponsavel';
        var metodo = 'POST';
        var Autorizacao = 'Authorization';
        let array = data.uri.split('/');
        let formdata = new FormData();
        formdata.append('image', {
            uri: data.uri,
            type: 'image/png', 
            name: ""+codMssg+"",
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
          if(data.INSERIDO){
          }else{
            alert("Não foi possivel inserir a imagem, tente novamente mais tarde!")
          }
          //setLoading(false)
        }).catch((error) => {
            alert(error);
         // setLoading(false)
        });
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
    
        if (!result.cancelled) {
          setImage(result);
          setImageNome(result.uri);
        }
    };

    function criarResponsavel(){
        //alert('Criou responsável!')
        if( 
            inputNome       ==  ''  ||
            date            ==  ''  ||
            inputEmail      ==  ''  ||
            inputCPF        ==  ''  ||
            inputTelefone   ==  ''  ||
            image           ==  null)
        {
            openModalAlertNaoConf1();
        }else{
            var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            let validatorEmail = reg.test(inputEmail);
            const array = dtformatada.split('/');
            const data_transformada = `${array[2]}-${array[1]}-${array[0]}`;
            const cpfValid = cpfRef?.current.isValid();
            if(cpfValid == true){
                if(validatorEmail == true){
                const cpfValido =cpfRef?.current.getRawValue();
                const tel = telRef?.current.getRawValue();
                var responsavelCheck = 0
                if(checkBox == true){
                    responsavelCheck = 1
                }else{
                    responsavelCheck = 0
                }
                fetch(url + 'AddResponsaveis',{
                    method: 'post',
                    body: JSON.stringify({
                        'name' : inputNome,
                        'cpf' : cpfValido,
                        'email' : inputEmail,
                        'telefone1' : tel,
                        'telefone2' : '', 
                        'dtNascimento' : data_transformada,
                        'foto'     :   '',
                        'paciente' :   codigoUsuario,
                        'responsavelCheck': responsavelCheck

                    })
                })
                .then((resp) => resp.json())
                .then((json) => {
                    if(json == "Esse paciente ja possui um responsavel legal"){
                        openModalAlertNaoConf4();
                    }else if(json == "CPF já cadastrado"){
                        openModalAlertNaoConf5();
                    }
                    else{
                        if(image != null){
                            sendImage(json);
                        }
                        setAtualizaResp(!atualizaResp)

                        openModalAlertConf();
                    }
                        

                })
                .catch(() => openModalAlertNaoConf2())
            }else{
                
                openModalAlertNaoConf3();

            }
        }else{
            openModalAlertNaoConf();
            }
        }
    }   
    function apagar(){

        setInputNome('');
        setInputEmail('');
        setInputCPF('');
        setInputTelefone('');

    }
    const handleClick = () => {

        if (checkBox) {
          setCheckBox(false);
        }else{
          setCheckBox(true);
        }
    
      }
    
    return (
        <View style={styles.container}>
            <View style={styles.containerForm}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    <TouchableOpacity style={styles.icon} onPress={() => criarResponsavel()}>
                        <MaterialCommunityIcons name="content-save-edit" size={30} color="#294450" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon1} onPress={() => apagar()}>
                        <FontAwesome5  name="eraser" size={30}  color="#B40005" />
                    </TouchableOpacity>
                    <View style={styles.imgArea}>
                        <TouchableOpacity onPress={pickImage}>
                            <Image source={{ uri : imageNome}} style={styles.img} />
                            <Entypo name="camera" size={40} style={styles.iconCam} color="#121212" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.text}>
                        Nome
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setInputNome}
                        value={inputNome}
                        placeholder="Digite seu Nome"
                    />
                                        <Text style={styles.text}>
                        Data de nascimento: 
                    </Text>
                    <TouchableOpacity onPress={showPicker} style={styles.inputDate}>
                         <Text>{`${dtformatada}`}</Text>
                    </TouchableOpacity>
                    {isPickerShow && (
                    <DateTimePicker
                        value={date}
                        testID="dateTimePicker"
                        mode="date"
                        is24Hour={true}
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={onChange}
                        maximumDate={d}
                    />
                    )}
                    <Text style={styles.text}>
                        Email
                    </Text>                
                    <TextInput
                        style={styles.input}
                        onChangeText={setInputEmail}
                        value={inputEmail}
                        placeholder="Digite seu E-mail"
                    />
                    <Text style={styles.text}>
                        CPF
                    </Text>                

                    <TextInputMask
                        type={'cpf'}
                        value={inputCPF}
                        onChangeText={setInputCPF}
                        style={styles.input}
                        placeholder="Digite seu CPF"
                        ref={cpfRef}
                    />
                    <Text style={styles.text}>
                        Telefone
                    </Text>
                    <TextInputMask
                        type={'cel-phone'}
                        options={{
                        maskType: 'BRL',
                        withDDD: true,
                        dddMask: '(99) '
                        }}
                        style={styles.inputCel}
                        value={inputTelefone}
                        onChangeText={setInputTelefone}
                        placeholder='Digite seu telefone'
                        ref={telRef}
                    />
                    <View style={styles.checkBoxAreaAreaExterna}>

                        <TouchableOpacity onPress={handleClick} style={styles.checkBoxContainer} >
                    
                            <View style={styles.checkBoxArea}>

                            { checkBox == true

                                ?

                                    <Icon style={styles.checkBoxIcon} name="check" size={20} color="green" />

                                :

                                    <Icon style={styles.checkBoxIcon} name="close" size={20} color="red" />

                            }

                            </View>

                            <Text>Esse é o responsavel legal pela criança</Text>

                        </TouchableOpacity>

                    </View>
                </ScrollView> 
                <Modal transparent={true} animationType="fadeIn" visible={modalAlertConf}>
                    <View style={styles.modalContainer}>
                        <ModalAlertConf
                            modalOpen={()=>openModalAlertConf()}
                            modalCovid={() => navigation.goBack()}
                            textoBotao="OK"
                            texto="Responsavel cadastrado"
                        />
                    </View>
                </Modal>      
                <Modal transparent={true} animationType="fadeIn" visible={modalAlertNaoConf}>
                    <View style={styles.modalContainer}>
                        <ModalAlertNaoConf
                            modalOpen={()=>openModalAlertNaoConf()}
                            textoBotao="OK!"
                            texto="CPF invalido"
                        />
                    </View>
                </Modal>  
                <Modal transparent={true} animationType="fadeIn" visible={modalAlertNaoConf1}>
                    <View style={styles.modalContainer}>
                        <ModalAlertNaoConf
                            modalOpen={()=>openModalAlertNaoConf1()}
                            textoBotao="OK!"
                            texto="Preencha todos os campos"
                        />
                    </View>
                </Modal>  
                <Modal transparent={true} animationType="fadeIn" visible={modalAlertNaoConf2}>
                    <View style={styles.modalContainer}>
                        <ModalAlertNaoConf
                            modalOpen={()=>openModalAlertNaoConf2()}
                            textoBotao="OK!"
                            texto="Erro ao inserir"
                        />
                    </View>
                </Modal>
                <Modal transparent={true} animationType="fadeIn" visible={modalAlertNaoConf3}>
                    <View style={styles.modalContainer}>
                        <ModalAlertNaoConf
                            modalOpen={()=>openModalAlertNaoConf3()}
                            textoBotao="OK!"
                            texto="Email invalidado"
                        />
                    </View>
                </Modal>
                <Modal transparent={true} animationType="fadeIn" visible={modalAlertNaoConf}>
                    <View style={styles.modalContainer}>
                        <ModalAlertNaoConf
                            modalOpen={()=>openModalAlertNaoConf()}
                            textoBotao="OK!"
                            texto="CPF invalido"
                        />
                    </View>
                </Modal> 
                <Modal transparent={true} animationType="fadeIn" visible={modalAlertNaoConf5}>
                    <View style={styles.modalContainer}>
                        <ModalAlertNaoConf
                            modalOpen={()=>openModalAlertNaoConf5()}
                            textoBotao="OK!"
                            texto="CPF já cadastrado"
                        />
                    </View>
                </Modal>                     
                <Modal transparent={true} animationType="fadeIn" visible={modalAlertNaoConf4}>
                    <View style={styles.modalContainer}>
                        <ModalAlertNaoConf
                            modalOpen={()=>openModalAlertNaoConf4()}
                            textoBotao="OK!"
                            texto="Esse paciente ja possui um responsavel legal"
                        />
                    </View>
                </Modal>                                    
            </View>
        </View>
    )
}
