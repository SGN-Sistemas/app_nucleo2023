import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    card: {
        backgroundColor:"#fff",
        width:300,
        height:"80%",
        borderRadius:20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 1,
        position:"relative",
        padding:30,
        marginRight:30,
    },
    textArea:{
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth:1,
        padding:5,
        paddingLeft:10,
        paddingRight:10,
        borderRadius:20,
        borderColor:'#E8C548',
        marginTop:20
    },
    textTitulo:{
        fontSize:15,
        fontWeight:"bold",
    },
    textSubtitulo:{
        fontSize:15,
    }
})

export default styles