import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 20,
        margin: 20,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.3,

        elevation: 13,
    },
    nome: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#335153",

    },
    contentArea: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5
    },
    area1: {
        flex: 1
    },
    area2: {
        flex: 1
    },
    text1: {
        marginLeft: 15,
        fontSize: 15,
        color: "#335153",
    },
    texto: {
        fontWeight: "600",
        fontSize: 18
    }

});

export default styles