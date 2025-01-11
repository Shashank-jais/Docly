import { FlatList, Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import CustomIcons from '../components/CustomIcons';
import AmbulanceSVG from '../components/AmbulanceSVG';
import { useStore } from '../store/store';
import DoctorListCard from '../components/DoctorListCard';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const HomeScreen = ({ navigation }: any) => {
  const [searchText, setSearchText] = useState("");


  const DoctorList = useStore((state: any) => state.DoctorData);
  const [sortedDoctor, setSortedDoctor] = useState(DoctorList);

 

  const ListRef: any = useRef<FlatList>();
  const SearchDoctor = (search: string) => {
    if (search != "") {
      ListRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
      setSortedDoctor([
        ...DoctorList.filter((item: any) =>
            item.userName.toLowerCase().includes(search.toLowerCase())
        ),
    ]);
    }
  };

  const resetSearchDoctor = () => {
    ListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
    setSortedDoctor([...DoctorList]);
    setSearchText("");
    console.log("Search:", searchText);

  }

  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.white} />
      <View style={styles.headingContainer}>
        <Text style={styles.textheading}>Find your desire {'\n'}health solution</Text>
        
      </View>
      <ScrollView style={styles.scrollViewFlex}>
        <View>



          {/* Input row */}
          <View style={[styles.searchContainer]}>
            <TouchableOpacity onPress={() => {
              SearchDoctor(searchText);
            }}>
              <CustomIcons style={styles.inputIcon} name="search" color={COLORS.cyan300} size={FONTSIZE.size_18} />
            </TouchableOpacity>
            <TextInput
              style={styles.inputText}
              placeholder='Search doctors,drugs,articles...'
              value={searchText}
              onChangeText={text => {
                setSearchText(text);
                SearchDoctor(text);
              }}
              placeholderTextColor={COLORS.gray500}
            />
            {searchText.length > 0 ? (<TouchableOpacity onPress={() => {
              resetSearchDoctor();
            }}>
              <CustomIcons style={styles.inputIcon} name='close' color={COLORS.cyan100} size={FONTSIZE.size_18} />
            </TouchableOpacity>) : <></>}
          </View>


          {/* Card Row */}
          <View style={styles.CardRowContainer}>
            <View style={styles.card}>
              <TouchableOpacity onPress={() => {
                navigation.push("DrList")
              }}>
                <Image source={require("../assets/svg_images/doctor.png")} style={[styles.CardImage, {
                  resizeMode: "stretch",
                }]} />
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <TouchableOpacity onPress={() => {
                navigation.push("Pharmacy")
              }}>
                <Image source={require("../assets/svg_images/medicine.png")} style={[styles.CardImage, {
                  resizeMode: "contain",
                }]} />
              </TouchableOpacity>
            </View>
            <View style={styles.card}>
              <TouchableOpacity onPress={() => {
                navigation.push("Pharmacy")
              }}>
                <Image source={require("../assets/svg_images/ambulance.png")} style={styles.CardImage} />
              </TouchableOpacity>
            </View>
            <View style={styles.card}>
              <TouchableOpacity onPress={() => {
                navigation.navigate("Tab",{screen:"Appointment"})
              }}>
                <Image source={require("../assets/svg_images/layout.png")} style={[styles.CardImage, {
                  resizeMode: "contain",
                }]} />
              </TouchableOpacity>
            </View>
          </View>

          {/* banner */}
          <View style={styles.bannerContainer}>
            <Text style={styles.bannertext}>Early protection for{'\n'}your family health</Text>
            <TouchableOpacity style={styles.bannerBtn}><Text style={styles.bannerBtntext}>Learn More</Text></TouchableOpacity>
          </View>


          {/* Top Doctor List */}
          <View style={styles.doctorListContainer}>

            <View style={styles.doctorListHeading}>
              <Text style={styles.doctorListHeadingText}>Top Doctors</Text>
              <TouchableOpacity onPress={() => {
                navigation.push("DrList");
              }}><Text style={styles.doctorListHeadingBtnText}>See all</Text></TouchableOpacity>
            </View>


            <FlatList
              ref={ListRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={sortedDoctor}
              contentContainerStyle={[styles.FlatListContainer, { marginBottom: tabBarHeight }]}
              keyExtractor={item => item.id}
              renderItem={({ item }) => {
                return <TouchableOpacity
                  onPress={() => {
                    navigation.push("DrDetails", {...item})
                  }}>
                  <DoctorListCard
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
            ></FlatList>


          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  headingContainer: {
    backgroundColor: COLORS.white,
    padding: SPACING.space_18,
    paddingTop: SPACING.space_14,

  },
  textheading: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    lineHeight: FONTSIZE.size_20 * 2

  },
  searchContainer: {
    flexDirection: "row",
    margin: SPACING.space_18,
    alignItems: "center",
    backgroundColor: COLORS.gray50,
    borderRadius: BORDERRADIUS.radius_10,


  },
  inputIcon: {
    marginHorizontal: SPACING.space_16
  },
  inputText: {
    width: "70%",
    height: SPACING.space_20 * 3,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_medium
  },
  CardRowContainer: {
    margin: SPACING.space_18,
    flexDirection: "row",
    justifyContent: "space-between",

  },
  card: {
    width: "22%",
    height: 80,
    backgroundColor: COLORS.cyan300,
    borderRadius: BORDERRADIUS.radius_15,
    alignItems: "center",
    justifyContent: "center",

  },
  CardImage: {
    height: 50,
    width: 60,
  },
  bannerContainer: {
    margin: SPACING.space_18,
    backgroundColor: "#dcf6f4",
    padding: SPACING.space_18,
    borderRadius: BORDERRADIUS.radius_15,
  },
  bannertext: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    lineHeight: SPACING.space_16 * 2,
  },
  bannerBtn: {
    backgroundColor: COLORS.cyan300,
    width: "35%",
    marginTop: SPACING.space_8,
    padding: SPACING.space_8,
    borderRadius: BORDERRADIUS.radius_8,
    alignItems: "center",
    justifyContent: "center",
  },
  bannerBtntext: {
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: FONTSIZE.size_12,
    color: COLORS.white,

  },
  doctorListContainer: {
    margin: SPACING.space_18,

  },
  doctorListHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  doctorListHeadingText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_20,
  },
  doctorListHeadingBtnText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    alignItems: "center",
    color: COLORS.cyan300,

  },
  FlatListContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
  }

})