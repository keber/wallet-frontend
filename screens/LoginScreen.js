import React, { useState } from "react";
import { View, Text, TextInput, Button, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { apiCall } from "../services/api";
import { setCurrentUser } from "../constants/user";
import styles from "../styles/commonStyles";


export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async () => {

    if (!email || !password) {
      setError("Debe completar todos los campos obligatorios.");
      setSuccess("");
      return;
    }

    try {
      const data = await apiCall("/login", "POST", { email, password });
      setCurrentUser({ name: data.name, email: data.email, balance: data.balance });
      navigation.navigate("Home");
      setSuccess("Login exitoso");
      setError("");
      setEmail("");
      setPassword("");
      setTimeout(() => navigation.navigate("Home"), 1000);
    } catch (err) {
      setError(err.message || "Error inesperado");
      setSuccess("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOGIN</Text>
      <Text style={styles.requiredLabel}>
        Email <Text style={styles.asterisk}>*</Text> <Text style={styles.requiredNote}>(obligatorio)</Text>
      </Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={(value) => {
          setEmail(value);
          if (error) setError("");
        }} 
        autoCapitalize="none" />
      <Text style={styles.requiredLabel}>
        Password <Text style={styles.asterisk}>*</Text> <Text style={styles.requiredNote}>(obligatorio)</Text>
      </Text>
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={(value) => {
          setPassword(value);
          if (error) setError("");
        }} 
        secureTextEntry />
      <View style={styles.row}>
        <Switch value={rememberMe} onValueChange={setRememberMe} />
        <Text style={styles.text}>Remember me</Text>
      </View>      
      <Button style={styles.button} title="Log in" onPress={handleLogin} />
      <View style={{ marginTop: 20 }}>
        <Text style={styles.text}>No tienes cuenta?</Text>
        <Button style={styles.button} title="Registrarme" onPress={() => navigation.navigate("Register", { email })} />
      </View>
      {success !== "" && (
        <Text style={styles.successMessage} testID="login-success">{success}</Text>
      )}
      {error !== "" && (
        <Text style={styles.errorMessage} testID="login-error">{error}</Text>
      )}
    </View>
  );

}
