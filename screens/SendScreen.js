import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { apiCall } from "../services/api";
import { currentUser } from "../constants/user";
import styles from "../styles/commonStyles";


export default function SendScreen() {
  const navigation = useNavigation();
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    try {
      await apiCall("/send", "POST", {
        sender_email: currentUser.email,
        recipient_email: to,
        amount: parseFloat(amount),
        note,
      });
      setMessage("Transferencia realizada");
      setTimeout(() => navigation.goBack(), 1500);
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SEND MONEY</Text>

      <TextInput
        style={styles.input}
        placeholder="Recipient"
        value={to}
        onChangeText={setTo}
        autoCapitalize="none"
        testID="send-recipient"
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        testID="send-amount"
      />
      <TextInput
        style={styles.input}
        placeholder="Note"
        value={note}
        onChangeText={setNote}
        testID="send-note"
      />

      <Button style={styles.button} title="Send" onPress={handleSend} testID="send-button" />

      {message !== "" && <Text style={styles.errorMessage} testID="send-message">{message}</Text>}
    </View>
  );
}
