import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#FFF",
      padding: 3,
  
  },
  sombra:{
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
    image: {
      width: "100%",
      height: 200,
      resizeMode: "cover",
      marginTop: 10,
      marginBottom: 10,
    },
    msg: {
      textAlign: "justify",
      marginTop: 5,
      marginBottom: 5,
    },
  });
  

export default styles