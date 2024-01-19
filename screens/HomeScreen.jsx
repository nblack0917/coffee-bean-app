import { StyleSheet, Text, TextInput, View, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import config from "../config";
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase";
import { Button, Icon } from "@rneui/themed";
import HeaderBar from "../components/HeaderBar";
import CategoryRow from "../components/CategoryRow";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeTab from "./HomeTab";
import CartTab from "./CartTab";
import FavoritesTab from "./FavoritesTab";
import HistoryTab from "./HistoryTab";
import { useTheme } from "react-native-paper";

const HomeScreen = ({ navigation }) => {
  const Tab = createMaterialBottomTabNavigator();
  const theme = useTheme();
  theme.colors.secondaryContainer = "transperent";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Tab.Navigator
        initialRouteName="HomeTab"
        activeColor={config.color.ORANGE}
        inactiveColor={config.color.MD_GRAY}
        barStyle={{ backgroundColor: config.color.BLACK, marginBottom: -20 }}
        screenOptions={{
          tabBarLabel: false,
        }}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeTab}
          options={() => ({
            tabBarColor: "#333",
            tabBarIcon: ({ color }) => (
              <Icon name="coffee" type="font-awesome" color={color} size={26} />
            ),
          })}
        />
        <Tab.Screen
          name="Cart"
          component={CartTab}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon
                name="shopping-bag"
                type="font-awesome-5"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={FavoritesTab}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="heart" type="ionicon" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="History"
          component={HistoryTab}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon
                name="bell"
                type="material-community"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: config.color.BLACK,
  },
  inputContainer: {
    width: "90%",
    backgroundColor: config.color.GRAY,
    borderRadius: 15,
    height: 55,
    paddingHorizontal: 20,
  },
  input: {
    height: 55,
    color: config.color.LT_GRAY,
    paddingHorizontal: 20,
  },
});
