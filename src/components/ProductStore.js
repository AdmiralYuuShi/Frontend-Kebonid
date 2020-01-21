import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Header, Body, Title, Right, Left} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Item, Input} from 'native-base';
import ListProductStore from './ListProductStore';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import {getProducts, deleteProduct} from '../public/redux/actions/products';
import {API_KEY_URL} from 'react-native-dotenv';

class ProductStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }

  componentDidMount = async () => {
    let url = `${API_KEY_URL}/product?search=${this.props.auth.user.id}&sortBy=date_updated`;
    await this.props.get(url);
  };

  onDelete = async (item, index) => {
    const items = [...this.props.products.products];
    let url = `${API_KEY_URL}/product/${items[index].id}`;
    await this.props
      .delete(url)
      .then(() => {
        Alert.alert('Success!', 'Berhasil Hapus Produk', [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ]);
        this.apiCall();
      })
      .catch(err => {
        Alert.alert(err);
      });
  };

  apiCall = async () => {
    let url = `${API_KEY_URL}/product?search=1&sortBy=date_updated`;
    await this.props.get(url);
  };

  onSearch = async searchKey => {
    this.setState({search: searchKey});

    try {
      let url = `${API_KEY_URL}/product?search=${searchKey}`;
      await this.props.get(url);
    } catch (err) {}
  };

  render() {
    return (
      <>
        <Header style={styles.header}>
          <Left>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('BottomNavbar')}>
              <Icon style={styles.icon} name="angle-left" size={wp('5.5%')} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title style={styles.title}>Daftar Produk</Title>
          </Body>
          <Right>
            <TouchableOpacity
              onPress={() => this.props.navigation.push('AddProduct')}>
              <Icon style={styles.iconadd} name="plus" size={wp('5.5%')} />
            </TouchableOpacity>
          </Right>
        </Header>
        <View style={styles.viewsearch}>
          <Item style={styles.item}>
            <Icon active name="search" />
            <Input placeholder="Cari Produk Anda ... " />
          </Item>
        </View>
        <SafeAreaView style={styles.list}>
          <FlatList
            data={this.props.products.products}
            renderItem={({item, index}) => (
              <ListProductStore
                item={item}
                onDelete={() => this.onDelete(item, index)}
              />
            )}
            keyExtractor={item => item.id}
          />
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
    marginLeft: wp('0%'),
  },
  righticon: {
    marginRight: wp('3%'),
  },
  list: {
    flex: 1,
    marginTop: hp('2%'),
    alignSelf: 'center',
  },
  viewsearch: {
    height: hp('7.5%'),
  },
  viewnotsearch: {
    height: hp('0%'),
  },
  item: {
    marginLeft: wp('3.5%'),
    marginRight: wp('3.5%'),
  },
  icon: {
    marginLeft: wp('2%'),
  },
  iconadd: {
    marginRight: wp('2%'),
  },
});

const mapStateToProps = state => {
  return {
    products: state.products,
    auth: state.auth,
  };
};
const mapDispatchToProps = dispatch => ({
  get: url => dispatch(getProducts(url)),
  delete: url => dispatch(deleteProduct(url)),
});

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(ProductStore),
);
