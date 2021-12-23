import React, { useState } from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Image } from "react-native";
import { Container, ListItem, Text, Thumbnail } from "native-base";
import { Card } from "react-native-paper";
import { connect } from "react-redux";
import * as actionsWishlist from "../../../Redux/actions/wishlistAction";
import ButtonAdd from "../../component/ButtonAdd";

const Item = (props) => {
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
        <View style={{marginStart: 90, marginEnd: 70, marginTop: -15}}>
          <ButtonAdd />
        </View>
      </Card>
    </ListItem>
  );
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
})

export default Item ;
