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
import { textStyle, iconStyle, captionStyle, subHeaderStyle } from '../../styles/styles';
import { buttonStyle, inputStyle, formContainerStyle } from '../../styles/forms';

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
  }


  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={formContainerStyle}>
            <View className='ProfileDescription' style={Object.assign({}, buttonStyle, {flexDirection: 'row'})}>
              <View style={styles.profileImgContainer}>
              </View>
              <View>
                <View>
                  <Text style={subHeaderStyle}> Usain Bolt </Text>
                  <Text style={subHeaderStyle}> athlete@quickfit.com </Text>
                </View>
              </View>
            </View>

            <View style={buttonStyle}>
              <Text style={captionStyle}> Edit Profile </Text>
            </View>
            <View style={buttonStyle}>
              <Text style={textStyle}> Previous Workout 1</Text>
            </View>
            <View style={buttonStyle}>
              <Text style={textStyle}> Previous Workout 2</Text>
            </View>
            <View style={buttonStyle}>
              <Text style={textStyle}> Previous Workout 3</Text>
            </View>
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
  }
}

export default ProfileIndex;
