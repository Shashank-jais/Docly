import { BackHandler, FlatList, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import Header from '../components/Header'
import CustomIcons from '../components/CustomIcons'
import { useStore } from '../store/store'
import DrugListCard from '../components/DrugListCard'
import DrugHeader from '../components/DrugHeader'

const PharmacyScreen = ({ navigation }: any) => {

  const [searchText, setSearchText] = useState("");
  const Medicine = useStore((state: any) => state.Medicine);
  const [sortedMedicine, setSortedMedicine] = useState(Medicine);


  const backHandler = () => {
    navigation.pop();
  }
  const cartHandler = () => {
    navigation.push("Cart");
  }

  const ListRef: any = useRef<FlatList>();
  const SearchMedicine = (search: string) => {
    if (search != "") {
      ListRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
      setSortedMedicine([
        ...Medicine.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        ),
      ]);
    }
  };

  const resetSearchMedicine = () => {
    ListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
    setSortedMedicine([...Medicine]);
    setSearchText("");
    // console.log("Search:", searchText);

  }



  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.white} />
      <DrugHeader title='Pharmacy' backHandler={backHandler} cartHandler={cartHandler} />



      <ScrollView style={styles.scrollViewFlex}>
        <View>



          {/* Input row */}
          <View style={[styles.searchContainer]}>
            <TouchableOpacity onPress={() => {
              SearchMedicine(searchText);
            }}>
              <CustomIcons style={styles.inputIcon} name="search" color={COLORS.cyan300} size={FONTSIZE.size_18} />
            </TouchableOpacity>
            <TextInput
              style={styles.inputText}
              placeholder='Search doctors,drugs,articles...'
              value={searchText}
              onChangeText={text => {
                setSearchText(text);
                SearchMedicine(text);
              }}
              placeholderTextColor={COLORS.gray500}
            />
            {searchText.length > 0 ? (<TouchableOpacity onPress={() => {
              resetSearchMedicine();
            }}>
              <CustomIcons style={styles.inputIcon} name='close' color={COLORS.cyan100} size={FONTSIZE.size_18} />
            </TouchableOpacity>) : <></>}
          </View>


          {/* banner */}
          <View style={styles.bannerContainer}>
            <Text style={styles.bannertext}>Order quickly with{'\n'}prescription</Text>
            <TouchableOpacity style={styles.bannerBtn}><Text style={styles.bannerBtntext}>Upload Prescription</Text></TouchableOpacity>
          </View>


          <View style={styles.doctorListContainer}>

            <View style={styles.doctorListHeading}>
              <Text style={styles.doctorListHeadingText}>Popular Product</Text>
            </View>


            <FlatList
              ref={ListRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={sortedMedicine}
              contentContainerStyle={[styles.FlatListContainer]}
              keyExtractor={item => item.id}
              renderItem={({ item }) => {
                return <TouchableOpacity
                  onPress={() => {
                    navigation.push("DrugDetails", { ...item })
                  }}>
                  <DrugListCard
                    id={item.id}
                    name={item.name}
                    size={item.size}
                    medImage={item.medImage}
                    description={item.description}
                    rating={item.rating}
                    price={item.price}
                  />
                </TouchableOpacity>
              }}
            ></FlatList>


          </View>

          <View style={styles.doctorListContainer}>

            <View style={styles.doctorListHeading}>
              <Text style={styles.doctorListHeadingText}>Popular on sale</Text>
            </View>


            <FlatList
              ref={ListRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={sortedMedicine}
              contentContainerStyle={[styles.FlatListContainer]}
              keyExtractor={item => item.id}
              renderItem={({ item }) => {
                return <TouchableOpacity
                  onPress={() => {
                    navigation.push("DrugDetails", { ...item })
                  }}>
                  <DrugListCard
                    id={item.id}
                    name={item.name}
                    size={item.size}
                    medImage={item.medImage}
                    description={item.description}
                    rating={item.rating}
                    price={item.price}
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

export default PharmacyScreen

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
    width: "50%",
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