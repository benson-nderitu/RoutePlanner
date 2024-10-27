import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TextStyle,
  ViewStyle,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

interface InputComponentProps {
  placeholder?: string;
  onPress: (value: string) => void;
}

const InputComponent: React.FC<InputComponentProps> = ({
  placeholder = "Enter text",
  onPress,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{placeholder}</Text>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          style={[
            styles.touchableContainer,
            { borderColor: isFocused ? "blue" : "gray" },
          ]}
          onPress={() => onPress(inputValue)}
        >
          <AntDesign
            name="user"
            style={styles.icon}
            color={isFocused ? "blue" : "black"}
          />
          <TextInput
            style={[styles.textInput, { color: "#475A99" }]}
            placeholder={placeholder}
            placeholderTextColor="gray"
            value={inputValue}
            onChangeText={setInputValue}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InputComponent;

const styles: { [key: string]: TextStyle | ViewStyle } = {
  container: {
    marginBottom: 14,
    backgroundColor: "white",
    borderRadius: 10,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    color: "#4c4c4c",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 4,
    fontSize: 10,
    fontFamily: "Poppins-Regular",
  },
  innerContainer: {
    padding: 16,
  },
  touchableContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
    height: 60,
    paddingHorizontal: 8,
    backgroundColor: "white",
  },
  icon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
};
