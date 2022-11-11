import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    card: {
        width: "100%",
        height: "auto",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
        backgroundColor: "#FFF",
        borderRadius: 10,
        flexDirection: "row",
        padding: 10,
        marginTop:10
    },
    imageArea: {
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    textArea: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingLeft: 10,
    },
    textTitulo:{
        fontSize:15,
        fontWeight: "bold",
        color:"#333333"
    },
    textSub:{
        fontSize:15,
        color:"#00000099"
    }
});


export default styles