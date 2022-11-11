import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    card: {
        padding: 30,
        marginTop: 20,
        width: "100%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        borderRadius: 30,
        backgroundColor: "#fff"
    },
    imgArea: {
        alignItems: 'center',
        width: "auto",
        height: "auto",
    },
    buttonImg: {
        position: 'relative'
    },
    img: {
        width: 135,
        height: 135,
        borderRadius: 135 / 2,
    },
    icons: {
        position: 'absolute',
        right: 0,
        bottom: -5,
    },
    buttonsArea: {
        position: 'absolute',
        width: "100%",
        bottom: 20,
    },
    buttonsAreas: {
        flexDirection: "row",
        display: "flex",
        justifyContent: 'space-evenly',
    },
    textArea: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginTop: 15
    },
    textDestaque: {
        fontSize: 19,
        color: "#121212",
        fontWeight: "bold",
    },
    text: {
        fontSize: 18,
        color: "#121212",
    },
    areaResp: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    },
    textAreaResp: {
        fontSize: 15,
        color: "#A52A2A",
    }
})
export default styles