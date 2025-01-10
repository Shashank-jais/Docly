import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import Header from '../components/Header'
import DrListCard from '../components/DrListCard'
import { useStore } from '../store/store'

const Dr_detailsScreen = ({ navigation, route }: any) => {

  function getDatesAndDaysOfCurrentMonth() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const datesAndDays = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayName = date.toLocaleString('default', { weekday: 'long' });
      const dateNumber = String(day).padStart(2, '0');

      datesAndDays.push({ day: dayName, date: dateNumber });
    }

    return datesAndDays;
  }

  const datesAndDays = getDatesAndDaysOfCurrentMonth();
  const timeArray = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "07:00 PM"];


  const item = route.params;

  const [slotDate, setSlotDate] = useState({ day: datesAndDays[0].day, date: datesAndDays[0].date })
  const [slotTime, setSlotTime] = useState(timeArray[0]);
  const [focusseDate, setFocusseDate] = useState(0);
  const [focussedTime, setFocussedTime] = useState(0);

  const AddAppoitment = useStore((state: any) => state.AddAppoitment);

  const AddAppoitmentHandler = (date: any, time: any) => {
    AddAppoitment({ ...date, time: time , doctor : {...item} });
  }


  
  const backhandler = () => {
    navigation.pop();
  }


  const slotDateHandler = () => {
    navigation.push("Appointment", { ...slotDate, time: slotTime , doctor : {...item}  });
  }

  const slotDateBookStyle = (index: any): ViewStyle => ({
    backgroundColor: focusseDate === index ? COLORS.cyan300 : COLORS.white,

  })

  const slotTimeBookStyle = (index: any): ViewStyle => ({
    backgroundColor: focussedTime === index ? COLORS.cyan300 : COLORS.white,

  })

  const CalendarDayTextStyle = (index: any) => ({
    color: focusseDate === index ? COLORS.white : "",
  })

  const timeTextStyle = (index: any) => ({
    color: focussedTime === index ? COLORS.white : "",
  })

  const CalendarDateTextStyle = (index: any) => ({
    color: focusseDate === index ? COLORS.white : COLORS.teal300,
  })

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.white} />
      <Header title='Doctor Details' backHandler={backhandler} />
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

        {/* About Section */}
        <View style={styles.AboutContainer}>
          <Text style={styles.AboutContainerHeading}>About</Text>
          <Text style={styles.AboutContainerBody}>
            {item.about}...
          </Text>
        </View>


        {/* Calender Section */}
        <View style={[styles.AboutContainer, { marginBottom: 0 }]}>
          <Text style={styles.AboutContainerHeading}>Slots</Text>
        </View>
        <View style={styles.CalendarContainer}>
          {datesAndDays.map((item, index) => (
            <TouchableOpacity style={[styles.CalendarContainerInner, slotDateBookStyle(index)]} key={index} onPress={() => {
              setFocusseDate(index);
              setSlotDate(item)
            }}>

              <Text style={[styles.CalendarDayText, CalendarDayTextStyle(index)]}>{item.day.substring(0, 3)}</Text>
              <Text style={[styles.CalendarDateText, CalendarDateTextStyle(index)]}>{item.date}</Text>

            </TouchableOpacity>
          ))}
        </View>



        {/* Time Slots */}

        <View style={[styles.AboutContainer, { marginBottom: 0 }]}>
          <Text style={styles.AboutContainerHeading}>Time Slots</Text>
        </View>
        <View style={styles.CalendarContainer}>
          {
            timeArray.map((item, index) => (
              <TouchableOpacity style={[styles.timeContainerInner, slotTimeBookStyle(index)]} key={index} onPress={() => {
                setFocussedTime(index);
                setSlotTime(item)
              }}>
                <Text style={[styles.timeText, timeTextStyle(index)]}>{item}</Text>
              </TouchableOpacity>
            ))
          }

        </View>


        {/* Appointment Button */}
        <View style={styles.ButtonContainer}>
          <TouchableOpacity style={styles.Btn} onPress={() => {
            slotDateHandler()
          }}>
            <Text style={styles.BtnText}>Book Appointment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default Dr_detailsScreen

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  AboutContainer: {
    margin: SPACING.space_18,
  },
  AboutContainerHeading: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
  },
  AboutContainerBody: {
    fontFamily: FONTFAMILY.poppins_regular,
  },
  CalendarContainer: {
    marginHorizontal: SPACING.space_18,
    marginTop: SPACING.space_12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  CalendarContainerInner: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: COLORS.teal50,
    borderRadius: 8,
    margin: 6,
    alignItems: 'center',
    justifyContent: 'center',

  },
  CalendarDayText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,

  },
  CalendarDateText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.teal300,
  },
  timeText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,

  },
  timeContainerInner: {
    width: 80, // Width of each box
    height: 60, // Height of each box
    borderWidth: 1,
    borderColor: COLORS.teal50,
    borderRadius: 8,
    margin: 6, // Space between boxes
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', // Center content vertically

  },
  ButtonContainer: {
    marginTop: SPACING.space_18,
    marginBottom: SPACING.space_16,
    marginHorizontal: SPACING.space_18,

  },
  Btn: {
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.cyan300,
    color: COLORS.white,
    padding: SPACING.space_10,
    alignItems: 'center',
    justifyContent: 'center',

  },
  BtnText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.white,
  }

})