import React from 'react'
import { View, Text,StyleSheet,Image, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import styles from './styles'
import { urlImage } from '../../../utils/url';

export default function Responsavel({data}) {
    //const image = "https://cdn.pixabay.com/photo/2017/08/01/01/33/beanie-2562646_960_720.jpg";
    let cpf_mask = '';
    let telefone1_mask = '';

    const id = data.cod_responsavel;
    const nome = data.nome_responsavel;
    const email = data.email;
    const telefone1 = data.telefone1;
    const telefone2 = data.telefone2;
    const cpf = data.cpf;
    const idade = data.data_nascimento;
    const imagem = data.foto;
    const paciente_crianca = data.paciente_crianca;
    const navigation = useNavigation();

    const dados =
    {
        nome:nome,
        id:id,
        cpf:cpf,
        email:email,
        telefone1: telefone1,
        telefone2: telefone2,
        imagem: urlImage + "" + imagem,
        idade:idade,
        paciente_crianca: paciente_crianca
    };

    
    function addMascara(){
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
    }

    addMascara();

    return (
        <View>
            <TouchableOpacity 
                onPress={
                    () => { navigation.navigate("PerfilResponsaveis",{Dados:dados})}
                }>
                <View style={styles.card}>
                    <View style={styles.imageArea}>
                        <Image
                            source={{uri: dados.imagem}}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.textArea}>
                        <View style={{flexDirection: "row"}}>
                            <Text style={styles.textTitulo}>Nome : </Text>
                            <Text style={styles.textSub}>{nome}</Text>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <Text style={styles.textTitulo}>CPF : </Text>
                            <Text style={styles.textSub}>{cpf_mask}</Text>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <Text style={styles.textTitulo}>Telefone : </Text>
                            <Text style={styles.textSub}>{telefone1_mask}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}