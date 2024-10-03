import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

const MultiSelectComponent = ({
  data,
  value,
  onChangeValue,
  label,
  placeholder,
}) => {
  const [selected, setSelected] = useState(value || []);

  const handleChange = (item) => {
    const newSelected = selected.includes(item.value)
      ? selected.filter((i) => i !== item.value)
      : [...selected, item.value];

    setSelected(newSelected);
    onChangeValue(newSelected);
  };

  const renderItem = (item) => {
    const isSelected = selected.includes(item.value);

    return (
      <TouchableOpacity
        style={[styles.item, isSelected && { backgroundColor: '#e6f7ff' }]}
        onPress={() => handleChange(item)}>
        <Text style={styles.itemText}>{item.label}</Text>
        {isSelected && (
          <AntDesign
            name="check"
            size={20}
            color="green"
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
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
        placeholder={placeholder || 'Select item(s)'}
        searchPlaceholder="Search..."
        value={selected}
        onChange={setSelected}
        renderItem={renderItem} // Customize item rendering with tick mark
        selectedStyle={styles.selectedStyle}
      />
    </View>
  );
};

export default MultiSelectComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    paddingBottom: 26,
    marginBottom: 20,
    borderRadius: 10,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    color: '#4c4c4c',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 11,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 0,
    borderBottomColor: 'gray',
  },
  itemText: {
    fontSize: 16,
  },
  selectedStyle: {
    borderRadius: 12,
  },
});
