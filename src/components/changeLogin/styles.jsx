import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageLogo:{
        width: 283,
        height: 134
    },
    containerImagem:{
      flex: 1,
      justifyContent: 'center',
      width: 283,
      height: 134,
      marginTop: 60
    },
  
    containerForm:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      width: '90%',
      marginBottom: 0
      
    },
    backgroundImage:{
        flex: 1,
        alignSelf: 'stretch',
        width: null
    },
    image: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },

    btnOpenModal: {
      backgroundColor: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '80%',
      minWidth: '80%',
      marginBottom: 50,
      borderRadius: 7,
      height: 56,
      padding: 10,
      elevation: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27
    },
    txtBtnOpenModal: {
      fontSize: 20,
      fontWeight: '600',
      color: "#222"
    },
    modalArea: {
      minWidth: '100%',
      width: '100%',
      minHeight: '100%',
      height: '100%',
      backgroundColor: "#00000088",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    modalAreaInterna: {
      width: '90%',
      height: '70%',
      backgroundColor: '#fff',
      borderRadius: 20,
      display: 'flex',
      alignItems: 'center',
    },
    input: {
      backgroundColor: '#fff',
      width: '80%',
      minWidth: '80%',
      borderRadius: 7,
      marginBottom: 10,
      height: 56,
      padding: 10,
      elevation: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      fontSize:20,
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 30
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth:  '80%',
      marginBottom: 10,
      marginTop: 10 
    },
    itemTitle: {
      fontSize:20,
      fontWeight: '600'
    }
})

export default styles