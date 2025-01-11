import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import CustomIcons from './CustomIcons';
import { useStore } from '../store/store';

interface CartBoxProps {
    item: any,
}
const CARD_WIDTH = Dimensions.get('window').width * 0.25;
const CartBox: React.FC<CartBoxProps> = ({ item }: any) => {

    const [quantity, setQuantity] = useState(item.quantity);

    const incrementQuantityHandler = useStore((state:any)=>state.incrementQuantityHandler);
    const decrementQuantityHandler = useStore((state:any)=>state.decrementQuantityHandler);
    const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

    const decrementHandler = () => {
        if (quantity - 1 >= 1) {
            setQuantity(quantity - 1);
        }
        else {
            setQuantity(1);
        }
        decrementQuantityHandler(item.id);
        calculateCartPrice();
    }
    const incrementHandler = () => {
        setQuantity(quantity + 1);
        incrementQuantityHandler(item.id);
        calculateCartPrice();
    }

    return (
        <View style={styles.CardContainer}>
            <ImageBackground
                source={item.medImage}
                resizeMode='cover'
                style={styles.CardImageBG}
            />
            <View style={styles.CardContainertext}>
                <Text style={styles.titleHeading}>{item.name}</Text>
                <Text style={styles.titleSubtitles}>{item.size}</Text>
                <View style={styles.priceRow}>
                    <View style={styles.quantitySection}>
                        <TouchableOpacity
                            style={styles.CartItemIcon}
                            onPress={() => {
                                decrementHandler();
                            }}
                        >
                            <CustomIcons
                                name="minus"
                                color={COLORS.white}
                                size={FONTSIZE.size_10}
                            />
                        </TouchableOpacity>

                        <View style={styles.quantityContainer}><Text style={styles.quantitytext}>{quantity}</Text></View>

                        <TouchableOpacity
                            style={styles.CartItemIcon}
                            onPress={() => {
                                incrementHandler();

                            }}
                        >
                            <CustomIcons
                                name="add"
                                color={COLORS.white}
                                size={FONTSIZE.size_10}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.priceSection}>
                        <Text style={styles.price}>$ {item.itemPrice}.00</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default CartBox

const styles = StyleSheet.create({
    CardContainer: {
      padding: SPACING.space_12,
      borderRadius: BORDERRADIUS.radius_20,
      flexDirection: "row",
      backgroundColor: COLORS.white,
      shadowColor: COLORS.black900,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 3,
      marginBottom: SPACING.space_16,
      marginHorizontal:SPACING.space_18
    },
    CardImageBG: {
      width: CARD_WIDTH,
      height: CARD_WIDTH,
      borderRadius: BORDERRADIUS.radius_15,
      overflow: "hidden",
    },
    CardContainertext: {
      flex: 1,
      marginLeft: SPACING.space_14,
      justifyContent: "space-between",
    },
    titleHeading: {
      fontFamily: FONTFAMILY.poppins_semibold,
      color: COLORS.black900,
      fontSize: FONTSIZE.size_18,
    },
    titleSubtitles: {
      fontFamily: FONTFAMILY.poppins_light,
      fontSize: FONTSIZE.size_14,
    },
    CartItemIcon: {
      backgroundColor: COLORS.cyan300,
      padding: SPACING.space_10,
      borderRadius: BORDERRADIUS.radius_10,
      alignItems: "center",
      justifyContent: "center",
    },
    quantitySection: {
      gap: SPACING.space_4,
      flexDirection: "row",
      alignItems: "center",
    },
    quantityContainer: {
      width: 24,
      height: 24,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: BORDERRADIUS.radius_10,
    },
    quantitytext: {
      fontFamily: FONTFAMILY.poppins_medium,
      fontSize: FONTSIZE.size_16,
      color: COLORS.black900,
    },
    priceRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: SPACING.space_10,
    },
    priceSection: {
      alignItems: "flex-end",
      justifyContent: "center",
    },
    price: {
      fontFamily: FONTFAMILY.poppins_semibold,
      fontSize: FONTSIZE.size_20,
      color: COLORS.black900,
    },
  });