import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageLogo: {
    width: 283,
    height: 134
  },
  containerImagem: {
    flex: 1,
    justifyContent: 'center',
    width: 283,
    height: 134,
    marginTop: 60
  },
  containerForm: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginBottom: 0
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  input: {
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#fff',
    width: '94%',
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
    shadowRadius: 6.27
  },
  btnSubmit: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8C548',
    height: 56,
    borderRadius: 7,
    marginTop: 20,
    marginBottom: 50
  },
  textSubmit: {
    color: '#fff',
    fontSize: 18
  },
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  }

})
export default styles