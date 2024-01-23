import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import config from "../config";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "@rneui/themed";
import { addCents } from "../utils/drinks/priceAdjuster";

const PaymentOption = ({
  name,
  option,
  selectedPaymentOption,
  setSelectedPaymentOption,
}) => {
  const expandNumber = (num) => {
    return num.split("").join(" ");
  };

  return (
    <>
      {name !== "Credit Card" ? (
        <TouchableOpacity
          className="w-full h-16 rounded-full mb-5"
          onPress={() => setSelectedPaymentOption(name)}
          activeOpacity={0.5}
        >
          <LinearGradient
            style={
              selectedPaymentOption === name
                ? styles.borderColorSelected
                : styles.borderColor
            }
            colors={[config.color.GRAY, "#181e29"]}
            className="w-full h-16 rounded-full items-center justify-between px-6 flex-row"
            // start={{ x: 0.4, y: 0.4 }}
            // end={{ x: 1, y: 1 }}
          >
            <View className="flex-row items-center">
              <Icon
                name={option.icon}
                type={option.type}
                size={24}
                color="white"
              />
              <Text className="text-white pl-4 font-semibold text-xl">
                {name}
              </Text>
            </View>
            {option.fundAvailable && (
              <View className="flex-row items-center">
                <Text
                  style={styles.textColor}
                  className="font-bold text-lg pr-1"
                >
                  $
                </Text>
                <Text className="font-bold text-lg text-white">
                  {addCents(option.fundAvailable)}
                </Text>
              </View>
            )}
          </LinearGradient>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          className="w-full  rounded-3xl mb-5 pt-3 pb-4 px-6"
          style={
            selectedPaymentOption === name
              ? styles.borderColorSelected
              : styles.borderColor
          }
          onPress={() => setSelectedPaymentOption(name)}
          activeOpacity={0.5}
        >
          <Text className="text-white pl-4 font-semibold text-lg">{name}</Text>
          <LinearGradient
            colors={[config.color.GRAY, "#181e29"]}
            className="w-full h-48 rounded-2xl items-center mt-4"
            // start={{ x: 0.4, y: 0.4 }}
            // end={{ x: 1, y: 1 }}
          >
            <View className="flex-row items-center justify-between px-4 pt-3 w-full">
              <Icon
                name="integrated-circuit-chip"
                type="material-community"
                size={48}
                color={config.color.ORANGE}
              />
              <Icon
                name={option.icon}
                type={option.type}
                size={32}
                color="white"
              />
            </View>
            <View className="w-full px-4 pt-5">
              <Text className="text-white text-xl font-light tracking-widest text-center">
                {expandNumber(option.ccNum)}
              </Text>
            </View>
            <View className="w-full px-4 pt-6 flex-row items-center justify-between">
              <View className="items-start">
                <Text
                  className="font-extralight text-xs"
                  style={styles.smallText}
                >
                  Card Holder Name
                </Text>
                <Text className="text-white text-lg">{option.ccName}</Text>
              </View>
              <View className="items-end">
                <Text
                  className="font-extralight text-xs"
                  style={styles.smallText}
                >
                  Expiry Date
                </Text>
                <Text className="text-white text-lg">{option.ccExpiry}</Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </>
  );
};

export default PaymentOption;

const styles = StyleSheet.create({
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
  textColor: {
    color: config.color.ORANGE,
  },
});
