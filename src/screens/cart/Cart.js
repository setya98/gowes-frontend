import React from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  SafeAreaView,
  ScrollView,
  Button,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { Container, ListItem, Text, Thumbnail } from "native-base";
import CartItem from "./CartItem";
import Icon from "react-native-vector-icons/FontAwesome";

import { connect } from "react-redux";
import * as actions from "../../../Redux/actions/cartAction";
import { TouchableOpacity } from "react-native-gesture-handler";

var { height, width } = Dimensions.get("window");

const Cart = (props) => {
  let total = 0;
  props.cartItems.forEach((cart) => {
    return (total += cart.product.price);
  });

  return (
    <>
      {props.cartItems.length ? (
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
                marginStart: 130,
              }}
            >
              Cart
            </Text>
          </View>
          <View style={styles.headerTwo}>
            <Text
              style={{
                fontWeight: "600",
                letterSpacing: 0.5,
                color: "#595959",
              }}
            >
              Pilih Semua
            </Text>
            <TouchableWithoutFeedback onPress={() => props.clearCart()}>
              <Image
                source={require("../../assets/trash.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 30,
                  alignSelf: "flex-end",
                  marginEnd: 20,
                }}
              />
            </TouchableWithoutFeedback>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            scrollEventThrottle={1}
            contentContainerStyle={{ paddingBottom: "100%" }}
          >
            <SwipeListView
              data={props.cartItems}
              renderItem={(data) => <CartItem item={data} />}
              renderHiddenItem={(data) => (
                <View style={styles.hiddenContainer}>
                  <TouchableOpacity
                    style={styles.hiddenButton}
                    onPress={() => props.removeFromCart(data.item)}
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
          <View style={styles.btmContainer}>
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "600",
                  color: "#595959",
                  marginBottom: 5,
                }}
              >
                Total
              </Text>
              <Text style={{ fontSize: 22, fontWeight: "bold", marginTop: -2 }}>
                Rp {total}
              </Text>
            </View>
            <TouchableWithoutFeedback
              onPress={() => props.navigation.navigate("Checkout")}
            >
              <View style={styles.btnCheckout}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 19,
                      letterSpacing: 0.4,
                      fontWeight: "700",
                      marginTop: 11,
                    }}
                  >
                    Bayar
                  </Text>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 19,
                      alignSelf: "flex-end",
                      fontWeight: "bold",
                      marginStart: 3,
                      marginEnd: 20,
                    }}
                  >
                    ({props.cartItems.length})
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </SafeAreaView>
      ) : (
        <Container style={styles.emptyContainer}>
          <Image
            source={require("../../assets/illus-cart.webp")}
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
            Bag kamu masih kosong
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
            Tambah barang apa yang kamu sukai, langsung saja tambah disini
          </Text>
          <TouchableWithoutFeedback
            onPress={() => props.navigation.navigate("Home")}
          >
            <View style={styles.btn}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 18,
                  letterSpacing: 0.6,
                  fontWeight: "500",
                  alignSelf: "center",
                  marginTop: 11,
                }}
              >
                Belanja Dulu
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </Container>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
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
  btn: {
    width: 190,
    height: 45,
    backgroundColor: "#000",
    borderRadius: 20,
  },
  btnCheckout: {
    width: 120,
    height: 45,
    backgroundColor: "#000",
    alignSelf: "flex-end",
    alignItems: "flex-end",
    borderRadius: 15,
    marginEnd: 15,
  },
  header: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 15,
    alignItems: "center",
    marginStart: 15,
    backgroundColor: "#fff",
  },
  headerTwo: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 15,
    marginStart: 15,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  btmContainer: {
    flexDirection: "row",
    position: "absolute",
    justifyContent: "space-between",
    left: 10,
    bottom: 20,
    width: width,
    marginBottom: 170,
    padding: 10,
    backgroundColor: "#fff",
  },
  hiddenContainer: {
    flex: 1,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
