import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { urlFor } from "../sanity";
import { Icon } from "@rneui/themed";
import { addCents, addRatingDecimal } from "../utils/drinks/priceAdjuster";
import {
  getIngredientIcon,
  getIngredientType,
} from "../utils/drinks/ingredient";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFavorites, selectUser } from "../feautures/userSlice";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

const FavoriteCard = ({ favorite }) => {
  const [expand, setExpand] = useState(2);

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleNumOfLines = () => {
    if (expand === 2) {
      setExpand(10);
    } else {
      setExpand(2);
    }
  };

  const handleRemoveFromFavorites = async () => {
    let favorites = [...user?.favorites];
    const index = favorites.findIndex((item) => item === favorite._id);
    let newFavorites = [...favorites];
    if (index >= 0) {
      newFavorites.splice(index, 1);
    } else {
      console.warn(
        `Can't remove product (id: ${product._id}) as it is not in favorites!`
      );
    }
    const userRef = doc(db, "users", user.id);
    await updateDoc(userRef, {
      favorites: newFavorites,
    });
    dispatch(removeFromFavorites(favorite._id));
  };

  return (
    <View className="flex-1 items-center px-4 mb-6">
      <View className="flex-1 items-center relative w-full">
        <Image
          source={{ uri: urlFor(favorite.image).url() }}
          style={styles.image}
        />
        <TouchableOpacity
          onPress={handleRemoveFromFavorites}
          className="absolute rounded-2xl p-2 top-5 right-5"
          style={styles.backContainer}
        >
          <Icon
            name="heart"
            type="ionicon"
            size={22}
            color={config.color.RED}
          />
        </TouchableOpacity>
        <View
          className="absolute bottom-0 flex-1 w-full rounded-t-3xl pt-4 flex-row justify-between"
          style={styles.detailContainer}
        >
          <View className="pl-5 pb-7 justify-between">
            <View className="py-3">
              <Text className="text-white font-semibold text-xl mb-1">
                {favorite.name}
              </Text>
              <Text className="text-white text-sm font-extralight">
                {favorite.subtext}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Icon
                name="star"
                type="antdesign"
                size={22}
                color={config.color.ORANGE}
              />
              <Text className="text-white font-semibold ml-2 text-xl">
                {addRatingDecimal(favorite.rating)}
              </Text>
            </View>
          </View>
          <View className="mr-5">
            <View className="flex-row-reverse items-center justify-between mb-5 fle">
              {favorite.ingredients.map((ingredient) => (
                <View key={ingredient._id}>
                  <View
                    style={styles.ingredientContainer}
                    className="p-3 rounded-xl"
                  >
                    <Icon
                      name={getIngredientIcon(ingredient.name)}
                      type={getIngredientType(ingredient.name)}
                      size={18}
                      color={config.color.ORANGE}
                    />
                    <Text className="text-white text-xs text-center font-light mt-1 text-xs">
                      {ingredient.name}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
            {favorite.roast && (
              <View
                style={styles.roastContainer}
                className="w-40 py-4 rounded-xl mb-3"
              >
                <Text className="text-white font-light text-center">
                  {favorite.roast?.[0]?.name} Roasted
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
      <LinearGradient
        colors={[config.color.GRAY, "#181e29"]}
        className="w-full rounded-b-3xl"
      >
        <View className="px-5 pt-3 pb-5">
          <Text
            className="text-white font-medium text-lg"
            style={styles.textHeading}
          >
            Description
          </Text>
          <Text
            className="text-white font-light pt-1"
            numberOfLines={expand}
            onPress={() => handleNumOfLines()}
            ellipsizeMode="tail"
          >
            {favorite.description}
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default FavoriteCard;

const styles = StyleSheet.create({
  container: {},
  image: {
    width: "100%",
    height: 450,
    resizeMode: "cover",
    zIndex: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  textHeading: {
    color: config.color.LT_GRAY,
  },
  detailContainer: {
    backgroundColor: "rgba(19, 24, 33, 0.5)",
  },
  ingredientContainer: {
    backgroundColor: config.color.GRAY,
    minWidth: 75,
  },
  roastContainer: {
    backgroundColor: config.color.GRAY,
    // minWidth: "100%",
  },
  backContainer: {
    backgroundColor: config.color.GRAY,
    borderColor: config.color.MD_GRAY,
    borderWidth: 2,
  },
});
