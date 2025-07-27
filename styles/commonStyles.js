import { StyleSheet } from "react-native";

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
  },
  successMessage: {
    backgroundColor: "rgba(76, 175, 80, 0.1)", // verde suave
    color: "#2e7d32", // verde oscuro
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
    marginTop: 10,
  },
  errorMessage: {
    backgroundColor: "rgba(244, 67, 54, 0.1)", // rojo suave
    color: "#c62828", // rojo oscuro
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
    marginTop: 10,
  },
  requiredLabel: {
    fontSize: 14,
    marginBottom: 4,
    color: "#333",
  },
  asterisk: {
    color: "#c62828",
    fontWeight: "bold",
  },
  requiredNote: {
    color: "#c62828",
    fontSize: 12,
  },
});

export default styles;
