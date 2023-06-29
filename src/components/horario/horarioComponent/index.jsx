import { useLinkProps } from "@react-navigation/native";
import React from 'react'
import { View, Text,StyleSheet } from 'react-native'
import styles from './styles'
export default function HorarioComponent(props) {

    const data  =   props.data.data;

    const dt    =   data.split('-');

    const data_formatada = `${dt[2]}/${dt[1]}/${dt[0]}`;

    const date_new = new Date(data);

    const dia_da_semana  = date_new.getDay() + 1;

    let nome_dia_semana = "";
    const dia_da_semana_nome = () =>{
        switch (dia_da_semana) {
            case 0: 
                nome_dia_semana = "Domingo"
            break;
            case 1: 
                nome_dia_semana = "Segunda-Feira"
            break;
            case 2: 
                nome_dia_semana = "Terça-Feira"
            break;
            case 3: 
                nome_dia_semana = "Quarta-Feira"
            break;
            case 4: 
                nome_dia_semana = "Quinta-Feira"
            break;
            case 5: 
                nome_dia_semana = "Sexta-Feira"
            break;     
            case 6: 
                nome_dia_semana = "Sábado"
            break;  
            default: 
                nome_dia_semana =   ""
            break;                            
        }
    }
    dia_da_semana_nome();
    
    const horaInicial = props.data.horaInicial;

    const horaFinal = props.data.horaFinal;
 
    const especialidadeDescricao = props.data.especialidadeDescricao

    console.log( props.data.profissionalNome)

    let salaDescricao = "";
    const salaDescricaoValid = props.data.salaDescricao;
    const especialidadeDesc = () =>{

        if(salaDescricaoValid == null){
            salaDescricao   =   "Sem registro no banco";
        }else{
            salaDescricao   =   props.data.salaDescricao;
        }
    }
    
    especialidadeDesc()
    let nomeProf = [];
    const profissionalNome = props.data.profissionalNome;
    const nomeProfissional = profissionalNome.split(' ').map((position)=>{
        nomeProf.push(position.charAt(0).toUpperCase()+ position.substr(1).toLowerCase() + " ");
        
    })
    let nomeFormatado = "";
    for(let i=0;i<nomeProf.length;i++){
        nomeFormatado = nomeFormatado + nomeProf[i];
    }

    let especialidadeFormatado = "";

    const imprimirEspecialidade = () => {
        if(especialidadeDescricao.length < 20){
            especialidadeFormatado = especialidadeDescricao;
        }else{
            especialidadeFormatado = especialidadeDescricao.slice(0, 20) + "...";
        }
    }

    imprimirEspecialidade();

    let nomeImprimir = "";

    const imprimirNome = () => {
        if(nomeFormatado.length < 20){
            nomeImprimir = nomeFormatado;
        }else{
            nomeImprimir = nomeFormatado.slice(0, 20) + "...";
        }
    }
    imprimirNome()
    return (
        <View style={styles.card}>
            <Text style={{textAlign: 'center',fontWeight: 'bold',fontSize:20}}>
                Informações do atendimento
            </Text>
            <View style={styles.textArea}>
                <Text style={styles.textTitulo}>Dia da semana</Text>
                <Text style={styles.textSubtitulo}>{nome_dia_semana}</Text>
            </View>
            <View style={styles.textArea}>
                <Text style={styles.textTitulo}>Data</Text>
                <Text style={styles.textSubtitulo}>{data_formatada}</Text>
            </View>
            <View style={styles.textArea}>
                <Text style={styles.textTitulo}>Horario</Text>
                <Text style={styles.textSubtitulo}>{horaInicial.slice(0,5)} as {horaFinal.slice(0,5)}</Text>
            </View>
            <View style={styles.textArea}>
                <Text style={styles.textTitulo}>Especialidade</Text>
                <Text style={styles.textSubtitulo}>{especialidadeFormatado}</Text>
            </View>
            <View style={styles.textArea}>
                <Text style={styles.textTitulo}>Sala</Text>
                <Text style={styles.textSubtitulo}>{salaDescricao}</Text>
            </View>
            <Text style={{textAlign: 'center',fontWeight: 'bold',fontSize:20,marginTop:20}}>
                Informações do medico
            </Text>
            <View style={styles.textArea}>
                <Text style={styles.textTitulo}>Nome</Text>
                <Text style={styles.textSubtitulo}>{nomeImprimir}</Text>
            </View>
        </View>
    )
}