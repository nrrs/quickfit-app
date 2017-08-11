import React from 'react';
import { Text, View, ScrollView, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import IIcon from 'react-native-vector-icons/Ionicons';
import { buttonStyle, buttonTextStyle, inputStyle, formContainerStyle } from '../../styles/forms';
import { iconStyle, textStyle, subHeaderStyle } from '../../styles/styles';
import Header from '../Header';
import axios from 'axios';
import ModalPicker from 'react-native-modal-picker';

const createSubHeaderStyle = Object.assign({}, subHeaderStyle, { marginTop: 0 });


export default class CreateScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Add',
    tabBarIcon: ({ tintColor }) => (
      <IIcon name="md-add-circle" color={tintColor} style={iconStyle} />
    )
  }

  constructor(props) {
    super(props);
    this.state = {
      author_id: 1, // currentUser.id
      movement_name: '',
      movement_type: '',
      difficulty: '',
      description: null,
      demo_url: null
    };

    this.movements = [];
    this.difficulties = [];
    this._handlePress = this._handlePress.bind(this);
    this._updateText = this._updateText.bind(this);
  }

  componentWillMount() {
    let index = 0;
    this.movements = [
      { key: index++, section: true, label: 'Movement Types' },
      { key: index++, label: 'Cardio' },
      { key: index++, label: 'Conditioning' },
      { key: index++, label: 'Core' },
      { key: index++, label: 'Full Body' },
      { key: index++, label: 'Lower Body' },
      { key: index++, label: 'Upper Body' },
    ]
    this.difficulties = [
      { key: index++, section: true, label: 'Difficulty' },
      { key: index++, label: 'Novice' },
      { key: index++, label: 'Intermediate' },
      { key: index++, label: 'Advanced' },
    ]
  }

  _handlePress(e) {
    e.preventDefault;
    let newMovement = {
      "author_id": 1, // currentUser.id
      "movement_name": this.state.movement_name,
      "movement_type": this.state.movement_type,
      "difficulty": this.state.difficulty,
      "description": this.state.description,
      "demo_url": this.state.demo_url
    }
    console.log(newMovement);
    axios.get('http://rallycoding.herokuapp.com/api/music_albums')
      .then((res) => {
        alert('post success!');
      })
      .catch((err) => {
        alert('post fail!');
      });

  }

  _updateText(field) {
    return (val) => {
      this.setState({[field]: val});
    }
  }

  render() {
    return (
      <View style={{ flex: 1}}>
        <Header title='QuickFit'/>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            <View style={formContainerStyle}>
              <Text style={createSubHeaderStyle}>Add Movement</Text>
              <TextInput
                id="movementName"
                style={inputStyle}
                placeholder="Name"
                onChangeText={this._updateText("movement_name")}
              />
              <Text style={createSubHeaderStyle}>Movement Type</Text>
              <ModalPicker
                data={this.movements}
                initValue="Select"
                style={{ borderRadius: 0, padding: 10  }}
                onChange={ option => {
                  this.setState({
                    movement_type: option.label
                  });
                }}
              />
            <Text style={createSubHeaderStyle}>Difficulty Level</Text>
              <ModalPicker
                data={this.difficulties}
                initValue="Select"
                style={{ borderRadius: 0, padding: 10  }}
                onChange={ option => {
                  this.setState({
                    difficulty: option.label
                  });
                }}
              />

              <Text style={createSubHeaderStyle}> ADD DESCRIPTION </Text>
              <TextInput
                id="description"
                style={Object.assign({}, inputStyle, {height: 130, paddingTop: 10})}
                placeholder="Keep your core tight and engage!"
                multiline={true}
                onChangeText={this._updateText("description")}
              />
              <TouchableOpacity
                style={Object.assign({}, buttonStyle, {marginTop: 10, marginBottom: 10})}
                onPress={this._handlePress}
              >
                <Text style={buttonTextStyle}>New Exercise</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}
