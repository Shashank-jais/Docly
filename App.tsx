import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TabNavigator from './src/navigators/TabNavigator';
import CartScreen from './src/screens/CartScreen';
import Dr_detailsScreen from './src/screens/Dr_detailsScreen';
import Dr_listScreen from './src/screens/Dr_listScreen';
import DrugDetailsScreen from './src/screens/DrugDetailsScreen';
import PharmacyScreen from './src/screens/PharmacyScreen';



const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen 
        name='Tab'
        component={TabNavigator}
        options={{animation:'slide_from_bottom'}}></Stack.Screen>
        <Stack.Screen 
        name='Cart'
        component={CartScreen}
        options={{animation:'slide_from_bottom'}}></Stack.Screen>
        <Stack.Screen 
        name='DrDetails'
        component={Dr_detailsScreen}
        options={{animation:'slide_from_bottom'}}></Stack.Screen>
        <Stack.Screen 
        name='DrList'
        component={Dr_listScreen}
        options={{animation:'slide_from_bottom'}}></Stack.Screen>
        <Stack.Screen 
        name='DrugDetails'
        component={DrugDetailsScreen}
        options={{animation:'slide_from_bottom'}}></Stack.Screen>
        <Stack.Screen 
        name='Pharmacy'
        component={PharmacyScreen}
        options={{animation:'slide_from_bottom'}}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});

export default App;
