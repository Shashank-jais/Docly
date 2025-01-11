import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import Header from '../components/Header';
import { useStore } from '../store/store';
import CartBox from '../components/CartBox';

const CartScreen = ({ navigation }: any) => {
  const CartList = useStore((state: any) => state.CartList);
  const Cartprice = useStore((state: any) => state.Cartprice);
  const [paymentMode, setPaymentMode] = useState('Credit Card');

  const backHandler = () => {
    navigation.pop();
  };

  const formatCurrency = (value: any) => `$${Number(value).toFixed(2)}`;
  const totalCartPrice = isNaN(Number(Cartprice)) ? 0 : Number(Cartprice) + 61.0;


  // Render footer for the list
  const renderListFooter = () => (
    <>
      <View style={styles.DateContainer}>
        <View style={styles.DateContainerHeadingRow}>
          <Text style={styles.DateHeading}>Payment Details</Text>
        </View>
        <View style={styles.feeRow}>
          <Text style={styles.feeText}>Consultation</Text>
          <Text style={styles.feeText}>{formatCurrency(60.0)}</Text>
        </View>
        <View style={styles.feeRow}>
          <Text style={styles.feeText}>Admin Fee</Text>
          <Text style={styles.feeText}>{formatCurrency(1.0)}</Text>
        </View>
        <View style={styles.feeRow}>
          <Text style={styles.feeText}>Bill</Text>
          <Text style={styles.feeText}>{formatCurrency(Cartprice)}</Text>
        </View>
        <View style={styles.feeRow}>
          <Text style={styles.feeText}>Total</Text>
          <Text style={styles.feeText}>{formatCurrency(totalCartPrice)}</Text>
        </View>
      </View>

      <View style={[styles.DateContainer, { marginTop: SPACING.space_4 }]}>
        <View style={styles.DateContainerHeadingRow}>
          <Text style={styles.DateHeading}>Payment Methods</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.PaymentRow,
            { borderColor: paymentMode === 'Credit Card' ? COLORS.cyan300 : COLORS.white },
          ]}
          onPress={() => setPaymentMode('Credit Card')}
        >
          <Text style={styles.paymentText}>Credit Card</Text>
          <Text style={styles.paymentText}>{formatCurrency(totalCartPrice)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.PaymentRow,
            { borderColor: paymentMode === 'Debit Card' ? COLORS.cyan300 : COLORS.white },
          ]}
          onPress={() => setPaymentMode('Debit Card')}
        >
          <Text style={styles.paymentText}>Debit Card</Text>
          <Text style={styles.paymentText}>{formatCurrency(totalCartPrice)}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.BtnContainer}>
        <View style={styles.billRow}>
          <Text style={styles.totalHeading}>Total</Text>
          <Text style={styles.priceHeading}>{formatCurrency(totalCartPrice)}</Text>
        </View>
        <TouchableOpacity
          style={styles.Btn}

          onPress={() => {
            ToastAndroid.showWithGravity(
              `Products are Booked`,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
            navigation.navigate("Tab", { screen: "Home" })
          }}
        >
          <Text style={styles.BtnText}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.white} />
      <Header title="My Cart" backHandler={backHandler} />
      {CartList.length > 0 ? (
        <FlatList
          data={CartList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>{
              navigation.push("DrugDetails", { ...item })
            }}>
              <CartBox item={item} />
            </TouchableOpacity>
          )}
          ListFooterComponent={renderListFooter}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.DateHeading}>Your cart is empty!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  DateContainer: {
    marginHorizontal: SPACING.space_18,
    marginBottom: SPACING.space_18,
    backgroundColor: COLORS.teal50,
    borderRadius: BORDERRADIUS.radius_10,
    padding: SPACING.space_10,
  },
  DateContainerHeadingRow: {
    flexDirection: 'row',
    padding: SPACING.space_2,
    justifyContent: 'space-between',
  },
  DateHeading: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SPACING.space_4,
  },
  feeText: {
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: FONTSIZE.size_14,
  },
  PaymentRow: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.space_4,
    paddingVertical: SPACING.space_10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
    borderRadius: BORDERRADIUS.radius_10,
  },
  paymentText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
  },
  BtnContainer: {
    flexDirection: 'row',
    margin: SPACING.space_18,
    justifyContent: 'space-between',
    backgroundColor: COLORS.teal50,
    borderRadius: BORDERRADIUS.radius_10,

  },
  billRow: {
    width: '30%',
    paddingHorizontal: SPACING.space_8,
    paddingVertical: SPACING.space_4,
  },
  Btn: {
    width: '65%',
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.cyan300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  BtnText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.white,
  },
  totalHeading: {
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: FONTSIZE.size_16,
  },
  priceHeading: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.space_18,
  },
});

export default CartScreen;
