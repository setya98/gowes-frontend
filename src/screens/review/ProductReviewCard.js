import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Card, Avatar,Text } from "react-native-paper";
import { Rating } from "react-native-ratings";
import moment from "moment";

const ProductReviewCard = (props) => {
const review = props.review
console.log("score", review.body)


    return (
        <View>
        <Card style={styles.card}>
            <Card.Content>
              <View style={{flexDirection: "row"}}>
              <Avatar.Image source={{ uri: review.user.buyer.avatar }} style={{margin: 4}} size={40}/>
              <Card.Title
                title={review.user.buyer.name}
                titleStyle={{ fontSize: 20, fontWeight: "bold" }}
                style={{ alignSelf: "flex-end", marginTop: -10 }}
              />
              </View>
              <Text style={{marginStart: 65, marginTop: -10, color: "#8c8c8c"}}>{moment(review.createdAt).format('lll')}</Text>

              <Rating
                startingValue={review.score}
                type="star"
                readonly={true}
                ratingColor="#F18c06"
                imageSize={16}
                style={{marginStart: -90, marginTop: 10}}
              />

            </Card.Content>
            <Card.Content style={{ flexDirection: "column" }}>
              {/* <Avatar.Image size={50} source={{ uri: review.images }} /> */}
              <Text style={{ fontSize: 16, fontWeight: "600", color: "#595959", marginBottom: 15, marginStart: 65, marginTop: 25 }}>{review.body}</Text>
            </Card.Content>
        </Card>
      </View>
    );
  };

  const styles = StyleSheet.create({
      card: {
          borderRadius: 20,
          marginTop: 15, 
          elevation: 2
      },
      
  })

  export default ProductReviewCard