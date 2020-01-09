import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Button, Text} from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ActivityIndicator} from 'react-native';
import {Image} from 'react-native-elements';
import {withNavigation} from 'react-navigation';
class AddStore extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <View style={style.container}>
          <Image
            source={require('../assets/elephant.jpg')}
            style={style.image}
            PlaceholderContent={<ActivityIndicator />}
          />
          <Text style={style.message}>
            Wah kamu belum punya toko nih.. Jangan sedih yah
          </Text>
          <TouchableOpacity>
            <Button
              style={style.button}
              onPress={() => {
                this.props.navigation.navigate('AddStoreAccount');
              }}>
              <Text style={style.text}>Buka toko yuk!</Text>
            </Button>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}
export default withNavigation(AddStore);
const style = StyleSheet.create({
  button: {
    width: wp('50%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: wp('0.5%'),
    borderColor: 'green',
    borderRadius: wp('5%'),
    marginTop: hp('3%'),
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    alignSelf: 'center',
    color: 'green',
  },
  image: {width: wp('100%'), height: hp('28%')},
  message: {
    marginTop: hp('2%'),
    width: wp('80%'),
    textAlign: 'center',
  },
});
