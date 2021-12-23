import React from "react";
import { View, Dimensions, TouchableWithoutFeedback } from "react-native";

import ProductCard from "./ProductCard";

var { width } = Dimensions.get("window");

const ProductList = (props) => {
  const { item } = props;
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        props.navigation.navigate("Product Detail", { item: item })
      }
    >
      <View style={{ width: width / 2, backgroundColor: "white" }}>
        <ProductCard {...item} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProductList;
