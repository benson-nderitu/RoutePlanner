import React, { useRef } from "react";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { StyleSheet, View, Text, StatusBar } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import { FAB } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons"; // Importing icons

const App: React.FC = () => {
  // Reference to the WebView
  const webViewRef = useRef<WebView>(null);

  const reloadWebView = () => {
    if (webViewRef.current) {
      webViewRef.current.reload(); // Reload the WebView
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1D4ED8" />
      <SignedIn>
        <WebView
          ref={webViewRef} // Set the reference
          style={styles.webView}
          source={{
            uri: "https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAANAAf9rZzVUM1czODc3UUtCVlNYT00wTUVVTFZMNEc5SC4u",
          }}
        />
        <FAB
          style={styles.fab}
          icon={() => <Ionicons name="refresh" size={25} color="white" />} // Using the refresh icon
          onPress={reloadWebView}
        />
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">
          <Text>Sign In</Text>
        </Link>
      </SignedOut>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginVertical: 25,
  },
  webView: {
    height: "100%",
  },
  fab: {
    position: "absolute",
    right: 5,
    top: 2,
    backgroundColor: "purple",
    borderRadius: 50,
  },
});

export default App;
