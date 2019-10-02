import React from 'react'
import {
  Text,
  View,
  Button,
  ActivityIndicator,
  AsyncStorage,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import ProductionsActions from 'App/Stores/Productions/Actions'
import Style from './ProductionsScreenStyle'

class ProductionsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Lệnh sản xuất',
    }
  }
  constructor() {
    super()
  }
  componentDidMount() {
    this._fetchProductions()
  }

  showArrayItem = (item) => {
    this.props.navigation.navigate('ProductionDetailScreen', { id: item.id })
  }

  render() {
    // console.log(this.props)
    return (
      <View style={Style.container}>
        {this.props.productionsIsLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View>
            {this.props.productionsErrorMessage ? (
              <View>
                <Text style={Style.error}>{this.props.productionsErrorMessage}</Text>
                <Button onPress={() => this._fetchProductions()} title="Refresh" />
              </View>
            ) : (
              <View>
                <ScrollView>
                  {this.props.productions.map((item, key) => (
                    <TouchableOpacity key={key} onPress={this.showArrayItem.bind(this, item)}>
                      <Text style={Style.result}> {item.name} </Text>

                      <Text style={Style.result}> Số lượng = {item.productQty} </Text>

                      <Text style={Style.result}> Đơn vị: {item.productUom} </Text>

                      <View style={{ width: '100%', height: 1, backgroundColor: '#000' }} />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        )}
      </View>
    )
  }

  _fetchProductions() {
    this.props.fetchProductions()
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear()
    this.props.navigation.navigate('Auth')
  }
}

ProductionsScreen.propTypes = {
  productions: PropTypes.array,
  productionsIsLoading: PropTypes.bool,
  productionsErrorMessage: PropTypes.string,
  fetchProductions: PropTypes.func,
  liveInEurope: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  productions: state.productionsReducer.productions,
  productionsIsLoading: state.productionsReducer.productionsIsLoading,
  productionsErrorMessage: state.productionsReducer.productionsErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  fetchProductions: () => dispatch(ProductionsActions.fetchProductions()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductionsScreen)
