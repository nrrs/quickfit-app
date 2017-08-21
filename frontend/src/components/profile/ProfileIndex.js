import React from 'react';
import { Text,
         TouchableWithoutFeedback,
         ScrollView,
         View,
         Keyboard,
         TextInput,
         TouchableOpacity,
         Image,
         AsyncStorage
       } from 'react-native';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { textStyle, iconStyle, containerStyle, subHeaderStyle, cardStyle } from '../../styles/styles';
import { buttonStyle, buttonTextStyle, inputStyle, formContainerStyle } from '../../styles/forms';
import Loading from '../Loading';
import axios from 'axios';
import moment from 'moment';

class ProfileIndex extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Profile',
    tabBarIcon: ({ tintColor }) => (
      <FIcon name="user" color={tintColor} style={iconStyle} />
    ),
    headerTitle: 'QuickFit'
  }

  constructor(props) {
    super(props);
    this.state = {
      workoutHistory: [],
      loading: true,
      currentUser: {}
    };

    this.renderWorkouts = this.renderWorkouts.bind(this);
  }

  componentWillMount() {
    const id = this.props.screenProps.state.currentUser.id;
    axios.get(`/api/users/${id}/workouts/`)
    .then(res => {
      let workoutHistory = [];
      workoutHistory = workoutHistory.concat(res.data);
      this.setState({
        loading: false,
        workoutHistory,
      });
    })
    .catch(err => alert(err));
  }

  renderWorkouts() {
    return (
      <View>
        {
          this.state.workoutHistory.map((workout, i) => {
            const workoutDate = moment.utc(workout.timestamp_created).format('MMM DD, YYYY');
            const workoutDateFromNow = moment.utc(workout.timestamp_created).fromNow();

            let movementList;
            if (workout.workout_data.movements !== undefined) {
              movementList = workout.workout_data.movements.map((movement, j) => {
                return (
                  <Text
                    key={`${movement}${j}`}
                    style={Object.assign({}, textStyle, {textAlign: 'right'})}>
                    {movement}
                  </Text>
                );
              })
            }
            return (
              <View
                key={i}
                style={Object.assign({}, cardStyle, {
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexDirection: 'row'
                })}>
                <View style={{alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                  <Text style={Object.assign({}, subHeaderStyle, { marginTop: 0, padding: 0})}>{workoutDate}</Text>
                  <Text style={textStyle}>{workoutDateFromNow}</Text>
                </View>
                <View style={{alignItems: 'flex-end'}}>
                  <Text style={Object.assign({}, subHeaderStyle, { marginTop: 0, padding: 0})}>{workout.workout_data.workout_type.toUpperCase()}</Text>
                  <View>
                    {movementList}
                  </View>
                </View>
              </View>
            );
          })
        }
      </View>
    );
  }

  render() {

    if (this.state.loading) { return <Loading /> }

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View className='ProfileDescription' style={Object.assign({}, containerStyle, {backgroundColor: '#f0f0f0', borderBottomWidth: 1, borderBottomColor: '#e6e6e6'})}>
            <View style={{ flexDirection: 'column', alignItems: 'center'}}>
              <Text style={Object.assign({}, subHeaderStyle, { marginTop: 0, padding: 0})}>{this.props.screenProps.state.currentUser.username}</Text>
              <Text style={Object.assign({}, subHeaderStyle, { marginTop: 0, padding: 0})}>{this.props.screenProps.state.currentUser.email}</Text>
            </View>
          </View>

          <View style={formContainerStyle}>
            <TouchableOpacity
              style={buttonStyle}
              onPress={() => {
                this.props.navigation.navigate('edit');
              }}>
              <Text style={buttonTextStyle}>Edit Profile</Text>
            </TouchableOpacity>

            { this.renderWorkouts() }
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = {
  profileImgContainer: {
    height: 125,
    width: 125,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#dddddd'
  },

}

export default ProfileIndex;
