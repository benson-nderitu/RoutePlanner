import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "react-native-ui-datepicker";
import AntDesign from "@expo/vector-icons/AntDesign";
import dayjs from "dayjs";
import { SafeAreaView } from "react-native-safe-area-context";
import DropdownComponent from "@/components/Dropdown";
import MultiSelectComponent from "@/components/Multiselect-Dropdown";
import CustomButton from "@/components/CustomButton";

import Toast from "react-native-toast-message";
import ToastConfig from "../../../utils/toastconfig";

import institutionsData from "../../data/Institutions.json";
import InputComponent from "@/components/FormInputField";

interface Agent {
  label: string;
  value: string;
}
interface Region {
  label: string;
  value: string;
}
interface Institution {
  label: string;
  value: number;
}

export default function Page() {
  const [territory, setTerritory] = useState(null);
  const [month, setMonth] = useState(null);
  const [week, setWeek] = useState(null);
  const [day, setDay] = useState(null);
  const [date, setDate] = useState(dayjs());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [agent, setAgent] = useState<string | null>(null);
  const [region, setRegion] = useState<string | null>(null);
  const [filteredRegions, setFilteredRegions] = useState<Region[]>([]);
  const [institution, setInstitution] = useState<string[]>([]);
  const [filteredInstitutions, setFilteredInstitutions] = useState<
    Institution[]
  >([]);
  const [isFocus, setIsFocus] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const toastRef = useRef(null);

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

  // Extracting unique agents, regions, and institutions from JSON data
  useEffect(() => {
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
          value: item.ID, // Since `ID` is a unique identifier for institutions
        }));
      setFilteredInstitutions(associatedInstitutions);
      setInstitution([]); // Reset institution selection
    } else {
      setFilteredInstitutions([]); // Clear institutions if no region is selected
    }
  }, [region]);

  const handleInstitutionChange = (selectedItems: any) => {
    setInstitution(selectedItems);
  };

  const submitForm = () => {
    if (
      !(
        territory &&
        month &&
        week &&
        day &&
        agent &&
        region &&
        institution.length > 0
      )
    ) {
      setLoading(false);
      Toast.show({
        text1: "Error❕: All Fields Required",
        text2: "Please fill all the fields before submitting.",
        type: "error",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
      });
      return;
    }
    // if (institution.length === 0) {
    //   setLoading(false);
    //   Toast.show({
    //     text1: "Multiselect Error❕: All Fields Required",
    //     text2: "Please fill all the fields before submitting.",
    //     type: "error",
    //     position: "top",
    //     visibilityTime: 3000,
    //     autoHide: true,
    //   });
    //   return;
    // }

    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // post data
    const raw = JSON.stringify({
      row: [
        territory,
        month,
        weeks.find((w) => w.value === week)?.label,
        day,
        dayjs(date).format("DD/MM/YYYY"),
        agent,
        region,
        institution?.join(", "),
      ],
    });

    console.log(raw);

    const requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch("https://typingsprint.com/row", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        Toast.show({
          text1: "Success ✔",
          text2: "Form submitted successfully",
          type: "success",
          position: "top",
          visibilityTime: 3000,
          autoHide: true,
          onHide: () => {
            // Reset the form after successful submission
            setTerritory(null);
            setMonth(null);
            setWeek(null);
            setDay(null);
            setDate(dayjs());
            setAgent(null);
            setRegion(null);
            setInstitution([]);
          },
        });
      })
      .catch((error) => {
        setLoading(false);
        Toast.show({
          text1: "Error ❕❕",
          text2: error.message,
          type: "error",
          position: "top",
          visibilityTime: 3000,
          autoHide: true,
        });
      });

    // end post
  };

  return (
    <View>
      <StatusBar barStyle="light-content" />
      <SafeAreaView className="bg-[#e9effc]">
        <SignedIn>
          <ScrollView>
            <View className="pl-4 pr-4">
              <View className="items-left pl-3 mb-4">
                <Text className="text-sm font-PoppinsLight">
                  <Text className="text-red-600 text-[20px]">*</Text> All the
                  Fields are Required
                </Text>
              </View>

              {/* Territory Dropdown */}
              <DropdownComponent
                label="Territory"
                valueField="value"
                data={territories}
                placeholder="Select Territory"
                value={territory}
                onChangeValue={(item: any) => setTerritory(item)}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color={isFocus ? "blue" : "black"}
                    name="Safety"
                  />
                )}
              />

              <InputComponent
                placeholder="Enter your name"
                onPress={(value) => console.log("Pressed with value:", value)}
              />

              <View className="mb-[14px] bg-white rounded-[10px]">
                <Text className="absolute bg-white text-[#4c4c4c] left-[22px] top-2 z-[999] px-2 text-[10px] font-PoppinsRegular">
                  Name
                </Text>
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
                    className="flex flex-row  rounded-[8px] bg-white px-2 mb-[14px] border-[0.5px] border-gray-300 font-PoppinsRegular"
                  >
                    <AntDesign
                      name="user"
                      style={styles.icon}
                      color={isFocus ? "blue" : "black"}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Month Dropdown */}
              <DropdownComponent
                label="Month"
                valueField="value"
                data={months}
                placeholder="Select Month"
                value={month}
                onChangeValue={(item: any) => setMonth(item)}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color={isFocus ? "blue" : "black"}
                    name="calendar"
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
                onChangeValue={(item: any) => setWeek(item)}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color={isFocus ? "blue" : "black"}
                    name="calendar"
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
                onChangeValue={(item: any) => setDay(item)}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color={isFocus ? "blue" : "black"}
                    name="calendar"
                  />
                )}
              />

              <View className="mb-[14px] bg-white rounded-[10px]">
                <Text className="absolute bg-white text-[#4c4c4c] left-[22px] top-2 z-[999] px-2 text-[10px] font-PoppinsRegular">
                  Date
                </Text>

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
                    className="flex flex-row  rounded-[8px] bg-white px-2 mb-[14px] border-[0.5px] border-gray-300 font-PoppinsRegular"
                    onPress={() => setShowDatePicker(true)}
                  >
                    <AntDesign
                      name="calendar"
                      style={styles.icon}
                      color={isFocus ? "blue" : "black"}
                    />
                    <Text className="font-PoppinsRegular text-[16px] text-[#475A99] ml-[5px]">
                      {dayjs(date).format("DD/MM/YYYY")}
                    </Text>
                  </TouchableOpacity>

                  {showDatePicker && (
                    <DateTimePicker
                      mode="single"
                      date={date}
                      onChange={(params) => {
                        setDate(dayjs(params.date));
                        setShowDatePicker(false);
                      }}
                    />
                  )}
                </View>
              </View>

              {/* Agent Name Dropdown */}
              <DropdownComponent
                label="Name"
                data={agents}
                placeholder={!isFocus ? "Select your Name" : "..."}
                dropdownStyle={[
                  styles.dropdown,
                  isFocus && { borderColor: "blue" },
                ]}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color={isFocus ? "blue" : "black"}
                    name="user"
                  />
                )}
                value={agent}
                onChangeValue={(value) => {
                  setAgent(value);
                  setIsFocus(false);
                }}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
              />

              {/* Region Dropdown */}
              <DropdownComponent
                label="Regions"
                data={filteredRegions}
                placeholder={!isFocus ? "Select Region" : "..."}
                dropdownStyle={[
                  styles.dropdown,
                  isFocus && { borderColor: "blue" },
                ]}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color={isFocus ? "blue" : "black"}
                    name="enviromento"
                  />
                )}
                value={region}
                onChangeValue={(value) => {
                  // Updated to match the prop name
                  setRegion(value);
                  setIsFocus(false);
                }}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
              />

              {/* Institution Multi-Select */}
              <MultiSelectComponent
                style={[isFocus && { borderColor: "blue" }]}
                label="Institutions"
                data={filteredInstitutions}
                placeholder={!isFocus ? "Select Institution(s)" : "..."}
                onChangeValue={handleInstitutionChange}
                value={institution}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color={isFocus ? "blue" : "black"}
                    name="home"
                  />
                )}
              />
            </View>

            <View className="items-center justify-center bg-transparent pb-4">
              {/* Toast component */}
              <ToastConfig />

              {/* Loading(Spinner) Indicator */}
              {loading && (
                <View className="flex-row justify-center items-center mb-0 mt-5">
                  <ActivityIndicator size="large" color="#1D4ED8" />
                  <Text className="ml-2 font-PoppinsItalic">
                    Sending your data...
                  </Text>
                </View>
              )}

              <CustomButton
                title={"Submit"}
                className="w-11/12 mb-[50px] mt-[50px] rounded-[8px]"
                onPress={() => {
                  // Call the submitForm function to send data and show response
                  submitForm();
                }}
              />
            </View>
            <View className="h-12 mb-10 bg-transparent"></View>
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
  icon: {
    marginRight: 10,
    fontSize: 20,
  },
});
