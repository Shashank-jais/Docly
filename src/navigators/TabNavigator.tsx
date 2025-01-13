import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen';
import CustomIcons from '../components/CustomIcons';
import { COLORS } from '../theme/theme';
import MessageScreen from '../screens/MessageScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AppointmentNavBar from '../screens/AppointmentNavBar';
// import {MaterialIcon} from '../components/Icon';
import Icon from "react-native-vector-icons/MaterialIcons"
import Icon2 from "react-native-vector-icons/AntDesign"




const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={{
        tabBarHideOnKeyboard:true,
        headerShown:false,
        tabBarShowLabel:true,
        tabBarStyle:styles.tabBarStyle,
        tabBarActiveTintColor:COLORS.cyan300 
    }}
    >

        <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
            tabBarIcon: ({ focused, color, size }) => (
                <Icon name="home"
                size={32}
                color={focused ? COLORS.cyan300 : COLORS.gray500} />
            )
        }}
        ></Tab.Screen>
        <Tab.Screen
        name='Message'
        component={MessageScreen}
        options={{
            tabBarIcon: ({ focused, color, size }) => (
                <Icon name="email"
                    size={29}
                    color={focused ? COLORS.cyan300 : COLORS.gray500} />
            )
        }}
        ></Tab.Screen>
        <Tab.Screen
        name='Appointment'
        component={AppointmentNavBar}
        options={{
            tabBarIcon: ({ focused, color, size }) => (
                <Icon2 name="profile"
                size={24}
                color={focused ? COLORS.cyan300 : COLORS.gray500} />
            )
        }}
        ></Tab.Screen>
        <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
            tabBarIcon: ({ focused, color, size }) => (
                <Icon2 name="user"
                    size={24}
                    color={focused ? COLORS.cyan300 : COLORS.gray500} />
            )
        }}
        ></Tab.Screen>
    </Tab.Navigator>
  )
}

export default TabNavigator

const styles = StyleSheet.create({
    tabBarStyle: {
        height: 70,
        padding:10,
        position: 'absolute',
        // backgroundColor: COLORS.primaryBlackRGBA,
        borderTopWidth: 0,
        elevation: 0,
        borderTopColor: COLORS.black900,
    },
    
})