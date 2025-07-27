import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Switch, Alert, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen    from      "./screens/LoginScreen";
import RegisterScreen from      "./screens/RegisterScreen";
import HomeScreen     from      "./screens/HomeScreen";
import TransactionsScreen from  "./screens/TransactionsScreen";
import SendScreen     from      "./screens/SendScreen";
import AddMoneyScreen from      "./screens/AddMoneyScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Transactions" component={TransactionsScreen} />
        <Stack.Screen name="Send" component={SendScreen} />
        <Stack.Screen name="AddMoney" component={AddMoneyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
