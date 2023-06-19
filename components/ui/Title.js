import { Text, StyleSheet} from "react-native";


//inside function 'Title' passing parameter here is known as object destructuring
function Title({children}){
    return <Text style={styles.title}> {children} </Text>
    // children prop is recieving its value from StartGameScreen.js
}

export default Title;

const styles = StyleSheet.create({
    title:{
        // fontFamily:'open-sans-bold',
        fontSize: 24,
        color:'white',
        textAlign: 'center',
        borderWidth: 2,
        borderColor: 'white',
        padding: 12,
        margin: 12,
        // maxWidth: '80%'
        // width:300,
    }
});