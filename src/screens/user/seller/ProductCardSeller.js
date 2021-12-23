import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { Button, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";

var { width } = Dimensions.get("window");

const ProductCardSeller = (props) => {
  const navigation = useNavigation();
  const { name, price, image } = props;

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{
          uri: image
            ? image
            : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
        }}
      />
      <View style={styles.card} />
      <Text style={styles.title}>
        {name.length > 15 ? name.substring(0, 18 - 3) + "..." : name}
      </Text>
      <Text style={styles.price}>Rp {price}</Text>
      <TouchableWithoutFeedback
         onPress={() =>
          navigation.navigate("Edit Product")}>
        <View
          style={{
            height: 35,
            flexDirection: "row",
            borderRadius: 15,
            marginBottom: 10,
            justifyContent: "center",
            backgroundColor: "#000",
            width: "100%"
          }}
        >
          <Text
            style={{
              fontWeight: "500",
              justifyContent: "center",
              marginTop: 8,
              marginLeft: 7,
              color: "#fff",
              fontSize: 16,
            }}
          >
            Edit Produk
          </Text>
          </View>
          </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 20,
    marginLeft: 15,
    marginTop: 15,
    marginRight: 15,
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  image: {
    flex: 1,
    width: width / 2 - 20 - 40,
    height: width / 2 + 5,
    backgroundColor: "transparent",
    position: "absolute",
    top: -20,
  },
  card: {
    marginBottom: 30,
    height: width / 2 - 20 - 90,
    backgroundColor: "transparent",
    width: width / 2 - 20 - 10,
  },
  title: {
    fontWeight: "500",
    fontSize: 16,
    color: "#595959",
    top: 30,
    textAlign: "left",
    alignSelf: "flex-start",
  },
  price: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
    marginTop: 35,
    marginBottom: 15,
    alignSelf: "flex-start",
  },
});

export default ProductCardSeller;
