import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import React, { useState } from 'react';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import Header from '../components/Header';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useStore } from '../store/store';
import ScheduleBox from '../components/ScheduleBox';

const AppointmentNavBar = ({ navigation }: any) => {


  
  const [focussedBtn, setFocussedBtn] = useState("Upcoming");
  const tabBarHeight = useBottomTabBarHeight();

  const Appointment = useStore((state: any) => state.Appointment);

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
    fontSize: FONTSIZE.size_14,
  });

  const rescheduleHandler = ({ item }: any) => {
    console.log(item);
    navigation.push("DrDetails", { ...item });
  };

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.white} />
      <Header title="Schedule" backHandler={backhandler} />

      {/* Main Body */}
      <View style={[styles.InnerContainer, { marginBottom: tabBarHeight }]}>
        {/* Button Row */}
        <View style={styles.buttonRow}>
          {["Upcoming", "Completed", "Cancelled"].map((btn) => (
            <TouchableOpacity
              key={btn}
              style={getButtonStyle(btn)}
              onPress={() => setFocussedBtn(btn)}
            >
              <Text style={getButtonTextStyle(btn)}>{btn}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* FlatList for Appointments */}
        {Appointment.length > 0 ? (
          <FlatList
            data={Appointment}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.doctor.id}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: tabBarHeight,
              marginTop: SPACING.space_10,
            }}
            renderItem={({ item }) => (
              <ScheduleBox navigation={navigation} item={item} />
            )}
          />
        ) : (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No Appointments Found</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default AppointmentNavBar;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  InnerContainer: {
    flex: 1, 
    marginHorizontal: SPACING.space_18,
    marginTop: SPACING.space_10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.teal50,
    borderRadius: BORDERRADIUS.radius_8,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.blueGray300,
  },
});
