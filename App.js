import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Switch, Alert, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
const API = "https://wallet-api.keber.cl";
let currentUser = null;

async function apiCall(endpoint, method = "GET", body = null) {
  const options = { method, headers: { "Content-Type": "application/json" } };
  if (body) options.body = JSON.stringify(body);
  const res = await fetch(`${API}${endpoint}`, options);
  if (!res.ok) throw new Error((await res.json()).detail || "Error del servidor");
  return await res.json();
}

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    try {
      const data = await apiCall("/login", "POST", { email, password });
      currentUser = { name: data.name, email: data.email, balance: data.balance };
      navigation.navigate("Home");
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOGIN</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <View style={styles.row}>
        <Switch value={rememberMe} onValueChange={setRememberMe} />
        <Text style={styles.text}>Remember me</Text>
      </View>
      <Button title="Log in" onPress={handleLogin} />
<View style={{ marginTop: 20 }}>
  <Text>No tienes cuenta?</Text>
  <Button title="Registrarme" onPress={() => navigation.navigate("Register", { email })} />
</View>
    </View>
  );
}

function RegisterScreen({ route, navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(route.params?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    if (password !== confirmPassword) return Alert.alert("Error", "Las contraseñas no coinciden");
    try {
      await apiCall("/register", "POST", { name, email, password });
      Alert.alert("Registro exitoso");
      navigation.navigate("Login");
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>REGISTER</Text>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
      <Button title="Sign up" onPress={handleSignUp} />
    </View>
  );
}

function HomeScreen({ navigation }) {
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
      <Text style={styles.balance}>${balance.toFixed(2)}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("AddMoney")}> 
          <Text style={styles.buttonText}>Add Money</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("Send")}> 
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("Transactions")}> 
          <Text style={styles.buttonText}>Transactions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function TransactionsScreen() {
  const [transactions, setTransactions] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (currentUser) {
      apiCall(`/transactions/${currentUser.email}`)
        .then(data => setTransactions(data))
        .catch(() => setTransactions([]));
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TRANSACTIONS</Text>
      <FlatList
        data={transactions}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.type === "add" || item.type === "receive" ? "+" : "-"} ${item.amount} | {item.description} | Saldo: ${item.final_balance}
          </Text>
        )}
      />
    </View>
  );
}

function SendScreen({ navigation }) {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const handleSend = async () => {
    try {
      await apiCall("/send", "POST", {
        sender_email: currentUser.email,
        recipient_email: to,
        amount: parseFloat(amount),
        note,
      });
      Alert.alert("Éxito", "Transferencia realizada");
      navigation.goBack();
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SEND MONEY</Text>
      <TextInput style={styles.input} placeholder="Recipient" value={to} onChangeText={setTo} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Note" value={note} onChangeText={setNote} />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
}

function AddMoneyScreen({ navigation }) {
  const [amount, setAmount] = useState("");

  const confirmAdd = () => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return Alert.alert("Error", "Ingrese un monto válido");

    Alert.alert("Confirmar", "¿Desea confirmar la adición de fondos?", [
      {
        text: "Cancel",
        style: "cancel",
        onPress: () => navigation.goBack(),
      },
      {
        text: "Confirm",
        onPress: async () => {
          try {
            await apiCall("/add", "POST", { email: currentUser.email, amount: amt });
            Alert.alert("Éxito", "Fondos añadidos");
            navigation.goBack();
          } catch (err) {
            Alert.alert("Error", err.message);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ADD MONEY</Text>
      <TextInput style={styles.input} placeholder="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" />
      <Button title="Add" onPress={confirmAdd} />
    </View>
  );
}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  text: {
    marginLeft: 8,
  },
  balance: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  actionButton: {
    backgroundColor: "#ddd",
    padding: 20,
    borderRadius: 10,
    width: 100,
    alignItems: "center",
  },
  buttonText: {
    textAlign: "center",
  },
  item: {
    fontSize: 16,
    marginVertical: 5,
  }
});

