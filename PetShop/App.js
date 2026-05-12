import { StyleSheet, Text, View,Image } from 'react-native';


export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>casa</View>
      <Image source={require('./Sources/imagem-inicio.jpg')} style={styles.img}/>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
  },
  header:{
    backgroundColor:'red',
    justifyContent:'center',
    
  },
  img:{
    width:100,
    height:80,
    marginLeft:290
  },
  
});
