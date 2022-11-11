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
    }
  
})

export default styles