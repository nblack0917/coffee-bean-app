import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import config from "../config";
import { urlFor } from "../sanity";
import HeaderBar from "../components/HeaderBar";
import { Icon, ListItem } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import {
  getIngredientIcon,
  getIngredientType,
} from "../utils/drinks/ingredient";
import {
  addCents,
  addRatingDecimal,
  priceAdjuster,
} from "../utils/drinks/priceAdjuster";
import { db } from "../firebase";
import {
  addToFavories,
  removeFromFavorites,
  selectUser,
} from "../feautures/userSlice";
import { doc, updateDoc } from "firebase/firestore";
import { addToCart, selectCartItems } from "../feautures/cartSlice";

const ProductDetailScreen = () => {
  const [expand, setExpand] = useState(2);
  const [selectedSize, setSelectedSize] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  const user = useSelector(selectUser);
  const cart = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const {
    params: { product },
  } = useRoute();

  const handleNumOfLines = () => {
    if (expand === 2) {
      setExpand(10);
    } else {
      setExpand(2);
    }
  };

  const handleAddToCart = () => {
    const itemToAdd = {
      product: product,
      size: selectedSize,
      price: Number(priceAdjuster(selectedSize, product.price)),
    };
    dispatch(addToCart(itemToAdd));
  };

  const handleAddToFavorites = async () => {
    let favorites = [...user?.favorites];
    favorites.push(product._id);
    dispatch(addToFavories(product._id));
    const userRef = doc(db, "users", user?.id);
    await updateDoc(userRef, {
      favorites: favorites,
    });
    setIsFavorite(true);
  };

  const handleRemoveFromFavorites = async () => {
    let favorites = [...user?.favorites];
    const index = favorites.findIndex((item) => item === product._id);
    let newFavorites = [...favorites];
    if (index >= 0) {
      newFavorites.splice(index, 1);
    } else {
      console.warn(
        `Can't remove product (id: ${product._id}) as it is not in favorites!`
      );
    }
    dispatch(removeFromFavorites(product._id));
    const userRef = doc(db, "users", user.id);
    await updateDoc(userRef, {
      favorites: newFavorites,
    });
    setIsFavorite(false);
  };

  useEffect(() => {
    setSelectedSize(product.sizes[0].name);
    const found = user?.favorites.includes(product._id);
    if (found) setIsFavorite(true);
  }, [user]);

  useEffect(() => {
    console.log(cart.length);
  }, [cart]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <HeaderBar
          style={styles.headerBar}
          isFavorite={isFavorite}
          addToFavorites={handleAddToFavorites}
          removeFromFavorites={handleRemoveFromFavorites}
        />
        <Image
          source={{ uri: urlFor(product.image).url() }}
          style={styles.image}
        />
        <View
          className="absolute bottom-0 flex-1 w-full rounded-t-3xl pt-4 flex-row justify-between"
          style={styles.detailContainer}
        >
          <View className="pl-5 pb-7 justify-between">
            <View className="py-3">
              <Text className="text-white font-semibold text-2xl mb-1">
                {product.name}
              </Text>
              <Text className="text-white text-sm font-extralight">
                {product.subtext}
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
                {addRatingDecimal(product.rating)}
              </Text>
            </View>
          </View>
          <View className="mr-5">
            <View className="flex-row-reverse items-center justify-between mb-5 fle">
              {product.ingredients.map((ingredient) => (
                <View key={ingredient._id}>
                  <View
                    style={styles.ingredientContainer}
                    className="p-4 rounded-xl"
                  >
                    <Icon
                      name={getIngredientIcon(ingredient.name)}
                      type={getIngredientType(ingredient.name)}
                      size={24}
                      color={config.color.ORANGE}
                    />
                    <Text className="text-white text-center font-light mt-1 text-xs">
                      {ingredient.name}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
            {product.roast && (
              <View
                style={styles.roastContainer}
                className="w-40 py-4 rounded-xl mb-3"
              >
                <Text className="text-white font-light text-center">
                  {product.roast?.[0]?.name} Roasted
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
      <ScrollView>
        <View className="px-4 py-4">
          <Text
            className="text-white font-medium text-lg"
            style={styles.textHeading}
          >
            Description
          </Text>
          <Text
            className="text-white font-light pt-4"
            numberOfLines={expand}
            onPress={() => handleNumOfLines()}
            ellipsizeMode="tail"
          >
            {product.description}
          </Text>
          <Text
            className="text-white font-medium text-lg py-4"
            style={styles.textHeading}
          >
            Sizes
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {product.sizes?.map((size) => (
              <TouchableOpacity
                key={size._id}
                onPress={() => setSelectedSize(size.name)}
              >
                <View
                  className="p-4 rounded-xl w-28 mr-5"
                  style={
                    size.name === selectedSize
                      ? styles.sizeContainerSelected
                      : styles.sizeContainerNotSelected
                  }
                >
                  <Text
                    className="text-center"
                    style={
                      size.name === selectedSize
                        ? styles.sizeTextSelected
                        : styles.sizeTextNotSelected
                    }
                  >
                    {size.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
      <View className="px-4 my-4">
        <View className="flex-row items-center">
          <View>
            <Text className="text-white text-center font-light">Price</Text>
            <View className="flex-row items-center">
              <Text style={styles.textColor} className="font-bold text-lg pr-2">
                $
              </Text>
              <Text className="font-bold text-lg text-white">
                {addCents(priceAdjuster(selectedSize, product.price))}
              </Text>
            </View>
          </View>
          <View className="flex-1 ml-10 mr-2">
            <TouchableOpacity
              style={styles.addToCartContainer}
              className="py-4 rounded-3xl"
              onPress={handleAddToCart}
            >
              <Text className="text-white font-semibold text-xl text-center">
                Add to Cart
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* </View> */}
    </SafeAreaView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: config.color.BLACK,
    flex: 1,
  },
  topWrapper: {
    position: "relative",
    flex: 1,
    height: 550,
  },
  image: {
    width: "100%",
    height: 550,
    resizeMode: "cover",
    zIndex: 0,
  },
  headerBar: {
    position: "absolute",
    zIndex: 50,
    top: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  textHeading: {
    color: config.color.LT_GRAY,
  },
  sizeContainerSelected: {
    backgroundColor: config.color.GRAY,
    borderWidth: 2,
    borderColor: config.color.ORANGE,
  },
  sizeTextSelected: {
    color: config.color.ORANGE,
  },
  sizeContainerNotSelected: {
    backgroundColor: config.color.GRAY,
    borderWidth: 2,
    borderColor: config.color.GRAY,
  },
  sizeTextNotSelected: {
    color: config.color.MD_GRAY,
  },
  textColor: {
    color: config.color.ORANGE,
  },
  addToCartContainer: {
    backgroundColor: config.color.ORANGE,
  },
});
