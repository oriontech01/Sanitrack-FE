import React from 'react'
import {View, Text, Button} from 'react-native'

const SignUp = ({navigation}) => {
  return (
    <View>
       <Text>
         SignUp  
       </Text>
       <Button
        title="Login"
         onPress={() =>
          navigation.navigate('Login')
        }
         />
    </View>
  )
}

export default SignUp