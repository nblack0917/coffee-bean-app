import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import config from "../config";
import { useSelector } from "react-redux";
import { selectHistory, selectUser } from "../feautures/userSlice";
import HistoryCard from "../components/HistoryCard";
import HeaderBar from "../components/HeaderBar";
import NoFavorites from "../components/NoFavorites";

const HistoryTab = () => {
  const [sortedOrders, setSortedOrders] = useState([]);
  const user = useSelector(selectUser);
  const orderHistory = useSelector(selectHistory);

  useEffect(() => {
    const orderCopy = [...orderHistory];
    let sortedDates = orderCopy?.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      // console.log(new Date(a.timestamp));
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
    setSortedOrders(sortedDates);
  }, [orderHistory]);

  console.log(sortedOrders);

  return (
    <View className="flex-1" style={styles.container}>
      <HeaderBar />
      {orderHistory.length > 0 ? (
        <ScrollView className="px-3 py-6">
          {sortedOrders?.map((order) => (
            <HistoryCard key={order.id} order={order} />
          ))}
        </ScrollView>
      ) : (
        <>
          <NoFavorites />
        </>
      )}
    </View>
  );
};

export default HistoryTab;

const styles = StyleSheet.create({
  container: {
    backgroundColor: config.color.BLACK,
  },
});
