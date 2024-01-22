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
import {
  addToCheckout,
  removeFromCart,
  selectCartItems,
  selectCartTotal,
} from "../feautures/cartSlice";
import { urlFor } from "../sanity";
import { addCents, priceAdjuster } from "../utils/drinks/priceAdjuster";
import CartCard from "../components/CartCard";
import uuid from "react-native-uuid";
import EmptyCart from "../components/EmptyCart";

const CartTab = ({ navigation }) => {
  const [groupedItems, setGroupedItems] = useState([]);
  const cart = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  const dispatch = useDispatch();

  const calculateTax = () => {
    const tax = cartTotal * 0.0825;
    return tax;
  };

  const handleCheckout = () => {
    const newCheckout = {
      id: uuid.v4(),
      items: cart,
      subtotal: cartTotal,
      tax: Number(addCents(calculateTax())),
      total: Number(addCents(calculateTax() + cartTotal)),
      paymentMethod: null,
      last4Digits: null,
      paymentStatus: null,
      timestamp: null,
    };
    dispatch(
      addToCheckout({
        checkout: newCheckout,
      })
    );
    navigation.navigate("Payment");
  };

  useMemo(() => {
    const grouped = cart.reduce((results, item) => {
      (results[item.product._id] = results[item.product._id] || []).push(item);
      return results;
    }, {});

    setGroupedItems(grouped);
  }, [cart]);

  // console.log("total", cartTotal);

  return (
    <View style={styles.container} className="flex-1">
      <HeaderBar />
      {cart.length > 0 ? (
        <>
          <ScrollView className="divide-y divide-gray-200 mt-3">
            {Object.entries(groupedItems).map(([key, items]) => (
              <CartCard key={key} cartItems={items} />
            ))}
          </ScrollView>
          <View className="px-4 my-4">
            <View className="flex-row items-center">
              <View className="mr-3">
                <Text className="text-white text-center font-light">
                  Subtotal
                </Text>
                <View className="flex-row items-center">
                  <Text
                    style={styles.textColor}
                    className="font-bold text-lg pr-1"
                  >
                    $
                  </Text>
                  <Text className="font-bold text-lg text-white">
                    {addCents(cartTotal)}
                  </Text>
                </View>
              </View>
              <Text className="text-lg pr-2" style={styles.textColor}>
                +
              </Text>
              <View className="mr-3">
                <Text className="text-white text-center font-light">Tax</Text>
                <View className="flex-row items-center">
                  <Text
                    style={styles.textColor}
                    className="font-bold text-lg pr-1"
                  >
                    $
                  </Text>
                  <Text className="font-bold text-lg text-white">
                    {addCents(calculateTax())}
                  </Text>
                </View>
              </View>
              <Text className="text-lg pr-2" style={styles.textColor}>
                =
              </Text>
              <View className="">
                <Text className="text-white text-center font-light">Total</Text>
                <View className="flex-row items-center">
                  <Text
                    style={styles.textColor}
                    className="font-bold text-lg pr-1"
                  >
                    $
                  </Text>
                  <Text className="font-bold text-lg text-white">
                    {addCents(calculateTax() + cartTotal)}
                  </Text>
                </View>
              </View>
              <View className="flex-1 ml-4 mr-2">
                <TouchableOpacity
                  style={styles.checkoutContainer}
                  className="py-4 rounded-3xl"
                  onPress={handleCheckout}
                >
                  <Text className="text-white font-semibold text-xl text-center">
                    Checkout
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
      ) : (
        <>
          <EmptyCart />
        </>
      )}
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
  checkoutContainer: {
    backgroundColor: config.color.ORANGE,
  },
});
