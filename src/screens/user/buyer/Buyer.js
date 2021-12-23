import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Button, Container, Item, Text } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import StarIcon from "react-native-vector-icons/AntDesign";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Card} from "react-native-paper";

const Buyer = (props) => {
  return (
    <SafeAreaView style={{ backgroundColor: "#f2f2f2" }}>
      <View style={styles.header}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            letterSpacing: 0.3,
          }}
        >
          Akun
        </Text>
        <Icon name="envelope" size={20} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 190 }}
      >
        <View style={styles.ImageContainer}>
          <Image
            source={require("../../../assets/man.png")}
            resizeMode="contain"
            style={{ width: 50, height: 50, marginStart: 15, marginTop: 5 }}
          />
          <TouchableWithoutFeedback
          onPress={() => props.navigation.navigate("Edit Buyer")}>
            <Text style={{ fontSize: 20, fontWeight: "700", marginStart: 20, letterSpacing: 0.6 }}>
              Setya
            </Text>
            <Icon name="cog" size={18} style={{top: -19, marginStart: 70}}/>
            </TouchableWithoutFeedback>
            <Card onPress={() => props.navigation.navigate("Seller")} 
            style={{width: 130, height: 30, borderRadius: 10, marginStart: -75, marginTop: 30}}>
          <View style={{flexDirection: "row", justifyContent: "space-between"}}>
          <Text style={{alignSelf:"flex-start", marginStart: 10, marginTop: 5, color: "#595959", fontWeight: "700"}}>Toko Saya</Text>
          <Icon name="chevron-right" style={{top: 9, end: 10, color: "#595959"}}/>
          </View>
        </Card>
        </View>
        
        <View style={styles.detailContainer}>
         
        <View style={{flexDirection:"row", justifyContent: "space-between", paddingHorizontal: 20}}>
        <TouchableOpacity
           onPress={() => props.navigation.navigate("Order")}>
        <Image source={require("../../../assets/shopbag.png")} resizeMode="contain" style={{width: 20, height: 20, top: 30, tintColor: "#595959"}} />
        <Text style={{fontWeight:"500", top: 10, marginStart: 30, color: "#595959", fontSize: 18 }}>Daftar Pesanan</Text>
        <Icon name="chevron-right" style={{ top: -5,color: "#595959", marginStart: 300}} />
        </TouchableOpacity>
        </View>
        <View style={{flexDirection:"row", justifyContent: "space-between", paddingHorizontal: 20}}>
        <TouchableOpacity
           onPress={() => props.navigation.navigate("Wishlist")}>
        <Icon name="heart" size={17} style={{ alignSelf:"flex-start", top: 30, marginStart: 3, color: "#595959"}} />
        <Text style={{fontWeight:"500", top: 10, marginStart: 32, color: "#595959", fontSize: 18 }}>Wishlist</Text>
        <Icon name="chevron-right" style={{ top: -5,color: "#595959", marginStart: 300}} />
        </TouchableOpacity>
        </View>
        <View style={{flexDirection:"row", justifyContent: "space-between", paddingHorizontal: 20}}>
        <TouchableOpacity
           onPress={() => props.navigation.navigate("Order Detail")}>
        <Icon name="address-book" size={17} style={{ alignSelf:"flex-start", top: 30, marginStart: 4, color: "#595959"}} />
        <Text style={{fontWeight:"500", top: 10, marginStart: 33, color: "#595959", fontSize: 18 }}>Alamat</Text>
        <Icon name="chevron-right" style={{ top: -5,color: "#595959", marginStart: 300}} />
        </TouchableOpacity>
        </View>
        <View style={{flexDirection:"row", justifyContent: "space-between", paddingHorizontal: 20}}>
        <TouchableOpacity
           onPress={() => props.navigation.navigate("Review Product")}>
        <StarIcon name="star" size={17} style={{ alignSelf:"flex-start", top: 30, marginStart: 5, color: "#595959"}} />
        <Text style={{fontWeight:"500", top: 10, marginStart: 35, color: "#595959", fontSize: 18 }}>Ulasan</Text>
        <Icon name="chevron-right" style={{ top: -5,color: "#595959", marginStart: 300}} />
        </TouchableOpacity>
        </View>
        </View>
        <Button style={{borderRadius: 15, backgroundColor: "#000", top: 25, width: "80%", justifyContent: "center", alignSelf: "center"}}>
          <Text style={{fontWeight: "700", fontSize: 16}}>Logout</Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    margin: 15,
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    justifyContent: "space-between",
  },
  ImageContainer: {
    backgroundColor: "#f2f2f2",
    alignItems: "flex-start",
    flexDirection: "row",
    height: "15%",
  },
  detailContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
    elevation: 5,
    marginTop: 25,
    height: 250,
    borderRadius: 30
  },
});

export default Buyer;
