import { StyleSheet, Text, View, ScrollView, Button } from 'react-native'
import React, {useContext, useState, useCallback, } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {useEffect} from 'react/cjs/react.development'
import axios from 'axios'
import AuthGlobal from '../../Context/store/AuthGlobal'
import { logoutUser, getUserProfile } from '../../Context/actions/Auth.actions'

const UserScreen = (props) => {
    
  const context = useContext(AuthGlobal)
  const [userProfile, setUserProfile] = useState()

  useEffect(() => {
    if(
      context.stateUser.isAuthenticated === false ||
      context.stateUser.isAuthenticated === null      
    ) {
      props.navigation.navigate('Login')
    }

    AsyncStorage.getItem('jwt')
      .then((res) => {
        axios
          .get(`https://tht-api.nutech-integrasi.app/getProfile`, {
            headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiRzNRajhyYnFReU9nQ1J1TUtjLTBzRHNtOTBwWUg2Y0JmVDRidUJkNXRIVE5FNWZjeGFISkNnZVdZZ2tNQ2xoN242TERlbnZFYWpDT0V6WElaeDdUM01SWWtFamdSUmpOdDBoaFZJTlRHWkxZZDMzV0FneTRuRlZuVDRTc3czWHpUQVZoQ19hc1JNMW40ZC1rX2VhTDRnPT0iLCJpYXQiOjE2NjI3MjA5NDgsImV4cCI6MjU1NjExODc5OH0.6vqqgO7T7kEihDqlKxVRAvI6egXNBE3NyqwRei9WIT8`},
          })
          .then((user) => setUserProfile(user.data))
      })
      .catch((error) => console.log(error))

    return () => {
      setUserProfile();
    }

  }, [context.stateUser.isAuthenticated])

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>
          User Profile
        </Text>
        <Text style={{fontSize: 30}}>
          {userProfile ? userProfile.email : ''}
        </Text>
        <View style={{marginTop: 20}}>
          <Text style={{margin: 10}}>
            First Name: {userProfile ? userProfile.first_name : ''}
          </Text>
          <Text style={{margin: 10}}>
            Last Name: {userProfile ? userProfile.last_name : ''}
          </Text>
        </View>
        <View style={{marginTop: 80}}>
          <Button title={'Sign Out'} onPress={() => [
            AsyncStorage.removeItem('jwt'),
            logoutUser(context.dispatch)
          ]}/>
        </View>
      </ScrollView>
    </View>
  )
}

export default UserScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 150
  }
})