import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    modal:
    {
      flex:1,
      backgroundColor:"blue",
      width:250,
      height: 250,
      alignItems:'center',
      justifyContent: 'center'
    },
    modalContainer:
    {
      width:"100%",
      height:"100%",
      opacity:0.7,
      backgroundColor:'black',
      justifyContent: 'center',
      alignItems: "center"
    },
    flatList:
    {
      marginBottom: 6,
      marginTop: 35
    },
    container:
    {
      flex:1,
      alignItems: "center",
      justifyContent: "center",
    },
    text:{
      fontSize:20,
      color:"#121212"
    },
    imagemCalen:{
      width:200,
      height:200
    },
    btnArea:{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 30,
      right: 30,
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#E8C548',
    }
  })
  
export default styles