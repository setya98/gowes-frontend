import React from "react";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { ListItem, Badge, Text } from "native-base";

const CategoryFilter = (props) => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      bounces={true}
      style={{ backgroundColor: "#fff", width: "93%" }}
    >
      <ListItem style={{ marginBottom: 15}}>
        <TouchableOpacity
          key={1}
          onPress={() => {
            props.categoryFilter('all'), props.setActive(-1)
          }}
        >
          <Badge 
            style={[styles.center, { margin: 5 },
                props.active == -1 ? styles.active : styles.inactive
            ]}
            >
            <Text style={[ props.active == -1 ? styles.textActive : styles.textInactive ]}>All</Text>
          </Badge>
        </TouchableOpacity>
        {props.categories.map((item) => (
            <TouchableOpacity
            key={item._id}
            onPress={() => {
              props.categoryFilter(item._id.$oid), 
              props.setActive(props.categories.indexOf(item))
            }}
          >
            <Badge 
              style={[styles.center, 
                { margin: 5 },
                  props.active == props.categories.indexOf(item) ? styles.active : styles.inactive
              ]}
              >
              <Text style={[ props.active == props.categories.indexOf(item) ? styles.textActive : styles.textInactive ]}>{item.name}</Text>
            </Badge>
          </TouchableOpacity>
        ))}
      </ListItem>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
      backgroundColor: '#fff'
  },
  inactive: {
      backgroundColor: '#fff'
  },
  textActive: {
    color: '#000',
    fontSize: 18,
    fontWeight: "bold"
  },
  textInactive: {
    color: '#8c8c8c',
    fontSize: 16,
    fontWeight: "500"
  }
});

export default CategoryFilter;
