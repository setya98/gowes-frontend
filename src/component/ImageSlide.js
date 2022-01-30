import React from "react";
import { Image, View, Dimensions } from "react-native";
import Swiper from "react-native-swiper";

var { width } = Dimensions.get("window")

const ImageSlide = ({ images }) => {
  console.log("this image", images);

  return (
    <View>
      <Swiper style={{ height: 260 }}>
        {images.map((image, index) => (
          <Image
          key={index}
          source={{ uri: image.downloadUrl }}
          style={{ width: width, height: 400 }}
        />
        ))}
      </Swiper>
    </View>
  );
};

export default ImageSlide;
