import React from 'react';
import { Text,
         TouchableWithoutFeedback,
         ScrollView,
         View,
         Keyboard,
         TextInput,
         TouchableOpacity,
         Image
       } from 'react-native';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { textStyle, iconStyle, captionStyle, subHeaderStyle, cardStyle } from '../../styles/styles';
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
      loading: true
    };

    this.renderWorkouts = this.renderWorkouts.bind(this);
  }

  componentWillMount() {
    if (this.state.workoutHistory.length === 0) {
      axios.get('https://afternoon-bastion-37946.herokuapp.com/api/workouts/')
      .then( res => {
        this.setState({
          workoutHistory: res.data,
          loading: false
        });
      })
      .catch( error => { this.setState({ loading: false }); });
    }
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
                  <Text style={{padding: 0, margin: 0}}>{workoutDateFromNow}</Text>
                </View>
                <View style={{alignItems: 'flex-end'}}>
                  <Text style={Object.assign({}, subHeaderStyle, { marginTop: 0, padding: 0})}>{workout.workout_data.workout_type}</Text>
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
          <View style={formContainerStyle}>
            <View className='ProfileDescription' style={Object.assign({}, buttonStyle, {flexDirection: 'row'})}>
                <View>
                  <Text style={subHeaderStyle}> Usain Bolt </Text>
                  <Text style={subHeaderStyle}> athlete@quickfit.com </Text>
                </View>
            </View>

            <TouchableOpacity
              style={buttonStyle}
              onPress={() => {
                this.props.navigation.navigate('edit');
              }}>
              <Text style={buttonTextStyle}> Edit Profile </Text>
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
