import { StyleSheet, Text, View } from "react-native";
import React, { useMemo, useState } from "react";
import uuid from "react-native-uuid";
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

  return (
    <View>
      {items.map((item) => (
        <View className="pb-4">
          <View
            className="flex-row w-full items-center justify-between"
            key={uuid.v4()}
          >
            <View className="flex-row items-center">
              <View
                className="px-3 h-10 w-20 rounded-l-xl items-center justify-center"
                style={styles.leftWrapper}
              >
                <Text className="text-white">{item.size}</Text>
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
                    {addCents(item.price)}
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
                  {item.quantity}
                </Text>
              </View>
            </View>
            <View></View>
            <View>
              <Text style={styles.textColor} className="text-xl">
                {addCents(item.price * item.quantity)}
              </Text>
            </View>
          </View>
          {item.options?.length > 0 && (
            <View className="w-full pt-2 items-center">
              {item.options.map((item) => (
                <View
                  key={uuid.v4()}
                  className="w-1/2 flex-row justify-center items-center pl-2 pr-3"
                >
                  <View className="w-full flex-row justify-between items-center">
                    <Text className="text-white font-light">{item.name}</Text>
                    <View className="flex-row items-center">
                      <Text
                        style={styles.textColor}
                        className="font-light text-sm px-2"
                      >
                        X
                      </Text>
                      <Text className="text-white font-light">
                        {item.quantity}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}
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
