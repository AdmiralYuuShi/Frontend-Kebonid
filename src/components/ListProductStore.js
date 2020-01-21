import React, {Component} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import NumberFormat from 'react-number-format';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {withNavigation} from 'react-navigation';
import Icon from 'react-native-vector-icons/Entypo';
import IconFA from 'react-native-vector-icons/FontAwesome';
import {API_KEY_PHOTO} from 'react-native-dotenv';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
const {SlideInMenu} = renderers;

class ListProductStore extends Component {
  render() {
    const {item, navigation, onDelete} = this.props;
    return (
      <>
        <View style={styles.view}>
          <View style={styles.viewlist}>
            <View>
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
            </View>
            <View style={styles.viewname}>
              <Text
                style={styles.textname}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.name}
              </Text>
              <Text style={styles.textstok} ellipsizeMode="tail">
                Stok: {item.stock}
              </Text>
              <NumberFormat
                value={item.price}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'Rp. '}
                renderText={value => (
                  <Text style={styles.textprice}>{value}</Text>
                )}
              />
              <View style={styles.dots}>
                <Menu renderer={SlideInMenu}>
                  <MenuTrigger>
                    <Icon name="dots-three-horizontal" size={20} />
                  </MenuTrigger>
                  <MenuOptions>
                    <MenuOption
                      onSelect={() => navigation.push('EditProduct', {item})}
                      style={styles.menuedit}>
                      <IconFA name="edit" size={30} style={styles.iconedit} />
                      <Text style={styles.textedit}>Ubah Produk</Text>
                    </MenuOption>
                    <MenuOption onSelect={onDelete} style={styles.menudelete}>
                      <IconFA
                        name="trash-o"
                        size={30}
                        color={'#E74C3C'}
                        style={styles.icondelete}
                      />
                      <Text style={styles.textdelete}>Hapus Produk</Text>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
              </View>
            </View>
          </View>
          <View style={styles.saparator} />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    borderRadius: wp('0%'),
    margin: wp('1%'),
    height: hp('14%'),
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
    width: wp('56%'),
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  textstok: {
    color: '#979A9A',
    fontSize: wp('4%'),
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
    top: hp('12.5%'),
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
  dots: {
    right: wp('-10%'),
    marginTop: hp('0%'),
    alignSelf: 'flex-end',
    top: hp('0%'),
    position: 'absolute',
  },
  menuedit: {
    flexDirection: 'row',
    marginBottom: hp('4%'),
  },
  iconedit: {
    marginLeft: wp('5%'),
    marginTop: hp('3%'),
  },
  textedit: {
    marginLeft: wp('3%'),
    fontSize: wp('6.2%'),
    color: '#979A9A',
    fontWeight: 'bold',
    marginTop: hp('3%'),
  },
  menudelete: {
    flexDirection: 'row',
    marginBottom: hp('4%'),
  },
  icondelete: {
    marginLeft: wp('5%'),
    marginTop: hp('1%'),
  },
  textdelete: {
    marginLeft: wp('4.5%'),
    fontSize: wp('6.2%'),
    color: '#E74C3C',
    fontWeight: 'bold',
    marginTop: hp('1%'),
  },
});

export default withNavigation(ListProductStore);
