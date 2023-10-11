import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    area: {
        flex: 1,
        padding: 20
    },
    inputArea: {
        display: 'flex',
        gap:5,
        flexDirection: 'row',
        width: '100%',
        height: 60,
        backgroundColor: '#fff',
        marginBottom: 15,
        borderRadius: 7,
        height: 56,
        alignItems: 'center',
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        paddingLeft:20,
        paddingRight: 20,
        padding: 5
    },
    input:{
        flex: 1
    },
    line: {
        width: 1,
        height: '100%',
        backgroundColor: '#121212'
    },
    areaBtn:{
        width: '100%', 
        padding: 10,
    },
    txtBtn:{
        textAlign: 'center',
        fontSize: 16,
        color: '#000',
    }
});