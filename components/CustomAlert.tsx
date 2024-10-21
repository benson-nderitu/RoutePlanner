// CustomAlert.tsx
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

type AlertType = "success" | "danger" | "primary";

interface CustomAlertProps {
  title: string;
  message: string;
  type: AlertType;
  onClose: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  title,
  message,
  type,
  onClose,
}) => {
  return (
    <View style={[styles.container, styles[type]]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <Pressable style={styles.button} onPress={onClose}>
        <Text style={styles.buttonText}>OK</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "Poppins-Regular",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Poppins-Regular",
  },
  button: {
    backgroundColor: "#06A42B",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: "white",
    fontFamily: "Poppins-Bold",
    fontSize: 16,
  },
  success: {
    backgroundColor: "#d4edda", // light green
    borderColor: "#c3e6cb", // green border
    borderWidth: 1,
  },
  danger: {
    backgroundColor: "#f8d7da", // light red
    borderColor: "#f5c6cb", // red border
    borderWidth: 1,
  },
  primary: {
    backgroundColor: "#cce5ff", // light blue
    borderColor: "#b8daff", // blue border
    borderWidth: 1,
  },
});

export default CustomAlert;
