import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, View, Text } from "react-native";
import { icons } from "@/constants";
// import { SignOutButton } from "@/components/SignOutButton";

const TabIcon = ({
  source,
  focused,
  label,
}: {
  source: ImageSourcePropType;
  focused: boolean;
  label: string;
}) => (
  <View
    className={`flex flex-row justify-center items-center   ${focused ? "bg-general-300" : ""}`}
  >
    <View
      className={`flex items-center justify-center  w-[85] h-[65] ${focused ? "bg-[#1D4ED8]" : "bg-transparent"}`}
    >
      <Image
        source={source}
        tintColor="white"
        resizeMode="contain"
        className="w-7 h-7"
      />
      <Text
        style={{
          color: focused ? "white" : "#d6dade",
          fontFamily: "Poppins-Bold",
          fontSize: 12,
          marginTop: 3,
        }}
      >
        {label}
      </Text>
    </View>
  </View>
);

export default function Layout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#333333",
          // borderTopLeftRadius: 40,
          // borderTopRightRadius: 40,
          height: 65,
          marginBottom: 0,
          paddingBottom: 0, // iOS only
          overflow: "hidden",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Route Planner",
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#1D4ED8",
          },
          headerTitleStyle: {
            fontFamily: "Poppins-Bold",
            fontSize: 24,
            color: "white",
          },
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.route} focused={focused} label={"Route"} />
          ),
        }}
      />

      <Tabs.Screen
        name="daily"
        options={{
          title: "Daily Report",
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#1D4ED8",
          },
          headerTitleStyle: {
            fontFamily: "Poppins-Bold",
            fontSize: 24,
            color: "white",
          },
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.list} focused={focused} label={"Daily"} />
          ),
        }}
      />

      <Tabs.Screen
        name="hcp"
        options={{
          title: "HCP",
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#1D4ED8",
          },
          headerTitleStyle: {
            fontFamily: "Poppins-Bold",
            fontSize: 24,
            color: "white",
          },
          tabBarIcon: ({ focused }) => (
            <TabIcon
              source={icons.healthData}
              focused={focused}
              label={"HCP"}
            />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="institution"
        options={{
          title: "Institutions",
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#1D4ED8",
          },
          headerTitleStyle: {
            fontFamily: "Poppins-Bold",
            fontSize: 24,
            color: "white",
          },
          tabBarIcon: ({ focused }) => (
            <TabIcon
              source={icons.home}
              focused={focused}
              label={"Institutions"}
            />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#1D4ED8",
          },
          headerTitleStyle: {
            fontFamily: "Poppins-Bold",
            fontSize: 24,
            color: "white",
          },
          tabBarIcon: ({ focused }) => (
            <TabIcon
              source={icons.profile}
              focused={focused}
              label={"Profile"}
            />
          ),
          // headerRight: () => <SignOutButton />, // Use the updated SignOutButton here
        }}
      />
    </Tabs>
  );
}
