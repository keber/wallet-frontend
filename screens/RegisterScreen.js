import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { apiCall } from "../services/api";
import { setCurrentUser } from "../constants/user";
import styles from "../styles/commonStyles";

export default function RegisterScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState(route.params?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError("Debe completar todos los campos obligatorios.");
      setSuccess("");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      setSuccess("");
      return;
    }
    try {
      await apiCall("/register", "POST", { name, email, password });
      setSuccess("Registro exitoso");
      setError("");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => navigation.navigate("Login"), 1500);
    } catch (err) { 
      setError(err.message || "Error inesperado");
      setSuccess("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>REGISTER</Text>
      <Text style={styles.requiredLabel}>
        Nombre <Text style={styles.asterisk}>*</Text> <Text style={styles.requiredNote}>(obligatorio)</Text>
      </Text>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={(value) => {
          setName(value);
          if (error) setError("");
        }} />
      <Text style={styles.requiredLabel}>
        Email <Text style={styles.asterisk}>*</Text> <Text style={styles.requiredNote}>(obligatorio)</Text>
      </Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={(value) => {
          setEmail(value);
          if (error) setError("");
        }} autoCapitalize="none" />
      <Text style={styles.requiredLabel}>
        Password <Text style={styles.asterisk}>*</Text> <Text style={styles.requiredNote}>(obligatorio)</Text>
      </Text>
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={(value) => {
          setPassword(value);
          if (error) setError("");
        }} secureTextEntry />
      <Text style={styles.requiredLabel}>
        Confirmar Password <Text style={styles.asterisk}>*</Text> <Text style={styles.requiredNote}>(obligatorio)</Text>
      </Text>
      <TextInput style={styles.input} placeholder="Confirm Password" value={confirmPassword} onChangeText={(value) => {
          setConfirmPassword(value);
          if (error) setError("");
        }} secureTextEntry />
      <Button title="Sign up" onPress={handleSignUp} />
      {success !== "" && (
        <Text style={styles.successMessage} testID="register-success">{success}</Text>
      )}
      {error !== "" && (
        <Text style={styles.errorMessage} testID="register-error">{error}</Text>
      )}
    </View>
  );
}