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
import { evaluate } from 'mathjs';

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
  const [sol, setSol] = useState('');

  const handleClick = (item: string) => {
    switch (item) {
      case '=':
        handleCalculation();
        break;
      case 'C':
        setEvaluation('');
        setSol('');
        break;
      case '⌫':
        setEvaluation(evaluation.substring(0, evaluation.length - 1));
        break;

      default:
        setEvaluation(prev => prev + item);
        break;
    }
  };

  const handleCalculation = () => {
    if (!evaluation) return Alert.alert('Please enter!');
    const updatedEvaluation = evaluation
      .split('x')
      .join('*')
      .split('÷')
      .join('/');

    setSol(evaluate(updatedEvaluation));
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screenContainer}>
        <SafeAreaView style={styles.displaySection}>
          <SafeAreaView style={styles.displayContent}>
            <TextInput
              editable={false}
              value={evaluation}
              style={styles.displayText}
              keyboardType="numeric"
            />
            <TextInput
              editable={false}
              value={sol.toString()}
              style={styles.displayText}
              keyboardType="numeric"
            />
          </SafeAreaView>
        </SafeAreaView>

        <SafeAreaView style={styles.keypadSection}>
          <FlatList
            data={data}
            numColumns={4}
            horizontal={false}
            columnWrapperStyle={styles.keypadRow}
            contentContainerStyle={styles.keypadGrid}
            renderItem={({ item }) => {
              const isNumber =
                typeof item === 'number' || item === '00' || item === '.';

              return (
                <TouchableOpacity
                  onPress={() => {
                    handleClick(item.toString());
                  }}
                >
                  <SafeAreaView
                    style={[
                      styles.calculatorButton,
                      isNumber
                        ? styles.numberButton
                        : item === '='
                        ? styles.calculateButton
                        : styles.operatorButton,
                    ]}
                  >
                    <Text style={styles.buttonText}>{item}</Text>
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
  screenContainer: { backgroundColor: 'black', height: '100%' },
  displaySection: {
    position: 'relative',
    height: '45%',
    borderWidth: 2,
    borderColor: 'white',
  },
  displayContent: { position: 'absolute', right: 0, bottom: 0 },
  displayText: { color: 'white', fontSize: 40 },
  keypadSection: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calculatorButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  numberButton: {
    backgroundColor: '#333333',
  },
  operatorButton: {
    backgroundColor: '#616569',
  },
  calculateButton: {
    backgroundColor: '#FF7034',
  },
  buttonText: { fontSize: 16, color: 'white' },
  keypadGrid: { gap: 14, padding: 10 },
  keypadRow: { gap: 10 },
});

export default App;
