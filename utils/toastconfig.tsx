// config.tsx
import React, { forwardRef, Ref } from "react";
import { View, Text, StyleSheet } from "react-native";
import Toast, {
  ToastConfigParams,
  ToastType,
} from "react-native-toast-message";

// Define the type for the toast config
interface ToastProps extends ToastConfigParams<any> {
  text1?: string;
  text2?: string;
}

// Toast configuration object
const toastConfig = {
  success: ({ text1, text2 }: ToastProps) => (
    <View style={styles.successToast}>
      <View style={styles.text1Container}>
        <Text style={styles.successTextBold}>{text1}</Text>
      </View>
      <Text style={styles.successText}>{text2}</Text>
    </View>
  ),
  error: ({ text1, text2 }: ToastProps) => (
    <View style={styles.errorToast}>
      <View style={styles.text1Container}>
        <Text style={styles.errorTextBold}>{text1}</Text>
      </View>
      <Text style={styles.errorText}>{text2}</Text>
    </View>
  ),
};

const ToastConfig = forwardRef<ToastType, any>(
  (_props, ref: Ref<ToastType>) => {
    return <Toast config={toastConfig} ref={ref} />;
  },
);

// Styles for the toast messages
const styles = StyleSheet.create({
  successToast: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    marginTop: -200,
    paddingBottom: 40,
  },
  errorToast: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    marginTop: -200,
    paddingBottom: 40,
  },
  text1Container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    paddingBottom: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
  },
  successTextBold: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Poppins-SemiBold", // Font family for text1
  },
  successText: {
    fontSize: 14,
    color: "#fff",
    fontFamily: "Poppins-Light", // Font family for text2
  },
  errorTextBold: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Poppins-SemiBold", // Font family for text1
  },
  errorText: {
    fontSize: 14,
    color: "#fff",
    fontFamily: "Poppins-Light", // Font family for text2
  },
});

export default ToastConfig;
