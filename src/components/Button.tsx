import {
    Text,
    StyleSheet,
    TouchableOpacity,
  } from "react-native";

  
  type Props = {
    onPress: () => void,
    title: string
  };

  

  export default function Button ({ onPress, title } : Props) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress} >
            <Text style={styles.textStyle}> {title} </Text>
        </TouchableOpacity>
    );
  }

  const styles = StyleSheet.create ({
    button: {
      width: 100,
      height:30,
      backgroundColor: '#a6aebf',
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
      margin: 10
      
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 10
    },
  })


