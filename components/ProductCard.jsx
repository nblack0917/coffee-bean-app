import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import sanityClient, { urlFor } from "../sanity";

import config from "../config";
import { useNavigation } from "@react-navigation/native";
import { priceAdjuster } from "../utils/drinks/priceAdjuster";
import { useDispatch } from "react-redux";
import { addToCart } from "../feautures/cartSlice";

const ProductCard = ({ product, hasRating }) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const addCents = (price) => {
    let currPrice = price.toString();
    let newPrice;
    if (currPrice.length === 3) {
      newPrice = currPrice.concat("0");
    } else if (currPrice.length === 1) {
      newPrice = currPrice.concat(".00");
    } else {
      newPrice = price.toString();
    }
    return newPrice;
  };

  const addRatingDecimal = (rating) => {
    let currRating = rating.toString();
    let newRating;
    if (currRating.length === 1) {
      newRating = currRating.concat(".0");
    } else {
      newRating = currRating;
    }
    return newRating;
  };

  const handleAddToCart = () => {
    const selectedSize = product.sizes?.[0].name;
    const itemToAdd = {
      product: product,
      size: selectedSize,
      price: Number(priceAdjuster(selectedSize, product.price)),
    };
    dispatch(addToCart(itemToAdd));
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetail", { product })}
    >
      <LinearGradient
        className="justify-center rounded-3xl p-3 mr-5"
        colors={[config.color.GRAY, config.color.BLACK]}
        // start={{ x: 0.4, y: 0.4 }}
        // end={{ x: 1, y: 1 }}
      >
        <View className="relative">
          {hasRating && (
            <View
              className="absolute w-1/2 flex-row items-center z-50 right-0 top-0 rounded-tr-2xl rounded-bl-2xl"
              style={styles.ratingContainer}
            >
              <View
                className="w-full flex-row items-center justify-center py-1"
                style={styles.ratingTop}
              >
                <Icon
                  name="star"
                  type="antdesign"
                  size={12}
                  color={config.color.ORANGE}
                />
                <Text className="text-white text-sm  pl-1">
                  {addRatingDecimal(product.rating)}
                </Text>
              </View>
            </View>
          )}
          <Image
            source={{
              uri: urlFor(product.image).url(),
            }}
            style={{ minWidth: 130, minHeight: 130, borderRadius: 20 }}
            resizeMode="cover"
          />
        </View>
        <View className="mb-2">
          <Text className="text-white font-light text-lg pt-3 pb-1 tracking-wide">
            {product.name}
          </Text>
          <Text className="text-white text-xs font-extralight pb-1">
            {product.subtext}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <View className="flex items-center">
            {hasRating && (
              <Text className="font-extralight text-white text-xs text-center">
                Starting at
              </Text>
            )}
            <View className="flex-row items center">
              <Text style={styles.textColor} className="font-bold text-lg pr-2">
                $
              </Text>
              <Text className="font-bold text-lg text-white">
                {addCents(product.price)}
              </Text>
            </View>
            {!hasRating && (
              <Text className="font-extralight text-white text-xs text-center">
                per pound
              </Text>
            )}
          </View>
          <TouchableOpacity
            className="w-8 h-8 items-center justify-center p-1 rounded-lg"
            style={styles.addContainer}
            onPress={() => handleAddToCart()}
          >
            <Icon name="plus" type="antdesign" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: config.color.GRAY,
  },
  addContainer: {
    backgroundColor: config.color.ORANGE,
  },
  ratingContainer: {
    backgroundColor: "rgba(19, 24, 33, 0.7)",
  },
  textColor: {
    color: config.color.ORANGE,
  },
});
