import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import config from "../config";
import { StatusBar } from "expo-status-bar";
import { Button, Input } from "@rneui/themed";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { signIn } from "../utils/auth/signIn";
import { useDispatch } from "react-redux";

import {
  setFavorites,
  setPaymentMethods,
  setUser,
} from "../feautures/userSlice";
import { getFavorites } from "../utils/user/getFavorites";
import { updatePayments } from "../utils/auth/updatePayment";
import { getPaymentMethods } from "../utils/user/getPaymentMethods";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     const newUser = {
  //       id: user.uid,
  //       name: user.displayName,
  //       email: user.email,
  //       photoURL: user.photoURL,
  //       favorites: [],
  //     };
  //     // console.log("user", user);
  //     dispatch(
  //       setUser({
  //         id: user.uid,
  //         name: user.displayName,
  //         email: user.email,
  //         photoURL: user.photoURL,
  //         favorites: [],
  //       })
  //     );
  //     const faves = getFavorites(newUser);
  //     dispatch(setFavorites(faves));
  //     navigation.replace("Home");
  //   }
  // });

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoading(true);
        const newUser = {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          favorites: [],
          paymentMethods: [],
          orderHistory: [],
        };
        dispatch(setUser(newUser));
        const faves = await getFavorites(newUser);
        dispatch(setFavorites(faves));
        const methods = await getPaymentMethods(newUser);
        dispatch(setPaymentMethods(methods));
        // updatePayments(newUser);
        navigation.replace("Home");
      }
    });
    return subscriber; // unsubscribe on unmount
  }, [auth]);

  return (
    <SafeAreaView
      style={styles.container}
      className="flex-1 items-center justify-center"
    >
      <StatusBar style="light" />
      <Image
        source={require("../assets/coffeeBeansLogo.png")}
        resizeMode="contain"
        style={{ width: 100, height: 100 }}
      />
      <Text className="mb-16 font-extrabold text-5xl" style={styles.logo}>
        Coffee Beans
      </Text>
      <TextInput
        placeholder="Email Address"
        style={styles.input}
        placeholderTextColor={config.color.LT_GRAY}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        placeholderTextColor={config.color.LT_GRAY}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity
        className="w-7/12 p-5 rounded-3xl"
        style={styles.button}
        activeOpacity={0.5}
        onPress={() => signIn(email, password)}
      >
        <View className="flex-grow items-center">
          <Text className="text-white text-xl font-semibold">
            {loading ? (
              <ActivityIndicator size="large" color="#ffffff" />
            ) : (
              "Login"
            )}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        className="mt-10 w-7/12"
        activeOpacity={0.5}
        onPress={() => navigation.navigate("Registration")}
      >
        <View className="flex-grow items-center">
          <Text className="text-white text-xl">Create new account</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: config.color.BLACK,
  },
  button: {
    backgroundColor: config.color.ORANGE,
  },
  input: {
    width: "90%",
    backgroundColor: config.color.GRAY,
    borderRadius: 100,
    height: 55,
    color: config.color.LT_GRAY,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  logo: {
    color: config.color.BROWN,
  },
});
