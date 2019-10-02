import React, { Component } from 'react'
import { AsyncStorage, View, Button, StatusBar } from 'react-native';
import NavigationService from 'App/Services/NavigationService'
import Style from './SignOutScreenStyle'

export default class SignOutScreen extends Component {

    // componentWillMount() {
    //     AsyncStorage.clear();
    //     NavigationService.navigate('Auth');
    // }
    render(){
        return (
            <View style={Style.container}>
              <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
              <StatusBar barStyle="default" />
            </View>
          );
    }

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        NavigationService.navigate('Auth');
      };
}
