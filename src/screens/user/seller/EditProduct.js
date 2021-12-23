import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground
} from "react-native";
import {useTheme} from 'react-native-paper';
import { Text } from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Animated from "react-native-reanimated";
import * as ImagePicker from 'expo-image-picker';

var { height, width } = Dimensions.get("window");

const EditProduct = (props) => {
    const {colors} = useTheme();

    const [image, setImage] = useState(null);

    const saveAlert = () =>
    Alert.alert("Hapus Produk", "Kamu yakin ingin hapus produk?", [
      {
        text: "Batal",
        onPress: () => console.log("Cancel Pressed"),
      },
      {
        text: "Simpan",
        onPress: () => console.log("OK Pressed")
      },
    ]);


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };

  return (
    <SafeAreaView style={{ backgroundColor: "#f2f2f2" }}>
      <View style={styles.header}>
        <FontAwesome onPress={() => props.navigation.goBack()}
        name="chevron-left" size={18} style={{top: 4}} />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            letterSpacing: 0.3,
            marginStart: 105
          }}
        >
          Edit Produk
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 190, backgroundColor: '#f2f2f2' }}
      >
        
        <Animated.View>
            <View style={{alignItems: 'center', marginTop: 20}}>
                <TouchableOpacity onPress={pickImage} >
               
                    <View style={{
                        height: 100,
                        width: 100,
                        borderRadius: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <ImageBackground source={require('../../../assets/store.png')}
                        style={{height: 100, width:100, borderRadius: 15}}
                        >
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Image source={require('../../../assets/plus.png')} style={{
                                    opacity: 0.8,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    tintColor: '#fff',
                                    width: 25,
                                    height: 25
                                }}  />
                            </View>
                        </ImageBackground>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.detailContainer}>
            <View style={{ paddingVertical: 20, marginStart: 15 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Detail Produk</Text>
        </View>
            <View style={styles.action}>
          <TextInput
            name="name"
            placeholder="Nama"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
            <Text style={{marginStart: 15, marginTop: 14, marginEnd: -10, color: "#000", fontWeight: "700"}}>Rp </Text>
          <TextInput
            name="price"
            placeholder="Harga"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <TextInput
            name="stock"
            placeholder="Stok"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <TextInput
            name="category"
            placeholder="Kategori"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <TextInput
            name="condition"
            placeholder="Kondisi Barang"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <TextInput
            name="weight"
            placeholder="Berat"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.actionDescription}>
          <TextInput
            name="description"
            placeholder="Deskripsi Barang"
            multiline={true}
            numberOfLines={5}
            placeholderTextColor="#666666"
            keyboardType="email-address"
            autoCorrect={false}
            style={[
              styles.textInputDescription,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        </View>
        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
        <TouchableOpacity style={styles.commandButton} onPress={saveAlert}>
          <Text style={{fontSize: 20, fontWeight: "bold", color: "#000"}}>Hapus</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.commandButtonSave} onPress={saveAlert}>
          <Text style={styles.panelButtonTitle}>Simpan</Text>
        </TouchableOpacity>
        </View>
        </Animated.View>
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
  ImageContainer: {
    backgroundColor: "#fff",
    alignItems: "flex-start",
    flexDirection: "row",
    height: "8%",
    marginTop: 10
  },
  panelButtonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  commandButton: {
    padding: 12,
    borderRadius: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: "40%",
    marginTop: 30,
    marginStart: 15,
  },
  commandButtonSave: {
    padding: 12,
    borderRadius: 15,
    backgroundColor: '#000',
    alignItems: 'center',
    width: "40%",
    alignSelf: "flex-end",
    marginTop: 30,
    marginEnd: 15
  },
  detailContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
    marginTop: 25,
    height: height,
    borderRadius: 30,
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  headerRender: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "green",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 10,
    height: 45,
    marginStart: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
    backgroundColor: '#f2f2f2',
    borderRadius: 15,
    marginEnd: 15,
    paddingBottom: 5,
  },
  actionDescription: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 10,
    height: 175,
    marginStart: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
    backgroundColor: '#f2f2f2',
    borderRadius: 15,
    marginEnd: 15,
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: 7,
    paddingLeft: 15,
    color: '#000',
    fontWeight: '700',
    fontSize: 16
  },
  textInputDescription: {
    flex: 1,
    marginTop: -120,
    paddingLeft: 15,
    color: '#000',
    fontWeight: '700',
    fontSize: 16
  },
});

export default EditProduct;
