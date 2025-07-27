import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { apiCall } from "../services/api";
import { currentUser } from "../constants/user";
import styles from "../styles/commonStyles";


export default function AddMoneyScreen() {
  const navigation = useNavigation();
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleAddMoney = async () => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      setMessage("Ingrese un monto válido");
      return;
    }

    try {
      await apiCall("/add", "POST", {
        email: currentUser.email,
        amount: amt,
      });
      setMessage("Fondos añadidos exitosamente");
      setTimeout(() => navigation.goBack(), 1500);
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ADD MONEY</Text>

      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        testID="add-amount"
      />

      <Button style={styles.button} title="Add" onPress={handleAddMoney} testID="add-button" />

      {message !== "" && <Text style={styles.errorMessage} testID="add-message">{message}</Text>}
    </View>
  );
}
