import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { Container, Item, Text } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import TitleHeader from "../../component/TitleHeader";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import BorderWishlist from "../../component/BorderWishlist";
import BorderPrice from "../../component/BorderPrice";
import { connect } from "react-redux";
import * as actions from "../../../Redux/actions/cartAction";
import * as actionsWishlist from "../../../Redux/actions/wishlistAction";

var { height } = Dimensions.get("window");

const ProductDetail = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [availability, setAvailability] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.header}>
      <FontAwesome
              onPress={() => props.navigation.goBack()}
              name="chevron-left"
              size={18}
              style={{ top: 4 }}
            />
        <TouchableWithoutFeedback
          onPress={() => props.navigation.navigate("Cart")}
        >
          <Image
            source={require("../../assets/bag.png")}
            resizeMode="contain"
            style={{ width: 25, height: 30, marginTop: 7, marginBottom: 5 }}
          />
        </TouchableWithoutFeedback>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 190 }}
      >
        <Container>
          <View style={styles.ImageContainer}>
            <Image
              source={{
                uri: item.image
                  ? item.image
                  : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
              }}
              resizeMode="contain"
              style={styles.image}
            />
          </View>
          <View style={styles.detailContainer}>
            <View style={styles.line} />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <BorderPrice title={item.price} />
              <View style={{marginTop: 25, marginEnd: 20}}>
              <TouchableWithoutFeedback
                onPress={() => {
                  props.addItemToCart(props);
                  console.log('does not work');
                }}
              >
                <BorderWishlist />
              </TouchableWithoutFeedback>
              </View>
            </View>
            <TitleHeader style={styles.text} title={item.name} />
            <View style={styles.headerContainer}>
              <Icon name="star" size={20} color={"#F18c06"} />
              <Text style={styles.textRating}>{item.rating}</Text>
              <Text
                style={{
                  marginTop: 5,
                  fontWeight: "300",
                  color: "#000",
                  fontSize: 12,
                }}
              >
                /5
              </Text>
              <Text
                style={{
                  marginLeft: 10,
                  marginTop: 2,
                  fontWeight: "300",
                  color: "#000",
                }}
              >
                Terjual
              </Text>
              <Text
                style={{
                  marginLeft: 5,
                  marginTop: 2,
                  fontWeight: "300",
                  color: "#000",
                }}
              >
                15
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Image
                source={require("../../assets/man.png")}
                resizeMode="contain"
                style={{
                  width: 50,
                  height: 50,
                  marginStart: 15,
                  marginTop: 35,
                  marginEnd: 10,
                  borderRadius: 60,
                }}
              />
              <Text
                style={{
                  marginTop: 37,
                  marginStart: 15,
                  fontWeight: "600",
                  color: "#595959",
                  fontSize: 18,
                }}
              >
                Makmur Jaya
              </Text>
              <Icon
                name="star"
                size={15}
                color={"#F18c06"}
                style={{ marginTop: 65, marginStart: -100 }}
              />
              <Text
                style={{
                  marginStart: 5,
                  marginTop: 62,
                  fontSize: 20,
                  fontWeight: "800",
                }}
              >
                4.8
              </Text>
              <Text style={{ marginTop: 65, marginStart: 6, color: "#595959" }}>
                Rating
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Image
                source={require("../../assets/box.png")}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  marginStart: 20,
                  marginTop: 30,
                }}
              />
              <Text
                style={{
                  marginTop: 30,
                  marginStart: 15,
                  fontWeight: "400",
                  color: "#333333",
                }}
              >
                New
              </Text>
              <Image
                source={require("../../assets/settings.png")}
                resizeMode="contain"
                style={{
                  width: 23,
                  height: 23,
                  marginStart: 80,
                  marginTop: 30,
                }}
              />
              <Text
                style={{
                  marginTop: 33,
                  marginStart: 15,
                  fontWeight: "400",
                  color: "#333333",
                }}
              >
                Parts
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={require("../../assets/weight.png")}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  marginStart: 20,
                  marginTop: 20,
                  marginBottom: 10,
                }}
              />
              <Text
                style={{
                  marginTop: 22,
                  marginStart: 15,
                  fontWeight: "400",
                  color: "#333333",
                }}
              >
                500 Gram
              </Text>
            </View>

            <Text
              style={{
                marginTop: 30,
                marginLeft: 15,
                fontWeight: "800",
                fontSize: 22,
                letterSpacing: 0.3,
              }}
            >
              Deskripsi
            </Text>
            <Text
              style={{
                marginLeft: 15,
                marginTop: 25,
                fontWeight: "500",
                color: "#333333",
              }}
            >
              {item.description}
            </Text>
          </View>
        </Container>
      </ScrollView>
      <View style={styles.bottomHeader}>
        <View style={styles.btnCart}>
          <Icon name="plus" size={25} style={{ color: "#fff" }} />
          <Text
            style={{
              marginLeft: 15,
              fontSize: 20,
              fontWeight: "700",
              color: "#fff",
            }}
          >
            Add To Cart
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) =>
      dispatch(actions.addToCart({ quantify: 1, product })),
    addItemToWishlist: (product) =>
    dispatch(actionsWishlist.addToWishlist({ quantify: 1, product })),
  };
};


const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomHeader: {
    bottom: 0,
    flexDirection: "row",
    color: "#f2f2f2",
    justifyContent: "space-between",
  },
  headerContainer: {
    marginTop: 15,
    marginLeft: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  ImageContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  image: {
    width: "100%",
    height: 250,
  },
  detailContainer: {
    flexGrow: 1,
    backgroundColor: "#f2f2f2",
    elevation: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#000",
    shadowOpacity: 0.5,
    height: height,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  text: {
    marginLeft: 20,
    marginTop: 15,
    fontSize: 26,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  textRating: {
    marginLeft: 7,
    fontSize: 22,
    marginTop: -2,
    color: "#000",
    fontWeight: "bold",
  },
  line: {
    width: 60,
    height: 5,
    borderRadius: 15,
    marginTop: 15,
    backgroundColor: "rgba(0,0,0,0.2)",
    alignSelf: "center",
  },
  btnCart: {
    width: 180,
    height: 50,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});

export default connect(mapDispatchToProps, null)(ProductDetail);
