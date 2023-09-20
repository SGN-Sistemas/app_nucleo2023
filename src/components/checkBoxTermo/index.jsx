import { Linking } from 'react-native'
import * as S from './styles'

const CheckBox = ({ setNameIcon, nameIcon }) => {
  return (
        <S.AreaCheckBox>
            <S.AreaIcon
                onPress={() => {
                  setNameIcon(!nameIcon)
                }}
                name={nameIcon ? 'check' : 'close'}
                size={25}
                color={nameIcon ? '#04b913' : '#a72727'}
            />
            <S.TextCheckBox>
                Eu aceito as
                <S.TextDecorationCheckBox
                    onPress={() => {
                      Linking.openURL('https://sgnsistemas.com.br/termos-de-uso-do-sistema-sgn/')
                    }}
                >
                    Políticas de privacidades
                </S.TextDecorationCheckBox>

            </S.TextCheckBox>
        </S.AreaCheckBox>
  )
}

export {
  CheckBox
}
