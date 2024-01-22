import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const EmptyCart = () => {
  return (
    <View className="flex-1 items-center justify-start">
      <LottieView
        source={require("../assets/Animation - 1705958060421.json")}
        style={{ width: "100%" }}
        // ref={animationRef}
        autoPlay
        loop
      />
      <Text className="text-white text-xl font-bold">Your cart is empty.</Text>
      <Text className="text-white text-xl font-bold">
        Add some tasty drinks!
      </Text>
    </View>
  );
};

export default EmptyCart;

const styles = StyleSheet.create({});
