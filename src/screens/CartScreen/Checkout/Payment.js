import { View, Text, ScrollView, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import { Picker } from '@react-native-picker/picker'
import Icon from '@expo/vector-icons/FontAwesome'

const methods = [
    {name: 'Cash on Delivery', value: 1},
    {name: 'Bank Transfer', value: 2},
    {name: 'Card Payment', value: 3}
]

const paymentCards = [
    {name: 'Wallet', value: 1},
    {name: 'Visa', value: 2},
    {name: 'MasterCard', value: 3},
    {name: 'Other', value: 4}
]

const Payment = (props) => {

    const order = props.route.params;

    const [selected, setSelected] = useState();
    const [card, setCard] = useState();

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.textContainer}>Choose your payment method</Text>
            </View>
            <View>
                {methods.map((item, index) => {
                    return(
                        <TouchableOpacity key={item.name} onPress={() => setSelected(item.value)}>
                            <View style={styles.pickerContainer}>
                                <Text style={styles.pickerTextContainer}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
                {selected == 3 ? (
                    <Picker
                        mode='dropdown'
                        style={styles.picker}
                        iosIcon={<Icon name={'arrow-down'} />}
                        selectedValue={card}
                        onValueChange={(x) => setCard(x)}
                    >
                        {paymentCards.map((c, index) => {
                            return <Picker.Item
                                    key={c.name} 
                                    label={c.name} 
                                    value={c.name}/>
                        })}
                    </Picker>
                ) : null}
                <View style={{marginTop: 60, alignSelf: 'center'}}>
                        <Button 
                            title={'Confirm'}
                            onPress={() => props.navigation.navigate('Confirm', {order})}/>
                </View>
            </View>
        </View>
    )
}

export default Payment

const styles = StyleSheet.create({
    picker: {
      marginVertical: 10,
      width: 300,
      padding: 10,
      borderWidth: 1,
      borderColor: "#666",
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        fontSize: 25,
        margin: 20,
        textAlign: 'center'
    },
    pickerContainer: {
        margin: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'orange'
    },
    pickerTextContainer: {
        fontSize: 15,
        fontWeight: 'bold'
    }
  })