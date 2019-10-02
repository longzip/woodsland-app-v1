import React from 'react'
import { Text, View, Button, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import SelectedWorkcenterActions from 'App/Stores/SelectedWorkcenter/Actions'
import WorkordersActions from 'App/Stores/Workorders/Actions'
import { StyleSheet } from 'react-native'
import Fonts from 'App/Theme/Fonts'
import { ApplicationStyles, Helpers } from 'App/Theme'
import WorkorderList from '../Workorders/WorkorderList'

class WorkcenterDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    return {
      title: params ? params.otherParam : 'Công đoạn sản xuất',
    }
  }
  constructor() {
    super()
  }
  componentDidMount() {
    if (this.props.navigation.state.params && this.props.navigation.state.params.id) {
      const { id } = this.props.navigation.state.params
      this._fetchWorkcenter(id)
      this._fetchWorkorders()
      // this.props.navigation.setParams({ otherParam: this.props.workcenter.name })
    }
  }

  showArrayItem = (item) => {
    // this.props.navigation.navigate('WorkcenterDetailScreen', { id: item.id })
  }

  render() {
    return (
      <View style={Style.container}>
        {this.props.workcenterIsLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View>
            {this.props.workcenterErrorMessage ? (
              <View>
                <Text style={Style.error}>{this.props.workcenterErrorMessage}</Text>
                <Button
                  onPress={() => this._fetchWorkcenter(this.props.navigation.state.params.id)}
                  title="Refresh"
                />
              </View>
            ) : (
              <View>
                <Text style={Style.result}>{this.props.workcenter.name}</Text>
                <WorkorderList workorders={this.props.workorders} />
              </View>
            )}
          </View>
        )}
      </View>
    )
  }

  _fetchWorkcenter(id) {
    this.props.fetchWorkcenter(id)
  }

  _fetchWorkorders() {
    this.props.fetchWorkorders()
  }
}

WorkcenterDetailScreen.propTypes = {
  workcenter: PropTypes.object,
  workcenterIsLoading: PropTypes.bool,
  workcenterErrorMessage: PropTypes.string,
  fetchWorkcenter: PropTypes.func,
}

const mapStateToProps = (state) => ({
  workcenter: state.selectedWorkcenterReducer.workcenter,
  workcenterIsLoading: state.selectedWorkcenterReducer.workcenterIsLoading,
  workcenterErrorMessage: state.selectedWorkcenterReducer.workcenterErrorMessage,
  workorders: state.workordersReducer.workorders,
  workordersIsLoading: state.workordersReducer.workordersIsLoading,
  workordersErrorMessage: state.workordersReducer.workordersErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  fetchWorkcenter: (id) => dispatch(SelectedWorkcenterActions.fetchWorkcenter(id)),
  fetchWorkorders: () => dispatch(WorkordersActions.fetchWorkorders()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkcenterDetailScreen)

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
  result: {
    ...Fonts.style.h1,
    textAlign: 'center',
    marginBottom: 5,
  },
})
