import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message'

import { Provider } from 'react-redux'
import store from './src/redux/store';

import Auth from './src/Context/store/Auth';

import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import ProductScreen from './src/screens/ProductScreen/ProductScreen'
import Header from './src/Shared/Header';
import Main from './src/navigators/Main';

export default function App() {
  return (
    <Auth>
      <Provider store={store}>
        <NavigationContainer>
            <Main/>
            <Toast ref={(ref) => Toast.setRef(ref)}/>
        </NavigationContainer>
      </Provider>
    </Auth>
  )
}
