import { FlatList, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SPACING } from '../theme/theme'
import Header from '../components/Header'
import { useStore } from '../store/store'
import DrListCard from '../components/DrListCard'



const Dr_listScreen = ({ navigation }: any) => {

  const DoctorData = useStore((state: any) => state.DoctorData);
  // console.log(DoctorData);


  
  const backHandler = () => {
    navigation.pop();
  }
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.white} />
      <Header title='Top Doctors' backHandler={backHandler} />
      
        <View style={{marginBottom:SPACING.space_36*2}}>
          {DoctorData.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={DoctorData}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.FlatListContainer}
              renderItem={({ item }) => {
                return <TouchableOpacity
                onPress={() => {
                  navigation.push("DrDetails", { ...item })
                }}>
                  <DrListCard
                    id={item.id}
                    index={item.index}
                    userName={item.userName}
                    userProfession={item.userProfession}
                    userRating={item.userRating}
                    userDistance={item.userDistance}
                    userImage={item.userImage}
                    about={item.about}
                  />
                </TouchableOpacity>
              }}
            >

            </FlatList>) : (<></>)}
        </View>
      
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
  FlatListContainer: {
    margin: SPACING.space_18,
    marginTop: SPACING.space_2,
  }
})