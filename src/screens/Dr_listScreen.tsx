import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../theme/theme'

const Dr_listScreen = () => {
  return (
    <View style={styles.ScreenContainer}>
      <Text>Dr_listScreen</Text>
    </View>
  )
}

export default Dr_listScreen

const styles = StyleSheet.create({
   ScreenContainer: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    scrollViewFlex: {
      flexGrow: 1,
    },
})