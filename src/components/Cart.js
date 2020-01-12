import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  View,
  Text,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Header, Body, Title, Button, Right} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CartList from './CartList';
import {withNavigation} from 'react-navigation';
import NumberFormat from 'react-number-format';
import {connect} from 'react-redux';
import {getCart, deleteCart} from '../public/redux/actions/cart';
import {API_KEY_URL} from 'react-native-dotenv';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      load: false,
    };
  }

  componentDidMount = async () => {
    const id = this.props.auth.user.id;
    let url = `${API_KEY_URL}/cart/${id}`;
    await this.props.get(url);
  };

  apiCall = async () => {
    this.setState({load: true});
    const id = this.props.auth.user.id;
    let url = `${API_KEY_URL}/cart/${id}`;
    await this.props.get(url).then(() => {
      this.setState({load: false});
    });
  };

  onDelete = async (item, index) => {
    this.setState({load: true});
    const items = [...this.props.cart.cart];
    let url = `${API_KEY_URL}/cart/${items[index].id}`;
    await this.props
      .delete(url)
      .then(() => {
        Alert.alert('Success!', 'Berhasil Hapus Produk dari Keranjang Anda', [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ]);
        this.apiCall();
        this.setState({load: false});
      })
      .catch(err => {
        Alert.alert(err);
        this.setState({load: false});
      });
  };

  // minus = (item, index) => {
  //   const items = [...this.props.cart.cart];
  //   items[index].stok -= 1;
  //   this.setState({items});
  // };

  // plus = (item, index) => {
  //   const items = [...this.props.cart.cart];
  //   items[index].stok += 1;
  //   this.setState({items});
  // };

  render() {
    // const {items} = this.state;
    // let totalQuantity = 0;
    // let totalPrice = 0;
    // items.forEach(item => {
    //   totalQuantity += item.stok;
    //   totalPrice += item.stok * item.code;
    // });
    return (
      <>
        <Header style={styles.header}>
          <Body>
            <Title style={styles.title}>Keranjang</Title>
          </Body>
          <Right>
            {this.state.load ? (
              <ActivityIndicator style={styles.refresh} />
            ) : (
              <TouchableOpacity onPress={() => this.apiCall()}>
                <Icon
                  name="sync"
                  size={22}
                  color={'#000'}
                  style={styles.refresh}
                />
              </TouchableOpacity>
            )}
          </Right>
        </Header>

        <SafeAreaView style={styles.list}>
          {/* <View style={styles.toko}>
            <Text style={styles.tokotext}>Toko :</Text>
            <Text style={styles.tokoname}>RajaCell</Text>
          </View> */}
          <FlatList
            data={this.props.cart.cart}
            renderItem={({item, index}) => (
              <CartList
                item={item}
                load={this.state.load}
                onDelete={() => this.onDelete(item, index)}
                // add={() => this.plus(item, index)}
                // reduce={() => this.minus(item, index)}
              />
            )}
            keyExtractor={item => item.id}
          />
          <View style={styles.bottom}>
            <View style={styles.totalharga}>
              <Text style={styles.harga}>Total Harga</Text>
              <NumberFormat
                value={this.props.cart.totalPrice}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'Rp. '}
                renderText={value => <Text style={styles.total}>{value}</Text>}
              />
            </View>
            <View>
              <Button
                style={styles.buttonbeli}
                onPress={() => this.props.navigation.navigate('Transaction')}>
                <Text style={styles.textbeli}>Beli</Text>
              </Button>
            </View>
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
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: wp('7%'),
    marginLeft: wp('3%'),
  },
  list: {
    flex: 1,
    marginTop: hp('2%'),
    marginLeft: wp('2%'),
  },
  toko: {
    flexDirection: 'row',
    marginLeft: wp('3%'),
    marginBottom: hp('2%'),
  },
  tokotext: {
    fontSize: wp('5%'),
    marginRight: wp('2%'),
  },
  tokoname: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  buttonbeli: {
    width: wp('27%'),
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  space: {
    width: wp('44%'),
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
  refresh: {
    marginRight: wp('4%'),
  },
});

const mapStateToProps = state => {
  return {
    cart: state.cart,
    auth: state.auth,
  };
};
const mapDispatchToProps = dispatch => ({
  get: url => dispatch(getCart(url)),
  delete: url => dispatch(deleteCart(url)),
});

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(Cart),
);
