import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const PaymentProcessing = () => {
  return (
    <View className="flex-1 items-center justify-start mt-10">
      <LottieView
        source={require("../assets/Animation - 1705955346482.json")}
        style={{ width: "100%" }}
        // ref={animationRef}
        autoPlay
        loop
      />
      <Text className="text-white text-xl font-bold">Completing Order...</Text>
    </View>
  );
};

export default PaymentProcessing;

const styles = StyleSheet.create({});
