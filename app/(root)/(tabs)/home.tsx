import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Dropdown from '@/components/Dropdown';
import DateTimePicker from 'react-native-ui-datepicker';
import AntDesign from '@expo/vector-icons/AntDesign';
import dayjs from 'dayjs';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '@/components/CustomButton';

export default function Page() {
  const [date, setDate] = useState(dayjs());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [territory, setTerritory] = useState(null);
  const [month, setMonth] = useState(null);
  const [week, setWeek] = useState(null);
  const [day, setDay] = useState(null);
  const [agent, setAgent] = useState(null);
  const [region, setRegion] = useState(null);
  const [institution, setInstitution] = useState([]);

  // Dropdown Data
  const territories = [
    { label: 'Lion', value: 'lion' },
    { label: 'Giraffe', value: 'giraffe' },
    { label: 'Cheetah', value: 'cheetah' },
  ];

  const months = [
    { label: 'January', value: 'January' },
    { label: 'February', value: 'February' },
    { label: 'March', value: 'March' },
    // ... add more months
  ];

  const weeks = [
    { label: 'Week 1', value: '1' },
    { label: 'Week 2', value: '2' },
    { label: 'Week 3', value: '3' },
    { label: 'Week 4', value: '4' },
    { label: 'Week 5', value: '5' },
  ];

  const days = [
    { label: 'Sunday', value: 'Sunday' },
    { label: 'Monday', value: 'Monday' },
    { label: 'Tuesday', value: 'Tuesday' },
    { label: 'Wednesday', value: 'Wednesday' },
    { label: 'Thursday', value: 'Thursday' },
    { label: 'Friday', value: 'Friday' },
    { label: 'Saturday', value: 'Saturday' },
  ];

  const agents = [
    { label: 'Agent A', value: 'Agent A' },
    { label: 'Agent B', value: 'Agent B' },
    { label: 'Agent C', value: 'Agent C' },
  ];

  const regions = [
    { label: 'Region 1', value: 'Region 1' },
    { label: 'Region 2', value: 'Region 2' },
    { label: 'Region 3', value: 'Region 3' },
  ];

  const institutions = [
    { label: 'Institution 1', value: 'Institution 1' },
    { label: 'Institution 2', value: 'Institution 2' },
    { label: 'Institution 3', value: 'Institution 3' },
  ];

  const handleInstitutionChange = (selectedItems: any) => {
    setInstitution(selectedItems);
  };

  return (
    <View>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={{
          backgroundColor: 'white',
        }}>
        <SignedIn>
          <ScrollView>
            <View className="items-center  bg-primary-500 p-5">
              <Text className="text-2xl font-bold"> Route Planner Form</Text>
            </View>

            <View className="pl-4 pr-4">
              <View className="items-left p-2 mt-2 mb-2">
                <Text>Hi, Welcome</Text>
              </View>

              {/* Territory Dropdown */}
              <Dropdown
                label="Territory"
                valueField="value"
                data={territories}
                placeholder="Select Territory"
                value={territory}
                onChange={(item) => setTerritory(item.value)}
              />

              {/* Month Dropdown */}
              <Dropdown
                label="Month"
                valueField="value"
                data={months}
                placeholder="Select Month"
                value={month}
                onChange={(item) => setMonth(item.value)}
              />

              {/* Week Dropdown */}
              <Dropdown
                label="Week"
                valueField="value"
                data={weeks}
                placeholder="Select Week"
                value={week}
                onChange={(item) => setWeek(item.value)}
              />

              {/* Day Dropdown */}
              <Dropdown
                label="Day"
                valueField="value"
                data={days}
                placeholder="Select Day"
                value={day}
                onChange={(item) => setDay(item.value)}
              />

              {/* Date Picker */}
              <View style={{ padding: 16 }}>
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
                    {date.format('DD/MM/YYYY')}
                  </Text>
                </TouchableOpacity>

                {showDatePicker && (
                  <DateTimePicker
                    mode="single"
                    date={date}
                    onChange={(params) => {
                      setDate(params.date);
                      setShowDatePicker(false);
                    }}
                  />
                )}
              </View>

              {/* Agent Dropdown */}
              <Dropdown
                label="Agent Name"
                valueField="value"
                data={agents}
                placeholder="Select Agent"
                value={agent}
                onChange={(item) => setAgent(item.value)}
              />

              {/* Region Dropdown */}
              <Dropdown
                label="Region"
                valueField="value"
                data={regions}
                placeholder="Select Region"
                value={region}
                onChange={(item) => setRegion(item.value)}
              />

              {/* Institution Multi-Select */}
              <Dropdown
                label="Institutions"
                valueField="value"
                data={institutions}
                placeholder="Select Institution(s)"
                value={institution}
                multiple={true}
                onChange={handleInstitutionChange}
              />
            </View>
            <View className="items-center justify-center">
              <CustomButton
                title={'Submit'}
                className="w-11/12 mt-5 mb-[120px]"
              />
            </View>
          </ScrollView>
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in">
            <Text>Sign In</Text>
          </Link>
        </SignedOut>
      </SafeAreaView>
    </View>
  );
}
