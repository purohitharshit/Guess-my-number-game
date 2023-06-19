import { TextInput, View, StyleSheet, Alert, Text, useWindowDimensions, KeyboardAvoidingView, ScrollView } from "react-native";
import { useState } from 'react';

// useWindowDimensions is a hook which help us to set dimension dynamically

import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

function StartGameScreen({ onPickNumber }) {
  const [enteredNumber, setEnteredNumber] = useState();

  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText);
  }

  function resetInputHandler() {
    setEnteredNumber('');
  }

  const { width, height } = useWindowDimensions(); // setting width and height dynamically

  function confirmInputHandler() {
    const chosenNumber = parseInt(enteredNumber);//The parseInt method parses a value as a string and returns the first integer.

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      //...show alert 
      Alert.alert('Invalid Number!', 'Number must be between 1 and 99',
        [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
      );
      return;
    }
    onPickNumber(chosenNumber);
  }
  const marginTopDistance = height < 450 ? 30 : 100; // define it(marginTop : marginTopDistance) inside 'style' of View


  return (
    <ScrollView>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        {/* //behavior property is set to adjust keyboard on landscape mode but it works only when keyBoardAvoidingView is wrapped inside ScrollView*/}
        <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
          <Title>Guess My Number</Title>
          {/* Title  is the custom component(imported from title.js) */}
          <Card>
            <InstructionText>Enter a number</InstructionText>
            <TextInput
              style={styles.numberInput}
              maxLength={2}
              keyboardType="number-pad"
              onChangeText={numberInputHandler}
              value={enteredNumber}
            //**IMP**  we bind enteredNumber with the value of 'textinput',so if we change enteredNumber the 'value' in the input will be changed
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={resetInputHandler}>RESET</PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                {/* // a view takes as much space as needed by its content */}
                <PrimaryButton onPress={confirmInputHandler}>CONFIRM</PrimaryButton>
                {/* 'onPress' prop here should match with 'value' of onPress attribute in PrimaryButton function and parameter of PrimaryButton function */}
                {/* // when we press this button confirmInputHandler function will be executed */}

              </View>
            </View>
          </Card>

        </View>
      </KeyboardAvoidingView>
    </ScrollView>
    // KeyboardAvoidingView also allows us to remove the keyboard on tapping anywhere on the screen while keyboard is on
  )
}

export default StartGameScreen;

const styles = StyleSheet.create({
  screen: { // the screen is added to adjust keyBoardAvoidingView 
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    // marginTop: 80,
    alignItems: 'center' // align items across cross axis
  },
  numberInput: {
    height: 50,
    width: 50,
    textAlign: 'center', // to put 'text' in center of that particular container
    fontSize: 32,
    borderBottomColor: '#ddb52f',
    borderBottomWidth: 2,
    color: '#ddb52f',
    marginVertical: 8,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  }
});
