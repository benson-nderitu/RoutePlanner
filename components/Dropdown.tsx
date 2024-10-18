import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native"; // Import Text for the label
import { Dropdown } from "react-native-element-dropdown";

// Define the types for the component props
interface DropdownComponentProps {
  data: { label: string; value: string }[]; // Data is an array of objects with label and value
  placeholder?: string; // Optional placeholder text
  searchPlaceholder?: string; // Optional search placeholder text
  dropdownStyle?: object; // Optional styles for the dropdown
  onChangeValue?: (value: string) => void; // Callback function when value changes
  renderLeftIcon?: () => JSX.Element; // Optional function that returns JSX element (icon)
  label?: string; // Optional label text
  labelStyle?: object; // Optional styles for the label
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({
  data = [],
  placeholder = "Select item",
  searchPlaceholder = "Search...",
  dropdownStyle = {},
  onChangeValue,
  renderLeftIcon, // Optional icon rendering prop
  label, // Add label prop
  labelStyle, // Add optional label style
}) => {
  const [value, setValue] = useState<string | null>(null); // State for the selected value
  const [isFocus, setIsFocus] = useState<boolean>(false); // State to track if dropdown is focused

  const handleOnChange = (item: { label: string; value: string }) => {
    setValue(item.value);
    setIsFocus(false);
    if (onChangeValue) {
      onChangeValue(item.value); // Notify parent about value change
    }
  };

  return (
    <View style={styles.container}>
      {/* Optional label rendering */}
      {/* {label && (
        <Text style={[styles.label, labelStyle, isFocus && { color: "blue" }]}>
          {label}
        </Text>
      )} */}
      <Dropdown
        style={[
          styles.dropdown,
          dropdownStyle,
          isFocus && { borderColor: "blue" },
          value ? styles.selectedItem : {}, // Apply selectedItem style if a value is selected
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={
          value ? styles.textSelected : styles.selectedTextStyle
        } // Apply textSelected style if a value is selected
        inputSearchStyle={styles.inputSearchStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder : "..."}
        searchPlaceholder={searchPlaceholder}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={handleOnChange}
        renderLeftIcon={renderLeftIcon} // Render icon if provided
        fontFamily="Poppins-Regular" // Set the font family for the dropdown
        itemTextStyle={styles.itemTextStyle} // Apply custom styling for each item
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    paddingBottom: 26,
    marginBottom: 14,
    borderRadius: 10,
  },
  dropdown: {
    height: 60,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    color: "#4c4c4c",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 10,
    fontFamily: "Poppins-Regular",
  },
  placeholderStyle: {
    fontSize: 16,
    color: "gray",
    fontFamily: "Poppins-Regular",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#475A99",
    fontFamily: "Poppins-SemiBold",
  },
  textSelected: {
    fontFamily: "Poppins-SemiBold", // Font family for selected text
    color: "#475A99", // Color for selected text
  },
  itemTextStyle: {
    fontFamily: "Poppins-Regular", // Font family for each item in the dropdown
    fontSize: 14, // Font size for items
    color: "#000", // Color for items
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
});
