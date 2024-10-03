import { StyleSheet, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

// npx expo install react-native-webview

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{
          uri: 'https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAANAAf9rZzVUQ0VINTBGNlRDN1dRRDJHSTdLTjVYMUZKUC4u',
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
