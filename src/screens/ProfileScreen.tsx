import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import Header from '../components/Header'
import CustomIcons from '../components/CustomIcons'

const ProfileScreen = ({navigation}:any) => {
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.cyan300} />
      <View style={styles.InnerContainer}>
        <View style={styles.upperContainer}>
          <Image source={require("../assets/svg_images/profilepic.jpg")} style={styles.image} />
          <Text style={{ color: COLORS.white, fontFamily: FONTFAMILY.poppins_semibold, fontSize: FONTSIZE.size_20, margin: SPACING.space_10 }}>Roberts</Text>
          <View style={styles.cardRow}>
            <View style={styles.rowcard}>
              <Image source={require("../assets/svg_images/heartratewhite.png")} style={{ width: 50, height: 50 }} />
              <Text style={{ color: COLORS.white, fontFamily: FONTFAMILY.poppins_light, fontSize: FONTSIZE.size_10 }}>Heart Rate</Text>
              <Text style={{ color: COLORS.white, fontFamily: FONTFAMILY.poppins_semibold, fontSize: FONTSIZE.size_20, marginTop: SPACING.space_8 }}>215 bpm</Text>
            </View>

            <View style={styles.rowcard}>
              <Image source={require("../assets/svg_images/fireprofile.png")} style={{ width: 50, height: 50 }} />
              <Text style={{ color: COLORS.white, fontFamily: FONTFAMILY.poppins_light, fontSize: FONTSIZE.size_10 }}>Calories</Text>
              <Text style={{ color: COLORS.white, fontFamily: FONTFAMILY.poppins_semibold, fontSize: FONTSIZE.size_20, marginTop: SPACING.space_8 }}>756 cal</Text>
            </View>

            <View style={styles.rowcard}>
              <Image source={require("../assets/svg_images/dumbellprofile.png")} style={{ width: 50, height: 50 }} />
              <Text style={{ color: COLORS.white, fontFamily: FONTFAMILY.poppins_light, fontSize: FONTSIZE.size_10 }}>Weights</Text>
              <Text style={{ color: COLORS.white, fontFamily: FONTFAMILY.poppins_semibold, fontSize: FONTSIZE.size_20, marginTop: SPACING.space_8 }}>103 lbs</Text>
            </View>
          </View>

        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.bottomRow}>
            <Image source={require("../assets/svg_images/likeprofile.png")} style={{ width: 60, height: 60 }} />
            <Text style={{ fontFamily: FONTFAMILY.poppins_medium, fontSize: FONTSIZE.size_18 }}>Saved</Text>
            <Image source={require("../assets/svg_images/arrowright.png")} style={{ width: 30, height: 30 }} />
          </View>

          <TouchableOpacity style={[styles.bottomRow, { paddingTop: 0 }]} onPress={()=>{
            navigation.navigate("Tab",{screen:"Appointment"});
          }}>
            <Image source={require("../assets/svg_images/appointmentprofile.png")} style={{ width: 60, height: 60 }} />
            <Text style={{ fontFamily: FONTFAMILY.poppins_medium, fontSize: FONTSIZE.size_18 }}>Appointment</Text>
            <Image source={require("../assets/svg_images/arrowright.png")} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>

          <View style={[styles.bottomRow, { paddingTop: 0 }]}>
            <Image source={require("../assets/svg_images/walletblue.png")} style={{ width: 60, height: 60 }} />
            <Text style={{ fontFamily: FONTFAMILY.poppins_medium, fontSize: FONTSIZE.size_18 }}>Payment</Text>
            <Image source={require("../assets/svg_images/arrowright.png")} style={{ width: 30, height: 30 }} />
          </View>




          <View style={[styles.bottomRow, { paddingTop: 0 }]}>
            <Image source={require("../assets/svg_images/help.png")} style={{ width: 60, height: 60 }} />
            <Text style={{ fontFamily: FONTFAMILY.poppins_medium, fontSize: FONTSIZE.size_18 }}>Help</Text>
            <Image source={require("../assets/svg_images/arrowright.png")} style={{ width: 30, height: 30 }} />
          </View>



          <View style={[styles.bottomRow, { paddingTop: 0 }]}>
            <Image source={require("../assets/svg_images/likeprofile.png")} style={{ width: 60, height: 60 }} />
            <Text style={{ fontFamily: FONTFAMILY.poppins_medium, fontSize: FONTSIZE.size_18 }}>FAQ</Text>
            <Image source={require("../assets/svg_images/arrowright.png")} style={{ width: 30, height: 30 }} />
          </View>
        </View>
      </View>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.cyan300,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  InnerContainer: {
    flexGrow: 1,
  },
  upperContainer: {
    margin: SPACING.space_18,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.space_14,
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 50
  },
  rowcard: {
    justifyContent: "center",
    alignItems: "center",
  },
  cardRow: {
    flexDirection: "row",
    gap: SPACING.space_32
  },
  bottomContainer: {
    backgroundColor: COLORS.white,
    flexGrow: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: SPACING.space_18,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SPACING.space_36,
    paddingBottom: SPACING.space_10
    // paddingTop:SPACING.space_8
    // marginHorizontal:SPACING.space_8,
  }

})