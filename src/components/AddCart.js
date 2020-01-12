import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  View,
  Text,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Header, Body, Title, Button, Left, Item, Label} from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {withNavigation} from 'react-navigation';
import NumberFormat from 'react-number-format';
import {connect} from 'react-redux';
import {getCart, addCart, updateAmount} from '../public/redux/actions/cart';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {API_KEY_URL, API_KEY_PHOTO} from 'react-native-dotenv';

class AddCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      customerId: this.props.auth.user.id,
      productId: '',
      productName: '',
      productPhoto: '',
      amount: 1,
      price: 0,
      stock: '',
      checkCartP: '',
      checkCartC: '',
      am: [],
    };
  }

  componentDidMount() {
    const id_product = this.props.navigation.getParam('id_product', '');
    let url = `${API_KEY_URL}/product/${id_product}`;
    this.props.get(url).then(() => {
      this.props.product.product.map(p => {
        return this.setState({
          productId: p.id,
          productName: p.product_name,
          productPhoto: p.product_photo,
          price: p.price,
          stock: p.stock,
        });
      });
    });

    this.props.get(`${API_KEY_URL}/cart/${this.state.customerId}`).then(() => {
      this.setState({
        checkCartP: this.props.cart.cart.findIndex(
          c => c.product_id === id_product,
        ),
        checkCartC: this.props.cart.cart.findIndex(
          c => c.customer_id === this.state.customerId,
        ),
        am: this.props.cart.cart,
      });

      if (
        this.props.cart.cart.findIndex(c => c.product_id === id_product) !== -1
      ) {
        this.setState({
          amount: Number.parseInt(
            JSON.stringify(
              this.state.am[
                this.props.cart.cart.findIndex(c => c.product_id === id_product)
              ],
            )
              .split(',')[4]
              .split(':')[1],
            10,
          ),
        });
      }
    });
  }

  add = () => {
    this.setState({
      amount: this.state.amount + 1,
    });
  };

  reduce = () => {
    this.setState({
      amount: this.state.amount - 1,
    });
  };

  onCart = async () => {
    const {customerId, productId, productName, amount, price} = this.state;
    let url = `${API_KEY_URL}/cart`;
    let data = {customerId, productId, productName, amount, price};
    // alert(this.state.checkCartP)
    if (this.state.checkCartP !== -1) {
      const id = this.state.am.find(
        x => x.product_id === productId && x.customer_id === customerId,
      ).id;
      let url1 = `${API_KEY_URL}/cart/${id}`;
      await this.props
        .updateAmount(url1, {amount})
        .then(() => {
          Alert.alert(
            'Success!',
            'Berhasil Mengubah Jumlah Barang',
            [
              {
                text: 'OK',
                onPress: () => {
                  this.props.navigation.push('Product', {
                    id_product: productId,
                  });
                },
              },
            ],
            {cancelable: false},
          );
        })
        .catch(() => {
          Alert.alert(
            'Err!',
            'Berhasil Ditambahkan ke Keranjang Anda',
            [
              {
                text: 'OK',
                onPress: () => {
                  this.props.navigation.push('Product', {
                    id_product: productId,
                  });
                },
              },
            ],
            {cancelable: false},
          );
        });
    } else {
      await this.props
        .addCart(url, data)
        .then(() => {
          Alert.alert(
            'Success!',
            'Berhasil Ditambahkan ke Keranjang Anda',
            [
              {
                text: 'OK',
                onPress: () => {
                  this.props.navigation.push('Product', {
                    id_product: productId,
                  });
                },
              },
            ],
            {cancelable: false},
          );
        })
        .catch(() => {
          Alert.alert(
            'Success!',
            'Berhasil Ditambahkan ke Keranjang Anda',
            [
              {
                text: 'OK',
                onPress: () => {
                  this.props.navigation.push('Product', {
                    id_product: productId,
                  });
                },
              },
            ],
            {cancelable: false},
          );
        });
    }
  };

  render() {
    const {productName, productPhoto, amount, price, stock} = this.state;
    return (
      <>
        <Header style={styles.header}>
          <Left>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon style={styles.icon} name="times" size={wp('5.5%')} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title style={styles.title}>Tambah ke Keranjang</Title>
          </Body>
        </Header>

        <SafeAreaView style={styles.list}>
          <View style={styles.viewdetail}>
            <View style={styles.viewlist}>
              <View>
                <Image
                  style={styles.image}
                  source={
                    !productPhoto
                      ? {
                          uri:
                            'https://haes.ca/wp-content/plugins/everest-timeline/images/no-image-available.png',
                        }
                      : {
                          uri: `${API_KEY_PHOTO}/product/${productPhoto}`,
                        }
                  }
                />
              </View>
              <View style={styles.viewname}>
                <Text
                  style={styles.textname}
                  numberOfLines={2}
                  ellipsizeMode="tail">
                  {productName}
                </Text>
                <NumberFormat
                  value={price}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'Rp. '}
                  renderText={value => (
                    <Text style={styles.textprice}>{value}</Text>
                  )}
                />
                <Text style={styles.textsub} ellipsizeMode="tail">
                  Jumlah Tersedia: {stock}
                </Text>
              </View>
            </View>
            <View style={styles.viewamount}>
              <Item stackedLabel>
                <Label style={styles.labelamount}>Jumlah</Label>
                <View style={styles.viewstok}>
                  {amount === 1 ? (
                    <Button disabled style={styles.btnminusdisabled}>
                      <Icon name="minus" size={15} color={'#fff'} />
                    </Button>
                  ) : (
                    <Button
                      style={styles.btnminus}
                      onPress={this.reduce.bind(this)}>
                      <Icon name="minus" size={15} color={'#fff'} />
                    </Button>
                  )}
                  <Item>
                    <Label style={styles.inputstok}> {amount} </Label>
                  </Item>
                  {amount === stock ? (
                    <Button disabled style={styles.btnplusdisabled}>
                      <Icon name="plus" size={15} color={'#fff'} />
                    </Button>
                  ) : (
                    <Button
                      style={styles.btnplus}
                      onPress={this.add.bind(this)}>
                      <Icon name="plus" size={15} color={'#fff'} />
                    </Button>
                  )}
                </View>
              </Item>
            </View>
          </View>
        </SafeAreaView>
        <View style={styles.bottom}>
          <View style={styles.totalharga}>
            <Text style={styles.harga}>Sub Total</Text>
            <NumberFormat
              value={amount * price}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'Rp. '}
              renderText={value => <Text style={styles.total}>{value}</Text>}
            />
          </View>
          <View>
            <Button style={styles.buttonbeli} onPress={this.onCart.bind(this)}>
              {this.props.cart.isLoading ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.textbeli}>Tambah Keranjang</Text>
              )}
            </Button>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
  },
  list: {
    flex: 1,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: wp('5%'),
    marginLeft: wp('-20%'),
  },
  viewdetail: {
    backgroundColor: '#fff',
    marginRight: wp('2%'),
    marginLeft: wp('2%'),
    marginTop: hp('2%'),
    borderRadius: wp('3%'),
    height: hp('22.9%'),
  },
  buttonbeli: {
    width: wp('38%'),
    height: hp('5.5'),
    borderRadius: wp('2%'),
    justifyContent: 'center',
    backgroundColor: '#E5511B',
    borderColor: '#E5511B',
    borderWidth: wp('0.5%'),
    marginRight: wp('2%'),
  },
  textbeli: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  bottom: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: hp('8%'),
    marginBottom: hp('0%'),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalharga: {
    marginLeft: wp('2%'),
  },
  harga: {
    fontWeight: 'bold',
  },
  total: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: '#E5511B',
  },
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
    marginTop: hp('0.5%'),
    marginLeft: wp('1%'),
  },
  textname: {
    width: wp('60%'),
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  textsub: {
    width: wp('60%'),
    fontSize: wp('4.2%'),
    fontWeight: 'bold',
    color: '#A6ACAF',
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
    position: 'absolute',
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
    alignSelf: 'flex-end',
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
    marginRight: wp('5%'),
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
  labelamount: {
    alignSelf: 'flex-start',
    marginLeft: wp('3%'),
  },
  viewamount: {
    marginTop: hp('2%'),
  },
});

const mapStateToProps = state => {
  return {
    cart: state.cart,
    auth: state.auth,
    product: state.product,
  };
};
const mapDispatchToProps = dispatch => ({
  get: url => dispatch(getCart(url)),
  addCart: (url, data) => dispatch(addCart(url, data)),
  updateAmount: (url, data) => dispatch(updateAmount(url, data)),
});

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(AddCart),
);
