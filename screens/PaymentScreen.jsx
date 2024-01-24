import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import config from "../config";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import {
  clearCart,
  clearCheckout,
  selectCartItems,
  selectCheckout,
} from "../feautures/cartSlice";
import HeaderBar from "../components/HeaderBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { addCents } from "../utils/drinks/priceAdjuster.js";
import { Icon } from "@rneui/themed";
import uuid from "react-native-uuid";
import { addToOrderHistory, selectUser } from "../feautures/userSlice";
import PaymentOption from "../components/PaymentOption.jsx";
import PaymentProcessing from "../components/PaymentProcessing.jsx";
import { addToFBOrderHistory } from "../utils/user/getOrderHistory.js";
import { serverTimestamp } from "firebase/firestore";

const PaymentScreen = ({ navigation }) => {
  const [selectedPaymentOption, setSelectedPaymentOption] =
    useState("Credit Card");
  const [availablePaymentMethods, setAvailablePaymentMethods] = useState([]);
  const [acceptPayment, setAcceptPayment] = useState(false);

  const checkoutInfo = useSelector(selectCheckout);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handlePay = async () => {
    let lastFour;
    if (selectedPaymentOption === "Credit Card") {
      const index = availablePaymentMethods.findIndex(
        (payment) => payment.name === selectedPaymentOption
      );
      if (index >= 0) {
        lastFour = availablePaymentMethods[index].ccNum.substr(
          availablePaymentMethods[index].ccNum.length - 4
        );
      }
    }
    const currDate = new Date().toString();
    const finalize = {
      id: uuid.v4(),
      items: checkoutInfo.items,
      subtotal: checkoutInfo.subtotal,
      tax: checkoutInfo.tax,
      total: checkoutInfo.total,
      paymentMethod: selectedPaymentOption,
      last4Digits: lastFour ?? null,
      paymentStatus: "success",
      timestamp: currDate,
    };
    setAcceptPayment(true);
    dispatch(addToOrderHistory(finalize));
    await addToFBOrderHistory(user, finalize);
    dispatch(clearCart());
    dispatch(clearCheckout());
    setTimeout(() => {
      navigation.navigate("Order History");
    }, 5000);
  };

  useEffect(() => {
    user?.paymentMethods && setAvailablePaymentMethods(user.paymentMethods);
  }, [user]);

  return (
    <SafeAreaView style={styles.container} className="flex-1">
      <HeaderBar />
      {!acceptPayment ? (
        <>
          <View className="flex-1 items-center mt-6 mx-4">
            {availablePaymentMethods?.map(
              (option) =>
                option.name === "Credit Card" && (
                  <PaymentOption
                    key={option.name}
                    name={option.name}
                    option={option}
                    selectedPaymentOption={selectedPaymentOption}
                    setSelectedPaymentOption={setSelectedPaymentOption}
                  />
                )
            )}
            {availablePaymentMethods?.map(
              (option) =>
                option.name !== "Credit Card" && (
                  <PaymentOption
                    key={option.name}
                    name={option.name}
                    option={option}
                    selectedPaymentOption={selectedPaymentOption}
                    setSelectedPaymentOption={setSelectedPaymentOption}
                  />
                )
            )}
          </View>
          <View className="px-4 my-4">
            <View className="flex-row items-center">
              <View className="">
                <Text className="text-white text-center font-light">Total</Text>
                <View className="flex-row items-center">
                  <Text
                    style={styles.textColor}
                    className="font-bold text-lg pr-1"
                  >
                    $
                  </Text>
                  <Text className="font-bold text-lg text-white">
                    {addCents(checkoutInfo.total)}
                  </Text>
                </View>
              </View>
              <View className="flex-1 ml-4 mr-2">
                <TouchableOpacity
                  style={styles.checkoutContainer}
                  className="py-4 rounded-3xl"
                  onPress={handlePay}
                >
                  <Text className="text-white font-semibold text-xl text-center">
                    {`Pay with ${selectedPaymentOption}`}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
      ) : (
        <>
          <PaymentProcessing />
        </>
      )}
    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: config.color.BLACK,
  },
  textColor: {
    color: config.color.ORANGE,
  },
  checkoutContainer: {
    backgroundColor: config.color.ORANGE,
  },
  borderColor: {
    borderWidth: 2,
    borderColor: config.color.MD_GRAY,
  },
  borderColorSelected: {
    borderWidth: 2,
    borderColor: config.color.ORANGE,
  },
  smallText: {
    color: config.color.LT_GRAY,
  },
});
