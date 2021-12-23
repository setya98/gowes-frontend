import { StatusBar } from "expo-status-bar";
import React from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';

// Redux
import { Provider } from "react-redux";
import store from "./Redux/store";

// Navigators
import Main from "./src/navigation/Main";

LogBox.ignoreAllLogs();

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/graphql"
});

export default function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
      </ApolloProvider>
    </Provider>
  );
}
