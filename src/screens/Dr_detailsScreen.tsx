import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Dr_detailsScreen = ({navigation,route}:any) => {

  console.log(route.params)
  return (
    <View>
      <Text>Dr_detailsScreen</Text>
    </View>
  )
}

export default Dr_detailsScreen

const styles = StyleSheet.create({})