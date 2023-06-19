import { View ,Text, StyleSheet} from "react-native";

function GuessLogItem({roundNumber, guess}){
   return(
    <View style={styles.listItem}>
        <Text style={styles.itemText}>#{roundNumber}</Text>
        <Text style={styles.itemText}>Opponent's guess: {guess}</Text>
    </View>
   );
}

export default GuessLogItem;

const styles = StyleSheet.create({
    listItem:{
        borderColor:'#8B0000',
        borderWidth:1,
        borderRadius: 40,
        padding:12,
        marginVertical: 8,
        backgroundColor:'#C19A6B',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        elevation: 4, // for shadow

    },
    itemText:{
       fontWeight:'bold',
    }
});