import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Avatar, Icon } from "@rneui/themed";

import { auth } from "../firebase";
import config from "../config";

const defaultURL =
  "https://firebasestorage.googleapis.com/v0/b/coffee-bean-app.appspot.com/o/profileCupPlaceholder.png?alt=media&token=00b42fb6-0973-4186-987e-fbd8777a1c90";

const HeaderBar = ({ style }) => {
  const navigation = useNavigation();
  const route = useRoute();

  const signOutUser = () => {
    auth.signOut().then(() => navigation.replace("Login"));
  };

  return (
    <>
      {route.name === "HomeTab" ? (
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
              <TouchableOpacity
                // onPress={() => navigation.goBack()}
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
});
