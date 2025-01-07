import { Dimensions, ImageBackground, ImageProps, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import CustomIcons from './CustomIcons';


interface DoctorListCardProps {
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

const DoctorListCard: React.FC<DoctorListCardProps> = ({
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
                <Text style={styles.titleDistance}>{userDistance}</Text>
            </View>
        </View>
    )
}

export default DoctorListCard

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
        color:COLORS.cyan300,
        alignItems: 'center',
        paddingTop: SPACING.space_2,
        
    },
    titleDistance: {
        fontSize: FONTSIZE.size_10,
        fontFamily: FONTFAMILY.poppins_light,
    }
})