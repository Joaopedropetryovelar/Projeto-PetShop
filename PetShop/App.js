import { StyleSheet, Text, View,Image,TextInput, Button } from 'react-native';


export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textInicio}>PetShop</Text>
      <Image source={require('./Sources/imagem-inicio.jpg')} style={styles.img}/>
    </View>
    {/* header */}
    <View style={styles.login}>
    <TextInput placeholder='Digite seu Email' style={styles.txtInput}/>  
    <TextInput placeholder='Digite seu Senha'style={styles.txtInput}/> 
    <Button title='Entrar'/> 
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
  },
  header:{
    backgroundColor:'',
    alignItems:'center',
    flexDirection:'row',
    width:'auto',
    height:100,
    
    
  },
  img:{
    width:140,
    height:80,
    marginEnd:20,
    marginLeft:160
  },
  textInicio:{
    fontSize:30,
  },
  txtInput:{
    borderWidth:1,
    borderRadius:10,
    padding:10,
    marginBottom:10,
  },
 
  
});
