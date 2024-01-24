import { Image, StyleSheet, Text, View } from "react-native";
import React, { useMemo, useState } from "react";
import config from "../config";
import { LinearGradient } from "expo-linear-gradient";
import { urlFor } from "../sanity";
import { addCents } from "../utils/drinks/priceAdjuster";
import HistorySizeCard from "./HistorySizeCard";

const HistoryCard = ({ order }) => {
  const [groupedItems, setGroupedItems] = useState({});
  const [groupedSizes, setGroupedSizes] = useState({});

  useMemo(() => {
    const grouped = order.items.reduce((results, item) => {
      (results[item.product._id] = results[item.product._id] || []).push(item);
      return results;
    }, {});

    setGroupedItems(grouped);
  }, [order]);

  const getTotalItemPrice = (items) => {
    let finalTotal = 0;
    items.forEach((item) => {
      finalTotal = finalTotal + item.price * item.quantity;
    });
    return finalTotal;
  };

  const orderID = order.id.substr(order.id.length - 12);
  return (
    <View style={styles.container} className="rounded-2xl p-3 mb-6">
      <View className="w-full items-center flex-row justify-between mb-2">
        <View>
          <Text className="text-white text-sm font-semibold">Order #</Text>
          <Text className="text-white text-sm font-light">
            {orderID.toUpperCase()}
          </Text>
        </View>
        <View className="items-end">
          <Text className="text-white text-sm font-semibold">Order Date</Text>
          <Text className="text-white text-sm font-light">
            {new Date(order.timestamp).toLocaleString()}
          </Text>
        </View>
      </View>
      <View className="w-full items-center flex-row justify-between">
        <View>
          <Text className="text-white text-sm font-semibold">Payment</Text>
          <View className="flex-row items-center justify-start">
            <Text className="text-white text-sm font-light">
              {order.paymentMethod}
            </Text>
            {order.last4Digits && (
              <Text className="text-white text-sm font-light">
                {` ending in ${order.last4Digits}`}
              </Text>
            )}
          </View>
        </View>
        <View className="items-end">
          <Text className="text-white text-sm font-semibold">Total Amount</Text>
          <Text className="text-sm font-light" style={styles.textColor}>
            {`$  ${addCents(order.total)}`}
          </Text>
        </View>
      </View>
      {Object.entries(groupedItems).map(([key, items]) => (
        <LinearGradient
          key={key}
          colors={[config.color.GRAY, "#181e29"]}
          className="w-full rounded-3xl items-center justify-between px-6 pt-5 mt-4"
          // start={{ x: 0.4, y: 0.4 }}
          // end={{ x: 1, y: 1 }}
        >
          <View className="flex-row items-center justify-between w-full">
            <View className="flex-row items-center">
              <Image
                source={{ uri: urlFor(items[0].product.image).url() }}
                style={{ width: 50, height: 50 }}
                className="rounded-xl"
              />
              <View className="pl-4">
                <Text className="text-white font-light text-lg">
                  {items[0].product.name}
                </Text>
                <Text className="text-white font-light text-xs">
                  {items[0].product.subtext}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center">
              <Text style={styles.textColor} className="font-bold text-lg pr-1">
                $
              </Text>
              <Text className="font-bold text-lg text-white">
                {addCents(getTotalItemPrice(items))}
              </Text>
            </View>
          </View>
          <View className="mt-4 w-full">
            <HistorySizeCard items={items} />
          </View>
        </LinearGradient>
      ))}
      <View className="flex-row items-center justify-end mt-3 mr-2">
        <View className="mr-3">
          <Text className="text-white text-center font-light">Subtotal</Text>
          <View className="flex-row items-center">
            <Text style={styles.textColor} className="font-bold text-lg pr-1">
              $
            </Text>
            <Text className="font-bold text-lg text-white">
              {addCents(order.subtotal)}
            </Text>
          </View>
        </View>
        <Text className="text-lg pr-2" style={styles.textColor}>
          +
        </Text>
        <View className="mr-3">
          <Text className="text-white text-center font-light">Tax</Text>
          <View className="flex-row items-center">
            <Text style={styles.textColor} className="font-bold text-lg pr-1">
              $
            </Text>
            <Text className="font-bold text-lg text-white">
              {addCents(order.tax)}
            </Text>
          </View>
        </View>
        <Text className="text-lg pr-2" style={styles.textColor}>
          =
        </Text>
        <View className="">
          <Text className="text-white text-center font-light">Total</Text>
          <View className="flex-row items-center">
            <Text style={styles.textColor} className="font-bold text-lg pr-1">
              $
            </Text>
            <Text className="font-bold text-lg text-white">
              {addCents(order.total)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HistoryCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: config.color.GRAY,
  },
  textColor: {
    color: config.color.ORANGE,
  },
});
