import React, { useEffect,useState } from "react";
import {
  View,
  ImageBackground,
  KeyboardAvoidingView,
  Image,
  Text,
  TouchableOpacity,
  Modal
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import { FlatList, TextInput } from "react-native-gesture-handler";

function ChangeLogin({ navigation }) {
    const [modal,setModal] = useState(false)
    const [text,setText] = useState('')
    const [users,setUsers]= useState([])
    const [usersFilter,setUsersFilter]= useState([])
  useEffect(() => {
    (async () => {
        setUsers(JSON.parse(await AsyncStorage.getItem("users")))
        setUsersFilter(JSON.parse(await AsyncStorage.getItem("users")))
    })();
  }, []);

  useEffect(() => {
    if(text !== ''){
        setUsers(
            usersFilter.filter(item =>{
                const login = item.login.toLowerCase()
                if (login.indexOf(text.toLowerCase()) > -1) {
                    return true
                }
                return false
            })
        )
    }else{
        setUsers(usersFilter)
    }
  }, [text])

  const selectUser = async (login,password) => {
    await AsyncStorage.setItem('login',login)
    await AsyncStorage.setItem('password',password)
    navigation.navigate("Login")
  }
  

  const Item = ({login,password}) => (
    <TouchableOpacity 
        style={styles.item}
        onPress={
            async () =>{
                selectUser(login,password)
            }
        }
    >
      <Text style={styles.itemTitle}>{login}</Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ImageBackground
        source={require("../../assets/lgpd_protecao_dados.png")}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.containerImagem}>
          <Image
            style={styles.imageLogo}
            source={require("../../assets/incentivarLogo.png")}
          />
        </View>
        <TouchableOpacity 
            style={styles.btnOpenModal}
            onPress={()=>setModal(!modal)}
        >
            <Text
                style={styles.txtBtnOpenModal}
            >
                Escolha um usuário
            </Text>
        </TouchableOpacity>
      </ImageBackground>
      <Modal  transparent={true} animationType="fadeIn" visible={modal} >
        <View 
            style={styles.modalArea}
        >
            <View
                style={styles.modalAreaInterna}
            >
                <TextInput
                    style={styles.input}
                    onChangeText={setText}
                    value={text}
                    placeholder={"Digite um usuário"}
                />
                <FlatList
                    data={users}
                    renderItem={({item}) => {
                        return (
                            <Item 
                                login={item.login} 
                                password={item.password} 
                            />
                        )
                    }}
                />
            </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

export default ChangeLogin;
