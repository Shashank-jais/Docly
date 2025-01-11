import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomIcons from './CustomIcons';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';

interface DrugHeaderProps{
    title: string;
    backHandler:any;
    cartHandler:any;
}

const DrugHeader:React.FC<DrugHeaderProps> = ({navigation,title,backHandler,cartHandler}:any) => {

    
  return (
    <View style={styles.HeaderContainer}>
      <TouchableOpacity onPress={()=>{backHandler();}}><CustomIcons name='left' color={COLORS.black900} size={FONTSIZE.size_18}/></TouchableOpacity>
      <View><Text style={styles.title}>{title}</Text></View>
      <View>
        <TouchableOpacity onPress={()=>{
           cartHandler();
        }}>
        <Image source={require("../assets/svg_images/cartgray.png")} style={styles.image}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default DrugHeader

const styles = StyleSheet.create({
    HeaderContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin:SPACING.space_18,
        marginTop:SPACING.space_4,
        // backgroundColor:"red",
        padding:SPACING.space_4
    },
    title:{
        fontFamily:FONTFAMILY.poppins_semibold,
        fontSize:FONTSIZE.size_20+3,
        
    },
    image:{
        width:25,
        height:25,
    }

})