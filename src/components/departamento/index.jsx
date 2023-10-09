import React,{ useState } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { NavigationContainer,useNavigation, useNavigationContainerRef } from '@react-navigation/native';
import styles from './styles';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function Departamento({data}) {

    const navigation = useNavigation();

    let texto = data.Descricao

    let textoMenor = texto.substring(0,80) + '...';

 return (

    <View style={styles.cont}>
        
        <TouchableOpacity 
            onPress={() =>
                navigation.navigate('Chamados', {chamado: data})
              }
        >
                <View style={styles.container}>
                    
                    <View style={styles.imagem}>
                        <Image
                            source={{uri: data.ImageUrl}}
                            style={styles.circularImage}
                        />
                        { data.hasMessages && (<View style={styles.redCircle} />)}
                    </View>

                    <View style={styles.description}>
                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{data.Departamento}</Text>
                        <Text style={{ color: 'grey' }}>{data.Descricao.length >= 80 ? textoMenor : texto}</Text>
                    </View>

                    <Icon style={{ alignSelf: 'center', marginRight: 3 }} name='keyboard-arrow-right' size={33} color="lightgray" />
                </View>
        </TouchableOpacity>
    </View>

  );
}

export default Departamento