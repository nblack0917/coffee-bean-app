import { StyleSheet, Text, TextInput, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import config from "../config";
import { Button, Icon } from "@rneui/themed";
import sanityClient from "../sanity";

import { auth } from "../firebase";
import HeaderBar from "../components/HeaderBar";
import CategoryRow from "../components/CategoryRow";
import ProductRow from "../components/ProductRow";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../feautures/userSlice";
import { selectCategory } from "../feautures/categorySlice";
import { categoryDrinkFilter } from "../utils/drinks/categoryDrinkFilter";
import {
  selectBeans,
  selectDrinks,
  setAllDrinks,
  setAllBeans,
} from "../feautures/drinksSlice";

const HomeTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // const [allDrinks, setAllDrinks] = useState([]);
  const [categoryDrinks, setCategoryDrinks] = useState([]);
  // const [allBeans, setAllBeans] = useState([]);

  const category = useSelector(selectCategory);
  const allDrinks = useSelector(selectDrinks);
  const allBeans = useSelector(selectBeans);
  const dispatch = useDispatch();

  useEffect(() => {
    sanityClient
      .fetch(
        `
        *[_type == 'drinks'] {
            ...,
            sizes[]-> {
              ...,
            },
              ingredients[]-> {
              ...,
              },
              addons[]-> {
                ...,
              },
              roast[]-> {
                ...,
              },
              type-> {
                name
              }    
        }
        `
      )
      .then((data) => {
        dispatch(setAllDrinks(data));
      });

    sanityClient
      .fetch(
        `
        *[_type == 'beans'] {
            ...,
            sizes[]-> {
              ...,
            },
              ingredients[]-> {
              ...,
              },
              addons[]-> {
                ...,
              },
              roast[]-> {
                ...,
              },
              type-> {
                name
              }    
        }
        `
      )
      .then((data) => {
        dispatch(setAllBeans(data));
      });
  }, []);

  useEffect(() => {
    if (allDrinks && category === "All") {
      setCategoryDrinks(allDrinks);
    } else {
      const selectDrinks = categoryDrinkFilter(allDrinks, category);
      setCategoryDrinks(selectDrinks);
    }
  }, [allDrinks, category]);

  return (
    <View style={styles.container}>
      {/* <StatusBar style="light" /> */}
      <HeaderBar />
      <View className="w-1/2 ml-6 my-8">
        <Text className="text-white font-semibold text-3xl leading-10">
          Find your new favorite coffee
        </Text>
      </View>
      <View className="flex-1 items-center">
        <View
          style={styles.inputContainer}
          className="flex-row items-center justify-start"
        >
          <Icon
            name="search"
            type="font-awesome"
            size={22}
            color={config.color.MD_GRAY}
          />
          <TextInput
            placeholder="Find your coffee..."
            style={styles.input}
            placeholderTextColor={config.color.MD_GRAY}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
          />
        </View>
        <ScrollView className="mt-6">
          <CategoryRow />
          <ProductRow hasRating={true} products={categoryDrinks} />
          <Text className="pl-6 text-white mt-6 text-xl">Coffee beans</Text>
          <ProductRow hasRating={false} products={allBeans} />
          <View className="py-10" />
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeTab;

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
