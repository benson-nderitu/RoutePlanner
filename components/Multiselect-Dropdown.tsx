import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

// Define types for the component props
interface MultiSelectComponentProps {
  data: { label: string; value: string }[]; // Data prop
  value: string[]; // Array of selected values
  onChangeValue: (selected: string[]) => void; // Callback for when selected values change
  placeholder?: string;
  renderLeftIcon?: () => JSX.Element;
  label?: string; // Optional label text
  labelStyle?: object; // Optional styles for the label
}

const MultiSelectComponent: React.FC<MultiSelectComponentProps> = ({
  data,
  value,
  onChangeValue,
  placeholder,
  renderLeftIcon,
  label,
  labelStyle,
}) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const handleSelectionChange = (selectedValues: string[]) => {
    // Map selected values back to labels
    const selectedLabels = data
      .filter((item) => selectedValues.includes(item.value))
      .map((item) => item.label); // Extract corresponding labels

    onChangeValue(selectedLabels); // Send the labels instead of values
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, labelStyle, isFocus && { color: "blue" }]}>
          {label}
        </Text>
      )}
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        search
        data={data}
        labelField="label"
        valueField="value"
        placeholder={placeholder || "Select item(s)"}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={handleSelectionChange} // Use the new handler
        selectedStyle={styles.selectedStyle}
        containerStyle={styles.multiSelectContainer}
        renderLeftIcon={renderLeftIcon}
        renderItem={(item, selected) => (
          <TouchableOpacity
            style={[styles.item, selected && styles.selectedItem]}
            onPress={() =>
              onChangeValue(
                selected
                  ? value.filter((v) => v !== item.value)
                  : [...value, item.value, item.label],
              )
            }
          >
            {renderLeftIcon && renderLeftIcon()}
            <Text style={[styles.itemText, selected && styles.textSelected]}>
              {item.label}
            </Text>
            {selected && <AntDesign name="check" size={20} color="green" />}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MultiSelectComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    marginBottom: 20,
    borderRadius: 10,
  },
  dropdown: {
    height: 60,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 20,
    fontFamily: "Poppins-Regular",
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
    fontFamily: "Poppins-Regular",
    color: "gray",
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "#475A99",
    fontFamily: "Poppins-Light",
    fontWeight: "400",
  },
  selectedStyle: {
    borderRadius: 50,
    backgroundColor: "white",
    padding: 2,
    borderColor: "#475A99",
    borderWidth: 1,
    fontFamily: "Poppins-Regular",
  },
  multiSelectContainer: {
    backgroundColor: "white",
    borderColor: "#475A99",
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    fontFamily: "Poppins-Regular",
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
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderBottomWidth: 0,
    borderBottomColor: "gray",
  },
  itemText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#000",
  },
  selectedItem: {
    backgroundColor: "#e5f2ff",
  },
  textSelected: {
    fontFamily: "Poppins-Regular",
    color: "#475A99",
  },
});
