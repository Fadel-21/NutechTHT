import { StyleSheet, Text, View, Button } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import FormContainer from '../../Shared/Form/FormContainer'
import Input from '../../Shared/Form/Input'
import Error from '../../Shared/Error'

import AuthGlobal from '../../Context/store/AuthGlobal'
import { loginUser } from '../../Context/actions/Auth.actions'

const LoginScreen = (props) => {
    const context = useContext(AuthGlobal)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        if(context.stateUser.isAuthenticated === true) {
            props.navigation.navigate('User Profile')
        }
    }, [context.stateUser.isAuthenticated])

    const handleSubmit = () => {
        const user = {
            email,
            password
        }
        if ( email === '' || password === '') {
            setError('Please fill in your credential')
        } else {
            loginUser(user, context.dispatch)
        }
    }

    return (
        <View style={{marginTop: 90}}>
            <FormContainer title={'Login'}>
                <Input
                    placeholder={'Enter email'}
                    name={'email'}
                    id={'email'}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    placeholder={'Enter Password'}
                    name={'password'}
                    id={'password'}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <View style={styles.buttonGroup}>
                    {error ? <Error message={error} /> : null}
                    <Button title='Login' onPress={() => handleSubmit()}/>
                </View>
                <View style={[{marginTop: 40}, styles.buttonGroup]}>
                    <Text style={styles.middleText}>Don't have an account ?</Text>
                    <Button title='Register' onPress={() => props.navigation.navigate('Register')}/>
                </View>
            </FormContainer>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    buttonGroup: {
        width: '80%',
        alignItems: 'center'
    },
    middleText: {
        marginBottom: 20,
        alignSelf: 'center'
    },
})