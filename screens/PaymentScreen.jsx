import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import config from "../config";
import { useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { selectCheckout } from "../feautures/cartSlice";
import HeaderBar from "../components/HeaderBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { addCents } from "../utils/drinks/priceAdjuster.js";
import { Icon } from "@rneui/themed";
import { selectUser } from "../feautures/userSlice";
import PaymentOption from "../components/PaymentOption.jsx";
import PaymentProcessing from "../components/PaymentProcessing.jsx";

const PaymentScreen = () => {
  const [selectedPaymentOption, setSelectedPaymentOption] =
    useState("Credit Card");
  const [availablePaymentMethods, setAvailablePaymentMethods] = useState([]);
  const [acceptPayment, setAcceptPayment] = useState(false);

  const checkoutInfo = useSelector(selectCheckout);
  const user = useSelector(selectUser);

  const handlePay = () => {
    setAcceptPayment(true);
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
