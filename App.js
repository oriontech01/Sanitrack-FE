import { StyleSheet, Text, View, Button } from 'react-native';
import NavigationStack from './util/NavigationStack';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default function App() {
  return (
      <NavigationStack/>
  );
}


