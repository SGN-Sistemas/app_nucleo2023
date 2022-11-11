import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#fff",
      padding: 10,
      flex: 1,
      height: "100%",
    },
    icons: {
      position: "absolute",
      top: 10,
      left: 10,
    },
    header: {
      backgroundColor: "#FFF",
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom:1,
      paddingTop:1,
    //   marginTop: 10,
      shadowColor: "#121210",
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.39,
      shadowRadius: 8.3,
      elevation: 13,
      display: "flex",
      flexDirection: "row",
    //   flex:1
    },
    textoHeader: {
      fontSize: 12.8,
      marginRight: 2,
      marginTop: 5,
    },
    textAreaHeader: {
      flex: 2,
    },
    textoContent1: {
      textAlign: "center",
      marginTop: 2,
      color:'black',
      fontSize:10,
    //   fontWeight: "bold",
    },
    textoContent2: {
      textAlign: "center",
      marginTop: 2,
      color:'black',
      fontWeight: "bold",
    },
    contentBody: {
        flex:1
    },
    image: {
      width: "100%",
      height: 500,
      resizeMode: "cover",
      marginTop: 10,
    },
    icon2:{
      zIndex:10000,
      position:"absolute",
      bottom:70,
      right: 30,
      width:50,
      height:50,
      borderRadius:25,
      backgroundColor:"#01A78F",
      alignItems: "center",
      justifyContent:"center",
    },
    modalArea:{
      flex:1,
      backgroundColor:"blue",
      width:250,
      height: 250,
      alignItems:'center',
      justifyContent: 'center'
    },
    containerModal:{
      width:"100%",
      height:"100%",
      opacity:0.7,
      backgroundColor:'black',
      justifyContent: 'center',
      alignItems: "center"
    }
  });

export default styles