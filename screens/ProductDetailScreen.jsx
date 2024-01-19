import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import config from "../config";
import { urlFor } from "../sanity";
import HeaderBar from "../components/HeaderBar";

const ProductDetailScreen = () => {
  const {
    params: { product },
  } = useRoute();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <HeaderBar style={styles.headerBar} />
        <Image
          source={{ uri: urlFor(product.image).url() }}
          style={styles.image}
        />
        <View
          className="absolute bottom-0 flex-1 w-full rounded-t-3xl pt-4 flex-row"
          style={styles.detailContainer}
        >
          <View className="pl-4 pb-3">
            <Text className="text-white font-semibold text-2xl mb-1">
              {product.name}
            </Text>
            <Text className="text-white text-sm font-extralight">
              {product.subtext}
            </Text>
            <View>
              <Text className="text-white font-semibold">{product.rating}</Text>
            </View>
          </View>
          <View>
            <View>
              <View></View>
            </View>
            <View></View>
          </View>
        </View>
      </View>
      <ScrollView></ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: config.color.BLACK,
    flex: 1,
  },
  topWrapper: {
    position: "relative",
    flex: 1,
    height: 550,
  },
  image: {
    width: "100%",
    height: 550,
    resizeMode: "cover",
    zIndex: 0,
  },
  headerBar: {
    position: "absolute",
    zIndex: 50,
    top: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  detailContainer: {
    backgroundColor: "rgba(19, 24, 33, 0.5)",
  },
});
