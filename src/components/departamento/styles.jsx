import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({

    cont:{
        flex: 1
    },
    container:{
        height: 'auto',
        marginTop: 8,
        color: 'white',
        marginLeft: 8,
        marginRight: 8,
        borderRadius: 15,
        // borderWidth: 1,
        // borderColor:'#E2E1E1',
        backgroundColor: 'white',
        overflow: 'hidden',
        paddingLeft: 15,
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    imagem: {
        position: 'relative',
    },
    redCircle: {
        position: 'absolute',
        width: 15,
        height: 15,
        backgroundColor: 'lightcoral',
        borderRadius: 15,
        top: 5,
        right: 1,
    },
    description: {
        paddingTop: 6.5,
        paddingLeft: 10,
        flexDirection: 'column',
        // backgroundColor: 'red',
        maxWidth: '75%',
        textAlign: 'justify',
    },
    circularImage: {
        width: 75,
        height: 75,
        borderRadius: 75,
        backgroundColor: 'whitesmoke'
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