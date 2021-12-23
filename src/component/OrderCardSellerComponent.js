import React from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import { Card, Avatar,Text } from "react-native-paper";
import { Left, Right } from "native-base";
import { useNavigation } from "@react-navigation/native";

const OrderSelelrCardComponent = (props) => {
    const navigation = useNavigation(); 
    
    return (
        <View>
        <Card style={styles.card}
         onPress={() =>
            navigation.navigate("Order Detail")}
        >
            <View style={{flexDirection: "row", marginBottom: 20, marginTop: -12, marginStart: 18}}>
            <Left>
              <Avatar.Image source={require("../assets/man.png")} size={20} style={{width: 18, height: 18, top: 30, tintColor: "#000"}} />
              <Text style={{marginTop: 12, marginStart: 30, fontWeight:"bold", fontSize: 16}}>Setya</Text>
              </Left>
              <Right>
                  <Text style={{marginTop: 30, marginEnd: 20, fontWeight:"bold", fontSize: 14, color:"#F18c06"}}>Dikirim</Text>
              </Right>
              </View>
            <Card.Content >
                <View style={{flexDirection: "row"}}>
              <Avatar.Image source={require('../assets/ilus-empty.webp')} style={{margin: 4}} size={50}/>
              <Text style={{fontSize: 18, fontWeight:"bold", color: "#595959", marginStart: 15}}>Stang Sepeda</Text>
              </View>
              <View style={{flexDirection: "row", marginStart: 75, marginTop: -32}}>
              <Text style={{fontSize: 14, fontWeight:"bold", color: "#8c8c8c"}}>Jumlah:</Text>
               <Text style={{fontSize: 14, fontWeight: "bold", color: "#8c8c8c", marginStart: 5}}>1</Text>
                </View>
                <View style={{flexDirection: "row", alignSelf: "flex-end", marginTop: 25, marginEnd: 20, marginBottom: 15}}>
              <Text style={{fontSize: 16, fontWeight:"bold", color: "#595959", marginTop: 5}}>Total</Text>
               <Text style={{fontSize: 22, fontWeight: "bold", color: "#000", marginStart: 20}}>Rp 250.000</Text>
                </View>
            </Card.Content>
        </Card>
      </View>
    );
  };

  const styles = StyleSheet.create({
      card: {
          borderRadius: 20,
      },
      
  })

  export default OrderSelelrCardComponent