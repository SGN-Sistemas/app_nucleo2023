import React, {useEffect} from 'react'
import {View,StyleSheet,ImageBackground, KeyboardAvoidingView, Image} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
let refresh_token = '6a3f3ef81150c4c3d9fe22293f337e5c69f8223bea358d701fa14974bc99d56b1443692efe37deb381dd4f9d5f0c2afcb05b4d6ed3d6cd7de4edde5525bdfb6d';

function PreLogin({ navigation }){

    useEffect( () => {

        const checkToken = async () => {

            if(refresh_token !== null){
                setTimeout(() =>{
                    navigation.navigate('Login', {refresh_token})
                },1000)
            }else{
                alert('Não existe token salvo no Storage no momento!');
                navigation.navigate('Login')
            }
        }

        checkToken()
    },[])

    const salvaTokenStorage = async (t) => {
            
        // Chave do token no AsyncStorage é 'token'

        await AsyncStorage.setItem("token",JSON.stringify(t));
    }

        return(
   
            <KeyboardAvoidingView style={styles.container}>

                <ImageBackground source={require('../../assets/lgpd_protecao_dados.png')}
                        resizeMode="cover" style={styles.image}>
                            
                            <View style={styles.containerImagem}>

                                        <Image 
                                            style={styles.imageLogo}
                                            source={require('../../assets/incentivarLogo.png')}
                                        />
                            </View>
                                
                </ImageBackground>

            </KeyboardAvoidingView>  
        )
    
}


export default PreLogin