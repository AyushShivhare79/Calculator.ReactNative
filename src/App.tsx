/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

function App() {
  const data = [
    'C',
    '%',
    '⌫',
    '÷',
    7,
    8,
    9,
    'x',
    4,
    5,
    6,
    '-',
    1,
    2,
    3,
    '+',
    '00',
    0,
    '.',
    '=',
  ];

  const [evaluation, setEvaluation] = useState('');
  const [sol, setSol] = useState(0);

  const handleClick = (item: string) => {
    switch (item) {
      case '=':
        handleCalculation();
        break;
      case 'C':
        setEvaluation('');
        break;
      case '⌫':
        setEvaluation(evaluation.substring(0, evaluation.length - 1));
        break;

      default:
        break;
    }
    if (item.toString() === '=');
    setEvaluation(prev => prev + item.toString());
  };

  const handleCalculation = () => {
    if (!evaluation) return Alert.alert('Please enter!');
    const updatedEvaluation = evaluation
      .split('x')
      .join('*')
      .split('÷')
      .join('/');

    setSol(eval(updatedEvaluation));
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ backgroundColor: 'black', height: '100%' }}>
        <SafeAreaView
          style={{
            position: 'relative',
            height: '45%',
            borderWidth: 2,
            borderColor: 'white',
          }}
        >
          <SafeAreaView style={{ position: 'absolute', right: 0, bottom: 0 }}>
            <TextInput
              editable={false}
              value={evaluation}
              style={{ color: 'white', fontSize: 40 }}
              keyboardType="numeric"
            />
            <TextInput
              editable={false}
              value={sol.toString()}
              style={{ color: 'white', fontSize: 40 }}
              keyboardType="numeric"
            />
          </SafeAreaView>
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
                <TouchableOpacity
                  onPress={() => {
                    handleClick(item.toString());
                  }}
                >
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
                </TouchableOpacity>
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
