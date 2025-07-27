import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { apiCall } from "../services/api";
import { currentUser } from "../constants/user";
import styles from "../styles/commonStyles";


export default function HomeScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (currentUser) {
      apiCall(`/balance/${currentUser.email}`)
        .then(data => setBalance(data.balance))
        .catch(() => setBalance(0));
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text>
        ${balance.toFixed(2)}
      </Text>
      <View>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("AddMoney")}
          testID="add-money-button"
        >
          <Text>Add Money</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("Send")}
          testID="send-button"
        >
          <Text>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("Transactions")}
          testID="transactions-button"
        >
          <Text>Transactions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
