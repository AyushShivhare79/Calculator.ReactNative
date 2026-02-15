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
import { Parser } from 'expr-eval';

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
  const [isResultActive, setIsResultActive] = useState(false);

  const handleClick = (item: string) => {
    switch (item) {
      case '=':
        handleCalculation();
        setIsResultActive(true);
        break;
      case 'C':
        setEvaluation('');
        setSol('');
        setIsResultActive(false);
        break;
      case '⌫':
        if (isResultActive) {
          setEvaluation('');
          setSol('');
        } else {
          setEvaluation(evaluation.substring(0, evaluation.length - 1));
        }
        setIsResultActive(false);
        break;

      default:
        if (isResultActive) {
          const isOperator = ['+', '-', 'x', '÷', '%'].includes(item);
          if (isOperator) {
            setEvaluation(sol + item);
          } else {
            setEvaluation(item);
          }
          setSol('');
        } else {
          setEvaluation(prev => prev + item);
        }
        setIsResultActive(false);
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

    setSol(Parser.evaluate(updatedEvaluation).toString());
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screenContainer}>
        <SafeAreaView style={styles.displaySection}>
          <SafeAreaView style={styles.displayContent}>
            <TextInput
              editable={false}
              value={evaluation}
              style={isResultActive ? styles.inactiveText : styles.activeText}
              keyboardType="numeric"
            />
            <TextInput
              editable={false}
              value={sol.toString()}
              style={isResultActive ? styles.activeText : styles.inactiveText}
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
    justifyContent: 'flex-end',
    height: '45%',
  },
  displayContent: {
    alignItems: 'flex-end',
    padding: 10,
  },
  activeText: { color: 'white', fontSize: 40 },
  inactiveText: { color: '#616569', fontSize: 30 },
  keypadSection: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calculatorButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
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
  buttonText: { fontSize: 20, color: 'white' },
  keypadGrid: { gap: 14, padding: 10 },
  keypadRow: { gap: 20,  },
});

export default App;
