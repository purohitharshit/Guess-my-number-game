import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert, FlatList, useWindowDimensions } from "react-native";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
//refer official documentation of expo icons

import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton"
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
  //exclude parameter ...excludes that number entered by the user at the first time...so that phone doesnt win right in the first round
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  // Math.random selects a random number between [0,1)
  // 'min' is added at last so that if floor function returns 0, final random number is not zero

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}
let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess])
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (currentGuess === userNumber)
      onGameOver(guessRounds.length);
    // guessRounds.length is the number of items in the guessRounds array and it is also the number of round device took to guess the number
  }, [currentGuess, userNumber, onGameOver]);
  // inside last braces are 'dependencies' which indicates that when these 3 changes the above mentioned effect will be executed

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, [])
  // the above useEffect is in L-29
  function nextGuessHandler(direction) { // direction -> 'lower' or 'higher'
    if ((direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
      // this means the user is lying and it turns infinite loop on which throws an error
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: 'Sorry!', style: 'cancel' },
      ]);
      return;
    }
    if (direction === 'lower') {
      //if we have to select lower no. then the no we choose attains maxBoundary(assumes)
      maxBoundary = currentGuess;
    }
    else {
      minBoundary = currentGuess + 1;
    }
    const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
    setCurrentGuess(newRndNumber);
    setGuessRounds(prevGuessRounds => [newRndNumber, ...prevGuessRounds]);
  }
  const guessRoundsListLength = guessRounds.length;
  // this is recalculated every time when component is reevaluated(when a new round is added)

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  if (width > 500) {
    // width>500 is landscape mode
    content =
      <>
        {/* <InstructionText style={styles.instructionText}> Higher or lower</InstructionText> */}
        {/* here in landscape mode higher/lower will not be shown */}
        <View style={styles.buttonsContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
              <FontAwesome name="minus" size={24} color="yellow" />
            </PrimaryButton>
          </View>

          <NumberContainer>{currentGuess}</NumberContainer>

          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
              <FontAwesome name="plus" size={24} color="yellow" />
            </PrimaryButton>
          </View>
        </View>
      </>

  }


  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {/* <Title> is here a custom component,user defined */}
      {content}
      <View style={styles.listContainer}>
        {/* {guessRounds.map(guessRounds =><Text key={guessRounds}>{guessRounds}</Text>)} */}
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => <GuessLogItem roundNumber={guessRoundsListLength - itemData.index}
            guess={itemData.item} />}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
    // in between <View> </View> and <Text> </Text> values must be there else will show render error.They must not be empty
  );

}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1, //content takes all available space
    padding: 20,
    marginTop: 20,
    alignContent: 'center',
  },
  instructionText: {
    marginBottom: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
  buttonsContainerWide: {
    flexDirection: 'row',
    alignItems: 'center' // everything is vertically center
  }
});