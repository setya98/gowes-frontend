import React from "react";
import { StyleSheet, Image } from "react-native";
import { Card,Text } from "react-native-paper";
import { Left, Right } from "native-base";
import OrderCardDetail from "./OrderCardDetail";

function OrderCardComponent(props) {
    console.log("test", props.order)
    const order = props.order
    
    let productPrice;
    let productQty;
  
    {
      order.items.map((item) => {
        productPrice = item.price;
        productQty = item.productQty;
      });
    }
    const shippingCost = order.shipping.shippingCost;
  
    const grossAmount = productPrice * productQty;
    const totalPrice = grossAmount + shippingCost;

    return (
      <Card style ={{borderRadius: 20, marginTop: 20, paddingBottom: 20}}
      onPress={() =>
        props.navigation.navigate("Order Detail", {
          order: order,
        })
      }
    >
      <Card.Content style={{ flexDirection: "row", marginBottom: 20, marginTop: -25 }}>
      <Left>
        <Image source={require("../assets/store.png")} resizeMode="contain" style={{width: 18, height: 18, top: 30, tintColor: "#000"}} />
          <Text style={{marginTop: 12, marginStart: 30, fontWeight:"bold", fontSize: 16}}>{order.seller.username}</Text>
      </Left>
      <Right>
        <Text style={{marginTop: 30, marginEnd: 5, fontWeight:"bold", fontSize: 13, color:"#F18c06"}}>{order.state.stateType}</Text>
      </Right>
      </Card.Content>
      {order.items &&
        order.items.map((item) => <OrderCardDetail item={item} />)}
    </Card>
  );
}

  const styles = StyleSheet.create({
      card: {
          borderRadius: 20,
      },
      
  })

  export default OrderCardComponent