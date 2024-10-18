import React, { useState } from "react";
import { View, Text, Button, Alert, Modal, Pressable } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

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
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const handleChange = (field: keyof FormDataType, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const submitForm = (): void => {
    const form = new FormData();
    form.append("Name", formData.name);
    form.append("Email", formData.email);
    form.append("Message", formData.message);

    fetch(
      "https://script.google.com/macros/s/AKfycbx9sA81Vm2LVDzOiT4yI3ofMxJHK0XYjVEn5tJYbxYzI9mV2smf89qW3RTmcoMOyXjP/exec",
      {
        method: "POST",
        body: form,
      },
    )
      .then((response) => response.text()) // Handle plain text response
      .then((message) => {
        console.log("Response from server:", message);

        // Display message from server in the modal
        setModalMessage(message);
        setModalVisible(true);

        // Reset the form fields after successful submission
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        setModalMessage("Error: There was a problem sending your message.");
        setModalVisible(true);
        console.error(error);
      });
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
        {/* Name Dropdown */}
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

        {/* Email Dropdown */}
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

        {/* Message Dropdown */}
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
        <Button title="Submit" onPress={submitForm} />
      </View>

      {/* Modal to display success/error message */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center">
          <View className="bg-white rounded-lg p-5 w-3/4">
            <Text className="text-lg font-bold mb-4 text-center">
              {modalMessage}
            </Text>
            <Pressable
              className="bg-blue-500 rounded p-3 mt-4"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-white text-center">Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
