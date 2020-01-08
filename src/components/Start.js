import React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'native-base';
import {withNavigation} from 'react-navigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Start = props => {
  return (
    <>
      <SafeAreaView style={styles.body}>
        <View style={styles.button}>
          <Button
            style={styles.signin}
            onPress={() => props.navigation.navigate('Login')}>
            <Text style={styles.textsignin}>Sign In</Text>
          </Button>
          <Button
            style={styles.signup}
            onPress={() => props.navigation.navigate('Register')}>
            <Text style={styles.textsignup}>Sign Up</Text>
          </Button>
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('BottomNavbar')}>
          <View style={styles.skip}>
            <Text style={styles.skiptext}>Lewati</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.logo}>
          <Image source={require('../assets/logo.png')} />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    alignSelf: 'center',
    position: 'absolute',
    bottom: hp('7%'),
  },
  signin: {
    width: wp('45%'),
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderWidth: wp('0.25%'),
    borderColor: '#03AC0E',
    borderRadius: wp('3%'),
    marginRight: wp('2%'),
    height: hp('7%'),
  },
  textsignin: {
    color: '#03AC0E',
    fontSize: wp('5%'),
  },
  signup: {
    width: wp('45%'),
    backgroundColor: '#03AC0E',
    justifyContent: 'center',
    borderRadius: wp('3%'),
    marginLeft: wp('2%'),
    height: hp('7%'),
  },
  textsignup: {
    color: '#fff',
    fontSize: wp('5%'),
  },
  skip: {
    alignItems: 'flex-end',
    marginRight: wp('10%'),
    marginTop: hp('5%'),
  },
  skiptext: {
    color: '#03AC0E',
    fontSize: wp('4.8'),
    fontWeight: 'bold',
  },
  logo: {
    marginTop: hp('20%'),
    justifyContent: 'center',
  },
});

export default withNavigation(Start);
