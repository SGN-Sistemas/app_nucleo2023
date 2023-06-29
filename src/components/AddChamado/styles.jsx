import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    cont: {
        flex: 1
    },
    container: {
        marginTop: 10,
        color: 'white',
        marginLeft: 7,
        marginRight: 7,
        borderWidth: 1,
        borderColor: '#E2E1E1',
        backgroundColor: 'white',
    },
    area: {
        justifyContent: 'center',
        height: 100,
        padding: 8
    },
    textoLabel: {
        fontSize: 18,
        marginBottom: 4
    },
    input: {
        backgroundColor: 'blue',
        height: 60,
        padding: 7,
        backgroundColor: '#fff',
        marginBottom: 15,
        borderRadius: 7,
        fontSize: 17,
        color: '#222',
        height: 56,
        padding: 10,
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        justifyContent: 'center'
    },
    areaMensagem: {
        justifyContent: 'center',
        height: 250,
        padding: 8,

    },
    inputMensagem: {
        textAlignVertical: 'top',
        backgroundColor: '#fff',
        borderRadius: 7,
        fontSize: 17,
        height: 180,
        color: '#222',
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
    viewBtnAnexo: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    areaBtnAnexo: {
        backgroundColor: '#808080',
        flexDirection: 'row',
        width: '35%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        borderRadius: 7,
        marginTop: 20
    },
    textoBtnAnexo: {
        fontSize: 16,
        color: 'white'
    },
    viewBtnRegistrar: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20
    },
    areaBtnRegistrar: {
        backgroundColor: '#23CF5C',
        width: '50%',
        height: 50,
        marginTop: 8,
        borderRadius: 7,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textoBtnRegistrar: {
        fontSize: 17,
        color: 'white'
    },
    imgAnexo: {
        color: 'white'
    },
    imgRegistrar: {
        color: 'white',
        fontSize: 30
    },
    modalPickerButton: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        alignItems: 'center'
    },
    iconsModalPicker: {
        position: 'absolute',
        right: 10,
    },
    containerAlignCenter: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    touchableImg: {
        width: "100%",
        height: 300,
        padding: 20
    },
    areaImg: {
        width: "100%",
        height: "100%"
    },
});

export default styles