import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { Container, ListItem, Text, Thumbnail } from "native-base";
import { Card } from "react-native-paper";
import NumericInput from "react-native-numeric-input"
import { connect } from "react-redux";
import * as actionsWishlist from "../../../Redux/actions/wishlistAction";

const CartItem = (props) => {
  const data = props.item;

  return (
    <ListItem style={styles.listItem} key={Math.random()} avatar>
      <Card
        // onPress={() =>
        //   props.navigation.navigate("Home", {
        //     name: "ProductDetail",
        //   })
        // }
        style={{
          borderRadius: 20,
          width: "100%",
          marginEnd: 15,
          marginStart: 15,
          backgroundColor: "#f2f2f2",
          flexDirection: "row",
        }}
      >
        <View style={styles.body}>
          <Thumbnail
            style={{ margin: 10, backgroundColor: "#fff" }}
            source={{
              uri: data.image
                ? data.image
                : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
            }}
          />
          <Text
            style={{
              marginTop: -40,
              marginLeft: 10,
              fontSize: 16,
              fontWeight: "700",
              color: "#595959",
            }}
          >
            {data.name}
          </Text>
          <Text
          style={{
            marginEnd: 15,
            marginBottom: 20,
            marginTop: 40,
            fontWeight: "700",
            fontSize: 18,
          }}
        >
          Rp {data.price}
        </Text>
        </View>
        <View style={{justifyContent: "space-between", flexDirection: "row"}}>
        <TouchableWithoutFeedback
        // onPress={() => {
        //   props.addToWishlist(props);
        // }}
        onPress={() => {
         console.log("add wishlist");
        }}
        >
          <Image
            source={require("../../assets/heart.png")}
            resizeMode="contain"
            style={{
              width: 20,
              top: 5,
              height: 20,
              tintColor: "#8c8c8c",
              marginStart: 180
            }}
          />
        </TouchableWithoutFeedback>
        <NumericInput 
            value={data} 
            onChange={value => this.setState({value})} 
            containerStyle={{alignSelf: "flex-end", marginEnd: 20, marginBottom: 15, borderColor: "transparent"}}
            totalWidth={85} 
            totalHeight={30} 
            iconSize={25}
            step={1}
            rounded
            valueType='real'
            textColor='#000' 
            iconStyle={{ color: 'white' }} 
            rightButtonBackgroundColor='#000' 
            leftButtonBackgroundColor='rgba(0,0,0,0.2)'/>
        </View>
      </Card>
    </ListItem>
  );
};

const mapDisptachToProps = (dispatch) => {
  return {
    removeToWishlist: (item) => dispatch(actionsWishlist.removeToWishlist(item)),
    addToWishlist: (product) =>
    dispatch(actionsWishlist.addToWishlist({ quantify: 1, product })),
  };
};

const styles = StyleSheet.create({
  listItem: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 15,
    marginEnd: 15,
    backgroundColor: "#fff",
  },
  body: {
    alignItems: "center",
    flexDirection: "row",
    margin: 10,
  },
});

export default connect(null, mapDisptachToProps)(CartItem);
