import React, { useEffect, useState } from 'react';
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import institutionsData from '../../data/Institutions.json';

const App = () => {
  const [nameData, setNameData] = useState([]);
  const [regionData, setRegionData] = useState([]);
  const [institutionData, setInstitutionData] = useState([]);
  const [name, setName] = useState(null);
  const [region, setRegion] = useState(null);
  const [selectedInstitutions, setSelectedInstitutions] = useState([]);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    // Extract unique names (agents) from the institutions data
    const uniqueNames = [
      ...new Set(institutionsData.map((item) => item.Agent)),
    ].map((name) => ({ value: name, label: name }));

    setNameData(uniqueNames);
  }, []);

  const handleRegion = (selectedName) => {
    // Filter regions based on the selected name (agent)
    const regionsForName = [
      ...new Set(
        institutionsData
          .filter((item) => item.Agent === selectedName)
          .map((item) => item.Region)
      ),
    ].map((region) => ({ value: region, label: region }));

    setRegionData(regionsForName);
  };

  const handleInstitutions = (selectedRegion) => {
    // Filter institutions based on the selected region
    const institutionsForRegion = institutionsData
      .filter((item) => item.Region === selectedRegion)
      .map((item) => ({ value: item.ID, label: item.Institution }));

    setInstitutionData(institutionsForRegion);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 15 }}>
        {/* Name Dropdown */}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={nameData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Name' : '...'}
          searchPlaceholder="Search..."
          value={name}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setName(item.value);
            handleRegion(item.value); // Trigger region filter on name change
            setIsFocus(false);
          }}
          activeColor="#f4ccec"
        />

        {/* Region Dropdown */}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={regionData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Region' : '...'}
          searchPlaceholder="Search..."
          value={region}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setRegion(item.value);
            handleInstitutions(item.value); // Trigger institution filter on region change
            setIsFocus(false);
          }}
          activeColor="#f4ccec"
        />

        {/* Institution MultiSelect */}
        <MultiSelect
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          search
          data={institutionData}
          labelField="label"
          valueField="value"
          placeholder="Select Institutions"
          searchPlaceholder="Search..."
          value={selectedInstitutions}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setSelectedInstitutions(item); // Handle institution selection
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color="black"
              name="Safety"
              size={20}
            />
          )}
          selectedStyle={styles.selectedStyle}
          activeColor="#f4ccec"
        />

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() =>
            Alert.alert(
              `You have selected\nName: ${name}\nRegion: ${region}\nInstitutions: ${selectedInstitutions
                .map(
                  (inst) => institutionData.find((i) => i.value === inst).label
                )
                .join(', ')}`
            )
          }>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#533483',
    padding: 16,
    justifyContent: 'center',
    alignContent: 'center',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#9c049c',
  },
  submitButton: {
    backgroundColor: '#0F3460',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  selectedStyle: {
    borderRadius: 12,
  },
});
