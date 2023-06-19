import { View, Image, StyleSheet, Text, Dimensions, useWindowDimensions, ScrollView } from "react-native";
import Title from "../components/ui/Title";
import PrimaryButton from "../components/ui/PrimaryButton";

function GameOverScreen({roundsNumber, userNumber, onStartNewGame}){
    const { width, height } = useWindowDimensions();
    
    let imageSize = 300; // imagesize default
    if(width < 380){
        imageSize = 150;
    }

    if(height < 400){
        imageSize = 80;
    }

    const imageStyle = { // merge it with main style
        width : imageSize,
        height : imageSize,
        borderRadius : imageSize / 2,
    };

    return (
        <ScrollView style={styles.screen}>

        <View style={styles.rootContainer}>
        <Title>GAME OVER!</Title>
        <View style={[styles.imageContainer,imageStyle]}>
        <Image style={styles.image} source={require('../assets/images/image5.jpg')}/>
        </View>
        <Text style={styles.summaryText}>
        Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess the number
        <Text style={styles.highlight}> {userNumber}</Text>
        </Text>
        <PrimaryButton onPress={onStartNewGame}>Start new game</PrimaryButton>
    </View>
    </ScrollView>

    );
    
}

export default GameOverScreen;

// const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    screen:{
      flex: 1
    },
    rootContainer:{
      flex:1,
      padding:23,
      justifyContent:'center',
      alignItems:'center',
    },
    imageContainer:{
        // width: deviceWidth < 380 ? 150 : 300,
        // height: deviceWidth < 380 ? 150 : 300,
        // borderRadius:  deviceWidth < 380 ? 75 : 150,
        //we will add width,height dynamically
        borderWidth:3,
        borderColor:'maroon',
        overflow:'hidden',
        margin:36
    },
    image:{
        width:'100%',
        height:'110%',
    },
    summaryText:{
        fontSize:20,
        textAlign:'center',
        marginBottom:20
    },
    highlight:{
        color:'brown',
        fontWeight:'bold'
    }
});