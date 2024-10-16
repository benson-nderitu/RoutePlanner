import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { FAB } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons'; // Importing icons

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
      <WebView
        ref={webViewRef} // Set the reference
        style={styles.webView}
        source={{
          uri: 'https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAANAAf9rZzVUM1czODc3UUtCVlNYT00wTUVVTFZMNEc5SC4u',
        }}
      />
      <FAB
        style={styles.fab}
        icon={() => (
          <Ionicons
            name="refresh"
            size={24}
            color="white"
          />
        )} // Using the refresh icon
        onPress={reloadWebView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 44,
    margin: 10,
  },
  webView: {
    height: '100%',
  },
  fab: {
    position: 'absolute',
    margin: 0,
    right: 5,
    top: 200,
    backgroundColor: '#0286ff',
    borderRadius: 50,
  },
});

export default App;
