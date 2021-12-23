import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  Image
} from "react-native";
import { useQuery } from "@apollo/client"
import { Container, Header, Item, Icon, Input, Text } from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { FETCH_ITEMS_QUERY } from "../../util/graphql"
import ProductList from "./ProductList";
import SearchedProduct from "./SearchedProduct";
import Banner from "../../component/Banner";
import CategoryFilter from "./CategoryFilter";
import TitleHeader from "../../component/TitleHeader";

var { height, width } = Dimensions.get("window");
const data = require("../../assets/data/products.json");
const categories = require("../../assets/data/categories.json");

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [productsCategories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const { loading, data } = useQuery(FETCH_ITEMS_QUERY);
  const { getItems: items } = data ? data : [];

  useEffect(() => {
    setProducts(items);
    setProductsFiltered(items);
    setFocus(false);
    setCategories(productsCategories);
    setProductsCtg(items);
    setActive(-1);
    setInitialState(data);

    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setFocus();
      setCategories([]);
      setActive();
      setInitialState();
    };
  }, []);

  // Producte Methods
  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  // Categories
  const changeCtg = (ctg) => {
    {
      ctg === "all"
        ? [setProductsCtg(initialState), setActive(true)]
        : [
            setProductsCtg(
              products.filter((i) => i.category._id === ctg),
              setActive(true)
            ),
          ];
    }
  };


  return (
      <Container>
        <TitleHeader title="Cari yang terbaik untuk sepedamu"/>
        <Header style={styles.header} searchBar rounded>
          <Item style={styles.item}>
            <Icon
              name="ios-search"
              style={{ color: "#595959", paddingLeft: 15, marginStart: -5 }}
            />
            <Input
              placeholder="Search"
              placeholderTextColor="#595959"
              onFocus={openList}
              onChangeText={(text) => searchProduct(text)}
              style={{ color: "#595959", height: 25 }}
            />
            {focus == true ? (
              <Icon
                onPress={onBlur}
                name="ios-close"
                style={{ color: "#8c8c8c" }}
              />
            ) : null}
          </Item>
          <View style={{height: 43, width: 43, backgroundColor: "#000", borderRadius: 12, marginTop: 6, marginStart: 8}}>
            <FontAwesome name="envelope"
              style={{ color:"#fff", marginTop: 12, marginStart:13, marginEnd: 7 }} size={17}           
            />
            </View>
        </Header>
        {focus == true ? (
          <SearchedProduct 
          navigation={props.navigation}
          productsFiltered={productsFiltered} />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={1} 
            contentContainerStyle={{paddingBottom: 290}}
          >
              <View>
                <Banner />
              </View>
              <View>
                <CategoryFilter
                  categories={categories}
                  categoryFilter={changeCtg}
                  productsCtg={productsCtg}
                  active={active}
                  setActive={setActive}
                />
              </View>
              {productsCtg.length > 0 ? (
                <View style={styles.listContainer}>
                  {productsCtg.map((item) => {
                    return (
                      <ProductList
                        navigation={props.navigation}
                        key={item._id}
                        item={item}
                      />
                    );
                  })}
                </View>
              ) : (
                <View style={[styles.center, {width: width / 2}]}>
                  
                  <Text>No Products Found</Text>
                </View>
              )}
          </ScrollView>
        )}
      </Container>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    height: height,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#fff",
    width: "90%",
    marginStart: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    height: 55,
    borderRadius: 20,
    marginStart: -11,
    backgroundColor: "#f2f2f2",
  },
});

export default ProductContainer;
