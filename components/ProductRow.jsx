import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ProductCard from "./ProductCard";

const ProductRow = ({ products, hasRating }) => {
  return (
    <View className="w-full flex-row items-center px-6 mt-6">
      {/* <FlatList
        data={products}
        horizontal
        renderItem={({ item }) => (
          <ProductCard key={item._id} hasRating={hasRating} product={item} />
        )}
        keyExtractor={(item) => item._id}
      /> */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {products?.map((product) => (
          <ProductCard
            key={product._id}
            hasRating={hasRating}
            product={product}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ProductRow;

const styles = StyleSheet.create({});
