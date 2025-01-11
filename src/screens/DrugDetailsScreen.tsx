import { Image, ScrollView, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import DrugHeader from '../components/DrugHeader';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import CustomIcons from '../components/CustomIcons';
import { useStore } from '../store/store';

const DrugDetailsScreen = ({ navigation, route }: any) => {

  const [quantity, setQuantity] = useState(1);
  // console.log(route.params);
  const item = route.params;
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

  const addToCartHandler = () => {
    const CartItem = {...item,quantity:quantity};
    addToCart(CartItem);
    calculateCartPrice();
    ToastAndroid.showWithGravity(
      `${item.name} is Added to Cart`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );

  }

  const backHandler = () => {
    navigation.pop();
  }
  const cartHandler = () => {
    navigation.push("Cart");
  }

  const decrementQuantityHandler = () => {
    if (quantity - 1 >= 1) {
      setQuantity(quantity - 1);
    }
    else {
      setQuantity(1);
    }
  }
  const incrementQuantityHandler = () => {
    setQuantity(quantity + 1);
  }

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.white} />
      <DrugHeader title='Drug Detail' backHandler={backHandler} cartHandler={cartHandler} />
      <ScrollView style={styles.scrollViewFlex}>
        <View style={styles.imagecontainer}>
          <Image source={item.medImage} style={styles.medImage} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.nametext}>{item.name}</Text>
          <Text style={styles.sizetext}>{item.size}</Text>
        </View>
        <View style={styles.RatingLikeRow}>
          <View style={styles.ratingrow}>
            <CustomIcons
              name={'star'}
              color={COLORS.cyan300}
              size={FONTSIZE.size_16}
            />
            <Text style={styles.titleRating}> {item.rating}</Text>
          </View>

          <CustomIcons name='like' color={COLORS.red700} size={FONTSIZE.size_20} />

        </View>


        <View style={styles.priceRow}>
          <View style={styles.quantitySection}>
            <TouchableOpacity
              style={styles.CartItemIcon}
              onPress={() => {
                decrementQuantityHandler();
              }}
            >
              <CustomIcons
                name="minus"
                color={COLORS.white}
                size={FONTSIZE.size_14}
              />
            </TouchableOpacity>

            <View style={styles.quantityContainer}><Text style={styles.quantitytext}>{quantity}</Text></View>

            <TouchableOpacity
              style={styles.CartItemIcon}
              onPress={() => {
                incrementQuantityHandler();

              }}
            >
              <CustomIcons
                name="add"
                color={COLORS.white}
                size={FONTSIZE.size_14}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.priceSection}>
            <Text style={styles.price}>$ {item.price}.00</Text>
          </View>
        </View>

        <View style={styles.descriptionContainer}>

          <Text style={styles.descriptionContainertext}>Description</Text>
          <Text style={{ fontFamily: FONTFAMILY.poppins_light, textAlign: "justify" }}>{item.description} Paracetamol, Ephedrine HCl, and Chlorphenamine
            maleate which iS used to relieve coughs accompanied
            by flu symptoms such as fever, headache, and
            sneezing</Text>

        </View>


        <View style={styles.BtnContainer}>
          <TouchableOpacity
            style={[styles.commonBTN, { width: "30%", borderRadius: 50 }]}
            onPress={() => {
              cartHandler();
            }}>
            <Image source={require("../assets/svg_images/cartblue.png")} style={styles.image} />
          </TouchableOpacity>


          <TouchableOpacity style={[styles.commonBTN, { backgroundColor: COLORS.cyan300, width: "65%", }]}
            onPress={() => {
              addToCartHandler();
              cartHandler();
            }}>
            <Text style={styles.btntext}>Buy now</Text>
          </TouchableOpacity>
        </View>


      </ScrollView>
    </View>
  )
}
export default DrugDetailsScreen
const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.white,

  },
  scrollViewFlex: {
    flexGrow: 1,

  },
  imagecontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.space_28,
    // backgroundColor:"red",
  },
  medImage: {
    borderRadius: BORDERRADIUS.radius_20,

  },
  textContainer: {
    marginHorizontal: SPACING.space_18,
    marginTop: SPACING.space_18,
  },
  RatingLikeRow: {
    marginHorizontal: SPACING.space_18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SPACING.space_8,
    // backgroundColor:"green",
    paddingRight: SPACING.space_18,
  },
  ratingrow: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  titleRating: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.cyan300,
    alignItems: 'center',
    paddingTop: SPACING.space_2,

  },
  nametext: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_24,
  },
  sizetext: {
    fontFamily: FONTFAMILY.poppins_light,
  },
  CartItemIcon: {
    backgroundColor: COLORS.cyan300,
    padding: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_10,
  },
  priceRow: {
    flexDirection: 'row',
    marginHorizontal: SPACING.space_18,
    marginTop: SPACING.space_8,
    justifyContent: 'space-between',
    // backgroundColor:"red"
  },
  quantitySection: {
    gap: SPACING.space_14,
    flexDirection: 'row',
    alignItems: "center",
  },
  quantityContainer: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  quantitytext: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,


  },
  priceSection: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.space_12
  },
  price: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_28,
  },
  descriptionContainer: {
    marginHorizontal: SPACING.space_18,
    marginTop: SPACING.space_18,
    height: 270,
  },
  descriptionContainertext: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_20,
  },
  BtnContainer: {
    marginHorizontal: SPACING.space_18,
    flexDirection: "row",
    gap: SPACING.space_18,
    // marginBottom:SPACING.space_18,

  },
  image: {
    width: 30,
    height: 30,
  },
  commonBTN: {
    backgroundColor: COLORS.teal50,
    padding: SPACING.space_8,
    paddingVertical: SPACING.space_12,
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