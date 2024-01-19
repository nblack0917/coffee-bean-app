import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ProductCard from "./ProductCard";

const ProductRow = ({ products, hasRating }) => {
  return (
    <View className="w-full flex-row items-center px-6 mt-6">
      <ScrollView horizontal>
        {products?.map((product) => (
          <ProductCard
            key={product._id}
            hasRating={hasRating}
            product={product}
          />
        ))}
        {/* <ProductCard hasRating={hasRating} />
        <ProductCard hasRating={hasRating} />
        <ProductCard hasRating={hasRating} />
        <ProductCard hasRating={hasRating} />
        <ProductCard hasRating={hasRating} />
        <ProductCard hasRating={hasRating} />
        <ProductCard hasRating={hasRating} /> */}
      </ScrollView>
    </View>
  );
};

export default ProductRow;

const styles = StyleSheet.create({});
