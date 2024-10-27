import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { useClerk } from "@clerk/clerk-expo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router"; // Import useRouter

export const SignOutButton = () => {
  const { signOut } = useClerk();
  const router = useRouter(); // Get the router instance

  const handleSignOut = async () => {
    await signOut(); // Sign the user out
    router.push("/sign-in"); // Navigate to the sign-in page after signing out
  };

  return (
    <TouchableOpacity onPress={handleSignOut} style={styles.button}>
      <AntDesign name="logout" size={24} color="white" />
      <Text style={styles.buttonText}>Log Out</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    marginLeft: 10,
    fontFamily: "Poppins-Regular",
  },
});
