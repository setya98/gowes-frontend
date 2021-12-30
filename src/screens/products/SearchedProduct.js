import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Content, Left, Body, ListItem, Thumbnail, Text } from "native-base";

var { width } = Dimensions.get("window");

const SearchedProduct = (props) => {
  const { productsFiltered } = props;
  return (
    <Content style={{ width: width }}>
      <View>
      {productsFiltered.length > 0 ? (
        productsFiltered.map((item) => (
          <ListItem noBorder
            onPress={() => {
              props.navigation.navigate("Product Detail", { item: item });
            }}
            key={item.id}
            avatar
          >
            <Left>
              <Thumbnail
                source={{
                  uri: item.images[0].downloadUrl
                    ? item.images[0].downloadUrl
                    : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
                }}
              />
            </Left>
            <Body>
              <Text>{item.name}</Text>
            </Body>
          </ListItem>
        ))
      ) : (
        <View style={styles.center}>
          <Text style={{ alignSelf: "center" }}>No products match</Text>
        </View>
      )}
    </View>
    </Content>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
});

export default SearchedProduct;
