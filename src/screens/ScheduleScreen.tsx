import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import Header from '../components/Header';
import DrListCard from '../components/DrListCard';
import { useStore } from '../store/store';

const ScheduleScreen = ({ navigation, route }: any) => {

  const item = route.params.doctor;
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const [paymentMode, setPaymentMode] = useState('Credit Card');
  // console.log("route: ", month)

  const AddAppoitment = useStore((state: any) => state.AddAppoitment);

  const AddAppoitmentHandler = () => {
    AddAppoitment(route.params);
    navigation.navigate("Tab",{screen:"Appointment"});
  }
  const backHandler = () => {
    navigation.pop();
  }

  
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.white} />
      <Header title='Appointment' backHandler={backHandler} />
      <ScrollView style={styles.scrollViewFlex}>
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

        {/* Date Row */}
        <View style={styles.DateContainer}>
          <View style={styles.DateContainerHeadingRow}>
            <Text style={styles.DateHeading}>Date</Text>
            <Text style={styles.ChangeHeading}>Change</Text>
          </View>
          <View style={styles.DateContainerDateRow}>
            <Image source={require("../assets/svg_images/appointmentblue.png")} style={styles.CalenderImage} />
            <Text style={styles.DateText}>{route.params.day}, Jan {route.params.date}, {year} | {route.params.time}</Text>
          </View>
        </View>


        {/* Reason Row */}

        <View style={styles.DateContainer}>
          <View style={styles.DateContainerHeadingRow}>
            <Text style={styles.DateHeading}>Reason</Text>
            <Text style={styles.ChangeHeading}>Change</Text>
          </View>
          <View style={styles.DateContainerDateRow}>
            <Image source={require("../assets/svg_images/editicon.png")} style={styles.CalenderImage} />
            <Text style={styles.DateText}>Chest Pain</Text>
          </View>
        </View>

        {/* Payment bill */}
        <View style={styles.DateContainer}>
          <View style={styles.DateContainerHeadingRow}>
            <Text style={styles.DateHeading}>Payment Details</Text>
          </View>
          <View style={styles.feeRow}>
            <Text style={styles.feeText}>
              Consultation
            </Text>
            <Text style={styles.feeText}>$60.00</Text>
          </View>

          <View style={styles.feeRow}>
            <Text style={styles.feeText}>
              Admin Fee
            </Text>
            <Text style={styles.feeText}>$01.00</Text>
          </View>


          <View style={styles.feeRow}>
            <Text style={styles.feeText}>
              Additional Discount
            </Text>
            <Text style={styles.feeText}>-</Text>
          </View>


          <View style={styles.feeRow}>
            <Text style={styles.feeText}>
              Total
            </Text>
            <Text style={styles.feeText}>$61.00</Text>
          </View>
        </View>


        {/* Payment Method */}
        <View style={styles.DateContainer}>
          <View style={styles.DateContainerHeadingRow}>
            <Text style={styles.DateHeading}>Payment Methods</Text>
          </View>
          <TouchableOpacity style={[styles.PaymentRow, { borderColor: paymentMode == "Credit Card" ? COLORS.cyan300 : COLORS.white }]} onPress={() => setPaymentMode("Credit Card")}>
            <Text style={styles.paymentText}>Credit Card</Text>
            <Text style={styles.paymentText}>$61.00</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.PaymentRow, { borderColor: paymentMode == "Debit Card" ? COLORS.cyan300 : COLORS.white }]} onPress={() => setPaymentMode("Debit Card")} >
            <Text style={styles.paymentText}>Debit Card</Text>
            <Text style={styles.paymentText}>$61.00</Text>
          </TouchableOpacity>
        </View>

        {/* Button */}
        <View style={styles.BtnContainer}>
          <View style={styles.billRow}>
            <Text style={styles.totalHeading}>Total</Text>
            <Text style={styles.priceHeading}>$61.00</Text>
          </View>
          <TouchableOpacity style={styles.Btn} onPress={() => {
            AddAppoitmentHandler();
          }} >
            <Text style={styles.BtnText}>Confirm Booking</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  )
}

export default ScheduleScreen

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  DateContainer: {
    margin: SPACING.space_18,

  },
  DateContainerHeadingRow: {
    flexDirection: "row",
    padding: SPACING.space_2,
    justifyContent: "space-between"
  },
  DateHeading: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
  },
  ChangeHeading: {
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: FONTSIZE.size_12,
  },
  DateContainerDateRow: {
    flexDirection: "row",
    padding: SPACING.space_4,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: SPACING.space_16,
  },
  CalenderImage: {
    width: 40,
    height: 40,
  },
  DateText: {
    fontFamily: FONTFAMILY.poppins_medium,
  },
  feeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: SPACING.space_4,
  },
  feeText: {
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: FONTSIZE.size_14,
  },
  PaymentRow: {
    flexDirection: "row",
    paddingHorizontal: SPACING.space_4,
    paddingVertical: SPACING.space_10,
    justifyContent: "space-between",
    alignItems: "center",
    gap: SPACING.space_16,
    borderWidth: 2,
    borderColor: COLORS.white,
    borderRadius: BORDERRADIUS.radius_10,
  },
  paymentText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
  },
  BtnContainer: {
    flexDirection: "row",
    margin: SPACING.space_18,
    justifyContent: "space-between",
    backgroundColor: COLORS.teal50,
    borderRadius: BORDERRADIUS.radius_10,
  },
  billRow: {
    width: "30%",
    paddingHorizontal: SPACING.space_8,
    paddingVertical: SPACING.space_4,
  },
  Btn: {
    width: "65%",
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.cyan300,
    color: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',

  },
  BtnText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.white,
  },
  totalHeading: {
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: FONTSIZE.size_16,
  },
  priceHeading: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
  }
})