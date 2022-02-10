import React from "react";
import { Image, View, Dimensions } from "react-native";
import Swiper from "react-native-swiper";

var { width } = Dimensions.get("window")

const ImageSlide = ({ images }) => {
  console.log("this image", images);

  return (
    <View>
      <Swiper style={{ height: 350 }}
      dotColor={"#f2f2f2"}
      dotStyle={{ marginBottom: 30, height: 6, width: 6, borderRadius: 20, marginRight: 8 }}
      activeDotStyle={{ marginBottom: 30, height: 13, width: 13, borderRadius: 20, marginRight: 8 }}
      >
        {images.map((image, index) => (
          <Image
          key={index}
          source={{ uri: image.downloadUrl }}
          style={{ width: width, height: 350 }}
          resizeMode="cover"
        />
        ))}
      </Swiper>
    </View>
  );
};

export default ImageSlide;
