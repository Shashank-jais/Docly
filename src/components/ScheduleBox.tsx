import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import { useStore } from '../store/store'

interface ScheduleBoxProps {
  item: any,
  navigation:any
}

const ScheduleBox: React.FC<ScheduleBoxProps> = ({ navigation, item }: any) => {

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');

  const RemoveAppointment = useStore((state: any) => state.RemoveAppointment);
  
  const RemoveAppointmentHandler = ()=>{
    RemoveAppointment(item);
  }


  const resheduleHandler = () => {
    navigation.navigate("DrDetails", {...item.doctor });
  }
  return (
    <View style={styles.boxContainer}>


      <View style={styles.detailsRow}>
        <View>
          <Text style={styles.detailsRowtextName}>
            {item.doctor.userName}
          </Text>
          <Text style={styles.detailsRowtextProfession}>
            {item.doctor.userProfession}
          </Text>
        </View>
        <View>
          <Image source={item.doctor.userImage} style={styles.image} />
        </View>
      </View>

      <View style={styles.secondrow}>
        <View style={styles.timeRow}>
          <Image source={require("../assets/svg_images/appointmentgray.png")} style={styles.iconimage} />
          <Text style={styles.timeRowtext}>{item.date}/{month}/{year}</Text>
        </View>

        <View style={styles.timeRow}>
          <Image source={require("../assets/svg_images/timegray.png")} style={styles.iconimage} />
          <Text style={styles.timeRowtext}>{item.time}</Text>
        </View>
        <View style={styles.timeRow}>
          <Text style={styles.timeRowtext}>Confirmed</Text>
        </View>
      </View>


      <View style={styles.btnrow}>
        <TouchableOpacity style={[styles.commonBTN]} onPress={() => {
          RemoveAppointmentHandler();
        }}>
          <Text style={{ fontFamily: FONTFAMILY.poppins_semibold }}>Cancel</Text>
        </TouchableOpacity >
        <TouchableOpacity style={[styles.commonBTN, { backgroundColor: COLORS.cyan300 }]} onPress={() => resheduleHandler()}>
          <Text style={styles.btntext}>Reschedule</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default ScheduleBox

const styles = StyleSheet.create({
  boxContainer: {
    margin: SPACING.space_16,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: "space-between",
    // marginHorizontal: SPACING.space_10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50
  },
  detailsRowtextName: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,


  },
  detailsRowtextProfession: {
    fontFamily: FONTFAMILY.poppins_light,
    // fontSize:FONTSIZE.size_10,
  },
  secondrow: {
    // paddingHorizontal: SPACING.space_10,
    flexDirection: 'row',
    justifyContent: "flex-start",
    gap: SPACING.space_16,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: "center",
    gap: SPACING.space_4,
  },
  iconimage: {
    width: 15,
    height: 15,

  },
  dot: {
    color: COLORS.cyan300,
    fontSize: FONTSIZE.size_16,
    textAlignVertical: "center",

  },
  timeRowtext: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    textAlignVertical: "center",
    paddingTop: SPACING.space_2,
  },
  btnrow: {
    // paddingHorizontal: SPACING.space_10,
    flexDirection: 'row',
    justifyContent: "space-between",
    gap: SPACING.space_16,
  },
  commonBTN: {
    width: "50%",
    backgroundColor: COLORS.teal50,
    padding: SPACING.space_10,
    paddingVertical: SPACING.space_14,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: BORDERRADIUS.radius_10,
    marginTop: SPACING.space_4,

  },
  btntext: {
    color: COLORS.white,
    fontFamily: FONTFAMILY.poppins_semibold,
  }
})