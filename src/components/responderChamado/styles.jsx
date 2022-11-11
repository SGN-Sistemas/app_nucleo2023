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
      //marginTop: 10,
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
      //flex:1
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
      //fontWeight: "bold",
    },
    textoContent2: {
      textAlign: "center",
      marginTop: 2,
      color:'black',
      fontWeight: "bold",
    },
    content: {
      backgroundColor: "#FFF",
      padding: 10,
      marginTop: 20,
      shadowColor: "#121210",
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.39,
      shadowRadius: 8.3,
      elevation: 13,
    },
    textInput: {
      textAlignVertical: "top",
      borderWidth: 0.3,
      borderColor: "#c1c1c1",
      maxHeight: 200,
      height: 200,
      padding: 10,
    },
    text: {
      fontSize: 15,
      margin: 10,
    },
    viewBtnRegistrar: {
      justifyContent: "center",
      alignItems: "center",
      paddingBottom: 20,
      marginTop: 30,
    },
    areaBtnRegistrar: {
      backgroundColor: "#23CF5C",
      width: "50%",
      height: 50,
      marginTop: 8,
      borderRadius: 7,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    textoBtnRegistrar: {
      fontSize: 17,
      color: "white",
    },
    imgRegistrar: {
      color: "white",
      fontSize: 30,
    },
    viewBtnAnexo: {
      justifyContent: "center",
      alignItems: "center",
    },
    areaBtnAnexo: {
      backgroundColor: "#808080",
      flexDirection: "row",
      width: "35%",
      justifyContent: "center",
      alignItems: "center",
      height: 40,
      borderRadius: 7,
      marginTop: 20,
    },
    textoBtnAnexo: {
      fontSize: 16,
      color: "white",
    },
    imgAnexo: {
      color: "white",
    },
    modalContainer:{
      alignItems: 'center',
      justifyContent: 'center'
    },
    imgArea:{
      alignItems: "center",
      justifyContent: "center" 
    },
    btnImg:{
      width: "100%",
      height: 300,
      padding: 10
    },
    imgContainer:{
      width: "100%",
      height: "100%"
    },
    modalLoading:{
      flex:1,
      backgroundColor:"blue",
      width:250,
      height: 250,
      alignItems:'center',
      justifyContent: 'center'
    },
    modalLoadingArea:{
      width:"100%",
      height:"100%",
      opacity:0.7,
      backgroundColor:'black',
      justifyContent: 'center',
      alignItems: "center"
    }
  });
  
export default styles