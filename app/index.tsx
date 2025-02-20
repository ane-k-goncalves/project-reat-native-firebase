import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../src/components/Button";
import React, { useEffect, useState } from "react";
import useAuth from "../firebase/hooks/useAuth";
import { Link, router, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Logout from "../src/components/Logout";

export default function Index() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const { login, user, loading } = useAuth();

  const router = useRouter();

  console.log(user);


  useEffect(() => {
    if(user){
      router.replace('/lista/listarTask')
    }
  }, [user])

 if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.subtitle}>Carregando...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.ap}>

        <Text style={styles.title}>YOUR</Text>
        <Text style={styles.subtitle}> TASKS</Text>
        </View>

      <View style={styles.main}>
        
        <TextInput
          onChangeText={setEmail}
          value={email}
          placeholder="email"
          style={styles.input}
        />
        <TextInput
          onChangeText={setPassword}
          value={password}
          placeholder="password"
          secureTextEntry
          style={styles.input}
        />

        <Button title="Login"
          onPress={async () => {
            try {
              await login(email, password);
              router.push('/lista/listarTask')
            } catch (error: any) {
              Alert.alert("Login error", error.toString());
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {},
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: '#ffe3e3',
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
    alignItems: "center"
  },
  title: {
    fontSize: 68,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  ap: {
    marginTop: 100,
    alignItems: "center"
  },
  input: {
    fontWeight: "black",
    fontSize: 16,
    margin: 10,
    textAlign:"center" 
  }
});
