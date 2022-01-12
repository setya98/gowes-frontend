import React from "react";
import { View, Dimensions, TouchableWithoutFeedback } from "react-native";

import ProductCardSeller from "./ProductCardSeller";

var { width } = Dimensions.get("window");

const ProductListSeller = (props) => {
  const { item, refetchItems } = props;
  // console.log("list props", props)

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        props.navigation.navigate("Product Detail", { item: item })
      }
    >
    <View style={{ flexDirection: "column", width: width / 2, backgroundColor: "white" }}>
        <ProductCardSeller 
          item={item}
          navigation={props.navigation}
          refetchItems={refetchItems}
        />
    </View>
    </TouchableWithoutFeedback>
  );
};

export default ProductListSeller;
