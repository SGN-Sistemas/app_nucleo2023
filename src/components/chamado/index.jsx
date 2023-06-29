import React,{ useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import { NavigationContainer,useNavigation, useNavigationContainerRef } from '@react-navigation/native';
import styles from './styles';

function Chamado({data}) {
    let mensagem = replaceHtml(data.mssg)

    
    let data_hora_temp = new Date(1607110465663)
    function replaceHtml(data){
        let mensagem = data.replace(/<p>/g, "")
        mensagem = mensagem.replace(/<\/p>/g, "")
        mensagem = mensagem.replace(/<div>/g, "")
        mensagem = mensagem.replace(/<\/div>/g, "")
        mensagem = mensagem.replace(/<strong>/g, "")
        mensagem = mensagem.replace(/<\/strong>/g, "")
        mensagem = mensagem.replace(/ol&aacute/g, "")
        mensagem = mensagem.replace(/<b>/g, "")
        mensagem = mensagem.replace(/<\/b>/g, "")
        mensagem = mensagem.replace(/&nbsp;/g, "")
        return mensagem
    }

    const navigation = useNavigation();

 return (

    <View style={styles.cont}>
        
        <TouchableOpacity 
            onPress={() =>
                navigation.navigate('Chamado_detalhe', {chamado: data})
              }
        >
                <View style={styles.container}>

                    <View style={styles.containerHeader}>
                        <Text style={styles.textoHeader}>De: {data.pessoa_last}</Text>

                        <View style={styles.areaTextoHeader}>
                                <Text style={styles.textoHeaderT}>Ticket: </Text>
                                <Text style={styles.textoNumeroHeader}>{data.ticket}</Text>
                        </View>
                        
                    </View>

                    <View style={styles.containerMain}> 
                        <Text style={styles.textoAssunto}>Assunto: {data.assunto}</Text>

                        <Text style={styles.texto}>Mensagem: {mensagem.length > 500 ? mensagem.substring(0,500)+'...' : mensagem}</Text>
                
                            <View style={styles.viewTextoFooter}>
                                <Text style={styles.textoFooter}>{data.data}</Text>
                            </View>
                
                    </View>
                </View>
        </TouchableOpacity>
    </View>

  );
}

export default Chamado