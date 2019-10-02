import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  Platform,
  TouchableOpacity,
  Button,
} from 'react-native'
import { connect } from 'react-redux'

export class ProductsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Sản phẩm',
      headerRight: (
        <Button onPress={null} title="+1" color={Platform.OS === 'ios' ? '#fff' : null} />
      ),
    }
  }
  constructor() {
    super()

    this.tmpArray = [
      { name: 'Pankaj', age: 10, class: 'M.C.A' },
      { name: 'Rita', age: 11, class: 'B.C.A' },
      { name: 'Mohan', age: 12, class: 'M.C.A' },
      { name: 'Amit', age: 13, class: 'M.C.A' },
      { name: 'Babulal', age: 14, class: 'B.TECH' },
      { name: 'Mohit', age: 15, class: 'B.C.A' },
      { name: 'Amit', age: 16, class: 'B.C.A' },
      { name: 'Ramkishan', age: 17, class: 'B.C.A' },
      { name: 'Gopal', age: 18, class: 'B.C.A' },
      { name: 'Jogesh', age: 19, class: 'B.C.A' },
      { name: 'Yogesh', age: 20, class: 'B.C.A' },
    ]
  }

  showArrayItem = (item) => {
    Alert.alert(item)
  }
  render() {
    return (
      <View style={styles.MainContainer}>
        <ScrollView>
          {this.tmpArray.map((item, key) => (
            <TouchableOpacity key={key} onPress={this.showArrayItem.bind(this, item.name)}>
              <Text style={styles.TextStyle}> Name = {item.name} </Text>

              <Text style={styles.TextStyle}> Age = {item.age} </Text>

              <Text style={styles.TextStyle}> Class = {item.class} </Text>

              <View style={{ width: '100%', height: 1, backgroundColor: '#000' }} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    margin: 2,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },

  TextStyle: {
    fontSize: 20,
    color: '#000',
    textAlign: 'left',
  },
})

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsScreen)
