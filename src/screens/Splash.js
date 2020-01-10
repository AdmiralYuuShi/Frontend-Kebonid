import React, {useEffect} from 'react';
import {View, StyleSheet, Image, Text, ImageBackground} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import {DoubleBounce} from 'react-native-loader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Splash = () => {
  const {navigate} = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigate('Start');
    }, 3000);
  });
  return (
    <ImageBackground source={require('../assets/bg.jpeg')} style={style.bg}>
      <Image
        source={require('../assets/logo_transparent.png')}
        style={style.image}
      />
      <Text style={style.slogan}>
        Beli sayuran segar dan buah-buahan? Kebon.id aja!!
      </Text>
      <View style={style.loader}>
        <DoubleBounce size={20} color="#FFF" />
      </View>
    </ImageBackground>
  );
};

export default Splash;

const style = StyleSheet.create({
  loader: {marginTop: 30},
  bg: {
    width: wp('100%'),
    height: hp('100%'),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {height: hp('50%'), resizeMode: 'contain'},
  slogan: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: wp('4%'),
    marginTop: wp('-10%'),
  },
});
