import React from 'react'
import { Text, View, Button, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import SelectedProductionActions from 'App/Stores/SelectedProduction/Actions'
import WorkordersActions from 'App/Stores/Workorders/Actions'
import { StyleSheet } from 'react-native'
import Fonts from 'App/Theme/Fonts'
import ApplicationStyles from 'App/Theme/ApplicationStyles'
import WorkorderList from '../Workorders/WorkorderList'

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
    if (this.props.navigation.state.params && this.props.navigation.state.params.id) {
      const { id } = this.props.navigation.state.params
      this._fetchProduction(id)
      this._fetchWorkorders(id)
    }
  }

  showArrayItem = (item) => {
    this.props.navigation.navigate('Products')
  }

  render() {
    console.log('sjkdfjksdfkj sdfjksjdkfjsdkfjksdkfskdfjksdjfkjsdfjksdjfk')
    console.log(this.props)
    return (
      <View style={Style.container}>
        {this.props.productionIsLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View>
            {this.props.productionErrorMessage ? (
              <View>
                <Text style={Style.error}>{this.props.productionErrorMessage}</Text>
                <Button
                  onPress={() => this._fetchProduction(this.props.navigation.state.params.id)}
                  title="Refresh"
                />
              </View>
            ) : (
              <View>
                <Text>Số: {this.props.production.name}</Text>
                <View>
                  {this.props.workordersErrorMessage ? (
                    <View>
                      <Text style={Style.error}>{this.props.workordersErrorMessage}</Text>
                      <Button
                        onPress={() => this._fetchWorkorders(this.props.navigation.state.params.id)}
                        title="Refresh"
                      />
                    </View>
                  ) : (
                    <View></View>
                  )}
                </View>
                {this.props.workorders && this.props.workorders.length > 0 ? (
                  <WorkorderList workorders={this.props.workorders} />
                ) : (
                  <Button
                    onPress={() => this._fetchProductionTodo(this.props.navigation.state.params.id)}
                    title="Tạo lệnh làm việc"
                  />
                )}
              </View>
            )}
          </View>
        )}
      </View>
    )
  }

  _fetchProduction(id) {
    this.props.fetchProduction(id)
  }
  _fetchProductionTodo(id) {
    this.props.fetchProductionTodo(id)
    this.props.fetchWorkorders(id)
  }
  _fetchWorkorders(id) {
    this.props.fetchWorkorders(id)
  }

  _workcenterProductivitiesNumber(workcenterProductivities) {
    return workcenterProductivities.reduce((acc, item) => acc + item.qtyProduced, 0)
  }
}

ProductionsScreen.propTypes = {
  production: PropTypes.object,
  productionIsLoading: PropTypes.bool,
  productionErrorMessage: PropTypes.string,
  fetchProduction: PropTypes.func,
  saveProduction: PropTypes.func,
}

const mapStateToProps = (state) => ({
  production: state.selectedProductionReducer.production,
  productionIsLoading: state.selectedProductionReducer.productionIsLoading,
  productionErrorMessage: state.selectedProductionReducer.productionErrorMessage,
  //Workorder
  workorders: state.workordersReducer.workorders,
  workordersIsLoading: state.workordersReducer.workordersIsLoading,
  workordersErrorMessage: state.workordersReducer.workordersErrorMessage,
})

// Object {
//   "id": "sjdkfjskdfjsdjkf",
//   "type": "FETCH_PRODUCTION",
// }
const mapDispatchToProps = (dispatch) => ({
  fetchProduction: (id) => dispatch(SelectedProductionActions.fetchProduction(id)),
  fetchProductionTodo: (id) => dispatch(SelectedProductionActions.fetchProductionTodo(id)),
  fetchWorkorders: (productionId) => dispatch(WorkordersActions.fetchWorkorders(productionId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductionsScreen)

const Style = StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
    margin: 30,
    flex: 1,
  },
  error: {
    ...Fonts.style.normal,
    textAlign: 'center',
    marginBottom: 5,
    color: 'red',
  },
})
