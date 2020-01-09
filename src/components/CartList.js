import React, {Component} from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {Button, Item, Label} from 'native-base';
import NumberFormat from 'react-number-format';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {withNavigation} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';

class CartList extends Component {
  render() {
    const {item, navigation, add, reduce, stok} = this.props;
    return (
      <>
        <View style={styles.view}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Product', {
                product: item,
              })
            }>
            <View style={styles.viewlist}>
              <View>
                <Image
                  style={styles.image}
                  source={{
                    uri:
                      'https://www.amwaytoday.co.id/kesehatan/info-produk/Bigger-is-Better.img.png/1567420073429.png',
                  }}
                />
              </View>
              <View style={styles.viewname}>
                <Text
                  style={styles.textname}
                  numberOfLines={2}
                  ellipsizeMode="tail">
                  {item.name}
                </Text>
                <NumberFormat
                  value={item.code}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'Rp. '}
                  renderText={value => (
                    <Text style={styles.textprice}>{value}</Text>
                  )}
                />
              </View>
            </View>
            <View style={styles.saparator} />
          </TouchableOpacity>
          <View style={styles.viewstok}>
            {item.stok === 1 ? (
              <Button disabled style={styles.btnminusdisabled}>
                <Icon name="minus" size={15} color={'#fff'} />
              </Button>
            ) : (
              <Button style={styles.btnminus} onPress={reduce}>
                <Icon name="minus" size={15} color={'#fff'} />
              </Button>
            )}
            <Item>
              <Label style={styles.inputstok}> {item.stok} </Label>
            </Item>
            {item.stok === item.totalStok ? (
              <Button disabled style={styles.btnplusdisabled}>
                <Icon name="plus" size={15} color={'#fff'} />
              </Button>
            ) : (
              <Button style={styles.btnplus} onPress={add}>
                <Icon name="plus" size={15} color={'#fff'} />
              </Button>
            )}
          </View>
          <View style={styles.button}>
            <Button style={styles.btndelete}>
              <Icon name="trash" size={25} color={'#E74C3C'} />
              <Text style={styles.delete}>Hapus dari Keranjang</Text>
            </Button>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    borderRadius: wp('0%'),
    margin: wp('1%'),
    height: hp('24%'),
    width: wp('95%'),
  },
  viewlist: {
    flexDirection: 'row',
  },
  viewname: {
    marginLeft: wp('5%'),
  },
  image: {
    width: wp('20%'),
    height: hp('10%'),
    resizeMode: 'stretch',
    borderRadius: wp('5%'),
  },
  textname: {
    width: wp('60%'),
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  textprice: {
    fontSize: wp('4%'),
    color: '#E5511B',
  },
  button: {
    position: 'absolute',
    width: wp('46.5%'),
    height: hp('5.8%'),
    backgroundColor: '#ECF0F1',
    top: hp('15.5%'),
    flexDirection: 'row',
  },
  btndelete: {
    width: wp('90%'),
    borderRadius: wp('2%'),
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  delete: {
    fontSize: wp('5%'),
    color: '#E74C3C',
    fontWeight: 'bold',
    marginLeft: wp('5%'),
  },
  saparator: {
    height: hp('0.2%'),
    width: wp('100%'),
    backgroundColor: '#E5E7E9',
    top: hp('23%'),
    position: 'absolute',
  },
  viewstok: {
    flexDirection: 'row',
    marginLeft: wp('25%'),
    marginTop: hp('-1%'),
  },
  btnminus: {
    width: wp('10%'),
    height: hp('5%'),
    backgroundColor: '#03AC0E',
    justifyContent: 'center',
    borderRadius: wp('50%'),
    marginRight: wp('3%'),
  },
  btnminusdisabled: {
    width: wp('10%'),
    height: hp('5%'),
    backgroundColor: '#B3B6B7',
    justifyContent: 'center',
    borderRadius: wp('50%'),
    marginRight: wp('3%'),
  },
  btnplus: {
    width: wp('10%'),
    height: hp('5%'),
    backgroundColor: '#03AC0E',
    justifyContent: 'center',
    borderRadius: wp('50%'),
    marginLeft: wp('3%'),
  },
  btnplusdisabled: {
    width: wp('10%'),
    height: hp('5%'),
    backgroundColor: '#B3B6B7',
    justifyContent: 'center',
    borderRadius: wp('50%'),
    marginLeft: wp('3%'),
  },
  inputstok: {
    width: wp('20%'),
    textAlign: 'center',
  },
});

export default withNavigation(CartList);
