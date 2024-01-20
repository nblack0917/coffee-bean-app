import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useMemo, useState } from "react";
import config from "../config";
import HeaderBar from "../components/HeaderBar";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, selectCartItems } from "../feautures/cartSlice";
import { urlFor } from "../sanity";
import { addCents, priceAdjuster } from "../utils/drinks/priceAdjuster";
import CartCard from "../components/CartCard";

const CartTab = () => {
  const [groupedItems, setGroupedItems] = useState([]);
  const cart = useSelector(selectCartItems);

  const dispatch = useDispatch();

  useMemo(() => {
    const grouped = cart.reduce((results, item) => {
      (results[item.product._id] = results[item.product._id] || []).push(item);
      return results;
    }, {});

    setGroupedItems(grouped);
  }, [cart]);

  console.log(groupedItems);

  return (
    <View style={styles.container} className="flex-1">
      <HeaderBar />
      <ScrollView className="divide-y divide-gray-200 ">
        {Object.entries(groupedItems).map(([key, items]) => (
          <CartCard key={key} cartItems={items} />
        ))}
      </ScrollView>
    </View>
  );
};

export default CartTab;

const styles = StyleSheet.create({
  container: {
    backgroundColor: config.color.BLACK,
  },
  textColor: {
    color: config.color.ORANGE,
  },
});
