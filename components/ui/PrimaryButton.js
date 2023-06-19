import { View, Text, Pressable, StyleSheet } from "react-native";

function PrimaryButton({ children ,onPress}) {
// when we press this button confirmInputHandler function will be executed
   return (
      <View style={styles.buttonOuterContainer}>
      <Pressable 
      style={styles.buttonInnerContainer}
      onPress={onPress} // value should be same as passed as parameter to the function,i;e, 'onPress'
      android_ripple={{color: 'gray'}}
      >
         <Text style={styles.buttonText}>{children} </Text>
         {/* or {props.children} if props is passed as parameter to PrimaryButton */}
      </Pressable>
      </View>
   )
}

export default PrimaryButton;

const styles = StyleSheet.create({
   buttonOuterContainer:{
      borderRadius: 28,
      margin:4,
      overflow:'hidden',
   },
   buttonInnerContainer:{
      backgroundColor:'#72063c',
      paddingVertical:8,
      paddingHorizontal:16,
      elevation:3, 
   },
   buttonText:{
      // this would not change properties of 'text' inside buttonText,because it do not supports inheritance,so you will have to define css of 'text' separately
      color: 'white',
      textAlign: 'center',
   }
})