import React from "react";
import { View, Dimensions, TouchableWithoutFeedback } from "react-native";

import ProductCardSeller from "./ProductCardSeller";

var { width } = Dimensions.get("window");

const ProductListSeller = (props) => {
  const { item } = props;
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        props.navigation.navigate("Product Detail Seller", { item: item })
      }
    >
      <View style={{ width: width / 2, backgroundColor: "white" }}>
        <ProductCardSeller {...item} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProductListSeller;
