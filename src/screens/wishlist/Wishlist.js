import React from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { Container, ListItem, Text, Thumbnail } from "native-base";
import Item from "./Item";
import Icon from "react-native-vector-icons/FontAwesome";

import { connect } from "react-redux";
import * as actionsWishlist from "../../../Redux/actions/wishlistAction";
import { TouchableOpacity } from "react-native-gesture-handler";

var { height, width } = Dimensions.get("window");

const Wishlist = (props) => {
  return (
    <>
      {props.wishlistItems.length ? (
        <SafeAreaView style={{ backgroundColor: "#fff" }}>
        <View style={styles.header}>
          <TouchableWithoutFeedback
            onPress={() => props.navigation.navigate("Home")}
          >
            <Image
              source={require("../../assets/back.png")}
              resizeMode="contain"
              style={{ width: 25, height: 30, alignSelf: "flex-end" }}
            />
          </TouchableWithoutFeedback>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#000",
              marginStart: 110
            }}
          >
            Wishlist
          </Text>
        </View>
        <ScrollView style={{backgroundColor: "#fff"}}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1}
          nestedScrollEnabled={true}
          contentContainerStyle={{ paddingBottom: 180 }}
        >
            <SwipeListView
            data={props.wishlistItems}
            renderItem={(data) => 
            <Item item={data} />
            }
            renderHiddenItem={(data) => (
              <View style={styles.hiddenContainer}>
                <TouchableOpacity
                  style={styles.hiddenButton}
                  onPress={() => props.removeFromWishlist(data.item)}
                >
                  <Icon name="trash" color={"white"} size={30} />
                </TouchableOpacity>
              </View>
            )}
            disableRightSwipe={true}
            previewOpenDelay={3000}
            friction={1000}
            tension={40}
            leftOpenValue={75}
            stopLeftSwipe={75}
            rightOpenValue={-95}
          />
        </ScrollView>
      </SafeAreaView>

      ) : (
        <Container style={styles.emptyContainer}>
          <Image
            source={require("../../assets/illus-wishlist.webp")}
            resizeMode="contain"
            style={{ width: 250, height: 250, marginTop: -200 }}
          />
          <Text
            style={{
              color: "000",
              fontSize: 22,
              fontWeight: "700",
              marginTop: 10,
            }}
          >
            Wishlist kamu masih belum ada
          </Text>
          <Text
            style={{
              color: "#8c8c8c",
              paddingStart: 30,
              paddingEnd: 30,
              marginTop: 15,
              marginBottom: 30,
              fontWeight: "500",
              letterSpacing: 0.3,
            }}
          >
            Simpan barang favoritmu dulu
          </Text>
        </Container>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { wishlistItems } = state;
  return {
    wishlistItems: wishlistItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromWishlist: (item) => dispatch(actionsWishlist.removeFromWishlist(item)),
  };
};

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  hiddenContainer: {
    flex: 2.5,
    flexDirection: "row",
    marginTop: 17,
    marginEnd: 15,
    justifyContent: "flex-end",
    borderRadius: 15,
  },
  hiddenButton: {
    backgroundColor: "#000",
    justifyContent: "center",
    borderRadius: 15,
    alignItems: "flex-end",
    paddingRight: 25,
    height: 140,
    width: width / 1.2,
  },
  header: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 15,
    alignItems: "center",
    marginStart: 15,
    backgroundColor: "#fff",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
