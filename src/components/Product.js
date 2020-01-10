import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Image, View, Text} from 'react-native';
import {
  Header,
  Body,
  Title,
  Left,
  Button,
  ListItem,
  Thumbnail,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {withNavigation, SafeAreaView} from 'react-navigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ScrollView} from 'react-native-gesture-handler';
import NumberFormat from 'react-number-format';
import {connect} from 'react-redux';
import {getProduct} from '../public/redux/actions/product';
import {API_KEY_URL, API_KEY_PHOTO} from 'react-native-dotenv';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product_name: '',
      product_photo: null,
      price: 0,
      stock: 0,
      description: '',
      sellers_name: '',
      sellers_photo: null,
    };
  }

  componentDidMount() {
    const id_product = this.props.navigation.getParam('id_product', '');
    let url = `${API_KEY_URL}/product/${id_product}`;
    this.props.get(url).then(() => {
      this.props.product.product.map(p => {
        return this.setState({
          product_name: p.product_name,
          product_photo: p.product_photo,
          price: p.price,
          stock: p.stock,
          description: p.description,
          sellers_name: p.sellers_name,
          sellers_photo: p.sellers_photo,
        });
      });
    });
  }

  render() {
    const {
      product_name,
      product_photo,
      price,
      stock,
      description,
      sellers_name,
      sellers_photo,
    } = this.state;
    return (
      <>
        <Header style={styles.header}>
          <Left>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon style={styles.icon} name="angle-left" size={wp('5.5%')} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title style={styles.title}> Produk </Title>
          </Body>
        </Header>
        <SafeAreaView style={styles.body}>
          <ScrollView style={{marginBottom: hp('8%')}}>
            <Image
              style={styles.image}
              source={
                !product_photo
                  ? {
                      uri:
                        'https://haes.ca/wp-content/plugins/everest-timeline/images/no-image-available.png',
                    }
                  : {
                      uri: `${API_KEY_PHOTO}/product/${product_photo}`,
                    }
              }
            />
            <View style={styles.floating}>
              <Icon name="heart" size={wp('10%')} color={'#979A9A'} />
            </View>

            <Text style={styles.textname} numberOfLines={2}>
              {product_name}
            </Text>
            <View style={styles.viewstok}>
              <NumberFormat
                value={price}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'Rp. '}
                renderText={value => (
                  <Text style={styles.textprice}>{value}</Text>
                )}
              />
              <Text style={styles.stok}>Stok: {stock}</Text>
            </View>
            <View style={styles.saparator} />
            <View>
              <Text style={styles.desc}>Deskripsi Produk</Text>
              <Text style={styles.desctext}>{description}</Text>
            </View>
            <View style={styles.saparator} />
            <View>
              <Text style={styles.desc}>Penjual</Text>
              <ListItem thumbnail style={styles.seller}>
                <Left>
                  <Thumbnail
                    square
                    source={
                      !sellers_photo
                        ? {
                            uri:
                              'https://haes.ca/wp-content/plugins/everest-timeline/images/no-image-available.png',
                          }
                        : {
                            uri: `${API_KEY_PHOTO}/customers/${sellers_photo}`,
                          }
                    }
                  />
                </Left>
                <Body>
                  <Text style={styles.sellertext}>{sellers_name}</Text>
                </Body>
              </ListItem>
            </View>
          </ScrollView>
          <View />
          <View style={styles.viewbottom}>
            <Button style={styles.buttonchat}>
              <Icon name="comment" size={30} color={'#979A9A'} />
            </Button>
            <Button style={styles.buttonbeli}>
              <Text style={styles.textbeli}>Beli</Text>
            </Button>
            <Button style={styles.buttoncart}>
              <Text style={styles.textcart}>Tambah Ke Keranjang</Text>
            </Button>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
  },
  body: {
    flex: 1,
  },
  image: {
    width: wp('100%'),
    height: hp('45%'),
    resizeMode: 'stretch',
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: wp('7%'),
    marginLeft: wp('-10%'),
  },
  icon: {
    marginLeft: wp('2%'),
  },
  floating: {
    width: wp('18%'),
    height: hp('9%'),
    backgroundColor: '#fff',
    borderRadius: wp('50%'),
    position: 'absolute',
    alignSelf: 'flex-end',
    top: hp('40%'),
    right: wp('7%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewbottom: {
    height: hp('8%'),
    width: wp('100%'),
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: hp('0%'),
    alignItems: 'center',
    flexDirection: 'row',
    borderTopColor: '#D7DBDD',
    borderColor: '#fff',
    borderWidth: wp('0.3%'),
  },
  buttonchat: {
    width: wp('15%'),
    height: hp('6.5'),
    borderRadius: wp('2%'),
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginLeft: wp('2%'),
    borderColor: '#D7DBDD',
    borderWidth: wp('0.5%'),
  },
  buttonbeli: {
    width: wp('32%'),
    height: hp('6.5'),
    borderRadius: wp('2%'),
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginLeft: wp('2%'),
    borderColor: '#E5511B',
    borderWidth: wp('0.5%'),
  },
  textbeli: {
    color: '#E5511B',
    fontSize: wp('5%'),
  },
  buttoncart: {
    width: wp('45%'),
    height: hp('6.5'),
    borderRadius: wp('2%'),
    justifyContent: 'center',
    backgroundColor: '#E5511B',
    marginLeft: wp('2%'),
    borderColor: '#E5511B',
    borderWidth: wp('0.5%'),
  },
  textcart: {
    color: '#fff',
    fontSize: wp('4%'),
  },
  textname: {
    fontSize: hp('4%'),
    width: wp('70%'),
    marginLeft: wp('3%'),
    marginTop: hp('1%'),
  },
  textprice: {
    fontSize: hp('3%'),
    marginLeft: wp('3%'),
    marginTop: hp('1%'),
    color: '#E5511B',
  },
  saparator: {
    height: hp('0.2%'),
    width: wp('100%'),
    backgroundColor: '#E5E7E9',
    marginTop: hp('2%'),
  },
  desc: {
    fontSize: hp('3%'),
    width: wp('70%'),
    marginLeft: wp('3%'),
    marginTop: hp('1%'),
    color: '#CACFD2',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  desctext: {
    fontSize: hp('2%'),
    width: wp('95%'),
    marginLeft: wp('3%'),
    marginTop: hp('1%'),
    color: '#979A9A',
  },
  seller: {
    marginTop: hp('2%'),
  },
  sellertext: {
    fontSize: hp('3%'),
    width: wp('95%'),
    marginTop: hp('1%'),
    color: '#979A9A',
  },
  stok: {
    fontSize: hp('2%'),
    alignSelf: 'center',
    position: 'absolute',
    right: wp('05'),
    color: '#979A9A',
  },
  viewstok: {flexDirection: 'row', flex: 1},
});

const mapStateToProps = state => {
  return {
    product: state.product,
  };
};

const mapDispatchToProps = dispatch => ({
  get: url => dispatch(getProduct(url)),
});

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(Product),
);
