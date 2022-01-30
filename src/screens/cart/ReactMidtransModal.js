import React, { useState } from "react";
import { View, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview"
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Base64 from "base-64"
import { connect } from "react-redux";
import { setOrderIdsWillBePayed } from "../../../Redux/actions/orderAction";

const ReactMidtransModal = (props) => {
    console.log("tes", props)
}