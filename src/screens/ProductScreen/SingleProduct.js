import { 
    StyleSheet, 
    Text, 
    View,
    Image,
    ScrollView,
    Button 
} from 'react-native'
import React, { useState } from 'react'

import * as actions from '../../redux/actions/cartActions'
import { connect } from 'react-redux';
import Toast from 'react-native-toast-message'

const SingleProduct = (props) => {
  
    const [item, setItem] = useState(props.route.params.item);
    const [availability, setAvailability] = useState('');

    return (
        <View style={styles.container}>
            <ScrollView style={{ marginBottom: 80, padding: 5 }}>
                <View>
                    <Image 
                        source={{
                            uri: item.image ? 
                            item.image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                        }}
                        resizeMode='contain'
                        style={styles.image}
                    />
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.contentHeader}>{item.name}</Text>
                    <Text style={styles.contentText}>{item.brand}</Text>
                </View>
            </ScrollView>
            <View style={styles.bottomContainer}>
                <Text style={styles.price}>${item.price}</Text>
                <Button 
                    title='Add' 
                    style={styles.buttonAdd}
                    onPress={() => {props.addItemToCart(item),
                        Toast.show({
                            topOffset: 60,
                            type: 'success',
                            text1: `${item.name} added to Cart`,
                            text2: 'Go to your cart to complete order'
                        })
                    }}
                />
            </View>
        </View>
    )
}

const mapToDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) => 
            dispatch(actions.addToCart({quantity: 1, product}))
    }
}

export default connect(null, mapToDispatchToProps)(SingleProduct);

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: '100%',
    },
    imageContainer: {
        backgroundColor: 'white',
        padding: 0,
        margin: 0
    },
    image: {
        width: '100%',
        height: 350
    },
    contentContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentHeader: {
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 20      
    },
    contentText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // position: 'absolute',
        // bottom: 0,
        // left: 0,
        backgroundColor: 'white'
    },
    price: {
        fontSize: 24,
        margin: 20,
        color: 'red'
    },
    buttonAdd: {
        // position: 'absolute',
        // left: -20,      
    }
})