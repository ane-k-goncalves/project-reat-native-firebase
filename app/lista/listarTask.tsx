import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import useCollection from "../../firebase/hooks/useCollection";

import Button from "../../src/components/Button";

import ListaPets from "../../src/components/ListaTask";
import Task from "../../types/pet";
import useAuth from "../../firebase/hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import Logout from "../../src/components/Logout";

export default function listarTask() {
  const [type, setType] = React.useState("");
  const [name, setName] = React.useState("");
  const [time, setTime] = React.useState("");
  const { user } = useAuth();

  const { data, create, remove, refreshData, loading, update } =
    useCollection<Task>("tasks");

  console.log("Enviando dados para Firestore:", { type, name, time });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Olá {user?.email} </Text>
        <Logout />
        <Text style={styles.subtitle}> Lista de tarefas diárias</Text>
      
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Nome da sua tarefa"
            style={styles.input}
          />
          <TextInput
            value={type}
            onChangeText={setType}
            placeholder="Descreva sua tarefa"
            style={styles.descricao}
          />
          <TextInput
            value={time}
            onChangeText={setTime}
            placeholder="duração"
            style={styles.input}
          />
     
        <Button
          title="Salvar"
          onPress={async () => {
            try {
              await create({ type, name, time });
              refreshData();
            } catch (error: any) {
              console.error("Erro ao salvar task: ", error);
              Alert.alert("Create taks error", error.toString());
            }
          }}
        />

        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ListaPets
              task={item}
              onDelete={async () => {
                await remove(item.id!);
                refreshData();
              }}
              onUpdate={async (updatedTask: Task) => {
                await update(item.id!, updatedTask);
                refreshData();
              }}
            />
          )}
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
    backgroundColor: "#ffe3e3",
  },
  main: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
  },
  subtitle: {
    fontSize: 24,
    color: "#38434D",
  },
  descricao: {
    fontWeight: "black",
    fontSize: 16,
    width: 300,
    height: 80,
    borderRadius: 5,
    backgroundColor: "white",
    margin: 10,
    textAlign:"center"

  },
  input: {
    fontWeight: "black",
    fontSize: 16,
    width: 300,
    height: 40,
    borderRadius: 5,
    backgroundColor: "white",
    margin: 10,
    textAlign:"center"
  }
});
