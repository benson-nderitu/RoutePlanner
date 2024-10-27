import React from "react"; // Ensure React is imported
import { useClerk, useUser } from "@clerk/clerk-expo";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import InputField from "@/components/InputField"; // Make sure InputField is correctly implemented
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";

const Profile = () => {
  const { user } = useUser();
  const { signOut } = useClerk(); // Move this here
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(); // Sign the user out
      router.push("/sign-in"); // Navigate to the sign-in page after signing out
    } catch (error) {
      console.error("Sign out failed:", error);
      // Optionally show an error message to the user
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#e9effc]">
      <ScrollView
        className="px-5"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Text className="text-2xl font-PoppinsBold my-5">My Profile</Text>

        <View className="flex items-center justify-center my-5">
          <Image
            source={{
              uri: user?.externalAccounts[0]?.imageUrl ?? user?.imageUrl,
            }}
            style={{ width: 110, height: 110, borderRadius: 110 / 2 }}
            className="rounded-full h-[110px] w-[110px] border-[3px] border-white shadow-sm shadow-neutral-300"
          />
        </View>

        <View className="flex flex-col items-start justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 px-5 py-3">
          <View className="flex flex-col items-start justify-start w-full">
            {/* Uncomment these if you need First name and Last name fields */}
            {/* <InputField
              label="First name"
              placeholder={user?.firstName || "Not Found"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <InputField
              label="Last name"
              placeholder={user?.lastName || "Not Found"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            /> */}

            <InputField
              label="Email"
              placeholder={
                user?.primaryEmailAddress?.emailAddress || "Not Found"
              }
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />
          </View>
        </View>

        <View className="flex flex-col items-start justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 px-5 py-3 mt-[50px]">
          <View className="flex flex-col items-start justify-start w-full">
            <TouchableOpacity onPress={handleSignOut} style={styles.button}>
              <AntDesign name="logout" size={24} color="#f00" />
              <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Define styles
const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 5,
    width: "100%", // Full width for better touch area
  },
  buttonText: {
    color: "black",
    marginLeft: 50,
    fontFamily: "Poppins-Bold",
  },
});

export default Profile;
