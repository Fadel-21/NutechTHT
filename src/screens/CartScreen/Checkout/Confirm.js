import { Button, StyleSheet, Text, View, Dimensions, ScrollView, Image, FlatList } from 'react-native'
import React from 'react'

import {connect} from 'react-redux'
import * as actions from '../../../redux/actions/cartActions'
import Toast from 'react-native-toast-message'

var {height, width} = Dimensions.get('window')

const Confirm = (props) => {

    const confirmOrder = () => {
        setTimeout(() => {
            props.clearCart();
            props.navigation.navigate('Cart')
        }, 500)
    }

    const confirm = props.route.params

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                    Confirm Order
                </Text>
                {props.route.params ?
                <View style={{borderWidth: 1, borderColor: 'orange'}}>
                    <Text style={styles.shipping}>Shipping to:</Text>
                    <View style={{padding: 8}}>
                        <Text>Address: {confirm.order.order.ShippingAddress}</Text>
                        <Text>City: {confirm.order.order.city}</Text>
                        <Text>Zip Code: {confirm.order.order.zip}</Text>
                        <Text>Country: {confirm.order.order.country}</Text>
                    </View>
                    <Text style={styles.title}>Items:</Text>
                    {confirm.order.order.orderItems.map((x) => {
                        return (
                            <View
                                style={styles.listItem}
                                key={x.product.name}
                            >
                                <Image source={{uri: x.product.image}} style={styles.avatar}/>
                                <View style={styles.body}>
                                    <Text>{x.product.name}</Text>
                                    <Text>${x.product.price}</Text>
                                </View>
                            </View>
                        )
                    })}
                </View>
                : null }
                <View style={{alignItems: 'center', margin: 20}}>
                    <Button title={'Place order'} onPress={() => {confirmOrder(),
                        Toast.show({
                            topOffset: 60,
                            type: 'success',
                            text1: 'Payment Successfull',
                            text2: 'Thanks for your shipping'
                        })
                    }}/>
                </View>
            </View>
        </ScrollView>
  )
}

const mapDispatchToProps = (dispatch) => {
    return{
        clearCart: () => dispatch(actions.clearCart())
    }
}

export default connect(null, mapDispatchToProps)(Confirm)

const styles = StyleSheet.create({
    container: {
        height: height,
        padding: 8,
        alignContent: 'center',
        backgroundColor: 'white'
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8
    },
    shipping: {
        alignSelf: 'center',
        margin: 8,
        fontSize: 16,
        fontWeight: 'bold'
    },
    title: {
        alignSelf: 'center',
        margin: 8,
        fontSize: 16,
        fontWeight: 'bold'
    },
    listItem: {
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
        width: width / 1.2,
        
    },
    body: {
        margin: 10,
        // flexDirection: 'row',
    },
    avatar: {
        height: 35,
        width: 35,
        position: 'absolute',
        left: 10
    }  
})