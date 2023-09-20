import React, {useContext,useEffect,useState} from 'react';
import { View, Text,Image,TouchableOpacity,StyleSheet,Modal} from 'react-native'
import { EvilIcons  } from '@expo/vector-icons'; 
import { AuthContext } from '../../contexts/ContextApi';
import { ModalAlertConf,ModalAlertNaoConf } from "../Modal/ModalApp";
import styles from './styles'
import { url, urlImage } from '../../utils/url';
export default function PerfilResponsaveis({route,navigation}) {
    //const {nome,cpf,email,telefone1,imagem,idade, id} = route.params.Dados;

    const Dados = route.params;
    const [modalAlertNaoConf, setModalAlertNaoConf] = useState(false);


    const [nome, setNome] = useState(route.params.Dados.nome)
    const [cpf, setCpf] = useState(route.params.Dados.cpf)
    const [email, setEmail] = useState(route.params.Dados.email)
    const [telefone1, setTelefone1] = useState(route.params.Dados.telefone1)
    const [telefone2, setTelefone2] = useState(route.params.Dados.telefone2)
    const [idade, setIdade] = useState(route.params.Dados.idade)
    const [id, setId] = useState(route.params.Dados.id)
    const [imagem, setImagem] = useState(route.params.Dados.imagem)
    const [pacienteCrianca, setPacienteCrianca] = useState(route.params.Dados.paciente_crianca)
    //const [imagem, setImagem] = useState(route.params.Dados.imagem)

   
    //let dadosInfo = {nome,cpf,email,telefone1,idade,id,imagem,

    const {atualizaResp, setAtualizaResp,codigoUsuario,modalResp, setModalResp} = useContext(AuthContext)
    const array = idade.split('-');
    const uriImage = imagem
    const data_transformada = `${array[2]}/${array[1]}/${array[0]}`;
    const dt_nasc = new Date(idade);
    const date_now = new Date();
    var diff_date = Math.abs(dt_nasc.getTime() - date_now.getTime());
    const days = Math.ceil(diff_date / (1000 * 60 * 60 * 24));
    const anos = Math.floor(days/365);
    const idadeFormatada = `${anos} anos`;
    let cpf_mask = ""
    let telefone1_mask = "";
    let textoEmailFormat = "";
    let TextoRespIndi = "";
    const [textRespLegal,setTextRespLegal] = useState();

    useEffect(() => {
        fetch(url + 'RespFilt',{
            method: 'post',
            body: JSON.stringify({"paciente": ""+codigoUsuario, "cod_resp" : ""+ id})
          })
          .then((resp) => resp.json())
          .then((json) => {
            setNome(json[0].nome_responsavel);
            setIdade(json[0].data_nascimento);
            setTelefone1(json[0].telefone1);
            setEmail(json[0].email);
            setCpf(json[0].cpf);
            setImagem(urlImage + "" +json[0].foto);
            setPacienteCrianca(json[0].paciente_crianca);
            setTelefone2(json[0].telefone2);
            setTextRespLegal(json[0].resp_legal ==  1);
            //dadosInfo = {nome,cpf,email,telefone1,idade,id,imagem, telefone2}
           
          })

    }, [atualizaResp])

    function openModalAlertNaoConf(){
        if(modalAlertNaoConf == false){
          setModalAlertNaoConf(true);
        }else{
          setModalAlertNaoConf(false);
        }
    }
    const textoEmailFormatFunc = () =>{
        if(email.length > 25){
            textoEmailFormat = `${email.slice(0,25)}...`;
        }else{
            textoEmailFormat = `${email}`;
        }
    }
    function mask(){
        cpf_mask = cpf.slice(0,3) + '.' + cpf.slice(3,6) + '.' + cpf.slice(6,9) + '-' + cpf.slice(9,11);

        if(telefone1.length  == 9){
            telefone1_mask = telefone1.slice(0,5) + '-' + telefone1.slice(5);
        }else if(telefone1.length  == 8){
             telefone1_mask = telefone1.slice(0,4) + '-' + telefone1.slice(4);
        }else if(telefone1.length  == 11){
             telefone1_mask = '('+telefone1.slice(0,2)+') ' + telefone1.slice(2,7) + '-' + telefone1.slice(7);
        }else if(telefone1.length  == 10){
             telefone1_mask = '('+telefone1.slice(0,2)+') ' + telefone1.slice(2,6) + '-' + telefone1.slice(6);
        }
        if( textRespLegal == 1){

            TextoRespIndi = "Responsavel legal sobre o paciente"

        }else{

            TextoRespIndi = "";

        }
    }
    textoEmailFormatFunc();
    mask();

    function deletarResponsavel(){
        //alert("Registro deletado!")
        fetch(url + 'DeleteResp',{
            method: 'post',
            body: JSON.stringify({
                 'id'   :   id
              })
            })
            .then((resp) => resp.json())
            .then((json) => {
                setAtualizaResp(!atualizaResp)

                setModalResp(true);
                navigation.goBack();
            }).catch((err) => {
                openModalAlertNaoConf();
            })
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.imgArea}>
                    <Image source={{uri : uriImage}} style={styles.img}/>
                </View>
                <View>
                    <View style={styles.textArea}>
                        <Text style={styles.textDestaque}>Nome : </Text>
                        <Text style={styles.text}>{nome}</Text>
                    </View>
                    <View style={styles.textArea}>
                        <Text style={styles.textDestaque}>Idade : </Text>
                        <Text style={styles.text}>{idadeFormatada}</Text>
                    </View>
                    <View style={styles.textArea}>
                        <Text style={styles.textDestaque}>Telefone : </Text>
                        <Text style={styles.text}>{telefone1_mask}</Text>
                    </View>
                    <View style={styles.textArea}>
                        <Text style={styles.textDestaque}>Email : </Text>
                        <Text style={styles.text}>{textoEmailFormat}</Text>
                    </View>
                    <View style={styles.textArea}>
                        <Text style={styles.textDestaque}>CPF : </Text>
                        <Text style={styles.text}>{cpf_mask}</Text>
                    </View>
                    {TextoRespIndi == 0 ? null:
                    <View style={styles.areaResp}>
                        <Text style={styles.textAreaResp}>{TextoRespIndi}</Text>
                    </View>
                    }
                </View>
            </View>
            <View style={styles.buttonsArea}>
                <View style={styles.buttonsAreas}>
                    <TouchableOpacity onPress={() => deletarResponsavel()}>
                        <EvilIcons name="trash" size={40} color="#980206"/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>{
                            navigation.navigate("EditResponsaveis",{data:Dados,dateFormatada:data_transformada});
                        }}
                    >
                        <EvilIcons name="pencil" size={40} color="#12121299" />
                    </TouchableOpacity>
                </View>
            </View>

            <Modal transparent={true} animationType="fadeIn" visible={modalAlertNaoConf}>
                <View style={styles.modalContainer}>
                    <ModalAlertNaoConf
                        modalOpen={()=>openModalAlertNaoConf()}
                        textoBotao="OK!"
                        texto="Erro ao deletar o responsavel"
                    />
                </View>
            </Modal>  
        </View>
    )
}