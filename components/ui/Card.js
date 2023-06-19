import { Text , View, StyleSheet, Dimensions} from "react-native";
// dimensions API is used for making app responsive
function Card({children}){
    return  <View style={styles.card}>{children}</View>;
}

export default Card;

const deviceWidth = Dimensions.get('window').width
//get takes two arguement : screen:takes entire width and height, window:excludes status bar

const styles = StyleSheet.create({
    card: { 
        // flex:1, // element here takes as much space as it can
        justifyContent: 'center', // center items along vertical axis
        alignItems: 'center', // centre items along horizental
        marginTop: deviceWidth < 380 ? 30 : 46,
        padding: 16,
        backgroundColor: '#4A0404',
        marginHorizontal: 16,
        borderRadius: 8,
        elevation: 6, // for box shadow
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 2,
      },
});