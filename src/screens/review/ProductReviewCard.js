import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Card, Avatar,Text } from "react-native-paper";
import { Rating } from "react-native-ratings";

const ProductReviewCard = (props) => {

    return (
        <View>
        <Card style={styles.card}>
            <Card.Content>
              <View style={{flexDirection: "row"}}>
              <Avatar.Image source={require('../../assets/man.png')} style={{margin: 4}} size={40}/>
              <Card.Title
                title="Setya"
                titleStyle={{ fontSize: 20, fontWeight: "bold" }}
                style={{ alignSelf: "flex-end", marginTop: -10 }}
              />
              </View>
              <Rating
                type="star"
                readonly={true}
                imageSize={16}
                style={{marginStart: -80, marginTop: -10}}
              />
            </Card.Content>
            <Card.Content style={{ flexDirection: "column" }}>
              <Text style={{ fontSize: 15, fontWeight: "500", color: "#595959", marginBottom: 15, marginStart: 65, marginTop: 25 }}>Barang bagus</Text>
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

  export default ProductReviewCard