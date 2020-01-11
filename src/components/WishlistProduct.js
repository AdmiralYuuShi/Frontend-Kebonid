import React from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {Button} from 'native-base';
import NumberFormat from 'react-number-format';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {withNavigation} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {API_KEY_PHOTO} from 'react-native-dotenv';

const WishlistProduct = props => {
  const {item, navigation, onDelete} = props;
  return (
    <>
      <View style={styles.view}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Product', {
              id_product: item.product_id,
            })
          }>
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
          <Text style={styles.textname} numberOfLines={1} ellipsizeMode="tail">
            {item.name}
          </Text>
          <NumberFormat
            value={item.price}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'Rp. '}
            renderText={value => <Text style={styles.textprice}>{value}</Text>}
          />
        </TouchableOpacity>
        <View style={styles.button}>
          <Button style={styles.btndelete} onPress={onDelete}>
            <Icon name="trash" size={20} color={'#979A9A'} />
          </Button>
          <Button style={styles.btnbeli}>
            <Text style={styles.beli}>Beli</Text>
          </Button>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    borderRadius: wp('0%'),
    margin: wp('1%'),
    height: hp('38%'),
    borderColor: '#ddd',
    borderWidth: wp('0.4'),
  },
  image: {
    width: wp('46.5%'),
    height: hp('25%'),
    resizeMode: 'stretch',
    borderTopLeftRadius: wp('0%'),
    borderTopRightRadius: wp('0%'),
  },
  textname: {
    width: wp('42%'),
    fontSize: hp('2%'),
    marginLeft: wp('2.5%'),
    marginRight: wp('1.5%'),
    marginTop: hp('1%'),
    fontWeight: 'bold',
  },
  textprice: {
    fontSize: hp('1.8%'),
    marginLeft: wp('2.5%'),
    color: '#E5511B',
  },
  button: {
    position: 'absolute',
    width: wp('46.5%'),
    height: hp('5.8%'),
    backgroundColor: '#ECF0F1',
    bottom: hp('0%'),
    flexDirection: 'row',
  },
  btndelete: {
    width: wp('13%'),
    marginLeft: wp('1%'),
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  btnbeli: {
    width: wp('30.5%'),
    marginLeft: wp('1%'),
    justifyContent: 'center',
    backgroundColor: '#E5511B',
  },
  beli: {
    fontSize: wp('5%'),
    color: '#fff',
  },
});

export default withNavigation(WishlistProduct);
