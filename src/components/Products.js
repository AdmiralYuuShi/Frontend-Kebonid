import React from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import NumberFormat from 'react-number-format';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {withNavigation} from 'react-navigation';
import {API_KEY_PHOTO} from 'react-native-dotenv';

const Products = props => {
  const {item, navigation} = props;
  return (
    <>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Product', {
            product: item,
          })
        }>
        <View style={styles.view}>
          <Image
            style={styles.image}
            source={
              !item.photo
                ? {
                    uri:
                      'https://haes.ca/wp-content/plugins/everest-timeline/images/no-image-available.png',
                  }
                : {
                    uri: `${API_KEY_PHOTO}/product/${item.photo}`,
                  }
            }
          />
          <Text style={styles.textname} numberOfLines={2} ellipsizeMode="tail">
            {item.name}
          </Text>
          <NumberFormat
            value={item.price}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'Rp. '}
            renderText={value => <Text style={styles.textprice}>{value}</Text>}
          />
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    borderRadius: wp('3%'),
    margin: wp('1%'),
    height: hp('38%'),
    borderColor: '#ddd',
    borderWidth: wp('0.4'),
  },
  image: {
    width: wp('46.5%'),
    height: hp('25%'),
    resizeMode: 'stretch',
    borderTopLeftRadius: wp('3%'),
    borderTopRightRadius: wp('3%'),
  },
  textname: {
    width: wp('42%'),
    fontSize: wp('5%'),
    marginLeft: wp('2.5%'),
    marginRight: wp('1.5%'),
    marginTop: hp('1%'),
  },
  textprice: {
    fontSize: wp('4.5%'),
    marginLeft: wp('2.5%'),
    position: 'absolute',
    bottom: hp('1%'),
    color: '#E5511B',
  },
});

export default withNavigation(Products);
