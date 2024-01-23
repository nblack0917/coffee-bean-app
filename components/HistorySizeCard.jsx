import { StyleSheet, Text, View } from "react-native";
import React, { useMemo, useState } from "react";
import config from "../config";
import { addCents } from "../utils/drinks/priceAdjuster";

const HistorySizeCard = ({ items }) => {
  const [groupedSizes, setGroupedSizes] = useState([]);

  useMemo(() => {
    const grouped = items.reduce((results, item) => {
      (results[item.size] = results[item.size] || []).push(item);
      return results;
    }, {});

    setGroupedSizes(grouped);
  }, [items]);

  //   console.log(groupedSizes);
  return (
    <View>
      {Object.entries(groupedSizes).map(([key, size]) => (
        <View
          className="flex-row w-full items-center justify-between pb-5"
          key={`${key}${size}`}
        >
          <View className="flex-row items-center">
            <View
              className="px-3 h-10 w-20 rounded-l-xl items-center justify-center"
              style={styles.leftWrapper}
            >
              <Text className="text-white">{key}</Text>
            </View>
            <View
              className="px-3 h-10 w-24 rounded-r-xl items-center justify-center"
              style={styles.wrapper}
            >
              <View className="flex-row items-center">
                <Text
                  style={styles.textColor}
                  className="font-bold text-lg pr-1"
                >
                  $
                </Text>
                <Text className="font-bold text-lg text-white">
                  {addCents(size[0].price)}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center pl-4">
              <Text
                style={styles.textColor}
                className="font-semibold text-lg pr-2"
              >
                X
              </Text>
              <Text className="font-bold text-lg text-white">
                {size.length}
              </Text>
            </View>
          </View>
          <View></View>
          <View>
            <Text style={styles.textColor} className="text-xl">
              {addCents(size[0].price * size.length)}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default HistorySizeCard;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: config.color.BLACK,
  },
  leftWrapper: {
    backgroundColor: config.color.BLACK,
    borderRightWidth: 3,
    borderRightColor: config.color.GRAY,
  },
  textColor: {
    color: config.color.ORANGE,
  },
});
