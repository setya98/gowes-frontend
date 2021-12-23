import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { FAB } from "react-native-paper";
import ProductListSeller from "./ProductListSeller";

var { height, width } = Dimensions.get("window");
const data = require("../../../assets/data/products.json");

const ProductContainerSeller = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(data);

    return () => {
      setProducts([]);
    };
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <View style={styles.header}>
        <FontAwesome
          onPress={() => props.navigation.goBack()}
          name="chevron-left"
          size={18}
          style={{ top: 4 }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            letterSpacing: 0.3,
            marginStart: 110,
          }}
        >
          Edit Profil
        </Text>
      </View>
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={1}
        contentContainerStyle={{ paddingBottom: height }}
      >
          <View
        style={{
          width: "90%",
          height: 90,
          marginTop: 15,
          marginBottom: 15,
          backgroundColor: "#f2f2f2",
          borderRadius: 15,
          marginStart: 15,
          justifyContent: "center",
        }}
      >
        <FAB
          style={styles.fab}
          medium
          icon="plus"
          onPress={() => props.navigation.navigate("Add Product")}
        />
      </View>
        <View style={styles.listContainer}>
          {products.map((item) => (
            <ProductListSeller
              navigation={props.navigation}
              key={item._id}
              item={item}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    height: height,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "white",
  },
  header: {
    margin: 15,
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  fab: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: "#000",
  },
});

export default ProductContainerSeller;
