import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCategory, setCategory } from "../feautures/categorySlice";
import config from "../config";
import sanityClient, { urlFor } from "../sanity";

const CategoryRow = () => {
  const [categories, setCategories] = useState([]);

  const category = useSelector(selectCategory);
  const dispatch = useDispatch();

  useEffect(() => {
    sanityClient
      .fetch(
        `
  *[_type == 'category']
`
      )
      .then((data) => setCategories([{ name: "All", _id: "All" }, ...data]));
  }, []);

  const CategoryCard = ({ title }) => {
    const isCurrent = category === title;
    return (
      <TouchableOpacity
        className="flex items-center"
        onPress={() => dispatch(setCategory(title))}
      >
        <Text
          style={isCurrent ? styles.selected : styles.notSelected}
          className="pr-4"
        >
          {title}
        </Text>
        <View
          className="w-2 h-2 rounded-full mr-4 mt-2"
          style={isCurrent && styles.selectedDot}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View className="w-full flex-row items-center px-6">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories?.map((category) => (
          <CategoryCard key={category._id} title={category.name} />
        ))}
        {/* <TouchableOpacity className="flex items-center">
          <Text style={styles.selected} className="pr-4">
            All
          </Text>
          <View
            className="w-2 h-2 rounded-full mr-4 mt-2"
            style={styles.selectedDot}
          />
        </TouchableOpacity>
        <TouchableOpacity className="flex items-center">
          <Text style={styles.notSelected} className="pr-4">
            Americano
          </Text>
          <View className="w-2 h-2 rounded-full mr-4 mt-2" />
        </TouchableOpacity>
        <TouchableOpacity className="flex items-center">
          <Text style={styles.notSelected} className="pr-4">
            Drip Coffee
          </Text>
          <View className="w-2 h-2 rounded-full mr-4 mt-2" />
        </TouchableOpacity>
        <TouchableOpacity className="flex items-center">
          <Text style={styles.notSelected} className="pr-4">
            Cappucchino
          </Text>
          <View className="w-2 h-2 rounded-full mr-4 mt-2" />
        </TouchableOpacity>
        <TouchableOpacity className="flex items-center">
          <Text style={styles.notSelected} className="pr-4">
            Expresso
          </Text>
          <View className="w-2 h-2 rounded-full mr-4 mt-2" />
        </TouchableOpacity>
        <TouchableOpacity className="flex items-center">
          <Text style={styles.notSelected} className="pr-4">
            Tea
          </Text>
          <View className="w-2 h-2 rounded-full mr-4 mt-2" />
        </TouchableOpacity> */}
      </ScrollView>
    </View>
  );
};

export default CategoryRow;

const styles = StyleSheet.create({
  selected: {
    color: config.color.ORANGE,
  },
  notSelected: {
    color: config.color.MD_GRAY,
  },
  selectedDot: {
    backgroundColor: config.color.ORANGE,
  },
});
