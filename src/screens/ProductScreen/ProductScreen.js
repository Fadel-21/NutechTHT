import { 
    StyleSheet, 
    View,
    ActivityIndicator,
    FlatList,
    Text 
} from 'react-native'
import React, {useEffect, useState} from 'react'

import ProductList from './ProductList'

const data = require('../../assets/data/products.json');

const ProductScreen = (props) => {
  
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(data);

        return () => {
            setProducts([])
        }
    })

    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Product</Text>
            </View>
            <View style={{ marginTop: 100}}>
                <FlatList
                    numColumns={2}
                    horizontal={false}
                    data={products}
                    renderItem={({item}) => <ProductList
                    navigation={props.navigation}
                    key={item._id}
                    item={item}/>}
                    keyExtractor={item => item.name}
                />
            </View>
        </View>
    )
}

export default ProductScreen

const styles = StyleSheet.create({
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 150,
        top: 50
    },
    textHeader: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})