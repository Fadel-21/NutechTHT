import { StyleSheet, Image, Text, View, Dimensions, Button, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from '@expo/vector-icons/FontAwesome'
import { SwipeListView } from 'react-native-swipe-list-view'
import CartItem from './CartItem'

import { connect } from 'react-redux'
import * as actions from '../../redux/actions/cartActions'

var {height, width} = Dimensions.get('window')

const CartScreen = (props) => {
  
    var total = 0;
    props.cartItems.forEach(cart => {
        return (total += cart.product.price)
    })

    return (
    <>
        {props.cartItems.length ? (
            <ScrollView>
                <Text style={{alignSelf: 'center'}}>Cart</Text>
                {props.cartItems.map((data) => {
                    return (
                        <ScrollView
                            style={styles.listItem}
                            key={Math.random()}
                            // avatar
                        >
                            <View>
                                <Image
                                    style={styles.image}
                                    resizeMode='contain' 
                                    source={{
                                        uri: data.product.image 
                                        ? data.product.image 
                                        : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                                        }}
                                />
                            </View>
                            <View style={styles.body}>
                                <View>
                                    <Text>{data.product.name}</Text>
                                    <Text>${data.product.price}</Text>
                                </View>
                            </View>
                        </ScrollView>
                    )
                })}
                <View style={styles.bottomContainer}>
                    <View>
                        <Text style={styles.price}>${total}</Text>
                    </View>
                    <View style={styles.bottomBoxContainer}>
                        <Button title='Clear' style={styles.textButton} onPress={() => props.clearCart()}/>
                        <Button title='Checkout' onPress={() => props.navigation.navigate('Checkout')} style={styles.textButton}/>
                    </View>
                </View>
            </ScrollView>
        ) : (
            <View style={styles.emptyContainer}>
                <Text>Looks like your cart is empty</Text>
                <Text>Add products to your cart to get started</Text>
            </View>
        )}
    </>
  )
}

const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearCart: () => dispatch(actions.clearCart()),
        removeFromCart: (item) => dispatch(actions.removeFromCart(item))
    }
}

const styles = StyleSheet.create({
    emptyContainer: {
        height: height,
        alignItems: 'center',
        justifyContent: 'center'
    },
    listItem: {
        // alignItems: 'center',
        backgroundColor: 'white',
        // justifyContent: 'center' 
    },
    body: {
        margin: 10,
        // alignItems: 'center',
        // flexDirection: 'row',
    },
    perProduct: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    image: {
        width: width / 2 - 20 - 60,
        height: width / 2 - 20 - 70,
        backgroundColor: 'transparent',
        // position: 'absolute',
        // top: -45
    },
    bottomContainer: {
        flexDirection: 'row',
        // position: 'absolute',
        // bottom: 0,
        // left: 0,
        backgroundColor: 'white',
        elevation: 20
    },
    price: {
        fontSize: 18,
        margin: 20,
        color: 'red'
    },
    bottomBoxContainer: {
        flexDirection: 'row',
        // right: -120,
        marginLeft: 80,
        margin: 20,
    },
    textButton: {
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    hiddenContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    hiddenButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 25,
        height: 70,
        width: width / 1.2
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);