import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Image,
  TextInput
} from 'react-native';


import Style from './SignInScreenStyle'
import { Images } from 'App/Theme'

export default class SignInScreen extends React.Component {
    static navigationOptions = {
      title: 'Woodsland management system',
    };
  
    render() {
      return (
        <View style={Style.container}>
          <View style={Style.logoContainer}>
              <Image style={Style.logo} source={Images.logo} resizeMode={'contain'} />
            </View>
                  <TextInput

          
          placeholder={'Username'}

        />
        <TextInput

          
          placeholder={'Password'}
          secureTextEntry={true}

        />
          <Button title="Sign in!" onPress={this._signInAsync} />
        </View>
      );
    }
  
    _signInAsync = async () => {
      await AsyncStorage.setItem('userToken', 'abc');
      this.props.navigation.navigate('App');
    };
  }