import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { apiCall } from "../services/api";
import { currentUser } from "../constants/user";
import styles from "../styles/commonStyles";


export default function TransactionsScreen() {
  const [transactions, setTransactions] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (currentUser) {
      apiCall(`/transactions/${currentUser.email}`)
        .then(data => setTransactions(data))
        .catch(() => setTransactions([]));
    }
  }, [isFocused]);

  const renderItem = ({ item, index }) => (
    <Text testID={`transaction-item-${index}`}>
      {item.type === "add" || item.type === "receive" ? "+" : "-"} ${item.amount} | {item.description} | Saldo: ${item.final_balance}
    </Text>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title} testID="transactions-title">TRANSACTIONS</Text>
      <FlatList
        data={transactions}
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderItem}
        testID="transactions-list"
      />
    </View>
  );
}
