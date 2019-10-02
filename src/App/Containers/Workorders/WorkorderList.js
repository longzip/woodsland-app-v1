import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import Style from './WorkorderListStyle'

import Dialog from 'react-native-dialog'

class WorkorderList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dialogVisible: false,
      textInputValue: '',
      item: {},
    }
  }

  render() {
    return (
      <View>
        <Text>{this.state.textInputValue}</Text>
        {this.state.item.Workcenter ? (
          <Text>{this.state.item.Workcenter.name}</Text>
        ) : (
          <Text></Text>
        )}

        <ScrollView>
          {this.props.workorders.map((item, key) => (
            <TouchableOpacity key={key} onPress={this.showDialog.bind(this, item)}>
              <Text style={Style.result}> {item.Product.name} </Text>
              <Text style={Style.result}> {item.Production.productDimension} </Text>

              <Text style={Style.result}>Số lượng = {item.Production.productQty} </Text>
              <Text style={Style.result}>
                Thực hiện ={this._workcenterProductivitiesNumber(item.WorkcenterProductivities)}{' '}
              </Text>
              <Text style={Style.result}> Đơn vị: {item.Production.productUom} </Text>
              <Text style={Style.result}> Công đoạn: {item.Workcenter.name} </Text>

              <View style={{ width: '100%', height: 1, backgroundColor: '#000' }} />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View>
          <Dialog.Container visible={this.state.dialogVisible}>
            <Dialog.Title>Ghi nhận số liệu</Dialog.Title>
            <Dialog.Description>
              Bạn đã thực hiện được số lượng bao nhiêu? Nhập vào ô trống.
            </Dialog.Description>
            <Dialog.Input
              underlineColorAndroid="transparent"
              keyboardType={'numeric'}
              style={Style.textInput}
              placeholder="Số lượng"
              onChangeText={(textInputValue) => this.setState({ textInputValue })}
            />
            <Dialog.Button label="Hủy" onPress={this.handleCancel} />
            <Dialog.Button label="Đồng ý" onPress={this.handleDelete} />
          </Dialog.Container>
        </View>
      </View>
    )
  }

  _workcenterProductivitiesNumber(workcenterProductivities) {
    return workcenterProductivities.reduce((acc, item) => acc + item.qtyProduced, 0)
  }

  showDialog = (item) => {
    this.setState({ item })
    this.setState({ dialogVisible: true })
  }

  handleCancel = () => {
    this.setState({ dialogVisible: false })
  }

  handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    console.log('ghi nhận item')
    console.log(this.state.item)
    this.setState({ dialogVisible: false })
  }
}

WorkorderList.propTypes = {
  workorders: PropTypes.array.isRequired,
}

export default WorkorderList
