// import { SignedIn, SignedOut } from '@clerk/clerk-expo';
// import { Link } from 'expo-router';
// import React, { useState, useEffect } from 'react';
// import {
//   Text,
//   View,
//   ScrollView,
//   TouchableOpacity,
//   StatusBar,
// } from 'react-native';
// import DateTimePicker from 'react-native-ui-datepicker';
// import AntDesign from '@expo/vector-icons/AntDesign';
// import dayjs from 'dayjs';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Dropdown from '@/components/Dropdown';
// import MultiSelectComponent from '@/components/Multiselect-Dropdown'; // Import MultiSelectComponent
// import CustomButton from '@/components/CustomButton';

// import { StyleSheet } from 'react-native';
// import { Axios } from 'axios';
// import institutionsData from '../../data/Institutions.json';

// export default function Page() {
//   const [date, setDate] = useState(dayjs());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [territory, setTerritory] = useState(null);
//   const [month, setMonth] = useState(null);
//   const [week, setWeek] = useState(null);
//   const [day, setDay] = useState(null);

//   // State for Dropdown Data
//   const [agents, setAgents] = useState([]);
//   const [regions, setRegions] = useState([]);
//   const [filteredRegions, setFilteredRegions] = useState([]);
//   const [institutions, setInstitutions] = useState([]);
//   const [filteredInstitutions, setFilteredInstitutions] = useState([]);
//   const [agent, setAgent] = useState(null);
//   const [region, setRegion] = useState(null);
//   const [institution, setInstitution] = useState([]);
//   const [isFocus, setIsFocus] = useState(false);

//   // Extracting unique agents, regions, and institutions from JSON data
//   useEffect(() => {
//     // Extract unique agents from institutionsData
//     const uniqueAgents = Array.from(
//       new Set(institutionsData.map((item) => item.Agent))
//     ).map((agent) => ({
//       label: agent,
//       value: agent,
//     }));
//     setAgents(uniqueAgents);
//   }, []);

//   useEffect(() => {
//     if (agent) {
//       const associatedRegions = Array.from(
//         new Set(
//           institutionsData
//             .filter((item) => item.Agent === agent)
//             .map((item) => item.Region)
//         )
//       ).map((region) => ({
//         label: region,
//         value: region,
//       }));
//       setFilteredRegions(associatedRegions);
//       setRegion(null); // Reset region selection
//       setInstitution([]); // Reset institution selection
//       setFilteredInstitutions([]); // Reset institutions when agent changes
//     } else {
//       setFilteredRegions([]); // Clear regions if no agent is selected
//     }
//   }, [agent]);

//   useEffect(() => {
//     if (region) {
//       const associatedInstitutions = institutionsData
//         .filter((item) => item.Region === region)
//         .map((item) => ({
//           label: item.Institution,
//           value: item.ID, // Assuming `ID` is a unique identifier
//         }));
//       setFilteredInstitutions(associatedInstitutions);
//       setInstitution([]); // Reset institution selection
//     } else {
//       setFilteredInstitutions([]); // Clear institutions if no region is selected
//     }
//   }, [region]);

//   // Dropdown Data
//   const territories = [
//     { label: 'Lion', value: 'lion' },
//     { label: 'Giraffe', value: 'giraffe' },
//     { label: 'Cheetah', value: 'cheetah' },
//   ];

//   const months = [
//     { label: 'January', value: 'January' },
//     { label: 'February', value: 'February' },
//     { label: 'March', value: 'March' },
//     { label: 'April', value: 'April' },
//     { label: 'May', value: 'May' },
//     { label: 'June', value: 'June' },
//     { label: 'July', value: 'July' },
//     { label: 'August', value: 'August' },
//     { label: 'September', value: 'September' },
//     { label: 'October', value: 'October' },
//     { label: 'November', value: 'November' },
//     { label: 'December', value: 'December' },
//   ];

//   const weeks = [
//     { label: 'Week 1', value: '1' },
//     { label: 'Week 2', value: '2' },
//     { label: 'Week 3', value: '3' },
//     { label: 'Week 4', value: '4' },
//     { label: 'Week 5', value: '5' },
//   ];

//   const days = [
//     { label: 'Sunday', value: 'Sunday' },
//     { label: 'Monday', value: 'Monday' },
//     { label: 'Tuesday', value: 'Tuesday' },
//     { label: 'Wednesday', value: 'Wednesday' },
//     { label: 'Thursday', value: 'Thursday' },
//     { label: 'Friday', value: 'Friday' },
//     { label: 'Saturday', value: 'Saturday' },
//   ];

//   const handleInstitutionChange = (selectedItems: any) => {
//     setInstitution(selectedItems);
//   };

//   return (
//     <View>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView
//         style={{
//           backgroundColor: '#e5e5e5',
//         }}>
//         <SignedIn>
//           <ScrollView>
//             <View className="items-center bg-primary-500 p-5 m-3 rounded-lg">
//               <Text className="text-2xl font-bold color-white font-JakartaBold">
//                 Route Planner Form
//               </Text>
//             </View>

//             <View className="pl-4 pr-4">
//               <View className="items-left p-2 mt-2 mb-2">
//                 <Text>Hi, Welcome</Text>
//               </View>

//               {/* Territory Dropdown */}
//               <Dropdown
//                 label="Territory"
//                 valueField="value"
//                 data={territories}
//                 placeholder="Select Territory"
//                 value={territory}
//                 onChange={(item) => setTerritory(item.value)}
//               />

//               {/* Month Dropdown */}
//               <Dropdown
//                 label="Month"
//                 valueField="value"
//                 data={months}
//                 placeholder="Select Month"
//                 value={month}
//                 onChange={(item) => setMonth(item.value)}
//               />

//               {/* Week Dropdown */}
//               <Dropdown
//                 label="Week"
//                 valueField="value"
//                 data={weeks}
//                 placeholder="Select Week"
//                 value={week}
//                 onChange={(item) => setWeek(item.value)}
//               />

//               {/* Day Dropdown */}
//               <Dropdown
//                 label="Day"
//                 valueField="value"
//                 data={days}
//                 placeholder="Select Day"
//                 value={day}
//                 onChange={(item) => setDay(item.value)}
//               />

//               <View
//                 style={{
//                   backgroundColor: 'white',
//                   paddingBottom: 16,
//                   marginBottom: 20,
//                   borderRadius: 10,
//                 }}>
//                 <Text
//                   style={{
//                     position: 'absolute',
//                     backgroundColor: 'white',
//                     color: '#4c4c4c',
//                     left: 22,
//                     top: 8,
//                     zIndex: 999,
//                     paddingHorizontal: 8,
//                     fontSize: 14,
//                   }}>
//                   Date
//                 </Text>

//                 {/* Date Picker */}
//                 <View style={{ padding: 16 }}>
//                   <TouchableOpacity
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       borderWidth: 0.5,
//                       borderColor: 'gray',
//                       borderRadius: 8,
//                       padding: 8,
//                       marginBottom: 10,
//                       height: 50,
//                       paddingHorizontal: 8,
//                     }}
//                     onPress={() => setShowDatePicker(true)}>
//                     <AntDesign
//                       name="calendar"
//                       size={20}
//                       color="black"
//                       style={{ marginRight: 5 }}
//                     />
//                     <Text style={{ marginLeft: 8 }}>
//                       {date.format('DD/MM/YYYY')}
//                     </Text>
//                   </TouchableOpacity>

//                   {showDatePicker && (
//                     <DateTimePicker
//                       mode="single"
//                       date={date}
//                       onChange={(params) => {
//                         setDate(params.date);
//                         setShowDatePicker(false);
//                       }}
//                     />
//                   )}
//                 </View>
//               </View>

//               {/* Agent Dropdown */}
//               <Dropdown
//                 label="Agent Name"
//                 valueField="value"
//                 data={agents}
//                 placeholder="Select Agent"
//                 value={agent}
//                 onChange={(item) => setAgent(item.value)}
//               />

//               {/* Region Dropdown */}
//               <Dropdown
//                 label="Region"
//                 valueField="value"
//                 data={filteredRegions}
//                 placeholder="Select Region"
//                 value={region}
//                 onChange={(item) => setRegion(item.value)}
//               />

//               {/* Institution Multi-Select */}
//               <MultiSelectComponent
//                 label="Institutions"
//                 data={filteredInstitutions}
//                 placeholder="Select Institution(s)"
//                 onChangeValue={handleInstitutionChange}
//                 value={institution}
//               />

//               <Dropdown
//                 style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
//                 placeholderStyle={styles.placeholderStyle}
//                 selectedTextStyle={styles.selectedTextStyle}
//                 iconStyle={styles.iconStyle}
//                 data={agents}
//                 labelField="label"
//                 valueField="value"
//                 placeholder={!isFocus ? 'Select agent' : '...'}
//                 value={agent}
//                 onFocus={() => setIsFocus(true)}
//                 onBlur={() => setIsFocus(false)}
//                 onChange={(item) => {
//                   setAgent(item.value);
//                   setIsFocus(false);
//                 }}
//               />

//               {/* Region Dropdown */}
//               <Dropdown
//                 style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
//                 placeholderStyle={styles.placeholderStyle}
//                 selectedTextStyle={styles.selectedTextStyle}
//                 iconStyle={styles.iconStyle}
//                 data={filteredRegions}
//                 labelField="label"
//                 valueField="value"
//                 placeholder={!isFocus ? 'Select region' : '...'}
//                 value={region}
//                 onFocus={() => setIsFocus(true)}
//                 onBlur={() => setIsFocus(false)}
//                 onChange={(item) => {
//                   setRegion(item.value);
//                   setIsFocus(false);
//                 }}
//               />

//               {/* Institutions MultiSelect */}
//               <MultiSelect
//                 style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
//                 placeholderStyle={styles.placeholderStyle}
//                 selectedTextStyle={styles.selectedTextStyle}
//                 iconStyle={styles.iconStyle}
//                 data={filteredInstitutions}
//                 labelField="label"
//                 valueField="value"
//                 placeholder={!isFocus ? 'Select institution(s)' : '...'}
//                 value={institution}
//                 onFocus={() => setIsFocus(true)}
//                 onBlur={() => setIsFocus(false)}
//                 onChange={(item) => {
//                   setInstitution(item.value);
//                   setIsFocus(false);
//                 }}
//               />
//             </View>
//             <View className="items-center justify-center">
//               <CustomButton
//                 title={'Submit'}
//                 className="w-11/12 mb-[50px] mt-[50px]"
//               />
//             </View>
//             <View className="h-12 m-10"></View>
//           </ScrollView>
//         </SignedIn>
//         <SignedOut>
//           <Link href="/sign-in">
//             <Text>Sign In</Text>
//           </Link>
//         </SignedOut>
//       </SafeAreaView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#533483',
//     padding: 16,
//     justifyContent: 'center',
//     alignContent: 'center',
//   },
//   dropdown: {
//     height: 50,
//     borderColor: 'gray',
//     borderWidth: 0.5,
//     borderRadius: 8,
//     paddingHorizontal: 8,
//     marginBottom: 10,
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
//   placeholderStyle: {
//     fontSize: 16,
//   },
//   selectedTextStyle: {
//     fontSize: 16,
//   },
// });
