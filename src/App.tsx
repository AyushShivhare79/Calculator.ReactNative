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
    'C',
    '%',
    '⌫',
    '/',
    7,
    8,
    9,
    '×',
    4,
    5,
    6,
    '−',
    1,
    2,
    3,
    '+',
    0o0,
    0,
    '.',
    '=',
  ];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ backgroundColor: 'black', height: '100%' }}>
        <SafeAreaView
          style={{ height: '45%', borderWidth: 2, borderColor: 'white' }}
        >
          <Text style={{ color: 'white' }}>asdf</Text>
        </SafeAreaView>

        <SafeAreaView
          style={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FlatList
            data={data}
            numColumns={4}
            horizontal={false}
            columnWrapperStyle={{ gap: 10 }}
            contentContainerStyle={{ gap: 14, padding: 10 }}
            renderItem={({ item }) => {
              return (
                <SafeAreaView
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 70,
                    height: 70,
                    borderRadius: 50,
                    backgroundColor:
                      typeof item === 'number' ? '#333333' : '#616569',
                  }}
                >
                  <Text style={{ fontSize: 16, color: 'white' }}>{item}</Text>
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
