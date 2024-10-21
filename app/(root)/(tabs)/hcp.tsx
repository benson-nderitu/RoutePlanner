import React, { useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomButton from "@/components/CustomButton";
import CustomAlert from "@/components/CustomAlert"; // Adjust path as necessary

interface FormDataType {
  name: string;
  email: string;
  message: string;
}

const nameOptions = [
  { label: "John Doe", value: "John Doe" },
  { label: "Jane Smith", value: "Jane Smith" },
  { label: "Alice Johnson", value: "Alice Johnson" },
];

const emailOptions = [
  { label: "john@example.com", value: "john@example.com" },
  { label: "jane@example.com", value: "jane@example.com" },
  { label: "alice@example.com", value: "alice@example.com" },
];

const messageOptions = [
  {
    label: "Hello, I would like to inquire...",
    value: "Hello, I would like to inquire...",
  },
  { label: "Can you help me with...", value: "Can you help me with..." },
  { label: "I am interested in...", value: "I am interested in..." },
];

export default function App(): JSX.Element {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertType, setAlertType] = useState<"success" | "danger" | "primary">(
    "success",
  );

  const handleChange = (field: keyof FormDataType, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const submitForm = (): void => {
    const form = new FormData();
    form.append("Name", formData.name);
    form.append("Email", formData.email);
    form.append("Message", formData.message);

    setLoading(true); // Set loading to true when starting to submit

    fetch(
      "https://script.google.com/macros/s/AKfycbx9sA81Vm2LVDzOiT4yI3ofMxJHK0XYjVEn5tJYbxYzI9mV2smf89qW3RTmcoMOyXjP/exec",
      {
        method: "POST",
        body: form,
      },
    )
      .then((response) => response.text())
      .then((message) => {
        console.log("Response from server:", message);
        setAlertType("success"); // Set alert type to success
        setAlertMessage(message);
        setAlertVisible(true);
        resetForm();
      })
      .catch((error) => {
        console.error(error);
        setAlertType("danger"); // Set alert type to danger
        setAlertMessage("There was a problem sending your message.");
        setAlertVisible(true);
      })
      .finally(() => {
        setLoading(false); // Reset loading regardless of success or error
      });
  };

  const resetForm = () => {
    // Reset the form fields after successful submission
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <View className="flex-1 justify-center p-6 bg-white">
      <Text className="text-2xl font-bold text-center mb-6">
        Contact Me Form
      </Text>
      <Text className="text-center mb-6">
        This demonstrates how to send data from a mobile app to Google Sheets
      </Text>

      <View className="mb-4">
        <Dropdown
          className="border border-gray-300 rounded p-3 mb-4"
          data={nameOptions}
          labelField="label"
          valueField="value"
          placeholder="Select your name"
          value={formData.name}
          onChange={(item) => handleChange("name", item.value)}
          renderLeftIcon={() => (
            <AntDesign className="mr-1" color="black" name="Safety" size={20} />
          )}
        />

        <Dropdown
          className="border border-gray-300 rounded p-3 mb-4"
          data={emailOptions}
          labelField="label"
          valueField="value"
          placeholder="Select your email"
          value={formData.email}
          onChange={(item) => handleChange("email", item.value)}
          renderLeftIcon={() => (
            <AntDesign className="mr-1" color="black" name="mail" size={20} />
          )}
        />

        <Dropdown
          className="border border-gray-300 rounded p-3 mb-4"
          data={messageOptions}
          labelField="label"
          valueField="value"
          placeholder="Select your message"
          value={formData.message}
          onChange={(item) => handleChange("message", item.value)}
          renderLeftIcon={() => (
            <AntDesign
              className="mr-1"
              color="black"
              name="message1"
              size={20}
            />
          )}
        />

        {/* Submit Button */}
        <CustomButton title="Submit" onPress={submitForm} />
      </View>

      {/* Loading Indicator */}
      {loading && (
        <View className="flex-row justify-center items-center mb-4">
          <ActivityIndicator size="large" color="#1D4ED8" />
          <Text className="ml-2">Sending your data...</Text>
        </View>
      )}

      {/* Custom Alert */}
      {alertVisible && (
        <CustomAlert
          title={alertType === "success" ? "Success" : "Error"}
          message={alertMessage}
          type={alertType}
          onClose={() => setAlertVisible(false)}
        />
      )}
    </View>
  );
}
