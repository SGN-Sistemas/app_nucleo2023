import { View, Text, StyleSheet } from "react-native";
import React from "react";
import styles from './styles'
export default function historico_horario_components({ data }) {
    const datas = data.data;
    const dataSplit = datas.split("-");
    const dataFormatada = dataSplit[2] + "/" + dataSplit[1] + "/" + dataSplit[0];
    const horaFormat = data.horaInicial.toString() + " ás " + data.horaFinal.toString();
    const profissionalNome = data.profissionalNome.toString();
  return (
    <View style={styles.container}>
        <View>
            <Text style={styles.nome}>{profissionalNome.slice(0,25)+"..."}</Text>
        </View>
        <View style={styles.contentArea}>
            <View style={styles.area1}>
                <Text style={styles.texto}>Local</Text>
                <Text style={styles.text1}>{data.accountUnidadeUnidade.toString()}</Text>
                <Text style={styles.texto}>Especiadade</Text>
                <Text style={styles.text1}>{data.especialidadeDescricao.toString()}</Text>

            </View>
            <View style={styles.area2}>
                <Text style={styles.texto}>Hora </Text>
                <Text style={styles.text1}>{horaFormat}</Text>
                <Text style={styles.texto}>Data</Text>
                <Text style={styles.text1}>
                    {dataFormatada}
                </Text>
            </View>
        </View>
    </View>
  );
}