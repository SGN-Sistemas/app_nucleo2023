import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({

    container:{
        flex: 1,
        marginTop: 37,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input:{
        width: '88%',
        height: '100%',
        padding: 8,
        fontSize: 18
    },
    lista:{
        marginBottom: 6,
        width: '100%'
    },
    areaInput: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '96%',
        borderRadius: 7,
        fontSize: 20,
        color: '#222',
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: {
              width: 0,
              height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        height: 56,
        marginBottom: 6
    },
    containerBtn:{
        width: '12%',
        justifyContent: 'center',
        alignItems: 'center'
      },
    modalArea: {
        flex:1,
        backgroundColor:"blue",
        width:250,
        height: 250,
        alignItems:'center',
        justifyContent: 'center'
    },
    modalView:{
        width:"100%",
        height:"100%",
        opacity:0.7,
        backgroundColor:'black',
        justifyContent: 'center',
        alignItems: "center"
    },
    img:{
        width:200,
        height:200,
    },
    text:{
        fontSize:20,
        color:"#121212",
        marginTop:10
    },
    containerImg:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 160
    },
    iconAdd: {
        position: "absolute",
        bottom: 40,
        right: 20,
      },
})

export default styles