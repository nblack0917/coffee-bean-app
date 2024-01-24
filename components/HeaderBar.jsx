import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Avatar, Icon } from "@rneui/themed";

import { auth } from "../firebase";
import config from "../config";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  selectCartItemNumber,
  selectCartItems,
} from "../feautures/cartSlice";

const defaultURL =
  "https://firebasestorage.googleapis.com/v0/b/coffee-bean-app.appspot.com/o/profileCupPlaceholder.png?alt=media&token=00b42fb6-0973-4186-987e-fbd8777a1c90";

const HeaderBar = ({
  style,
  isFavorite,
  addToFavorites,
  removeFromFavorites,
}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const cart = useSelector(selectCartItems);

  const cartItemNumber = useSelector(selectCartItemNumber);

  const signOutUser = () => {
    auth.signOut().then(() => navigation.replace("Login"));
  };

  const handleAddToFavorites = () => {
    addToFavorites();
  };
  const handleRemoveFromFavorites = () => {
    removeFromFavorites();
  };

  return (
    <>
      {route.name === "HomeTab" || route.name === "Favorites" ? (
        <View
          // style={style}
          className="flex-row items-center justify-between mx-6 mt-5"
        >
          <>
            <TouchableOpacity onPress={signOutUser}>
              <Icon
                name="logout"
                type="material-community"
                size={32}
                color={config.color.LT_GRAY}
              />
            </TouchableOpacity>
            {route.name !== "HomeTab" && (
              <Text className="text-white font-bold text-2xl tracking-widest">
                {route.name}
              </Text>
            )}
            <Avatar
              rounded
              source={{ uri: auth.currentUser?.photoURL ?? defaultURL }}
            />
          </>
        </View>
      ) : route.name === "Cart" ? (
        <View
          // style={style}
          className="flex-row items-center justify-between mx-6 mt-5"
        >
          <>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="rounded-2xl p-0.5"
              style={styles.backContainer}
            >
              <Icon
                name="chevron-left"
                type="material-community"
                size={32}
                color={config.color.MD_GRAY}
              />
            </TouchableOpacity>
            {route.name !== "HomeTab" && (
              <>
                {route.name === "Cart" ? (
                  <Text className="text-white font-bold text-2xl tracking-widest -mr-8">
                    {route.name}
                  </Text>
                ) : (
                  <Text className="text-white font-bold text-2xl tracking-widest">
                    {route.name}
                  </Text>
                )}
              </>
            )}
            <View className="flex-row items-center justify-end">
              <TouchableOpacity
                onPress={() => dispatch(clearCart())}
                className="mr-4"
              >
                <Icon
                  name="trash-alt"
                  type="font-awesome-5"
                  size={28}
                  color={config.color.ORANGE}
                />
              </TouchableOpacity>
              <Avatar
                rounded
                source={{ uri: auth.currentUser?.photoURL ?? defaultURL }}
              />
            </View>
          </>
        </View>
      ) : route.name === "Payment" || route.name === "Order History" ? (
        <View
          // style={style}
          className="flex-row items-center justify-between mx-6 mt-5"
        >
          <>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="rounded-2xl p-0.5"
              style={styles.backContainer}
            >
              <Icon
                name="chevron-left"
                type="material-community"
                size={32}
                color={config.color.MD_GRAY}
              />
            </TouchableOpacity>
            {route.name !== "HomeTab" && (
              <Text className="text-white font-bold text-2xl tracking-widest">
                {route.name}
              </Text>
            )}
            <Avatar
              rounded
              source={{ uri: auth.currentUser?.photoURL ?? defaultURL }}
            />
          </>
        </View>
      ) : (
        <View className="absolute top-12 w-full z-50">
          <View className="flex-row items-center justify-between mx-6 mt-5">
            <>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="rounded-2xl p-0.5"
                style={styles.backContainer}
              >
                <Icon
                  name="chevron-left"
                  type="material-community"
                  size={32}
                  color={config.color.MD_GRAY}
                />
              </TouchableOpacity>
              <View className="flex-row items-center">
                {cartItemNumber > 0 && route.name !== "Payment" && (
                  <TouchableOpacity
                    className="items-center justify-center rounded-full mr-4 relative"
                    // style={styles.cartContainer}
                    onPress={() => navigation.navigate("Cart")}
                  >
                    <Icon
                      name="shopping-cart"
                      type="font-awesome-5"
                      size={38}
                      color={config.color.ORANGE}
                    />
                    <Text className="text-white font-light text-sm absolute top-1 right-3 text-center">
                      {cartItemNumber}
                    </Text>
                  </TouchableOpacity>
                )}
                {isFavorite ? (
                  <TouchableOpacity
                    onPress={handleRemoveFromFavorites}
                    className="rounded-2xl p-2"
                    style={styles.backContainer}
                  >
                    <Icon
                      name="heart"
                      type="ionicon"
                      size={22}
                      color={config.color.RED}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={handleAddToFavorites}
                    className="rounded-2xl p-2"
                    style={styles.backContainer}
                  >
                    <Icon
                      name="heart"
                      type="ionicon"
                      size={22}
                      color={config.color.MD_GRAY}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </>
          </View>
        </View>
      )}
    </>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  backContainer: {
    backgroundColor: config.color.GRAY,
    borderColor: config.color.MD_GRAY,
    borderWidth: 2,
  },
  cartContainer: {
    backgroundColor: config.color.ORANGE,
  },
});
