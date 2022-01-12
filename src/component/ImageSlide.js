import React from "react";
import { Image, View } from "react-native";
import Swiper from "react-native-swiper";

const ImageSlide = ({ images }) => {
  console.log("this image", images);

  return (
    <View>
      <Swiper style={{ height: 260 }}>
        {images.map((image, index) => (
          <Image
          key={index}
          source={{ uri: image.downloadUrl }}
          style={{ width: "100%", height: 260 }}
        />
        ))}
      </Swiper>
    </View>
  );
};

export default ImageSlide;
