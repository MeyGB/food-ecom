import { Slot } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

export default function _layout() {
  return (
    <View>
      <Text>Auth_layout</Text>
      <Slot />
    </View>
  )
}