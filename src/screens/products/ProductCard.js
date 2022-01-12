import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { Text } from "native-base";
import { connect } from "react-redux";
import ButtonAdd from "../../component/ButtonAdd";
import { currencyIdrConverter } from "../../util/extensions";
import StarIcon from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Toast from "react-native-toast-message"

import { useMutation, useQuery } from "@apollo/client"
import { ADD_TO_CART_MUTATION, FETCH_SINGLE_ITEM_QUERY } from "../../util/graphql"


var { width } = Dimensions.get("window");

const ProductCard = (props) => {
  const { item } = props;

  // const { loading, data: data } = useQuery(FETCH_SINGLE_ITEM_QUERY, {
  //   variables: {
  //     itemId: item.id,
  //   },
  // });

  const [addToCart] = useMutation(ADD_TO_CART_MUTATION, {
    variables: {
      itemId: item.id,
      // isChecked: false,
    },
    onError(err) {
      // setErrors(err.graphQLErrors[0].extensions.exception.errors);
      console.log("error bro");
    },
  })

  function addItemCart() {
    addToCart();
    Toast.show({
      topOffset: 30,
      type: "success",
      text1: "Produk ditambahkan ke bag",
    });
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{ uri: item.images[0].downloadUrl }}
      />
      <View style={styles.card} />
      <Text style={styles.title}>
      {item.name.length > 15 ? item.name.substring(0, 18 - 3) + "..." : item.name}
      </Text>
      <Text style={styles.price}>Rp {currencyIdrConverter(item.price, 0, ".", ",")}</Text>
      <View style={{flexDirection: "row", marginTop: -10, marginStart: -95}}>
      <StarIcon name="star" size={12} color={"#F18c06"} style={{ marginTop: 8, alignSelf:"flex-start" }}/>
      <Text style={{color: "#595959", top: 4, fontWeight: "bold", fontSize: 17, marginStart: 5}}>4.8</Text>
      </View>
      <View style={{flexDirection: "row", alignSelf: "flex-start"}}>
      <FontAwesome name="map-marker" color={"#8c8c8c"} size={14} style={{marginTop: 8}} />
      <Text style={{color: "#8c8c8c", top: 6, fontWeight: "bold", fontSize: 15, marginStart: 7}}>{item.user.address.cityName}</Text>
      </View>
      {/* {item > 0 ? ( */}
        <TouchableWithoutFeedback
          // onPress={addItemCart}
        >
          <View style={{width: "100%", marginTop: 20, marginBottom: -10}}>
            <ButtonAdd />
          </View>
        </TouchableWithoutFeedback>
      {/* ) : (
        <Text style={{ marginTop: 20 }}>Currently Unavailable</Text>
      )} */}
    </View>
  );
};

// const mapDisptachToProps = (dispatch) => {
//   return {
//     addItemToCart: (product) =>
//       dispatch(actions.addToCart({ quantify: 1, product })),
//   };
// };

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 20,
    marginLeft: 15,
    marginTop: 5,
    marginRight: 15,
    marginBottom: 10,
    elevation: 2,
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  image: {
    flex: 1,
    width: width / 2 - 20 - 55,
    height: width / 2 + 5,
    backgroundColor: "transparent",
    position: "absolute",
    top: -5,
  },
  card: {
    marginBottom: 10,
    height: width / 2 - 20 - 90,
    backgroundColor: "transparent",
    width: width / 2 - 20 - 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#595959",
    top: 75,
    textAlign: "left",
    alignSelf: "flex-start",
  },
  price: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
    marginTop: 80,
    marginBottom: 15,
    alignSelf: "flex-start",
  },
});

export default ProductCard;
