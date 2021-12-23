import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Text } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import StarIcon from "react-native-vector-icons/AntDesign";

var { height } = Dimensions.get("window");

const Seller = (props) => {
  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <View style={styles.header}>
        <Icon onPress={() => props.navigation.goBack()}
        name="chevron-left" size={18} style={{top: 4}} />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            letterSpacing: 0.3,
            marginEnd: 130
          }}
        >
          Toko Saya
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View style={styles.ImageContainer}>
          <Image
            source={require("../../../assets/man.png")}
            resizeMode="contain"
            style={{ width: 50, height: 50, marginStart: 15, marginTop: 5 }}
          />
          <TouchableWithoutFeedback
          onPress={() => props.navigation.navigate("Edit Seller")}
          >
            <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 20, color: "#595959",fontWeight: "700", marginStart: 20, letterSpacing: 0.6 }}>
              Makmur Jaya
            </Text>
          <Icon name="cog" size={18} style={{top: -19, marginStart: 125, color: "#595959"}}/>
          </View>
          </TouchableWithoutFeedback>
          <StarIcon name="star" size={20} color={"#F18c06"} style={{marginStart: -120, marginTop: 28, }}/> 
          <View style={{flexDirection: "row", justifyContent: "space-between"}}>
          <Text style={{color: "#000", top: 26, fontWeight: "bold", fontSize: 22, marginStart: 5}}>4.8</Text>
          <Text style={{color: "#595959", top: 30, fontWeight: "bold", marginStart: 7}}>Rating</Text>
          </View>
          </View>
        <View style={styles.detailContainer}>
         
        <View style={{flexDirection:"row", justifyContent: "space-between", paddingHorizontal: 20}}>
        <TouchableOpacity
           onPress={() => props.navigation.navigate("Order Seller")}>
        <Image source={require("../../../assets/bill.png")} resizeMode="contain" style={{width: 20, height: 20, top: 30, tintColor: "#595959"}} />
        <Text style={{fontWeight:"500", top: 10, marginStart: 30, color: "#595959", fontSize: 18 }}>Daftar Penjualan</Text>
        <Icon name="chevron-right" style={{ top: -5,color: "#595959", marginStart: 300}} />
        </TouchableOpacity>
        </View>
        <View style={{flexDirection:"row", justifyContent: "space-between", paddingHorizontal: 20}}>
        <TouchableOpacity
           onPress={() => props.navigation.navigate("Add Product")}>
        <Icon name="plus" size={17} style={{ alignSelf:"flex-start", top: 30, marginStart: 3, color: "#595959"}} />
        <Text style={{fontWeight:"500", top: 10, marginStart: 32, color: "#595959", fontSize: 18 }}>Tambah Produk</Text>
        <Icon name="chevron-right" style={{ top: -5,color: "#595959", marginStart: 300}} />
        </TouchableOpacity>
        </View>
        <View style={{flexDirection:"row", justifyContent: "space-between", paddingHorizontal: 20}}>
        <TouchableOpacity
           onPress={() => props.navigation.navigate("Product List")}>
        <Image source={require("../../../assets/store.png")} resizeMode="contain" style={{width: 21, height: 21, top: 30, tintColor: "#595959"}} />
        <Text style={{fontWeight:"500", top: 10, marginStart: 33, color: "#595959", fontSize: 18 }}>Daftar Produk</Text>
        <Icon name="chevron-right" style={{ top: -5,color: "#595959", marginStart: 300}} />
        </TouchableOpacity>
        </View>
        <View style={{flexDirection:"row", justifyContent: "space-between", paddingHorizontal: 20}}>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    margin: 15,
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  ImageContainer: {
    backgroundColor: "#fff",
    alignItems: "flex-start",
    flexDirection: "row",
    height: "8%",
    marginTop: 10
  },
  detailContainer: {
    flexGrow: 1,
    backgroundColor: "#f2f2f2",
    elevation: 5,
    marginTop: 25,
    height: height,
    borderRadius: 30
  },
});

export default Seller;
