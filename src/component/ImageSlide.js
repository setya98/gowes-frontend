import React from "react";
import { Image, View, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";

const ImageSlide = ({ images }) => {
  console.log("this image", images);

  return (
    <View>
      <Swiper style={{ height: 280 }}>
        <Image
          source={{
            uri: item.image
              ? item.image
              : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
          }}
          resizeMode="contain"
          style={styles.image}
        />
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 250,
  },
});

export default ImageSlide;
