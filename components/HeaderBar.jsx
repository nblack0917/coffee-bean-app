import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Avatar, Icon } from "@rneui/themed";

import { auth } from "../firebase";
import config from "../config";
import { useSelector } from "react-redux";
import { selectCartItems } from "../feautures/cartSlice";

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

  const cart = useSelector(selectCartItems);

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
      ) : route.name === "Payment" ? (
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
                {cart.length > 0 && route.name !== "Payment" && (
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
                      {cart.length}
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
