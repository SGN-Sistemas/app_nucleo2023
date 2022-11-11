import React, { useState } from 'react'
import { View, ImageBackground, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Text, Modal } from 'react-native'
import { ModalAppConfirma, ModalAppErro } from '../Modal/ModalApp'
import styles from './styles'
function PreLogin({ navigation, route }) {

  const [email, setEmail] = useState(route.params.email)
  const [isModalConfirm, setIsModalConfirm] = useState(false)
  const [isModalError, setIsModalError] = useState(false)
  const [modalErrorInterno, setModalErrorInterno] = useState(false)
  const [textoError, setTextoError] = useState('')

  const alteraSenha = () => {

    if (email === '') {

      setIsModalError(true);

    } else {

      fetch('http://sgnsistemas.ddns.net:65531/sgn_lgpd_nucleo/webservice_php_json/webservice_php_json.php?recuperarSenha', {
        method: 'POST',
        body: JSON.stringify({
          "email": email

        })
      })
        .then((resp) => resp.text())
        .then((json) => {
          if(json == '"Email nao cadastrado!"'){
            setTextoError("Email nao cadastrado!")
            setModalErrorInterno(true)
            return;
          }
          setIsModalConfirm(true)
        })
        .catch((error) => {
          setTextoError(error.message)
          setModalErrorInterno(true)
        })

    }
  }

  const sairConf = () => {
    setIsModalConfirm(false)
  }

  const sairError = () => {
    setIsModalError(false)
  }

  const sairErrorInterno = () => {
    setModalErrorInterno(false)
  }

  return (

    <KeyboardAvoidingView style={styles.container}>

      <ImageBackground source={require('../../assets/lgpd_protecao_dados.png')}
        resizeMode="cover" style={styles.image}>

        <View style={styles.containerImagem}>
          <Image
            style={styles.imageLogo}
            source={require('../../assets/incentivarLogo.png')}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Informe o e-mail cadastrado"
          value={email}
          onChangeText={(texto) => setEmail(texto)}
        />

        <TouchableOpacity style={styles.btnSubmit} onPress={alteraSenha}>
          <Text style={styles.textSubmit}> Recuperar </Text>
        </TouchableOpacity>

        <Modal transparent={true} animationType="fadeIn" visible={isModalConfirm}>
          <View style={styles.modalContainer}>
            <ModalAppConfirma fechar={() => sairConf()}
              texto="E-mail com alteração de senha enviado" textoBotao="OK" />
          </View>
        </Modal>

        <Modal transparent={true} animationType="fadeIn" visible={isModalError} >
          <View style={styles.modalContainer}>
            <ModalAppErro fechar={() => sairError()}
              texto="O campo de email não pode estar vazio!" textoBotao="OK" />
          </View>
        </Modal>

        <Modal transparent={true} animationType="fadeIn" visible={modalErrorInterno} >
          <View style={styles.modalContainer}>
            <ModalAppErro fechar={() => sairErrorInterno()}
              texto={textoError} textoBotao="OK" />
          </View>
        </Modal>

      </ImageBackground>

    </KeyboardAvoidingView>
  )
}



export default PreLogin