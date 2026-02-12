/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { FlatList, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

function App() {
  const data = [
    '00',
    '0',
    '.',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'C',
    '%',
    '/',
    'x',
    '-',
    '+',
    '=',
  ];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ backgroundColor: 'black', height: '100%' }}>
        <SafeAreaView style={{ borderWidth: 2, borderColor: 'white' }}>
          <Text style={{ color: 'white' }}>asdf</Text>
        </SafeAreaView>
        <SafeAreaView>
          <FlatList
            data={data}
            contentContainerStyle={{ flexDirection: 'row', gap: 10 }}
            renderItem={({ item }) => {
              return (
                <SafeAreaView
                  style={{
                    borderRadius: 20,
                    backgroundColor: 'darkgray',
                  }}
                >
                  <Text style={{ color: 'white' }}>{item}</Text>
                </SafeAreaView>
              );
            }}
          />
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
