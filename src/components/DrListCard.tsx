import { Dimensions, Image, ImageBackground, ImageProps, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomIcons from './CustomIcons';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';

interface DrListCardProps {
    id: number;
    index: number;
    userName: string;
    userProfession: string;
    userRating: number;
    userDistance: string;
    userImage: ImageProps;
    about: string;
}

const CARD_WIDTH = Dimensions.get('window').width * 0.30;
const DrListCard: React.FC<DrListCardProps> = ({
    id,
    index,
    userName,
    userProfession,
    userRating,
    userDistance,
    userImage,
    about }: any) => {
    return (
        <View style={styles.CardContainer}>
            <ImageBackground
                source={userImage}
                resizeMode='cover'
                style={styles.CardImageBG}
            ></ImageBackground>
            <View style={styles.CardContainertext}>
                <Text style={styles.titleHeading}>{userName}</Text>
                <Text style={styles.titleSubtitles}>{userProfession}</Text>
                <View style={styles.footer}>
                    <View style={styles.ratingrow}>
                        <CustomIcons
                            name={'star'}
                            color={COLORS.cyan300}
                            size={FONTSIZE.size_14}
                        />
                        <Text style={styles.titleRating}> {userRating}</Text>
                    </View>
                    <View style={styles.ratingrow}>
                        <Image source={require('../assets/svg_images/map.png')} style={styles.Image}/>
                        <Text style={styles.titleDistance}>{userDistance}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default DrListCard

const styles = StyleSheet.create({
    CardContainer: {
        padding: SPACING.space_10,
        borderRadius: BORDERRADIUS.radius_20,
        flexDirection: "row"

    },
    CardImageBG: {
        width: CARD_WIDTH,
        height: CARD_WIDTH,
        borderRadius: BORDERRADIUS.radius_15,
        overflow: 'hidden'
    },
    CardContainertext: {
        height: CARD_WIDTH,
        marginLeft: SPACING.space_12
    },
    titleHeading: {
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.black900,
        fontSize: FONTSIZE.size_18
    },
    titleSubtitles: {
        fontFamily: FONTFAMILY.poppins_light,
        fontSize: FONTSIZE.size_12
    },
    footer: {
        marginTop: SPACING.space_24
    },
    ratingrow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleRating: {
        fontSize: FONTSIZE.size_14,
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.cyan300,
        alignItems: 'center',
        paddingTop: SPACING.space_2,

    },
    titleDistance: {
        fontSize: FONTSIZE.size_10,
        fontFamily: FONTFAMILY.poppins_light,
        alignItems: 'center',
        paddingTop: SPACING.space_2,
        marginLeft:SPACING.space_2
    },
    Image:{
        width:FONTSIZE.size_14,
        height:FONTSIZE.size_14,
       
    }
})