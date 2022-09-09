import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import React from 'react'

var {height, width} = Dimensions.get('window')

const CartItem = (props) => {
    const data = props.item.item.product
    const [quantity, setQuantity] = useState(props.item.item.quantity)

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
                        uri: data.image 
                        ? data.image 
                        : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                        }}
                />
            </View>
            <View style={styles.body}>
                <View>
                    <Text>{data.name}</Text>
                    <Text>${data.price}</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default CartItem

const styles = StyleSheet.create({
    body: {
        margin: 10,
        // alignItems: 'center',
        // flexDirection: 'row',
    },
    listItem: {
        // alignItems: 'center',
        backgroundColor: 'white',
        // justifyContent: 'center' 
    },
    image: {
        width: width / 2 - 20 - 60,
        height: width / 2 - 20 - 70,
        backgroundColor: 'transparent',
        // position: 'absolute',
        // top: -45
    },
})