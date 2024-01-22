import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const NoFavorites = () => {
  return (
    <View className="flex-1 items-center justify-start mt-10">
      <LottieView
        source={require("../assets/Animation - 1705955501601.json")}
        style={{ width: "100%" }}
        // ref={animationRef}
        autoPlay
        loop
      />
      <Text className="text-white text-xl font-bold">
        Tap the ❤️ on your favorite drinks
      </Text>
      <Text className="text-white text-xl font-bold">and find them here</Text>
    </View>
  );
};

export default NoFavorites;

const styles = StyleSheet.create({});
