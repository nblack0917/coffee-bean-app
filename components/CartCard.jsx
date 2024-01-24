import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useMemo, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { urlFor } from "../sanity";
import { addCents, priceAdjuster } from "../utils/drinks/priceAdjuster";
import { Icon } from "@rneui/themed";
import _ from "lodash";
import uuid from "react-native-uuid";

import { addToCart, removeFromCart } from "../feautures/cartSlice";
import { useDispatch } from "react-redux";

const CartCard = ({ cartItems }) => {
  const [groupedSizes, setGroupedSizes] = useState([]);
  const [groupedOptions, setgroupedOptions] = useState([]);

  const dispatch = useDispatch();

  useMemo(() => {
    const grouped = cartItems.reduce((results, item) => {
      (results[item.size] = results[item.size] || []).push(item);
      return results;
    }, {});

    setGroupedSizes(grouped);
  }, [cartItems]);

  // const sizeKeys = Object.entries(groupedSizes);

  // const groupedArray = cartItems.reduce(
  //   (item, index) => {
  //     if (typeof item.last === "undefined" || item.last !== index) {
  //       item.last = index;
  //       item.array.push([]);
  //     }
  //     item.array[item.array.length - 1].push(index);
  //     return item;
  //   },
  //   { array: [] }
  // ).array;

  // console.log(cartItems.length);

  return (
    <View className="w-full">
      <LinearGradient
        colors={[config.color.GRAY, "#181e29"]}
        className=" rounded-3xl mx-4 p-4 mb-6"
      >
        {cartItems.length === 1 && cartItems[0].options.length === 0 ? (
          <>
            <View className="flex-row">
              <Image
                source={{
                  uri: urlFor(cartItems[0]?.product.image).url(),
                }}
                width={150}
                height={150}
                resizeMode="cover"
                style={{ borderRadius: 25 }}
              />
              <View className="flex-1 px-5">
                <Text className="text-white text-lg">
                  {cartItems[0]?.product.name}
                </Text>
                <Text className="text-white font-extralight text-xs mt-1">
                  {cartItems[0]?.product.subtext}
                </Text>
                <View key={uuid.v4()}>
                  <View className="flex-row items-center mt-3">
                    <View
                      className="rounded-xl w-24 py-3"
                      style={styles.sizeContainer}
                    >
                      <Text className="text-center text-white">
                        {cartItems[0]?.size}
                      </Text>
                    </View>
                    <View className="flex-row items-center mx-5">
                      <Text
                        style={styles.textColor}
                        className="font-bold text-lg pr-2"
                      >
                        $
                      </Text>
                      <Text className="font-bold text-lg text-white">
                        {addCents(cartItems[0]?.price)}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row items-center mt-3">
                    <View className="flex-1 flex-row items-center justify-between">
                      <TouchableOpacity
                        className="p-2 rounded-xl"
                        style={styles.incrementWrapper}
                        onPress={() => dispatch(removeFromCart(cartItems[0]))}
                      >
                        <Icon
                          name="minus"
                          type="font-awesome-5"
                          size={18}
                          color="white"
                        />
                      </TouchableOpacity>
                      <View
                        className="px-5 py-2 rounded-xl"
                        style={styles.numberWrapper}
                      >
                        <Text className="text-white">
                          {cartItems[0]?.quantity}
                        </Text>
                      </View>
                      <TouchableOpacity
                        className="p-2 rounded-xl"
                        style={styles.incrementWrapper}
                        onPress={() => dispatch(cartItems[0])}
                      >
                        <Icon
                          name="plus"
                          type="font-awesome-5"
                          size={18}
                          color="white"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </>
        ) : (
          <>
            <View className="flex-row">
              <Image
                source={{
                  uri: urlFor(cartItems[0]?.product.image).url(),
                }}
                width={110}
                height={110}
                resizeMode="cover"
                style={{ borderRadius: 25 }}
              />
              <View className="flex-1 px-5">
                <Text className="text-white text-lg">
                  {cartItems[0]?.product.name}
                </Text>
                <Text className="text-white font-extralight text-xs mt-1">
                  {cartItems[0]?.product.subtext}
                </Text>
                {cartItems[0]?.product.roast && (
                  <View
                    style={styles.roastContainer}
                    className="py-4 rounded-xl w-32 mt-3"
                  >
                    <Text className="text-white text-xs font-light text-center">
                      {cartItems[0]?.product.roast?.[0]?.name} Roasted
                    </Text>
                  </View>
                )}
              </View>
            </View>
            {cartItems.map((item, index) => (
              <View key={uuid.v4()} className="pt-3">
                <View className="flex-row items-center px-2 py-1">
                  <View
                    className="rounded-xl w-24 py-3"
                    style={styles.sizeContainer}
                  >
                    <Text className="text-center text-white">{item.size}</Text>
                  </View>
                  <View className="flex-row items-center mx-5">
                    <Text
                      style={styles.textColor}
                      className="font-bold text-lg pr-2"
                    >
                      $
                    </Text>
                    <Text className="font-bold text-lg text-white">
                      {addCents(Number(item.price))}
                    </Text>
                  </View>
                  <View className="flex-1 flex-row items-center justify-between">
                    <TouchableOpacity
                      className="p-2 rounded-xl"
                      style={styles.incrementWrapper}
                      onPress={() => dispatch(removeFromCart(item))}
                    >
                      <Icon
                        name="minus"
                        type="font-awesome-5"
                        size={18}
                        color="white"
                      />
                    </TouchableOpacity>
                    <View
                      className="px-5 py-2 rounded-xl"
                      style={styles.numberWrapper}
                    >
                      <Text className="text-white">{item.quantity}</Text>
                    </View>
                    <TouchableOpacity
                      className="p-2 rounded-xl"
                      style={styles.incrementWrapper}
                      onPress={() => dispatch(addToCart(item))}
                    >
                      <Icon
                        name="plus"
                        type="font-awesome-5"
                        size={18}
                        color="white"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {item.options.length > 0 && (
                  <View className="mb-2">
                    {item.options.map((option, index) => (
                      <View
                        className="flex-row w-full pr-14 my-0.5 items-center justify-end"
                        key={uuid.v4()}
                      >
                        <View className="flex-row items-center justify-between w-full pl-8">
                          <View className="w-24">
                            <Text className="text-white font-light">
                              {option.name}
                            </Text>
                          </View>
                          <Text className="text-white font-light pr-11">
                            {addCents(option.price * option.quantity)}
                          </Text>
                          <View
                            className="px-4 py-1 rounded-xl"
                            style={styles.optionNumberWrapper}
                          >
                            <Text className="text-white">
                              {option.quantity}
                            </Text>
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </>
        )}
      </LinearGradient>
    </View>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  roastContainer: {
    backgroundColor: config.color.BLACK,
  },
  sizeContainer: {
    backgroundColor: config.color.BLACK,
  },
  textColor: {
    color: config.color.ORANGE,
  },
  incrementWrapper: {
    backgroundColor: config.color.ORANGE,
  },
  numberWrapper: {
    backgroundColor: config.color.BLACK,
    borderWidth: 1,
    borderColor: config.color.ORANGE,
  },
  optionNumberWrapper: {
    backgroundColor: config.color.BLACK,
    borderWidth: 1,
    borderColor: config.color.MD_GRAY,
  },
  itemWrapper: {
    borderColor: config.color.MD_GRAY,
    borderBottomWidth: 1,
  },
});
