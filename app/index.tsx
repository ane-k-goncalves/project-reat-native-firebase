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

export default function Index() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const { login, user, loading } = useAuth();

  const router = useRouter();

  console.log(user);


  useEffect(() => {
    if(user){
      router.replace('/lista/listarPet')
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
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Hello World</Text>
        <Text style={styles.subtitle}> Pets</Text>
    

        <TextInput
          onChangeText={setEmail}
          value={email}
          placeholder="email"
        />
        <TextInput
          onChangeText={setPassword}
          value={password}
          placeholder="senha"
          secureTextEntry
        />

        <Button title="Login"
          onPress={async () => {
            try {
              await login(email, password);
              router.push('/lista/listarPet')
            } catch (error: any) {
              Alert.alert("Login error", error.toString());
            }
          }}
        />
      </View>
    </View>
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
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
