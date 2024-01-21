import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useMemo, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { urlFor } from "../sanity";
import { addCents, priceAdjuster } from "../utils/drinks/priceAdjuster";
import { Icon } from "@rneui/themed";
import { addToCart, removeFromCart } from "../feautures/cartSlice";
import { useDispatch } from "react-redux";

const CartCard = ({ cartItems }) => {
  const [groupedSizes, setGroupedSizes] = useState([]);

  const dispatch = useDispatch();

  useMemo(() => {
    const grouped = cartItems.reduce((results, item) => {
      (results[item.size] = results[item.size] || []).push(item);
      return results;
    }, {});

    setGroupedSizes(grouped);
  }, [cartItems]);

  console.log(groupedSizes);

  return (
    <View className="w-full">
      <LinearGradient
        colors={[config.color.GRAY, "#181e29"]}
        className=" rounded-3xl mx-4 p-4 my-4"
      >
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
        <View className="">
          {Object.entries(groupedSizes).map(([key, items]) => (
            <View
              key={`${items[0].product._id}${key}`}
              className="flex-row items-center mt-3"
            >
              <View
                className="rounded-xl w-24 py-3"
                style={styles.sizeContainer}
              >
                <Text className="text-center text-white">{key}</Text>
              </View>
              <View className="flex-row items-center mx-5">
                <Text
                  style={styles.textColor}
                  className="font-bold text-lg pr-2"
                >
                  $
                </Text>
                <Text className="font-bold text-lg text-white">
                  {addCents(items[0].price)}
                </Text>
              </View>
              <View className="flex-1 flex-row items-center justify-between">
                <TouchableOpacity
                  className="p-2 rounded-xl"
                  style={styles.incrementWrapper}
                  onPress={() =>
                    dispatch(
                      removeFromCart({ id: items[0].product._id, size: key })
                    )
                  }
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
                  <Text className="text-white">{items.length}</Text>
                </View>
                <TouchableOpacity
                  className="p-2 rounded-xl"
                  style={styles.incrementWrapper}
                  onPress={() => dispatch(addToCart(items[0]))}
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
          ))}
        </View>
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
});

{
  /* <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text className="text-[#00CCBB]">{items.length} x</Text>
              <Image
                source={{
                  uri: urlFor(items[0]?.product.image).url(),
                }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{items[0]?.product.name}</Text>
  
              <View>
                <Text className="text-white text-center font-light">Price</Text>
                <View className="flex-row items-center">
                  <Text
                    style={styles.textColor}
                    className="font-bold text-lg pr-2"
                  >
                    $
                  </Text>
                  <Text className="font-bold text-lg text-white">
                    {addCents(priceAdjuster(items[0]?.price))}
                  </Text>
                </View>
              </View>
  
              <TouchableOpacity>
                <Text
                  className="text-[#00CCBB] text-xs"
                  onPress={() => dispatch(removeFromCart({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View> */
}
