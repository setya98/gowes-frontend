import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import { useTheme } from "react-native-paper";
import Toast from "react-native-toast-message";
import BottomSheet from "reanimated-bottom-sheet";
import { Button, Text, Item, Picker } from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Animated from "react-native-reanimated";
import * as ImagePicker from "expo-image-picker";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { CommonActions } from "@react-navigation/native";
import { AuthContext } from "../../../context/auth";
import { useForm } from "../../../util/hooks";
import {
  FETCH_USER_QUERY,
  UPDATE_PROFILE_MUTATION,
} from "../../../util/graphql";

const EditBuyer = (props) => {
  const { colors } = useTheme();

  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [cityName, setCityName] = useState("");
  const [cityId, setCityId] = useState("");
  const [isCitySet, setIsCity] = useState(false);
  const [isSaved, setSave] = useState(false);

  const {loading, data} = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId: context.user.id,
    },
  });
  const { getUser: currentUser } = data ? data : [];
  // const { getCities: cities } = cityData ? cityData : [];

  // if (!loading && !isCitySet) {
  //   setCityName(currentUser.address.cityName);
  //   setCityId(currentUser.address.cityId);
  //   setIsCity(true);
  // }
  // const handleChange = (value) => {
  //   setCityName(value.split("-")[0]);
  //   setCityId(value.split("-")[1]);
  // };
  // console.log(cityName, cityId);

  // let userObj = {
  //   avatar: "",
  //   name: "",
  //   email: "",
  //   phone: "",
  // };

  // if (currentUser) {
  //   userObj = {
  //     name: currentUser.buyer.name,
  //     email: currentUser.email,
  //     phone: currentUser.phone,
  //     cityName: currentUser.address.cityName,
  //     district: currentUser.address.district,
  //     postalCode: currentUser.address.postalCode,
  //     detail: currentUser.address.detail,
  //   };
  // }

  // let { onChange, onSubmit, values } = useForm(updateUserProfile, userObj);

  const [values, setValues] = useState({
    cityName: "Cimahi",
    cityId: "23",
    avatar: "https://react.semantic-ui.com/images/avatar/large/molly.png",
    name: currentUser.buyer.name,
    email: currentUser.email,
    phone: currentUser.phone,
    // cityName: currentUser.address.cityName,
    birthDate: "2021-12-12",
    district: currentUser.address.district,
    postalCode: currentUser.address.postalCode,
    detail: currentUser.address.detail,
  });

  const onChange = (key, val) => {
    setValues({ ...values, [key]: val });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    updateProfile();
  };

  const [updateProfile] = useMutation(UPDATE_PROFILE_MUTATION, {
    update(_, { data: { updateUserProfile: userData } }) {
      userData.name = userData.buyer.name;
      context.login(userData)
      console.log("updated")
      setErrors({});
      props.navigation.navigate("Buyer");
      Toast.show({
        topOffset: 50,
        type: "success",
        text1: "Profil Berhasil Tersimpan",
      });
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      setSave(true);
    },
    variables: {...values}
  });

  // const saveAlert = () =>
  //   Alert.alert("Ubah Data", "Kamu yakin ingin ubah data?", [
  //     {
  //       text: "Batal",
  //       onPress: () => navigation.navigate("Edit Buyer"),
  //     },
  //     {
  //       text: "Simpan",
  //       onPress: onSubmit,
  //     },
  //   ]);

  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
      uploadImage(result.uri, `avatar-${new Date().toISOString()}`)
        .then(() => {
          console.log("Success");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      uploadImage(result.uri, `avatar-${new Date().toISOString()}`)
        .then(() => {
          console.log("Success");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const uploadImage = async (uri, imageName) => {
    if (uri) {
      const response = await fetch(uri);
      const blob = await response.blob();
      const uploadTask = storage.ref(`images/avatar/${imageName}`).put(blob);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images/avatar")
            .child(imageName)
            .getDownloadURL()
            .then((url) => {
              setAvatar(url);
              console.log("this is the avatar " + url);
            });
        }
      );
    }
  };

  

  // function updateUserProfile() {
  //   updateProfile();
  // }

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.panelTitle}>Unggah Foto</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={openCamera}>
        <Text style={styles.panelButtonTitle}>Ambil Foto</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={pickImage}>
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

  const bottomSheet = React.forwardRef();
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
            marginStart: 110,
          }}
        >
          Edit Profil
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 190,
          backgroundColor: "#f2f2f2",
        }}
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

        <Animated.View
          style={{
            marginBottom: 20,
            opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
          }}
        >
          <View style={{ alignItems: "center", marginBottom: 10 }}>
            <TouchableOpacity onPress={() => bottomSheet.current.snapTo(0)}>
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
                  // source={{ uri: loading ? avatar : currentUser.buyer.avatar }}
                  style={{ height: 100, width: 100, marginTop: 15, backgroundColor: "#8c8c8c", borderRadius: 25 }}
                  imageStyle={{ borderRadius: 25 }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FontAwesome
                      name="camera"
                      size={30}
                      color={"#fff"}
                      style={{
                        opacity: 0.7,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
            <Text style={{ marginTop: 15, fontSize: 22, fontWeight: "bold" }}>
              {currentUser.buyer.name}
            </Text>
          </View>
          <View style={styles.detailContainer}>
            <View style={{ paddingVertical: 20, marginStart: 15 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Profil</Text>
            </View>
            <View style={styles.action}>
              <FontAwesome
                name="user"
                color={colors.text}
                size={20}
                style={{ marginStart: 15, marginTop: 12 }}
              />
              <TextInput
                name="name"
                placeholder="Nama"
                placeholderTextColor="#666666"
                autoCorrect={false}
                value={values.name}
                onChangeText={(val) => onChange("name", val)}
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
              />
            </View>
            <View style={styles.action}>
              <FontAwesome
                name="phone"
                color={colors.text}
                size={20}
                style={{ marginStart: 15, marginTop: 12 }}
              />
              <TextInput
                name="phone"
                placeholder="Nomer Telepon"
                placeholderTextColor="#666666"
                keyboardType="number-pad"
                value={values.phone}
                onChangeText={(val) => onChange("phone", val)}
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
              <FontAwesome
                name="envelope"
                color={colors.text}
                size={17}
                style={{ marginStart: 15, marginTop: 12 }}
              />
              <TextInput
                name="email"
                placeholder="Email"
                placeholderTextColor="#666666"
                keyboardType="email-address"
                autoCorrect={false}
                value={values.email}
                onChangeText={(val) => onChange("email", val)}
                error={errors.email ? true : false}
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
              />
            </View>
            <View style={{ paddingVertical: 20, marginStart: 15 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Alamat</Text>
            </View>
            {/* <View style={styles.action}>
              <FontAwesome
                name="map-marker"
                color={colors.text}
                size={20}
                style={{ marginStart: 15, marginTop: 12 }}
              />
              <Item picker style={[styles.pickerStyle]}>
                <Picker
                  name="city"
                  mode="dialog"
                  value={`${cityName}-${cityId}`}
                  style={{ height: 20 }}
                  onValueChange={(val) => handleChange(val)}
                >
                  {cities &&
                    cities.map((city) => (
                      <Picker.Item
                        label={
                          city.city_name + " - " + city.type + " " + city.city_name
                        }
                        value={
                          city.type + " " + city.city_name + "-" + city.city_id
                        }
                      />
                    ))}
                </Picker>
              </Item>
            </View> */}
            <View style={styles.action}>
              <FontAwesome
                name="map-marker"
                color={colors.text}
                size={17}
                style={{ marginStart: 15, marginTop: 12 }}
              />
              <TextInput
                name="district"
                placeholder="Kota"
                placeholderTextColor="#666666"
                value={values.district}
                onChangeText={(val) => onChange("district", val)}
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
              <FontAwesome
                name="map-pin"
                color={colors.text}
                size={17}
                style={{ marginStart: 15, marginTop: 12 }}
              />
              <TextInput
                name="detail"
                placeholder="Detail Alamat"
                placeholderTextColor="#666666"
                value={values.detail}
                onChangeText={(val) => onChange("detail", val)}
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
              <FontAwesome
                name="inbox"
                color={colors.text}
                size={17}
                style={{ marginStart: 15, marginTop: 12 }}
              />
              <TextInput
                name="postalCode"
                placeholder="Kode Pos"
                placeholderTextColor="#666666"
                keyboardType="number-pad"
                value={values.postalCode}
                onChangeText={(val) => onChange("postalCode", val)}
                autoCorrect={false}
                style={[
                  styles.textInput,
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
    marginTop: 10,
    justifyContent: "center",
  },
  detailContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
    marginTop: 25,
    height: "100%",
    borderRadius: 30,
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
  textInput: {
    flex: 1,
    marginTop: 7,
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

export default EditBuyer;
