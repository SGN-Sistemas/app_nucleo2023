import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        height: 320,
        marginTop: 8,
        color: "white",
        marginLeft: 7,
        marginRight: 7,
        borderWidth: 1,
        borderColor: "#E2E1E1",
        backgroundColor: "white",
    },
    containerHeader: {
        height: '16%',
        backgroundColor: "#A5A5A5",
        justifyContent: "center",
        overflow: 'hidden',
        padding: 4
    },
    containerMain: {
        height: "69%",
        backgroundColor: "white",
    },
    containerFooter: {
        height: "15%",
        flexDirection: "row",
        backgroundColor: "white",
        alignItems: "flex-end",
        
    },
    textoHeader: {
        fontSize: 16,
        color: "white",
    },
    botaoTextoConfirma: {
        fontSize: 15,
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
    botaoTextoCancela: {
        fontSize: 15,
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
    botaoAreaCancela: {
        flex: 3,
        backgroundColor: "#E21B1B",
        padding: 10,
        height: "90%",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 2,
    },
    botaoAreaConfirma: {
        marginLeft: 2,
        flex: 2,
        backgroundColor: "#23CF5C",
        padding: 10,
        height: "90%",
        justifyContent: "center",
    },
    containerMain_1: {
        height: "50%",
        borderBottomColor: "#E2E1E1",
        borderBottomWidth: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    containerMain_2: {
        height: "50%",
        justifyContent: "center",
    },
    img: {
        margin: 10,
        height: 90,
        width: 90,
    },
    viewTexto: {
        width: "70%",
        marginLeft: 4,
        textAlignVertical: "center",
        textAlign: "left",
        justifyContent: "flex-start",
    },
    textoTituloMain: {
        fontSize: 16,
        fontWeight: "bold",
        paddingLeft: 6,
        paddingRight: 6,
    },
    textoMain: {
        paddingLeft: 6,
        paddingRight: 6,
    },
    modalContainer: {
        alignItems: "center",
        justifyContent: "center"
    }

});


export default styles