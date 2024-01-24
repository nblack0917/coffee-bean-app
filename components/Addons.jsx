import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "@rneui/themed";
import { addCents } from "../utils/drinks/priceAdjuster";

const Addons = ({ item, handleAddOption, handleRemoveOption, options }) => {
  const [optionCount, setOptionCount] = useState(0);

  useEffect(() => {
    if (options.length > 0) {
      let currOptions = [...options];
      const index = currOptions.findIndex((option) => item._id === option._id);
      if (index >= 0) {
        const quantity = currOptions[index].quantity;
        setOptionCount(quantity);
      } else {
        setOptionCount(0);
      }
    } else {
      setOptionCount(0);
    }
  }, [options]);

  return (
    <View className="flex-row items-center w-full py-1">
      <View className="flex-row items-center justify-between w-40">
        <Text className="text-white">{item.name}</Text>
        <Text className="text-white text-right ">
          {item.price === 0 ? "Free" : `$ ${addCents(item.price)}`}
        </Text>
      </View>
      <View className="flex-1 flex-row items-center justify-between ml-10">
        <TouchableOpacity
          className="p-2 rounded-xl"
          style={styles.incrementWrapper}
          onPress={() => handleRemoveOption(item)}
        >
          <Icon name="minus" type="font-awesome-5" size={18} color="white" />
        </TouchableOpacity>
        <View className="px-5 py-2 rounded-xl" style={styles.numberWrapper}>
          <Text className="text-white">{optionCount}</Text>
        </View>
        <TouchableOpacity
          className="p-2 rounded-xl"
          style={styles.incrementWrapper}
          onPress={() => handleAddOption(item)}
        >
          <Icon name="plus" type="font-awesome-5" size={18} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Addons;

const styles = StyleSheet.create({
  textColor: {
    color: config.color.ORANGE,
  },
  incrementWrapper: {
    backgroundColor: config.color.ORANGE,
  },
  numberWrapper: {
    backgroundColor: config.color.BLACK,
    borderWidth: 1,
    borderColor: config.color.ORANGE,
  },
});
