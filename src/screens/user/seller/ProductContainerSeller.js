import React, { useContext, useEffect, useState } from "react";
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
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../../../context/auth";
import { FETCH_ITEM_SELLER_QUERY } from "../../../util/graphql";

var { height, width } = Dimensions.get("window");

const ProductContainerSeller = (props) => {
  const context = useContext(AuthContext)

  const { loading, data, refetch } = useQuery(FETCH_ITEM_SELLER_QUERY, {
    variables: {
      userId: context.user.id
    }
  })

  const { getSellerItems: sellerItems } = data ? data : [];

  // console.log("ini item seller", sellerItems)

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
          onPress={() => props.navigation.navigate("Add Product", {
            refetchItems: refetch
          })}
        />
      </View>
        <View style={styles.listContainer}>
          { sellerItems &&
            sellerItems.map((item, index) => (
            <ProductListSeller
              navigation={props.navigation}
              key={index}
              item={item}
              refetchItems={refetch}
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
