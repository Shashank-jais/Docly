import { Dimensions, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import Header from '../components/Header'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

const CARD_WIDTH = Dimensions.get('window').width * 0.15;
const MessageScreen = ({ navigation }: any) => {
  const [focussedBtn, setFocussedBtn] = useState("All");
  const tabBarHeight = useBottomTabBarHeight();

  const backhandler = () => {
    navigation.navigate("Tab", { screen: "Home" });
  };

  // Dynamic styles for buttons
  const getButtonStyle = (button: string): ViewStyle => ({
    backgroundColor: focussedBtn === button ? COLORS.cyan300 : COLORS.teal50,
    borderRadius: BORDERRADIUS.radius_8,
    padding: SPACING.space_14,
    width: "33%",
    alignItems: "center",
    justifyContent: "center", 
  });

  const getButtonTextStyle = (button: string) => ({
    fontFamily: FONTFAMILY.poppins_medium,
    color: focussedBtn === button ? COLORS.white : COLORS.blueGray300,
    fontSize: FONTSIZE.size_16,
  });

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.white} />
      <Header title="Messages" backHandler={backhandler} />

      {/* Main Body */}
      <View style={[styles.InnerContainer, { marginBottom: tabBarHeight }]}>
        {/* Button Row */}
        <View style={styles.buttonRow}>
          {["All", "Groups", "Private"].map((btn) => (
            <TouchableOpacity
              key={btn}
              style={getButtonStyle(btn)}
              onPress={() => setFocussedBtn(btn)}
            >
              <Text style={getButtonTextStyle(btn)}>{btn}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Message Body */}
        <View style={styles.MessageBox}>
          {/* First Row */}
          <View style={styles.MessageRow}>
            <Image source={require("../assets/images/doctor/doctor_200/D1.jpg")} resizeMode='cover'
              style={styles.CardImageBG} />
              <View style={styles.MessageBoxContent}>
                <View style={styles.MessageBoxContentTitleContainer}><Text style={styles.MessageBoxContentTitle}>Dr. Marcus Horizo</Text> <Text>10:24</Text></View>
                <View style={styles.MessageBoxContentTitleContainer}><Text style={styles.MessageBoxContentMessage} numberOfLines={1}>Expert in heart health and cardiovascular...</Text></View>
              </View>
          </View>


          {/* Second Row */}
          <View style={styles.MessageRow}>
            <Image source={require("../assets/images/doctor/doctor_200/D2.jpg")} resizeMode='cover'
              style={styles.CardImageBG} />
              <View style={styles.MessageBoxContent}>
                <View style={styles.MessageBoxContentTitleContainer}><Text style={styles.MessageBoxContentTitle}>Dr. Emily Rhodes</Text> <Text>07:24</Text></View>
                <View style={styles.MessageBoxContentTitleContainer}><Text style={styles.MessageBoxContentMessage} numberOfLines={1}>Specializes in child healthcare and wellness...</Text></View>
              </View>
          </View>


          {/* third Row */}
          <View style={styles.MessageRow}>
            <Image source={require("../assets/images/doctor/doctor_200/D3.jpg")} resizeMode='cover'
              style={styles.CardImageBG} />
              <View style={styles.MessageBoxContent}>
                <View style={styles.MessageBoxContentTitleContainer}><Text style={styles.MessageBoxContentTitle}>Dr. Johnathan</Text> <Text>03:55</Text></View>
                <View style={styles.MessageBoxContentTitleContainer}><Text style={styles.MessageBoxContentMessage} numberOfLines={1}>Focused on mental health and psychiatric therapy for all age groups....</Text></View>
              </View>
          </View>


        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  InnerContainer: {
    marginHorizontal: SPACING.space_18,
    marginTop: SPACING.space_10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.teal50,
    borderRadius: BORDERRADIUS.radius_8
  },
  MessageBox: {
    // backgroundColor: "red",
    marginTop: SPACING.space_24,
  },
  MessageRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.space_10

  },
  CardImageBG: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderRadius:50,
    overflow: 'hidden'
  },
  MessageBoxContent:{
    height: CARD_WIDTH,
    width:"80%",
    marginHorizontal:SPACING.space_8,
    justifyContent: "center",
  },
  MessageBoxContentTitleContainer:{
    flexDirection:"row",
    justifyContent:"space-between"
  },
  MessageBoxContentTitle:{
    fontFamily:FONTFAMILY.poppins_semibold,
    fontSize:FONTSIZE.size_16,
  },
  MessageBoxContentMessage:{
    fontFamily:FONTFAMILY.poppins_light,
    fontSize:FONTSIZE.size_12,
  },


});

export default MessageScreen;
