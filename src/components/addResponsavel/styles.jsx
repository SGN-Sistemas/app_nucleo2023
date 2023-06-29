import { StyleSheet} from 'react-native';
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: "center",
        alignItems: "center",
    },
    containerForm:{
        width:"85%",
        height:"100%",
        backgroundColor:"#FFFFFF",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 5,
        padding:20,
        paddingTop:30,

    },
    imgArea:{
        marginBottom:20,
        marginTop:20,
        width:"100%",
        alignItems: "center",
    },
    img:{
        width:100,
        height:100,
        borderRadius:50,
        opacity: 0.9 ,
    },
    inputDate:{
        width:"100%",
        borderWidth: 1,
        borderColor:"#E8C548",
        borderRadius:5,
        padding:10,
        paddingRight:10,
        paddingLeft:10
    },
    iconCam:{
        position:"absolute",
        bottom:-5,
        right:0,
    },
    input:{
        width:"100%",
        borderWidth:1,
        borderColor:"#E8C548",
        borderRadius:5,
        padding:5,
        paddingRight:10,
        paddingLeft:10
 
    },
    inputCel:{
        width:"100%",
        borderWidth: 1,
        borderColor:"#E8C548",
        borderRadius:5,
        padding:5,
        paddingRight:10,
        paddingLeft:10,
    },
    modalContainer:{
        alignItems: "center",
        justifyContent: "center" 
    },
    text:{
        marginTop:5,
        marginBottom:5,
        fontSize:15,
        textAlign: "left",
        paddingTop:2,
        paddingBottom:2
    },
    icon1:{
        position:"absolute",
        top:0,
        left:0,
    },
    icon:{
        position:"absolute",
        top:0,
        right:0,
    },
    checkBoxArea:{
        width:25,
        height:25,
        borderWidth:1,
        borderColor:"#E8C548",
        justifyContent: "center",
        alignItems: "center",
        marginRight:10,
        borderRadius:5
    },
    checkBoxIcon:{
        margin: 0,
    },
    checkBoxContainer:{
        width:"auto",
        height:"auto",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    checkBoxAreaAreaExterna:{ 
        width:"auto",
        height:"auto",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding:20
    }
})

export default styles