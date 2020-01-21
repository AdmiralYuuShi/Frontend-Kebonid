import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import {Button} from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {withNavigation} from 'react-navigation';

const GoToLogin = props => {
  return (
    <>
      <SafeAreaView style={styles.body}>
        <Text style={styles.text}>Anda Harus Login Untuk Melakukan</Text>
        <Text style={styles.text}>Transaksi dan Mengakses Profil Anda</Text>
        <Button
          style={styles.button}
          onPress={() => props.navigation.push('Login')}>
          <Text style={styles.textbutton}>Login</Text>
        </Button>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  button: {
    width: wp('30%'),
    backgroundColor: '#03AC0E',
    justifyContent: 'center',
    borderRadius: wp('2%'),
    height: hp('6%'),
    marginTop: hp('2.5%'),
  },
  textbutton: {
    color: '#fff',
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  text: {
    fontSize: wp('5%'),
    color: '#979A9A',
    fontWeight: 'bold',
  },
});

export default withNavigation(GoToLogin);
