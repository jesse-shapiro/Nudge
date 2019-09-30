import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'

export default class MyDatePicker extends Component {
  constructor(props){
    super(props)
    this.state = {time:''}
  }

  setLocalTime(time) {
    this.props.setTime(time)
    this.setState(time)

    // console.log('daystate', this.state)
  }

  render(){
    return (
      <DatePicker
        style={{width: 200}}
        date={this.state.time}
        mode="time"
        placeholder="select time"
        // format="YYYY-MM-DD"
        // minDate="2016-05-01"
        // maxDate="2016-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(time) => {this.setLocalTime({time: time})}}
      />
    )
  }
}
