import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

// Define types for the component props
interface MultiSelectComponentProps {
  data: { label: string; value: string }[];
  value: string[];
  onChangeValue: (selected: string[]) => void;
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
  label, // Add label prop
  labelStyle, // Add optional label style
}) => {
  const [selected, setSelected] = useState<string[]>(value || []);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const handleChange = (item: { label: string; value: string }) => {
    const newSelected = selected.includes(item.value)
      ? selected.filter((i) => i !== item.value)
      : [...selected, item.value];
    setIsFocus(false);

    setSelected(newSelected);
    onChangeValue(newSelected);
  };

  const renderItem = (item: { label: string; value: string }) => {
    const isSelected = selected.includes(item.value);

    return (
      <TouchableOpacity
        style={[styles.item, isSelected && styles.selectedItem]}
        onPress={() => handleChange(item)}
      >
        {renderLeftIcon && renderLeftIcon()}
        <Text style={[styles.itemText, isSelected && styles.textSelected]}>
          {item.label}
        </Text>
        {isSelected && <AntDesign name="check" size={20} color="green" />}
      </TouchableOpacity>
    );
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
        value={selected}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={setSelected}
        renderItem={renderItem}
        selectedStyle={styles.selectedStyle} // Style for selected view
        containerStyle={styles.multiSelectContainer} // Style for dropdown container
        renderLeftIcon={renderLeftIcon}
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
