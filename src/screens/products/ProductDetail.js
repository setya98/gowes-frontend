import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { Container, Text, Button } from "native-base";
import { Avatar, Divider } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Toast from "react-native-toast-message"
import Swiper from "react-native-swiper";
import Animated from "react-native-reanimated";

import TitleHeader from "../../component/TitleHeader";
import BorderWishlist from "../../component/BorderWishlist";
import BorderPrice from "../../component/BorderPrice";
import ImageSlide from "../../component/ImageSlide";

import { connect } from "react-redux";

import { useMutation, useQuery } from "@apollo/client"
import { AuthContext } from "../../context/auth"
import {
  ADD_TO_CART_MUTATION,
  FETCH_CART_QUERY,
  FETCH_USER_CART_QUERY
} from "../../util/graphql"
import ButtonWishlist from "../../component/ButtonWishlist";


var { height } = Dimensions.get("window");

const ProductDetail = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const itemId = props.route.params.item
  const [amountItem, setAmountItem] = useState(1)
  const[errors, setErrors] = useState({})

  console.log(props.route.params.item)
  const user = useContext(AuthContext)

  const [addToCart] = useMutation(ADD_TO_CART_MUTATION, {
    variables: {
      itemId: item.id,
      isChecked: false,
      amountItem: amountItem
    },
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_USER_CART_QUERY
      })

      proxy.writeQuery({
        query: FETCH_USER_CART_QUERY,
        data: {
          getUserCartItems: [
            result.data.addCartItem,
            ...data.getUserCartItems
          ]
        }
      })

      console.log("hmmm")
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      console.log(errors);
    },
  })

  const { loading, data: userCartData } = useQuery(FETCH_CART_QUERY,{
    variables: {
      itemId: item.id
    }
  })
  const { getUserCartItem: itemCart } = userCartData ? userCartData : []
  let itemAmountCart = 0

  if (!loading && itemCart) {
    itemAmountCart = itemCart.amountItem
  }
  const AnimatedView = Animated.View

  function addItemCart() {
    addToCart();
    Toast.show({
      topOffset: 30,
      type: "success",
      text1: "Produk ditambahkan ke bag",
    });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.header}>
      <FontAwesome
              onPress={() => props.navigation.goBack()}
              name="chevron-left"
              size={18}
              style={{ marginTop: 14 }}
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
            <Swiper style={{ height: 260 }}>
            <Image source={{ uri: item.images[0].downloadUrl }} style={{width: "100%", height: 260, resizeMode: "contain"}} />
            </Swiper>
          </View>
          <View style={styles.detailContainer}>
            <View style={styles.line} />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <BorderPrice title={item.price} />
              {/* <View style={{marginTop: 25, marginEnd: 20}}>
              <TouchableWithoutFeedback
                
              >
                <ButtonWishlist />
              </TouchableWithoutFeedback>
              </View> */}
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
                Tersisa
              </Text>
              <Text
                style={{
                  marginLeft: 5,
                  marginTop: 2,
                  fontWeight: "300",
                  color: "#000",
                }}
              >
                {item.stock} 
              </Text>
            </View>
            <Divider style={{height: 1, marginTop: 25}}></Divider>
              <Avatar.Image
                size={40}
                source={{ uri: "https://react.semantic-ui.com/images/avatar/large/molly.png" }}
                style={{
                  marginStart: 15,
                  marginTop: 28,
                  marginEnd: 10,
                  borderRadius: 60,
                }}
              />
            <View style={{ flexDirection: "column", height: 40 }}>
              <Text
                style={{
                  marginStart: 70,
                  marginTop: -42,
                  fontWeight: "bold",
                  color: "#000",
                  fontSize: 18,
                }}
              >
                {item.user.seller.username}
              </Text>
              <View style={{flexDirection: "row"}}>
              <FontAwesome
                name="map-marker"
                size={15}
                color={"#595959"}
                style={{marginStart: 70, marginTop: 10}}
              />
              <Text
                style={{
                  marginStart: 8,
                  fontSize: 16,
                  fontWeight: "500",
                  color: "#595959",
                  marginTop: 8
                }}
              >
                {item.user.address.cityName}
              </Text>
              </View>
            </View>
            <Divider style={{height: 1}}></Divider>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={require("../../assets/box.png")}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  marginStart: 20,
                  marginTop: 30,
                  tintColor: "#595959"
                }}
              />
              <Text
                style={{
                  marginTop: 30,
                  marginStart: 15,
                  fontWeight: "bold",
                  color: "#595959",
                }}
              >
                {item.condition}
              </Text>
              <Image
                source={require("../../assets/settings.png")}
                resizeMode="contain"
                style={{
                  width: 23,
                  height: 23,
                  marginStart: 40,
                  marginTop: 30,
                  tintColor: "#595959"
                }}
              />
              <Text
                style={{
                  marginTop: 31,
                  marginStart: 10,
                  fontWeight: "bold",
                  color: "#595959",
                }}
              >
                {item.category}
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
                  tintColor: "#595959"
                }}
              />
              <Text
                style={{
                  marginTop: 22,
                  marginStart: 15,
                  fontWeight: "bold",
                  color: "#595959",
                }}
              >
                {item.weight, "-"}  gr
              </Text>
            </View>
            <Divider style={{height: 1, marginTop: 25}}></Divider>
            <Text
              style={{
                marginTop: 30,
                marginLeft: 15,
                fontWeight: "bold",
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
                fontWeight: "700",
                color: "#595959",
              }}
            >
              {item.description}
            </Text>
          </View>
        </Container>
      </ScrollView>
      <View style={styles.bottomHeader}>
        <Button style={{backgroundColor: "#fff", borderRadius: 20, borderColor: "#000", width: 90, justifyContent: "center", alignSelf: "center", marginStart: 15}}>
          <Ionicons name="chatbox-ellipses" size={25} />
        </Button>
        <Button style={styles.btnCart} onPress={addItemCart}>
          <Icon name="plus" size={16} style={{ color: "#fff" }} />
            <Text style={{fontSize: 16, fontWeight: "bold", color: "#fff"}}>Add To Cart</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
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
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerContainer: {
    marginTop: -5,
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
    width: 220,
    backgroundColor: "#000",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginEnd: 15
  },
});

export default ProductDetail