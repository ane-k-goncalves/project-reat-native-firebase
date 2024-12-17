import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import Logout from '../../src/components/Logout'

export default function _layout() {
  return (
   <Stack>
    <Stack.Screen name="listarPet" options={{
      title:"TASKS",
      headerRight: () => <Logout />,
      headerStyle: {
        backgroundColor: '#ffe3e3',
     
      },
    
      

    }}/>
   </Stack>
  )
}