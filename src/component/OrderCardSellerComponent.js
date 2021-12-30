import React from "react";
import { StyleSheet, Image } from "react-native";
import { Card,Text, Avatar } from "react-native-paper";
import { Left, Right } from "native-base";
import OrderCardDetail from "./OrderCardDetail";

function OrderCardSellerComponent(props) {
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
        props.navigation.navigate("Order Seller Detail", {
          order: order,
        })
      }
    >
      <Card.Content style={{ flexDirection: "row", marginBottom: 20, marginTop: -25 }}>
      <Left>
        <Avatar.Image source={{ uri: order.user.buyer.avatar }}
            size={22}
            style={{ top: 30, backgroundColor: "#8c8c8c" }} />
          <Text style={{marginTop: 10, marginStart: 35, fontWeight:"bold", fontSize: 16}}>{order.user.buyer.name}</Text>
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

  export default OrderCardSellerComponent