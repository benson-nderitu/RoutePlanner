import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from "react-native";
import DateTimePicker from "react-native-ui-datepicker";
import AntDesign from "@expo/vector-icons/AntDesign";
import dayjs from "dayjs";
import { SafeAreaView } from "react-native-safe-area-context";
import DropdownComponent from "@/components/Dropdown";
import MultiSelectComponent from "@/components/Multiselect-Dropdown"; // Import MultiSelectComponent
import CustomButton from "@/components/CustomButton";
import { Dropdown } from "react-native-element-dropdown";

import institutionsData from "../../data/Institutions.json";

interface FormDataType {
  territory: string;
  month: string;
  week: string;
  day: string;
  date: string;
  Name: string;
  region: string;
  institutions: string;
}

// Type for dropdown options
interface DropdownOption {
  label: string;
  value: string;
}

interface Institution {
  label: string;
  value: number; // or string, based on your data structure
}

// Define the type for associated regions
interface Region {
  label: string;
  value: string;
}

// Define the type for agents
interface Agent {
  label: string;
  value: string;
}
export default function Page() {
  const [date, setDate] = useState(dayjs());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [territory, setTerritory] = useState(null);
  const [month, setMonth] = useState(null);
  const [week, setWeek] = useState(null);
  const [day, setDay] = useState(null);

  // State for Dropdown Data
  const [filteredInstitutions, setFilteredInstitutions] = useState<
    Institution[]
  >([]);
  const [filteredRegions, setFilteredRegions] = useState<Region[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [institution, setInstitution] = useState<Institution | null>(null);
  const [region, setRegion] = useState<string | null>(null);
  const [agent, setAgent] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  // Extracting unique agents, regions, and institutions from JSON data
  useEffect(() => {
    // Extract unique agents from institutionsData
    const uniqueAgents = Array.from(
      new Set(institutionsData.map((item) => item.Agent)),
    ).map((agent) => ({
      label: agent,
      value: agent,
    }));
    setAgents(uniqueAgents);
  }, []);

  useEffect(() => {
    if (agent) {
      const associatedRegions = Array.from(
        new Set(
          institutionsData
            .filter((item) => item.Agent === agent)
            .map((item) => item.Region),
        ),
      ).map((region) => ({
        label: region,
        value: region,
      }));
      setFilteredRegions(associatedRegions);
      setRegion(null); // Reset region selection
      setInstitution([]); // Reset institution selection
      setFilteredInstitutions([]); // Reset institutions when agent changes
    } else {
      setFilteredRegions([]); // Clear regions if no agent is selected
    }
  }, [agent]);

  useEffect(() => {
    if (region) {
      const associatedInstitutions = institutionsData
        .filter((item) => item.Region === region)
        .map((item) => ({
          label: item.Institution,
          value: item.ID, // Assuming `ID` is a unique identifier
        }));
      setFilteredInstitutions(associatedInstitutions);
      setInstitution([]); // Reset institution selection
    } else {
      setFilteredInstitutions([]); // Clear institutions if no region is selected
    }
  }, [region]);

  // Dropdown Data
  const territories = [
    { label: "Lion", value: "lion" },
    { label: "Giraffe", value: "giraffe" },
    { label: "Cheetah", value: "cheetah" },
  ];

  const months = [
    { label: "January", value: "January" },
    { label: "February", value: "February" },
    { label: "March", value: "March" },
    { label: "April", value: "April" },
    { label: "May", value: "May" },
    { label: "June", value: "June" },
    { label: "July", value: "July" },
    { label: "August", value: "August" },
    { label: "September", value: "September" },
    { label: "October", value: "October" },
    { label: "November", value: "November" },
    { label: "December", value: "December" },
  ];

  const weeks = [
    { label: "Week 1", value: "1" },
    { label: "Week 2", value: "2" },
    { label: "Week 3", value: "3" },
    { label: "Week 4", value: "4" },
    { label: "Week 5", value: "5" },
  ];

  const days = [
    { label: "Monday", value: "Monday" },
    { label: "Tuesday", value: "Tuesday" },
    { label: "Wednesday", value: "Wednesday" },
    { label: "Thursday", value: "Thursday" },
    { label: "Friday", value: "Friday" },
    { label: "Saturday", value: "Saturday" },
    { label: "Sunday", value: "Sunday" },
  ];

  const handleInstitutionChange = (selectedItems: any) => {
    setInstitution(selectedItems);
  };

  return (
    <View>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={{
          backgroundColor: "#e5e5e5",
        }}
      >
        <SignedIn>
          <ScrollView>
            <View style={styles.containerheader}>
              <Text style={styles.headerText}>Route Planner Form</Text>
            </View>

            <View className="pl-4 pr-4">
              {/* <View className="items-left p-2 mt-2 mb-2">
                <Text>Hi, Welcome</Text>
              </View> */}

              {/* Territory Dropdown */}
              <DropdownComponent
                label="Territory"
                valueField="value"
                data={territories}
                placeholder="Select Territory"
                value={territory}
                onChange={(item) => setTerritory(item.value)}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color={isFocus ? "blue" : "black"}
                    name="Safety"
                    size={20}
                  />
                )}
              />

              {/* Month Dropdown */}
              <DropdownComponent
                label="Month"
                valueField="value"
                data={months}
                placeholder="Select Month"
                value={month}
                onChange={(item) => setMonth(item.value)}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color={isFocus ? "blue" : "black"}
                    name="calendar"
                    size={20}
                  />
                )}
              />

              {/* Week Dropdown */}
              <DropdownComponent
                label="Week"
                valueField="value"
                data={weeks}
                placeholder="Select Week"
                value={week}
                onChange={(item) => setWeek(item.value)}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color={isFocus ? "blue" : "black"}
                    name="calendar"
                    size={20}
                  />
                )}
              />

              {/* Day Dropdown */}
              <DropdownComponent
                label="Day"
                valueField="value"
                data={days}
                placeholder="Select Day"
                value={day}
                onChange={(item) => setDay(item.value)}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color={isFocus ? "blue" : "black"}
                    name="calendar"
                    size={20}
                  />
                )}
              />

              <View
                style={{
                  backgroundColor: "white",
                  paddingBottom: 16,
                  marginBottom: 20,
                  borderRadius: 10,
                }}
              >
                {/* <Text
                  style={{
                    position: "absolute",
                    backgroundColor: "white",
                    color: "#4c4c4c",
                    left: 22,
                    top: 8,
                    zIndex: 999,
                    paddingHorizontal: 8,
                    fontSize: 10,
                    fontFamily: "Poppins-Regular",
                  }}
                >
                  Date
                </Text> */}

                {/* Date Picker */}
                <View style={{ padding: 16 }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      borderWidth: 0.5,
                      borderColor: "gray",
                      borderRadius: 8,
                      padding: 8,
                      marginBottom: 10,
                      height: 60,
                      paddingHorizontal: 8,
                    }}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <AntDesign
                      name="calendar"
                      size={20}
                      color="black"
                      style={{ marginRight: 5 }}
                    />
                    <Text
                      style={{
                        fontFamily: "Poppins-Regular",
                        fontSize: 16,
                        color: "#475A99",
                        marginLeft: 5,
                      }}
                    >
                      {dayjs(date).format("DD/MM/YYYY")}
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
              </View>

              {/* Agent Dropdown */}
              {/* <Dropdown
                label="Agent Name"
                valueField="value"
                data={agents}
                placeholder="Select Agent"
                value={agent}
                onChange={(item) => setAgent(item.value)}
              /> */}

              {/* Region Dropdown */}
              {/* <Dropdown
                label="Region"
                valueField="value"
                data={filteredRegions}
                placeholder="Select Region"
                value={region}
                onChange={(item) => {
                  setRegion(item.value);
                  setIsFocus(false);
                }}
              /> */}

              <View style={styles.container}>
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  itemTextStyle={styles.itemTextStyle}
                  iconStyle={styles.iconStyle}
                  data={agents}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? "Select agent" : "..."}
                  value={agent}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setAgent(item.value);
                    setIsFocus(false);
                  }}
                  renderLeftIcon={() => (
                    <AntDesign
                      style={styles.icon}
                      color={isFocus ? "blue" : "black"}
                      name="user"
                      size={20}
                    />
                  )}
                />
              </View>

              {/* Region Dropdown */}
              <View style={styles.container}>
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  itemTextStyle={styles.itemTextStyle}
                  iconStyle={styles.iconStyle}
                  data={filteredRegions}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? "Select region" : "..."}
                  value={region}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setRegion(item.value);
                    setIsFocus(false);
                  }}
                  renderLeftIcon={() => (
                    <AntDesign
                      style={styles.icon}
                      color={isFocus ? "blue" : "black"}
                      name="enviromento"
                      size={20}
                    />
                  )}
                />
              </View>

              {/* Institution Multi-Select */}
              <MultiSelectComponent
                label="Institutions"
                data={filteredInstitutions}
                placeholder="Select Institution(s)"
                onChangeValue={handleInstitutionChange}
                value={institution}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color={isFocus ? "blue" : "black"}
                    name="home"
                    size={20}
                  />
                )}
              />
            </View>
            <View className="items-center justify-center">
              <CustomButton
                title={"Submit"}
                className="w-11/12 mb-[50px] mt-[50px]"
              />
            </View>
            <View className="h-12 m-10"></View>
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

const styles = StyleSheet.create({
  containerheader: {
    alignItems: "center",
    backgroundColor: "#1D4ED8", // Replace with your primary color
    padding: 50,
    margin: 15,
    borderRadius: 10,
  },
  headerText: {
    fontSize: 28,
    fontFamily: "Poppins-Bold",
    color: "white",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
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
    marginBottom: 10,
    fontFamily: "Poppins-Regular",
  },
  icon: {
    marginRight: 10,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  itemTextStyle: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#000",
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    color: "#4c4c4c",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
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
    fontFamily: "Poppins-Regular",
  },
});
