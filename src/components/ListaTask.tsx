import {
  View,
  Text,
  Alert,
  StyleSheet,
  TextInput,
  Modal,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import useDocument from "../../firebase/hooks/useDocument";
import { useGlobalSearchParams } from "expo-router";
import Button from "./Button";
import ButtonDelete from "./ButtonDelete";

import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Task from "../../types/pet";

interface ListaProps {
  task: Task;
  onDelete: Function;
  onUpdate: Function;
}

export default function ListaTask({ task, onDelete, onUpdate }: ListaProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [newType, setType] = useState(task.type);
  const [newName, setName] = useState(task.name);
  const [newTime, setTime] = useState(task.time);

  const handleSave = async () => {
    const updatedTask = {
      ...task,
      type: newType,
      name: newName,
      time: newTime,
    };

    await onUpdate(updatedTask);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tasks}>
      <Text>Nome da tarefa: {task.name}</Text>
      <Text>Descrição: {task.type}</Text>
      <Text>Tempo: {task.time}</Text>
      </View>

      <View style={styles.buttons}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Editar Pet</Text>

            <TextInput
              value={newName}
              onChangeText={setName}
              placeholder="Nome da sua tarefa"
            />
            <TextInput
              value={newType}
              onChangeText={setType}
              placeholder="Descreva sua tarefa"
            />
            <TextInput
              value={newTime}
              onChangeText={setTime}
              placeholder="quanto tempo você tem para fazer?"
            />

            <Button title="Salvar" onPress={handleSave} />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Editar</Text>
      </Pressable>

      <ButtonDelete
        title="Deletar"
        onPress={() => {
          Alert.alert("Confirmar Exclusão", "Deseja excluir esta tarefa?", [
            { text: "Cancelar" },
            { text: "Excluir", onPress: () => onDelete() },
          ]);
        }}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 10,
    width: 250,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    width: 80,
    height: 30,
    margin:10,
  },
  buttonOpen: {
    backgroundColor: "#a6aebf",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    width: 100
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 10,
  },
  modalText: {
    textAlign: "center",
  },
  buttons: {
    justifyContent:"space-between",
    flexDirection: "row"
  },
  tasks: {
    margin: 10,
    textAlign: "left"
  }
});
