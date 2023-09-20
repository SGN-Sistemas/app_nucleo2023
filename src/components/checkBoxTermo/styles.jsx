import Icon from 'react-native-vector-icons/AntDesign'
import styled from 'styled-components/native'

const AreaCheckBox = styled.View`
    width: auto;
    max-width: 80%;
    height:30px;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
const AreaIcon = styled(Icon)`
    border: 1px solid #303030;
    display: flex;
    align-items: center;
    justify-content: center;
`
const TextCheckBox = styled.Text`
    color: #303030;
    font-size: 16px;
`
const TextDecorationCheckBox = styled.Text`
    color: #303030;
    text-decoration: underline;
    font-size: 16px;
`
export {
  AreaCheckBox,
  AreaIcon,
  TextCheckBox,
  TextDecorationCheckBox
}
