import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SPACING } from '../theme/theme'
import Header from '../components/Header'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

const MessageScreen = ({navigation}:any) => {
  const [focussedBtn,setFocussedBtn] = useState("All");

  const tabBarHeight = useBottomTabBarHeight();


  const backhandler=()=>{
    navigation.navigate("Tab",{screen: "Home"});
  }
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.white} />
      <Header title='Messages' backHandler={backhandler}/>
      <View style = {[styles.InnerContainer,{marginBottom:tabBarHeight}]}>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.btn}>
            <Text>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text>All</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default MessageScreen

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  InnerContainer:{
    backgroundColor:"red",
    margin:SPACING.space_18
  },
  buttonRow:{
    flexDirection:"row",
    justifyContent:"space-between",
    backgroundColor:COLORS.teal50,
  },
  btn:{
    // backgroundColor:"green",
    padding:SPACING.space_18,
    width:"33%",
    alignItems:"center",
    justifyContent:"center"
  }
})