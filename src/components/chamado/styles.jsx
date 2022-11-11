import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({

    cont:{
        flex: 1
    },
    container:{
        height: 'auto',
        marginTop: 8,
        color: 'white',
        marginLeft: 7,
        marginRight: 7,
        borderWidth: 1,
        borderColor:'#E2E1E1',
        backgroundColor: 'white',
        overflow: 'hidden',
        padding: 10
    },
    containerHeader:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 6
    },
    textoAssunto:{
        marginBottom: 10,
        padding: 6,
        fontSize: 16
    },
    texto:{
        padding: 3,
        fontSize: 16,
        textAlign: 'justify'
    },
    textoFooter:{
        fontSize: 13,
        padding: 6
    },
    viewTextoFooter:{
        alignItems: 'flex-end',
        position: 'relative',
        bottom: 2,
        fontSize: 20
    },
    textoNumeroHeader:{
        fontWeight: 'bold'
    },
    areaTextoHeader:{
        flexDirection: 'row'
    },
    textoHeader:{
        fontSize: 16
    },
    textoHeaderT:{
        color: '#BEBBBB'
    }
  });
export default styles