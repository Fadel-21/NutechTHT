import { StyleSheet, Text, View, Button } from 'react-native'
import React, {useState} from 'react'
import FormContainer from '../../Shared/Form/FormContainer'
import Input from '../../Shared/Form/Input'
import Error from '../../Shared/Error'
import Toast from 'react-native-toast-message'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import axios from 'axios'

const RegisterScreen = (props) => {
  
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const register = () => {
    if(
      email === '' ||
      firstName === '' ||
      lastName === '' ||
      password === ''
      ) {
        setError('Pleas fill in the form correctly')
      }
    let user = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      // isAdmin: false
    }

  axios
    .post(`https://tht-api.nutech-integrasi.app/registration`, user)
    .then((res) => {
      if (res.status == 200) {
        Toast.show({
          topOffset: 60,
          type: 'success',
          text1: 'Registration Succeed',
          text2: 'Please login into your account'
        })
        setTimeout(() => {
          props.navigation.navigate('Login');
        }, 500);
      }
    })
    .catch((error) => {
      Toast.show({
        topOffset: 60,
        type: 'error',
        text1: 'Something went wrong',
        text2: 'Please try again',
      });
    });
  }

  return (
    <View style={{marginTop: 50}}>
      <KeyboardAwareScrollView
        viewIsInsideTabBar={true}
        extraHeight={200}
        enableOnAndroid={true}
      >
        <FormContainer title={'Register'}>
          <Input
            placeholder={'Email'}
            name={'email'}
            id={'email'}
            onChangeText={(text) => setEmail(text.toLowerCase())}
          />
          <Input
            placeholder={'First Name'}
            name={'firstName'}
            id={'firstName'}
            onChangeText={(text) => setFirstName(text)}
          />
          <Input
            placeholder={'Last Name'}
            name={'lastName'}
            id={'lastName'}
            onChangeText={(text) => setLastName(text)}
          />
          <Input
            placeholder={'Password'}
            name={'password'}
            id={'password'}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
          <View style={styles.buttonGroup}>
            {error ? <Error message={error}/> : null}
          </View>
          <View>
            <Button title={'Register'}
              onPress={() => register()}
            />
          </View>
          <View>
            <Button title={'Back to Login'} onPress={
              () => props.navigation.navigate('Login')
            }/>
          </View>
        </FormContainer>
      </KeyboardAwareScrollView>
    </View>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  buttonGroup: {
    width: '80%',
    margin: 10,
    alignItems: 'center'
  }
})