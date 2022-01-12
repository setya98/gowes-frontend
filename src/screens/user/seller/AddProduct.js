import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
  Text,
  ImageBackground,
  Picker
} from "react-native";
import { Button } from "native-base";
import { useTheme } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Animated from "react-native-reanimated";
import PropTypes from "prop-types";
import { uploadMultipleImage } from "../../../../Redux/actions/imagePickerAction";
import Toast from "react-native-toast-message";
import BottomSheet from "reanimated-bottom-sheet";

import { useMutation } from "@apollo/client";
import { connect } from "react-redux";
import { CommonActions } from "@react-navigation/native";
import { useForm } from "../../../util/hooks";
import {
  ADD_ITEM_MUTATION,
} from "../../../util/graphql";

var { height } = Dimensions.get("window")

const AddProduct = (props) => {
  const {colors} = useTheme();
  const [errors, setErrors] = useState({});
  const [isSaved, setSave] = useState(false);
  const [image, setImage] = useState([]);

  const [values, setValues] = useState({
    name: "",
    price: 0,
    stock: 0,
    category: "",
    condition: "",
    weight: 0,
    description: "",
    length: 0,
    width: 0,
    height: 0,
    images: [
      {
        downloadUrl:
          "https://react.semantic-ui.com/images/avatar/large/molly.png",
      },
      {
        downloadUrl:
          "https://react.semantic-ui.com/images/avatar/large/molly.png",
      },
    ],
  });

  const onChange = (key, val) => {
    setValues({ ...values, [key]: val });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(typeof(values.condition));
    submitItem();
  };

  const [submitItem, { loading }] = useMutation(ADD_ITEM_MUTATION, {
    update(_, { data: { addItem: items } }) {
      console.log("updated")
      setErrors({});
      setSave(true);
      props.navigation.navigate("Seller")
      Toast.show({
        topOffset: 30,
        type: "success",
        text1: "Product Added",
      });
    },
    onError(err) {
      console.log("error bro")
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      setSave(true);
    },
    variables: {
      name: values.name,
      price: parseInt(values.price),
      stock: parseInt(values.stock),
      category: values.category,
      condition: values.condition,
      weight: parseInt(values.weight),
      description: values.description,
      length: parseInt(values.length),
      width: parseInt(values.width),
      height: parseInt(values.height),
      images: [
        {
          downloadUrl:
            "https://react.semantic-ui.com/images/avatar/large/molly.png",
        },
        {
          downloadUrl:
            "https://react.semantic-ui.com/images/avatar/large/molly.png",
        },
      ],
    }
  });

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.panelTitle}>Unggah Foto</Text>
      </View>
      <TouchableOpacity 
        style={styles.panelButton} 
        onPress={() => props.navigation.navigate("Image Picker")}
        >
        <Text style={styles.panelButtonTitle}>Pilih Dari Galeri</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bottomSheet.current.snapTo(1)}
      >
        <Text style={styles.panelButtonTitle}>Cancel</Text>
        </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerRender}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} /> 
      </View>
    </View>
  );

  const bottomSheet = React.createRef();
  const fall = new Animated.Value(1);

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
            marginStart: 90,
          }}
        >
          Tambah Produk
        </Text>
      </View>
    <KeyboardAvoidingView
      enabled={true}
      contentContainerStyle={styles.container}
    >
      <BottomSheet
        ref={bottomSheet}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
        enabledContentTapInteraction={false}
      />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: height}}
        style={{
          opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
        }}
      >
        {props.photos ? (
          <View
            style={{
              alignItems: "center", marginBottom: 10
            }}
          >
            <TouchableOpacity onPress={() => bottomSheet.current.snapTo(0)}>
              {props.photos.map((pic) => (
                <View
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ImageBackground
                    source={{
                      uri: pic.uri,
                    }}
                    style={{ height: 100, width: 100 }}
                    imageStyle={{ borderRadius: 20 }}
                  ></ImageBackground>
                </View>
              ))}
            </TouchableOpacity>
          </View>
       ) : (
        <View
          style={{
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <TouchableOpacity onPress={() => bottomSheet.current.snapTo(0)}>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                    source={require("../../../assets/plus.png")}
                    style={{
                      opacity: 0.8,
                      alignItems: "center",
                      justifyContent: "center",
                      tintColor: "#000",
                      width: 25,
                      height: 25,
                    }}
                  />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}
            <View style={styles.detailContainer}>
            <View style={{ paddingVertical: 20, marginStart: 15 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Detail Produk</Text>
        </View>
        <View style={styles.action}>
          <TextInput
            name="name"
            placeholder="Name"
            placeholderTextColor="#666666"
            value={values.name}
            onChangeText={(val) => onChange("name", val)}
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
              <Text
                style={{
                  marginStart: 15,
                  marginTop: 14,
                  marginEnd: -10,
                  color: "#000",
                  fontWeight: "700",
                }}
              >
                Rp{ }
              </Text>
              <TextInput
                name="price"
                placeholder="Harga"
                placeholderTextColor="#666666"
                keyboardType="number-pad"
                value={values.price}
                onChangeText={(val) => onChange("price", val)}
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
                value={values.stock}
                onChangeText={(val) => onChange("stock", val)}
                autoCorrect={false}
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
              />
            </View>
            <View style={{backgroundColor: "#f2f2f2", marginStart: 15, marginEnd: 15, marginBottom: 10, borderRadius: 15, paddingStart: 7}}>
              <Picker
                name="category"
                value={values.category}
                onValueChange={(val) => onChange("category", val)}
              >
                <Picker.Item label="Parts" value="Parts" />
                <Picker.Item label="Accessories" value="Accessories" />
                <Picker.Item label="Apparel" value="Apparel" />
              </Picker>
              </View>
              <View style={{backgroundColor: "#f2f2f2", marginStart: 15, marginEnd: 15, marginBottom: 10, borderRadius: 15, paddingStart: 7}}>
              <Picker
                name="condition"
                value={values.condition}
                onChangeText={(val) => onChange("condition", val)}
              >
                <Picker.Item label="New" value="New" />
                <Picker.Item label="Used" value="Used" />
                </Picker>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.actionDimension}>
                <TextInput
                  name="weight"
                  placeholder="Berat"
                  placeholderTextColor="#666666"
                  keyboardType="number-pad"
                  autoCorrect={false}
                  value={values.weight}
                  onChangeText={(val) => onChange("weight", val)}
                  style={[
                    styles.textInput,
                    {
                      color: colors.text,
                    },
                  ]}
                />
              </View>
              <View style={styles.actionDimension}>
                <TextInput
                  name="length"
                  placeholder="Panjang"
                  placeholderTextColor="#666666"
                  keyboardType="number-pad"
                  autoCorrect={false}
                  value={values.length}
                  onChangeText={(val) => onChange("length", val)}
                  style={[
                    styles.textInput,
                    {
                      color: colors.text,
                    },
                  ]}
                />
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.actionDimension}>
                <TextInput
                  name="height"
                  placeholder="Tinggi"
                  placeholderTextColor="#666666"
                  keyboardType="number-pad"
                  autoCorrect={false}
                  value={values.height}
                  onChangeText={(val) => onChange("height", val)}
                  style={[
                    styles.textInput,
                    {
                      color: colors.text,
                    },
                  ]}
                />
              </View>
              <View style={styles.actionDimension}>
                <TextInput
                  name="width"
                  placeholder="Lebar"
                  placeholderTextColor="#666666"
                  keyboardType="number-pad"
                  autoCorrect={false}
                  value={values.width}
                  onChangeText={(val) => onChange("width", val)}
                  style={[
                    styles.textInput,
                    {
                      color: colors.text,
                    },
                  ]}
                />
              </View>
            </View>
            <View style={styles.actionDescription}>
              <TextInput
                name="description"
                placeholder="Deskripsi Barang"
                multiline={true}
                numberOfLines={5}
                placeholderTextColor="#666666"
                value={values.description}
                onChangeText={(val) => onChange("description", val)}
                autoCorrect={false}
                style={[
                  styles.textInputDescription,
                  {
                    color: colors.text,
                  },
                ]}
              />
            </View>
          <Button style={styles.commandButton} onPress={onSubmit}>
          <Text style={styles.panelButtonTitle}>Simpan</Text>
          </Button>
          </View>
        </Animated.ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    margin: 15,
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
  },
  panelButtonTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginStart: "50%",
    color: "white",
  },
  commandButton: {
    width: "60%",
    height: 40,
    borderRadius: 15,
    backgroundColor: "#000",
    alignSelf: "center",
    marginTop: 20,
    justifyContent: "center",
  },
  detailContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
    marginTop: 25,
    height: "100%",
    borderRadius: 30,
    marginBottom: -90
  },
  panel: {
    padding: 20,
    backgroundColor: "#f2f2f2",
  },
  headerRender: {
    backgroundColor: "#f2f2f2",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 50,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#000",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    marginTop: -5,
    fontWeight: "bold",
    marginBottom: 20,
  },
  panelButton: {
    padding: 13,
    borderRadius: 20,
    width: "70%",
    backgroundColor: "#000",
    alignItems: "center",
    marginVertical: 7,
    alignSelf: "center",
  },
  panelButtonTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 10,
    height: 45,
    marginStart: 15,
    borderBottomWidth: 1,
    borderBottomColor: "transparent",
    backgroundColor: "#f2f2f2",
    borderRadius: 15,
    marginEnd: 15,
    paddingBottom: 5,
  },
  actionDescription: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 10,
    height: 125,
    marginStart: 15,
    borderBottomWidth: 1,
    borderBottomColor: "transparent",
    backgroundColor: "#f2f2f2",
    borderRadius: 15,
    marginEnd: 15,
    paddingBottom: 5,
  },
  actionDimension: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 10,
    height: 45,
    marginStart: 15,
    borderBottomWidth: 1,
    borderBottomColor: "transparent",
    backgroundColor: "#f2f2f2",
    borderRadius: 15,
    marginEnd: 15,
    paddingBottom: 5,
    width: "40%",
  },
  textInput: {
    flex: 1,
    marginTop: 7,
    paddingLeft: 15,
    color: "#000",
    fontWeight: "700",
    fontSize: 16,
  },
  textInputDescription: {
    flex: 1,
    marginTop: -77,
    paddingLeft: 15,
    color: "#000",
    fontWeight: "700",
    fontSize: 16,
  },
  pickerStyle: {
    borderColor: "transparent",
    alignSelf: "center",
    flex: 1,
    marginLeft: 5,
  },
});


export default AddProduct
