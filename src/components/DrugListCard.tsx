import { Dimensions, Image, ImageBackground, ImageProps, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomIcons from './CustomIcons';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import { useStore } from '../store/store';

interface DrugListCardProps {
    id: number;
    name: string;
    size: string;
    rating: number;
    price: number;
    description: string;
    medImage: ImageProps;
}

const CARD_WIDTH = Dimensions.get('window').width * 0.25;
const DrugListCard: React.FC<DrugListCardProps> = ({
    id, name, description, price, size, rating, medImage
}: any) => {

    const addToCart = useStore((state: any) => state.addToCart);
    const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
    const item = {id:id,name:name,price:price,description:description,size:size,medImage:medImage,rating:rating,quantity:1}

    const addToCartHandler = () => {
        const CartItem = { ...item };
        addToCart(CartItem);
        calculateCartPrice();
        ToastAndroid.showWithGravity(
            `${item.name} is Added to Cart`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
    }
    return (
        <View style={styles.CardContainer}>
            <ImageBackground
                source={medImage}
                resizeMode='cover'
                style={styles.CardImageBG}
            ></ImageBackground>
            <Text style={styles.titleHeading}>{name}</Text>
            <Text style={styles.titleSubtitles}>{size}</Text>
            <View style={styles.footer}>
                <View style={styles.ratingrow}>
                    <Text style={styles.titleRating}>$ {price}.00</Text>
                </View>
                <TouchableOpacity
                    style={styles.CartItemIcon}
                    onPress={()=>{
                        addToCartHandler();
                    }}
                >
                    <CustomIcons
                        name="add"
                        color={COLORS.white}
                        size={FONTSIZE.size_10}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DrugListCard

const styles = StyleSheet.create({
    CardContainer: {
        padding: SPACING.space_15,
        borderRadius: BORDERRADIUS.radius_20,
        borderWidth: 1,
        borderColor: COLORS.teal300,

    },
    CardImageBG: {
        width: CARD_WIDTH,
        height: CARD_WIDTH,
        maxWidth: CARD_WIDTH,
        borderRadius: BORDERRADIUS.radius_25,
        marginBottom: SPACING.space_15,
        overflow: 'hidden'
    },
    titleHeading: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.black900,
        fontSize: FONTSIZE.size_16
    },
    titleSubtitles: {
        fontFamily: FONTFAMILY.poppins_light,
        fontSize: FONTSIZE.size_12
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        marginTop: SPACING.space_8
    },
    ratingrow: {
        flexDirection: 'row',
        // backgroundColor: COLORS.primaryBlackRGBA,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleRating: {
        fontSize: FONTSIZE.size_14,
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.black900,
        alignItems: 'center',
        paddingTop: SPACING.space_2,

    },
    titleDistance: {
        fontSize: FONTSIZE.size_10,
        fontFamily: FONTFAMILY.poppins_light,
    },
    CartItemIcon: {
        backgroundColor: COLORS.cyan300,
        padding: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_10,
    },
})