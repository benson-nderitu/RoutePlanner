import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  const [refreshing, setRefreshing] = useState(false);
  const [webViewKey, setWebViewKey] = useState(0); // Key to reload WebView

  const onRefresh = () => {
    setRefreshing(true);
    // Update the key to force reload the WebView
    setWebViewKey(webViewKey + 1);
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        contentContainerStyle={{ flexGrow: 1 }} // Ensures ScrollView takes up full height
      >
        {/* Wrap WebView in a View to control height */}
        <View style={styles.webViewContainer}>
          <WebView
            key={webViewKey} // Use key to reload the WebView
            source={{
              uri: 'https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAANAAf9rZzVUQ0VINTBGNlRDN1dRRDJHSTdLTjVYMUZKUC4u',
            }}
            style={styles.webView} // Set a height for the WebView
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 44,
    margin: 10,
  },
  webViewContainer: {
    height: '100%', // Set height to allow for scrolling
  },
  webView: {
    height: '100%', // Fill the container
  },
});
