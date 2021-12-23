import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, SafeAreaView, Dimensions } from "react-native";
import { Card, Chip } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ListItem } from "native-base";
import Icon from "react-native-vector-icons/AntDesign";
import ProductReviewCard from "./ProductReviewCard";

var { height } = Dimensions.get("window")

const ProductReview = (props) => {
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
          Ulasan Produk
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
                  marginTop: -10,
                  flexDirection: "row",
                  borderBottomColor: "transparent"
                }}
              >
                <Chip
                  textStyle={styles.text}
                  style={[
                    styles.center,
                    { margin: 5 },
                    active == -1 ? styles.active : styles.inactive,
                  ]}
                  onPress={() => handleChip("All")}
                >
                  All
                </Chip>
                <Chip
                  textStyle={styles.text}
                  style={[
                    styles.center,
                    { margin: 5 },
                    active == -1 ? styles.active : styles.inactive,
                  ]}
                  onPress={() => handleChip("1")}
                >
                  <Icon name="star" style={{ color: "#F18c06", fontSize: 20 }} />
                </Chip>
                <Chip
                  textStyle={styles.text}
                  style={[
                    styles.center,
                    { margin: 5 },
                    active == -1 ? styles.active : styles.inactive,
                  ]}
                  onPress={() => handleChip("2")}
                >
                  <Icon name="star" style={{ color: "#F18c06", fontSize: 20 }} />
                  <Icon name="star" style={{ color: "#F18c06", fontSize: 20 }} />
                </Chip>
                <Chip
                  textStyle={styles.text}
                  style={[
                    styles.center,
                    { margin: 5 },
                    active == -1 ? styles.active : styles.inactive,
                  ]}
                  onPress={() => handleChip("3")}
                >
                  <Icon name="star" style={{ color: "#F18c06", fontSize: 20 }} />
                  <Icon name="star" style={{ color: "#F18c06", fontSize: 20 }} />
                  <Icon name="star" style={{ color: "#F18c06", fontSize: 20 }} />
                </Chip>
                <Chip
                  textStyle={styles.text}
                  style={[
                    styles.center,
                    { margin: 5 },
                    active == -1 ? styles.active : styles.inactive,
                  ]}
                  onPress={() => handleChip("4")}
                >
                  <Icon name="star" style={{ color: "#F18c06", fontSize: 20 }} />
                  <Icon name="star" style={{ color: "#F18c06", fontSize: 20 }} />
                  <Icon name="star" style={{ color: "#F18c06", fontSize: 20 }} />
                  <Icon name="star" style={{ color: "#F18c06", fontSize: 20 }} />
                </Chip>
                <Chip
                  textStyle={styles.text}
                  style={[
                    styles.center,
                    { margin: 5 },
                    active == -1 ? styles.active : styles.inactive,
                  ]}
                  onPress={() => handleChip("5")}
                >
                  <Icon name="star" style={{ color: "#F18c06", fontSize: 20 }} />
                  <Icon name="star" style={{ color: "#F18c06", fontSize: 20 }} />
                  <Icon name="star" style={{ color: "#F18c06", fontSize: 20 }} />
                  <Icon name="star" style={{ color: "#F18c06", fontSize: 20 }} />
                  <Icon name="star" style={{ color: "#F18c06", fontSize: 20 }} />
                </Chip>
              </ListItem>
            </ScrollView>
      </Card.Content>
        <Card.Content style={{marginStart: 10, marginTop: 10}}>
         <View style={{height: height}}>
         <ProductReviewCard />
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
        color: '#000',
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

export default ProductReview
