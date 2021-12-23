import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, SafeAreaView, Dimensions } from "react-native";
import { Card, Chip, Badge } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ListItem } from "native-base";
import Icon from "react-native-vector-icons/AntDesign";
import ProductReviewCard from "../review/ProductReviewCard";
import OrderSelelrCardComponent from "../../component/OrderCardSellerComponent";

var { height } = Dimensions.get("window")

const OrderSeller = (props) => {
  const [activeChip, setActiveChip] = useState("All");
  const [active, setActive] = useState(-1);

  const handleChip = (name) => {
    setActiveChip(name);
    console.log(name);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#f2f2f2" }}>
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
            marginStart: 110,
          }}
        >
          Daftar Penjualan
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 190,
          backgroundColor: "#f2f2f2",
        }}
      >
          <Card style={{marginTop: -15, backgroundColor: "#f2f2f2"}}>
          <Card.Content style={{marginStart: -20}}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                backgroundColor: "#f2f2f2",
              }}
            >
              <ListItem
                style={{
                  padding: 0,
                  borderRadius: 3,
                  marginTop: -10,
                  justifyContent: "space-between",
                  flexDirection: "row",
                  borderBottomColor: "transparent"
                }}
              >
                <Chip
                  icon="note-plus"
                  textStyle={styles.text}
                  style={[
                    styles.center,
                    { margin: 5 },
                    active == -1 ? styles.active : styles.inactive,
                  ]}
                  onPress={() => handleChip("All")}
                >
                  Pesanan Masuk
                </Chip>
                <Chip
                  icon="truck-check"
                  textStyle={styles.text}
                  style={[
                    styles.center,
                    { margin: 5 },
                    active == -1 ? styles.active : styles.inactive,
                  ]}
                  onPress={() => handleChip("Completed")}
                >
                  Siap Dikirm
                </Chip>
                <Chip
                  icon="truck-fast"
                  textStyle={styles.text}
                  style={[
                    styles.center,
                    { margin: 5 },
                    active == -1 ? styles.active : styles.inactive,
                  ]}
                  onPress={() => handleChip("Failed")}
                >
                    Sedang Dikirm
                </Chip>
                <Chip
                  icon="package-down"
                  textStyle={styles.text}
                  style={[
                    styles.center,
                    { margin: 5 },
                    active == -1 ? styles.active : styles.inactive,
                  ]}
                  onPress={() => handleChip("Failed")}
                >
                    Telah Diterima
                </Chip>
                <Chip
                  icon="check"
                  textStyle={styles.text}
                  style={[
                    styles.center,
                    { margin: 5 },
                    active == -1 ? styles.active : styles.inactive,
                  ]}
                  onPress={() => handleChip("Failed")}
                >
                    Selesai
                </Chip>
                <Chip
                  icon="close"
                  textStyle={styles.text}
                  style={[
                    styles.center,
                    { margin: 5 },
                    active == -1 ? styles.active : styles.inactive,
                  ]}
                  onPress={() => handleChip("Failed")}
                >
                    Dibatalkan
                </Chip>
              </ListItem>
            </ScrollView>
      </Card.Content>
        <Card.Content style={{marginStart: 10, marginTop: 10}}>
         <View style={{height: height}}>
         <OrderSelelrCardComponent />
         </View>
      </Card.Content>
      </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    header: {
      margin: 15,
      flexDirection: "row",
      backgroundColor: "#f2f2f2",
    },
    text: {
        color: '#595959',
        fontSize: 18,
        fontWeight: "bold"
      },
      center: {
        justifyContent: "center",
        alignItems: "center",
      },
      active: {
        backgroundColor: '#fff'
    },
    inactive: {
        backgroundColor: '#8c8c8c'
    },
      
})

export default OrderSeller
