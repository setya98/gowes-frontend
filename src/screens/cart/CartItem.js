import React, { useState, useEffect } from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { Avatar, Card, Divider } from "react-native-paper";
import NumericInput from "react-native-numeric-input";
import { currencyIdrConverter } from "../../util/extensions";
import Toast from "react-native-toast-message";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useMutation } from "@apollo/client";
import { checkoutItems } from "../../../Redux/actions/orderAction";

import {
  EDIT_CART_MUTATION,
  FETCH_USER_CART_QUERY,
  DELETE_CART_ITEM_MUTATION,
} from "../../util/graphql";
import { Button, Input } from "native-base";

const CartItem = (props) => {
  const [amountItem, setAmountItem] = useState(props.item.amountItem);
  const [errors, setErrors] = useState({});
  const [note, setNote] = useState(props.item.note);
  const [editAmount, setEditAmount] = useState(false);

  useEffect(() => {
    let carts = props.carts;
    let cartObj;
    let cartItemObj;
    let indexCartObj;
    let indexCartItemObj;
    carts.forEach((cart, indexCart) => {
      if (cart.user.seller.username === props.item.item.user.seller.username) {
        indexCartObj = indexCart;
        cart.cartItems.forEach((cartItem, indexCartItem) => {
          if (cartItem.item.id === props.item.item.id) {
            indexCartItemObj = indexCartItem;
            cartItemObj = cartItem;
            cartItemObj = { ...cartItemObj, amountItem: parseInt(amountItem) };
            cartItemObj = { ...cartItemObj, note: note };
            return;
          }
        });
        cartObj = cart;
        cartObj.cartItems[indexCartItemObj] = cartItemObj;
        return;
      }
    });
    carts[indexCartObj] = cartObj;
  }, [amountItem]);

  const [deleteItemCart] = useMutation(DELETE_CART_ITEM_MUTATION, {
    update() {
      props.refetchCartQuery();
    },
    variables: { cartId: props.item.id },
  });

  const [addToCart] = useMutation(EDIT_CART_MUTATION, {
    variables: {
      itemId: props.item.item.id,
      amountItem: amountItem,
      note: note,
      isChecked: props.item.isChecked,
    },
    update() {
      props.refetchCartQuery();
      setEditAmount(false);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      console.log(errors);
    },
  });

  function deleteItemFromCart() {
    deleteItemCart();
    Toast.show({
      topOffset: 30,
      type: "success",
      text1: "Produk dihapus dari bag",
    });
  }

  function valueChange(val) {
    console.log(val);
  }

  if (editAmount) {
    addToCart();
  }

  return (
    <Card.Content
      style={{
        marginLeft: -15,
        marginRight: -15,
        marginTop: 30,
        backgroundColor: "#f2f2f2",
      }}
    >
      <Divider
        style={{
          marginStart: -17,
          height: 1,
          marginEnd: -17,
          marginBottom: 25,
          marginTop: -10,
        }}
      />
      <View style={{ flexDirection: "row" }}>
        <Avatar.Image
          source={{
            uri:
              props.item.item.images.length > 0
                ? props.item.item.images[0].downloadUrl
                : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
          }}
          size={55}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "#595959",
            marginStart: 20,
            marginTop: 1,
          }}
        >
          {props.item.item.name}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
          color: "#000",
          marginStart: 77,
          marginTop: -20,
        }}
      >
        Rp {currencyIdrConverter(props.item.item.price, 0, ".", ",")}
      </Text>

      <NumericInput
        value={amountItem}
        onChange={(val) => {
          setAmountItem(val);
          setEditAmount(true);
        }}
        containerStyle={{ alignSelf: "flex-end", top: 20 }}
        totalWidth={80}
        totalHeight={30}
        iconSize={20}
        step={1}
        valueType="real"
        rounded
        minValue={1}
        textColor="#000"
        inputStyle={{ fontSize: 16 }}
        iconStyle={{ color: "white" }}
        rightButtonBackgroundColor="#000"
        leftButtonBackgroundColor="#8c8c8c"
      />
      <TouchableWithoutFeedback onPress={deleteItemFromCart}>
        <FontAwesome
          name="trash"
          size={18}
          style={{
            marginTop: -5,
            alignSelf: "flex-end",
            marginEnd: 110,
            color: "#595959",
          }}
        />
      </TouchableWithoutFeedback>
    </Card.Content>
  );
};

CartItem.propTypes = {
  checkoutItems: PropTypes.func.isRequired,
  carts: PropTypes.array,
};

const mapStateToProps = (state) => ({
  carts: state.orders.checkoutOrders,
  isChange: state.orders.isChange,
});

export default connect(mapStateToProps, { checkoutItems })(CartItem);
