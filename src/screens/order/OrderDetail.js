import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Alert,
  Text,
  Modal,
  Pressable,
  TouchableOpacity,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
  View,
} from "react-native";
import { Card, Divider, useTheme } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import { Rating } from "react-native-ratings";
import { currencyIdrConverter } from "../../util/extensions";
import moment from "moment";

import { useMutation } from "@apollo/react-hooks";
import { UPDATE_ORDER, ADD_REVIEW_MUTATION } from "../../util/graphql";

import OrderCardDetail from "../../component/OrderCardDetail";

var { height } = Dimensions.get("window");

const OrderDetail = (props) => {
  const { colors } = useTheme();
  const [errors, setErrors] = useState({});
  const [stateType, setStateType] = useState("");
  const [editState, setEditState] = useState(false);

  const [score, setScore] = useState(0);
  const [body, setBody] = useState("");
  const [itemId, setItemId] = useState("");

  console.log(score, "the score");

  const handleRating = (rating) => {
    setScore(rating);
  };

  const handleChange = (val) => {
    setBody(val);
  };

  const [modalVisible, setModalVisible] = useState(false);

  const order = props.route.params.order;
  const orderId = order.id;

  let itemPrice;
  let amountItem;
  let idTemp;

  {
    !loading ? (
      order.items.map((item) => {
        itemPrice = item.price;
        amountItem = item.amountItem;
        idTemp = item.id;
      })
    ) : (
      <></>
    );
  }

  console.log(idTemp, "testt");

  const reviewHandler = () => {
    addReview();
  };

  const [addReview] = useMutation(ADD_REVIEW_MUTATION, {
    update(_, { data: { addReview: reviewData } }) {
      setModalVisible(false)
      console.log("updated")
      props.navigation.navigate("Buyer")
      Toast.show({
        topOffset: 30,
        type: "success",
        text1: "Review berhasil ditambahkan",
      });
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: {
      score: score,
      body: body,
      itemId: itemId,
  }
  });

  const shippingCost = order.shipping.shippingCost;

  const grossAmount = itemPrice * amountItem;
  const totalPrice = itemPrice * amountItem + shippingCost;

  const [changeState, { loading }] = useMutation(UPDATE_ORDER, {
    update(_, { data: { updateOrder: orderData } }) {
      setEditState(false);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: { orderId: orderId, state: stateType },
  });

  function confirmArrivalOrder() {
    setStateType("ARRIVED");
    props.navigation.navigate("Order");
    Toast.show({
      topOffset: 30,
      type: "success",
      text1: "Pesanan dirubah ke Telah Diterima",
    });
    setEditState(true);
  }
  function cancelConfirmArrivalOrder() {
    setEditState(false);
  }
  function confirmCompleteOrder() {
    setStateType("COMPLETED");
    props.navigation.navigate("Order");
    Toast.show({
      topOffset: 30,
      type: "success",
      text1: "Pesanan dirubah ke Pesanan Selesai",
    });
    setEditState(true);
  }
  function cancelConfirmCompleteOrder() {
    setEditState(false);
  }
  if (editState) {
    changeState();
  }

  var orderActionButton;

  const arrivedAlert = () =>
    Alert.alert(
      "Konfirmasi pesanan anda",
      "Apa kamu sudah yakin konfirmasi pesanan anda?",
      [
        {
          text: "Cancel",
          onPress: () => cancelConfirmArrivalOrder(),
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => confirmArrivalOrder(),
        },
      ]
    );

  const completedAlert = () =>
    Alert.alert(
      "Selesaikan pesanan anda",
      "Apa kamu sudah yakin menyelesaikan pesanan anda?",
      [
        {
          text: "Cancel",
          onPress: () => cancelConfirmCompleteOrder(),
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => confirmCompleteOrder(),
        },
      ]
    );

  if (order.state.stateType === "DELIVERY") {
    orderActionButton = (
      <TouchableOpacity
        style={{
          padding: 15,
          borderRadius: 15,
          backgroundColor: "#000",
          alignSelf: "center",
          marginTop: 30,
          width: "90%",
          marginBottom: "10%",
        }}
        mode="contained"
        onPress={arrivedAlert}
      >
        <Text
          style={{
            color: "white",
            alignSelf: "center",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Pesanan Telah Sampai ?
        </Text>
      </TouchableOpacity>
    );
  }

  if (order.state.stateType === "ARRIVED") {
    orderActionButton = (
      <TouchableOpacity
        style={{
          padding: 15,
          borderRadius: 15,
          backgroundColor: "#000",
          alignSelf: "center",
          marginTop: 30,
          width: "90%",
          marginBottom: "10%",
        }}
        mode="contained"
        onPress={completedAlert}
      >
        <Text
          style={{
            color: "white",
            alignSelf: "center",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Konfirmasi Pesanan
        </Text>
      </TouchableOpacity>
    );
  }
  if (order.state.stateType === "COMPLETED") {
    orderActionButton = (
      <View>
        <TouchableOpacity
          style={{
            padding: 15,
            borderRadius: 15,
            backgroundColor: "#000",
            alignSelf: "center",
            marginTop: 30,
            width: "90%",
            marginBottom: "10%",
          }}
          mode="contained"
          onPress={() => setModalVisible(true)}
        >
          <Text
            style={{
              color: "white",
              alignSelf: "center",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Tambah Ulasan
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <View style={styles.header}>
        <FontAwesome
          onPress={() => props.navigation.goBack()}
          name="chevron-left"
          size={18}
          style={{ top: 4 }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            letterSpacing: 0.3,
            marginStart: 100,
          }}
        >
          Detail Pesanan
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: height,
          backgroundColor: "#f2f2f2",
        }}
      >
        <Card.Content
          style={{
            marginStart: 15,
            marginEnd: 15,
            borderRadius: 20,
            marginTop: 25,
            backgroundColor: "#fff",
          }}
        >
          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
            Detail Pesanan
          </Text>
          <Divider
            style={{
              height: 1,
              marginTop: 10,
              marginStart: -16,
              marginEnd: -16,
              marginBottom: 10,
            }}
          />
          <View style={{ flexDirection: "column", marginTop: 5 }}>
            <Text style={{ fontWeight: "700", color: "#8c8c8c" }}>
              No. Pesanan:
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                color: "#595959",
                fontSize: 15,
                marginTop: 5,
              }}
            >
              INV/<Text style={{ color: "#595959" }}>{order.id}</Text>
            </Text>
          </View>
          <View style={{ flexDirection: "column", marginTop: 10 }}>
            <Text style={{ fontWeight: "700", color: "#8c8c8c" }}>Status:</Text>
            <Text
              style={{
                fontWeight: "bold",
                color: "#F18c06",
                fontSize: 15,
                marginTop: 5,
              }}
            >
              {order.state.stateType}
            </Text>
          </View>
          <View style={{ flexDirection: "column", marginTop: 10 }}>
            <Text style={{ fontWeight: "700", color: "#8c8c8c" }}>
              Nama Toko:
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                color: "#595959",
                fontSize: 15,
                marginTop: 5,
              }}
            >
              {order.seller.username}
            </Text>
          </View>
          <View
            style={{ flexDirection: "column", marginTop: 10, marginBottom: 15 }}
          >
            <Text style={{ fontWeight: "700", color: "#8c8c8c" }}>
              Waktu Transaksi:
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                color: "#595959",
                fontSize: 15,
                marginTop: 5,
              }}
            >
              {moment(order.state.createdAt).format('lll')}
            </Text>
          </View>
        </Card.Content>
        <Card.Content
          style={{
            marginStart: 15,
            marginEnd: 15,
            borderRadius: 20,
            marginTop: 15,
            backgroundColor: "#fff",
            paddingBottom: 15,
          }}
        >
          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
            Detail Produk
          </Text>
          <Divider
            style={{
              height: 1,
              marginTop: 10,
              marginStart: -16,
              marginEnd: -16,
              marginBottom: 5,
            }}
          />
          {order.items &&
            order.items.map((item) => <OrderCardDetail item={item} />)}
        </Card.Content>
        <Card.Content
          style={{
            marginStart: 15,
            marginEnd: 15,
            borderRadius: 20,
            marginTop: 25,
            backgroundColor: "#fff",
            paddingBottom: 15,
          }}
        >
          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
            Detail Pengiriman
          </Text>
          <Divider
            style={{
              height: 1,
              marginTop: 10,
              marginStart: -16,
              marginEnd: -16,
              marginBottom: 10,
            }}
          />
          <View style={{ flexDirection: "column", marginTop: 5 }}>
            <Text style={{ fontWeight: "700", color: "#8c8c8c" }}>
              Alamat Pengiriman:
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 5 }}>
              {order.user.buyer.name}
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                color: "#595959",
                fontSize: 15,
                marginTop: 5,
              }}
            >
              {order.shipping.buyerAddress}
            </Text>
          </View>
          <View style={{ flexDirection: "column", marginTop: 10 }}>
            <Text style={{ fontWeight: "700", color: "#8c8c8c" }}>
              Metode Pengiriman:
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                color: "#595959",
                fontSize: 16,
                marginTop: 5,
              }}
            >
              {order.shipping.courierName}
            </Text>
          </View>
          <View style={{ flexDirection: "column", marginTop: 10 }}>
            <Text style={{ fontWeight: "700", color: "#8c8c8c" }}>
              No. Resi:
            </Text>
            {order.state.stateType === "DELIVERY" || "ARRIVED" || "COMPLETED" ? (
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#595959",
                  fontSize: 16,
                  marginTop: 5,
                }}
              >
               {order.shipping.awbNumber}
              </Text>
            ) : (
              <></>
            )}
          </View>
        </Card.Content>
        <Card.Content
          style={{
            marginStart: 15,
            marginEnd: 15,
            borderRadius: 20,
            marginTop: 25,
            backgroundColor: "#fff",
            paddingBottom: 15,
          }}
        >
          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
            Rincian Pembayaran
          </Text>
          <Divider
            style={{
              height: 1,
              marginTop: 10,
              marginStart: -16,
              marginEnd: -16,
              marginBottom: 10,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text
              style={{ fontWeight: "bold", fontSize: 15, color: "#595959" }}
            >
              Item ({amountItem} produk)
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 16, color: "#000" }}>
              Rp {currencyIdrConverter(grossAmount, 0, ".", ",")}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text
              style={{ fontWeight: "bold", fontSize: 15, color: "#595959" }}
            >
              Shipping Cost
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 16, color: "#000" }}>
              Rp {currencyIdrConverter(shippingCost, 0, ".", ",")}
            </Text>
          </View>
          <Divider style={{ height: 1, marginTop: 10 }} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16, color: "#000" }}>
              Total Pembayaran
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 16, color: "#000" }}>
              Rp {currencyIdrConverter(totalPrice, 0, ".", ",")}
            </Text>
          </View>
        </Card.Content>
        {orderActionButton}
        <Modal animationType="tap" transparent={true} visible={modalVisible}>
          <KeyboardAvoidingView>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={{ position: "absolute", right: 15, top: 15 }}>
                  <Material
                    name="close"
                    onPress={() => setModalVisible(false)}
                    size={18}
                  />
                </View>
                <Rating
                  type="star"
                  ratingTextColor="#000"
                  ratingCount={5}
                  imageSize={30}
                  showRating
                  onFinishRating={(rating) => handleRating(rating)}
                />
                <TextInput
                  name="body"
                  placeholder="Tulis ulasan produk"
                  placeholderTextColor="#666666"
                  value={body}
                  onChangeText={(val) => handleChange(val)}
                  autoCorrect={false}
                  style={[
                    styles.textInput,
                    {
                      color: colors.text,
                      backgroundColor: "#f2f2f2",
                      width: "100%",
                      marginTop: 15,
                      marginBottom: 15,
                      borderRadius: 15,
                    },
                  ]}
                />
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setItemId(idTemp), reviewHandler();
                  }}
                >
                  <Text style={styles.textStyle}>Simpan</Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    margin: 15,
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    height: "50%",
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 15,
    padding: 10,
    elevation: 2,
    marginBottom: -20
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#000",
    width: 150,
    height: 40
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  textInput: {
    flex: 1,
    paddingLeft: 15,
    color: "#000",
    fontWeight: "500",
    fontSize: 16,
  },
});

export default OrderDetail;
