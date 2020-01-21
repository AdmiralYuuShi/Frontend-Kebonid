import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Header, Body, Title, Right} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Item, Input} from 'native-base';
import WishlistProduct from './WishlistProduct';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import {getWishlists, deleteWishlist} from '../public/redux/actions/wishlist';
import {API_KEY_URL} from 'react-native-dotenv';
import {TouchableOpacity} from 'react-native-gesture-handler';

class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }

  componentDidMount = async () => {
    const id = this.props.auth.user.id;
    let url = `${API_KEY_URL}/wishlist/${id}`;
    await this.props.get(url);
  };

  apiCall = async () => {
    const id = this.props.auth.user.id;
    let url = `${API_KEY_URL}/wishlist/${id}`;
    await this.props.get(url);
  };

  onDelete = async (item, index) => {
    const items = [...this.props.wishlist.wishlist];
    let url = `${API_KEY_URL}/wishlist/${items[index].id}`;
    await this.props
      .delete(url)
      .then(() => {
        Alert.alert('Success!', 'Berhasil Hapus Produk dari Wishlist Anda', [
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

  render() {
    return (
      <>
        <Header style={styles.header}>
          <Body>
            <Title style={styles.title}>Wishlist</Title>
          </Body>
          <Right>
            {this.props.wishlist.isLoading ? (
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
        <View style={styles.viewsearch}>
          <Item style={styles.item}>
            <Icon active name="search" />
            <Input placeholder="Search Wishlist ... " />
          </Item>
        </View>
        <SafeAreaView style={styles.list}>
          <FlatList
            data={this.props.wishlist.wishlist}
            renderItem={({item, index}) => (
              <WishlistProduct
                item={item}
                onDelete={() => this.onDelete(item, index)}
              />
            )}
            numColumns={2}
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
    marginLeft: wp('3%'),
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
  refresh: {
    marginRight: wp('4%'),
  },
});

const mapStateToProps = state => {
  return {
    wishlist: state.wishlist,
    auth: state.auth,
  };
};
const mapDispatchToProps = dispatch => ({
  get: url => dispatch(getWishlists(url)),
  delete: url => dispatch(deleteWishlist(url)),
});

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(Wishlist),
);
