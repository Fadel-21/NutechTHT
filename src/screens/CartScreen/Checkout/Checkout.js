import { StyleSheet, Text, View, Button } from 'react-native'
import React, {useEffect, useState} from 'react'
import Icon from '@expo/vector-icons/FontAwesome'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'
import {Picker} from '@react-native-picker/picker';

import FormContainer from '../../../Shared/Form/FormContainer'
import Input from '../../../Shared/Form/Input'

const countries = require('../../../assets/data/countries.json')

const Checkout = (props) => {
  
  const [ orderItems, setOrderItems ] = useState();
  const [ address, setAddress ] = useState();
  const [ city, setCity ] = useState();
  const [ zip, setZip ] = useState();
  const [ country, setCountry ] = useState();
  const [ phone, setPhone ] = useState();

  useEffect(() => {
    setOrderItems(props.cartItems)

    return () => {
      setOrderItems();
    }
  }, [])

  const checkOut = () => {
    let order = {
      city,
      country,
      dateOrdered: Date.now(),
      orderItems,
      phone,
      ShippingAddress: address,
      zip,
    }
    props.navigation.navigate('Payment', {order: order})
  }

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title='Shipping Address'>
        <Input
          placeholder={'Phone'}
          name={'phone'}
          value={phone}
          keyboardType={'numeric'}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={'Shipping Address'}
          name={'ShippingAddress'}
          value={address}
          keyboardType={'default'}
          onChangeText={(text) => setAddress(text)}
        />
        <Input
          placeholder={'City'}
          name={'city'}
          value={city}
          keyboardType={'default'}
          onChangeText={(text) => setCity(text)}
        />
        <Input
          placeholder={'Zip Code'}
          name={'zip'}
          value={zip}
          keyboardType={'numeric'}
          onChangeText={(text) => setZip(text)}
        />
          <Picker
            mode='dropdown'
            iosIcon={<Icon name='arrow-down' color={'#007aff'}/>}
            style={styles.picker}
            selectedValue={country}
            // placeholder='Select your country'
            // placeholderStyle={{color: '#007aff'}
            // placeholderIconColor='#007aff'
            onValueChange={(e) => setCountry(e)}
          >
            {countries.map((c) => {
              return <Picker.Item
                      key={c.code}
                      label={c.name}
                      value={c.name}
                      />
            })}
          </Picker>
        <View style={{width: '80%', alignItems: 'center'}}>
          <Button title='Confirm' onPress={() => checkOut()}/>
        </View>
      </FormContainer>

    </KeyboardAwareScrollView>
  )
}

const mapStateToProps = (state) => {
  const {cartItems} = state;
  return {
    cartItems: cartItems
  }
}

export default connect(mapStateToProps)(Checkout)

const styles = StyleSheet.create({
  picker: {
    marginVertical: 10,
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: "#666",
  }
})