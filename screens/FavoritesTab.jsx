import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import config from "../config";
import HeaderBar from "../components/HeaderBar";
import { useSelector } from "react-redux";
import { selectUser } from "../feautures/userSlice";
import FavoriteCard from "../components/FavoriteCard";
import { selectBeans, selectDrinks } from "../feautures/drinksSlice";

const FavoritesTab = () => {
  const [favoriteDrinks, setFavoriteDrinks] = useState([]);
  const [favoriteBeans, setFavoriteBeans] = useState([]);

  const user = useSelector(selectUser);
  const allDrinks = useSelector(selectDrinks);
  const allBeans = useSelector(selectBeans);

  useEffect(() => {
    if (user && allDrinks && allBeans) {
      let favDrinks = [];
      let favBeans = [];
      user.favorites.forEach((fav) => {
        const index = allDrinks.findIndex((item) => item._id === fav);
        if (index >= 0) {
          favDrinks.push(allDrinks[index]);
        }
      });
      user.favorites.forEach((fav) => {
        const index = allBeans.findIndex((item) => item._id === fav);
        if (index >= 0) {
          favBeans.push(allBeans[index]);
        }
      });
      favDrinks.length > 0 && setFavoriteDrinks(favDrinks);
      favBeans.length > 0 && setFavoriteBeans(favBeans);
    }
  }, [user]);

  console.log(user.favorites);

  return (
    <View style={styles.container} className="flex-1">
      <HeaderBar />
      <ScrollView className="mt-6">
        {favoriteDrinks?.map((favorite) => (
          <FavoriteCard key={favorite._id} favorite={favorite} />
        ))}
        {favoriteBeans?.map((favorite) => (
          <FavoriteCard key={favorite._id} favorite={favorite} />
        ))}
      </ScrollView>
    </View>
  );
};

export default FavoritesTab;

const styles = StyleSheet.create({
  container: {
    backgroundColor: config.color.BLACK,
  },
});
