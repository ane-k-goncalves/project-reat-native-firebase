import { View, Text, Alert } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import useAuth from '../../firebase/hooks/useAuth';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Button from './Button';

export default function Logout() {
  
  
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <>
      <Button
        onPress={async () => {
          try {
            await logout();
            router.replace("/");
          } catch (error: any) {
            Alert.alert("Logout error", error.toString());
          }
        }}
        title={"Logout"}/>
    </>
  );
}