import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import DateTimePicker from 'react-native-ui-datepicker';
import institutionsData from '../../data/Institutions.json'; // Data for Agent, Region, and Institutions
import { styled } from 'nativewind';

// Tailwind styled components
const StyledView = styled(View);
const StyledText = styled(Text);

interface FormDataType {
  territory: string | null;
  month: string | null;
  week: string | null;
  day: string | null;
  date: Date;
  agent: string | null;
  region: string | null;
  institutions: string[];
}

export default function App(): JSX.Element {
  const [formData, setFormData] = useState<FormDataType>({
    territory: null,
    month: null,
    week: null,
    day: null,
    date: new Date(),
    agent: null,
    region: null,
    institutions: [],
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (field: keyof FormDataType, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  // Dropdown Data
  const territoryOptions = ['Territory 1', 'Territory 2', 'Territory 3'];
  const monthOptions = ['January', 'February', 'March'];
  const weekOptions = ['Week 1', 'Week 2', 'Week 3'];
  const dayOptions = ['Monday', 'Tuesday', 'Wednesday'];

  // Populating Agent and Region based on Institutions data
  const agentOptions = institutionsData.map((item) => item.Agent);
  const regionOptions = institutionsData.map((item) => item.Region);
  const institutionOptions = institutionsData.map((item) => ({
    label: item.Institution,
    value: item.Institution,
  }));

  return (
    <StyledView className="flex-1 justify-center p-6 bg-white">
      {/* Territory Dropdown */}
      <StyledText className="text-lg font-bold mb-2">Territory</StyledText>
      <Dropdown
        data={territoryOptions.map((item) => ({ label: item, value: item }))}
        labelField="label"
        valueField="value"
        placeholder="Select Territory"
        value={formData.territory}
        onChange={(item) => handleChange('territory', item.value)}
        className="mb-4 border border-gray-300 rounded p-3"
      />

      {/* Month Dropdown */}
      <StyledText className="text-lg font-bold mb-2">Month</StyledText>
      <Dropdown
        data={monthOptions.map((item) => ({ label: item, value: item }))}
        labelField="label"
        valueField="value"
        placeholder="Select Month"
        value={formData.month}
        onChange={(item) => handleChange('month', item.value)}
        className="mb-4 border border-gray-300 rounded p-3"
      />

      {/* Week Dropdown */}
      <StyledText className="text-lg font-bold mb-2">Week</StyledText>
      <Dropdown
        data={weekOptions.map((item) => ({ label: item, value: item }))}
        labelField="label"
        valueField="value"
        placeholder="Select Week"
        value={formData.week}
        onChange={(item) => handleChange('week', item.value)}
        className="mb-4 border border-gray-300 rounded p-3"
      />

      {/* Day Dropdown */}
      <StyledText className="text-lg font-bold mb-2">Day</StyledText>
      <Dropdown
        data={dayOptions.map((item) => ({ label: item, value: item }))}
        labelField="label"
        valueField="value"
        placeholder="Select Day"
        value={formData.day}
        onChange={(item) => handleChange('day', item.value)}
        className="mb-4 border border-gray-300 rounded p-3"
      />

      {/* Date Picker */}
      <StyledText className="text-lg font-bold mb-2">Date</StyledText>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 0.5,
          borderColor: 'gray',
          borderRadius: 8,
          padding: 8,
          marginBottom: 10,
          height: 50,
          paddingHorizontal: 8,
        }}
        onPress={() => setShowDatePicker(true)}>
        <AntDesign
          name="calendar"
          size={20}
          color="black"
          style={{ marginRight: 5 }}
        />
        <Text style={{ marginLeft: 8 }}>
          {formData.date.toLocaleDateString()}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          mode="single"
          date={formData.date}
          onChange={(params) => {
            handleChange('date', params.date);
            setShowDatePicker(false);
          }}
        />
      )}

      {/* Agent Dropdown */}
      <StyledText className="text-lg font-bold mb-2">Agent</StyledText>
      <Dropdown
        data={agentOptions.map((item) => ({ label: item, value: item }))}
        labelField="label"
        valueField="value"
        placeholder="Select Agent"
        value={formData.agent}
        onChange={(item) => handleChange('agent', item.value)}
        className="mb-4 border border-gray-300 rounded p-3"
      />

      {/* Region Dropdown */}
      <StyledText className="text-lg font-bold mb-2">Region</StyledText>
      <Dropdown
        data={regionOptions.map((item) => ({ label: item, value: item }))}
        labelField="label"
        valueField="value"
        placeholder="Select Region"
        value={formData.region}
        onChange={(item) => handleChange('region', item.value)}
        className="mb-4 border border-gray-300 rounded p-3"
      />

      {/* MultiSelect Institutions */}
      <StyledText className="text-lg font-bold mb-2">Institutions</StyledText>
      <MultiSelect
        data={institutionOptions}
        labelField="label"
        valueField="value"
        placeholder="Select Institutions"
        value={formData.institutions}
        onChange={(item) => handleChange('institutions', item)}
        className="mb-4 border border-gray-300 rounded p-3"
      />
    </StyledView>
  );
}
