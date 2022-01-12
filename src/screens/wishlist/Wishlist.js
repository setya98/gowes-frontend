import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  Image,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Card } from "react-native-paper";

import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../../context/auth";
import { FETCH_BOOKMARKS_QUERY } from "../../util/graphql";

import ProductList from "../products/ProductList";

const Wishlist = (props) => {
  const context = useContext(AuthContext);
  console.log(context);

  const { loading, data, refetch } = useQuery(FETCH_BOOKMARKS_QUERY, {
    variables: {
      userId: context.user.id,
    },
  });

  const { getBookmarks: wishlist } = data ? data : [];

  console.log(wishlist);

  return (
    <>
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
            Wishlist
          </Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 130,
          }}
        >
          {!loading ? (
            wishlist.length > 0 ? (
              <View style={styles.listContainer}>
                {wishlist &&
                  wishlist.map((item, index) => (
                    <TouchableWithoutFeedback>
                      <ProductList
                        key={index}
                        item={item}
                        navigation={props.navigation}
                      />
                    </TouchableWithoutFeedback>
                  ))}
              </View>
            ) : (
              <Card.Content style={{height: "100%"}}>
                <Image
                  source={require("../../assets/illus-wishlist.webp")}
                  resizeMode="contain"
                  style={{
                    width: 250,
                    height: 250,
                    alignSelf: "center",
                    marginTop: "15%",
                  }}
                />
                <Text
                  style={{
                    alignSelf: "center",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  Kamu belum punya wishlist
                </Text>
              </Card.Content>
            )
          ) : (
              <ActivityIndicator
                style={{
                  justifyContent: "center",
                  alignSelf: "center",
                  marginTop: "50%",
                }}
                size="large"
                color="#000"
              />
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    height: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "#fff",
    marginTop: 15,
  },
  header: {
    margin: 15,
    flexDirection: "row",
    backgroundColor: "#fff",
  },
});
export default Wishlist;
