import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ScheduleScreen = ({navigation,route}:any) => {

  console.log("route: " , route.params);
  return (
    <View>
      <Text>ScheduleScreen</Text>
    </View>
  )
}

export default ScheduleScreen

const styles = StyleSheet.create({})