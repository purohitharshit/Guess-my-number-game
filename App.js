import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// import { useFonts } from 'expo-font';
// import AppLoading from 'expo-app-loading';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  //we can use the userNumber state to either render the StartGameScreen if we do not have userNumber yet or render the gameScreen if we have the UserNumber
  const [gameIsOver, setGameIsOver] = useState(true);
  // inital value is set as true because when game isn't started it is a kind of gameOver
  const [guessRounds, setGuessRounds] = useState(0);

  //**for custom fonts */
  //  const [fontsLoaded] = useFonts({
  //   'open-sans' : require('./assets/fonts/OpenSans-Regular.ttf'),
  //   'open-sans-bold' : require('./assets/fonts/OpenSans-Bold.ttf'),
  //  });

  //  if(!fontsLoaded){
  //   return <AppLoading/>
  //  }

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  function GameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds)
  }

  function startNewGameHandler() {
    setUserNumber(null);
    setGuessRounds(0);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} /> // set screen by default to StartGameScreen
  // 'onPickNumber' is a custom prop and name is upto the developer
  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={GameOverHandler} />
  }

  if (gameIsOver && userNumber) {
    // if gameOver is truthy and the userNumber is choosen(to ensure that this screen do not appears at beginning of game) then set 'screen' to 'GameOverScreen'
    screen = <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds} onStartNewGame={startNewGameHandler} />
  }


  return (
    <LinearGradient colors={['#814141', '#ddb52f']} style={styles.rootScreen}>
      {/* use LinearGradient instead of view to use gradient colors */}
      <ImageBackground
        source={require('./assets/images/bg.png')}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        {/* ImageBackground renders image in background instead of foreground as 'image' component do */}
        {/* <StartGameScreen /> */}
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        {/* the main goal of SafeAreaView component is to render content within the safe area boundaries of a device. */}
        {/**IMP***  render error will appear if there are comments in the return statement line */}
      </ImageBackground>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  rootScreen: {
    //** note : views takes only space as much needed.In order to solve this we make flex=1 */
    flex: 1, // it takes as much space as available
  },
  backgroundImage: {
    opacity: 0.15,
  }
});
