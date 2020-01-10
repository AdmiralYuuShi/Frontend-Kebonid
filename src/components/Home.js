import React, {Component} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  FlatList,
  View,
  SafeAreaView,
  BackHandler,
  Alert,
} from 'react-native';
import {Header, Body, Title, Right, Text} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Item, Input} from 'native-base';
import Products from './Products';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import { AndroidBackHandler } from 'react-navigation-backhandler';
import {getProducts} from '../public/redux/actions/products';
import {API_KEY_URL} from 'react-native-dotenv';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClick: 0,
      search: '',
    };
  }

  onSearch = async searchKey => {
    this.setState({search: searchKey});

    try {
      let url = `${API_KEY_URL}/api/v1/product?search=${searchKey}`;
      await this.props.get(url);
    } catch (err) {}
  };

  componentDidMount = async () => {
    // BackHandler.addEventListener(
    //   'hardwareBackPress',
    //   this.handleBackButtonPressAndroid
    // );
    const sortVal = this.props.navigation.getParam('sortValue', '');
    let url = '';
    !sortVal
      ? (url = `${API_KEY_URL}/product?sortBy=name&sort=asc`)
      : (url = `${API_KEY_URL}/product?sortBy=${sortVal.split('/')[0]}&sort=${
          sortVal.split('/')[1]
        }`);

    await this.props.get(url);
    
  };

  onBackButtonPressAndroid = () => {
    /*
    *   Returning `true` from `onBackButtonPressAndroid` denotes that we have handled the event,
    *   and react-navigation's lister will not get called, thus not popping the screen.
    *
    *   Returning `false` will cause the event to bubble up and react-navigation's listener will pop the screen.
    * */
 
    if (this.props.auth.token !== null) {
        this.handleBackButton();
      return true;
    }
    return false;
  };
  
  handleBackButton() {
    Alert.alert(
      'Exit App',
      'Exiting the application?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {
        cancelable: false,
      },
    );
    return true;
  }

  render() {
    const {isClick} = this.state;
    return (
      <>
      <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
        <Header style={styles.header}>
          <Body>
            <Title style={styles.title}>Home</Title>
          </Body>
          <Right>
            <TouchableOpacity
              onPress={() =>
                !isClick
                  ? this.setState({isClick: 1})
                  : this.setState({isClick: 0})
              }>
              <Icon name="search" size={wp('5.5%')} style={styles.righticon} />
            </TouchableOpacity>
          </Right>
        </Header>
        {isClick ? (
          <View style={styles.viewsearch}>
            <Item style={styles.item}>
              <Icon active name="search" />
              <Input
                placeholder="Search Product ... "
                onChangeText={text => {
                  this.onSearch(text);
                }}
              />
            </Item>
          </View>
        ) : (
          <View />
        )}
        <SafeAreaView style={styles.list}>
          <FlatList
            data={this.props.products.products}
            renderItem={({item}) => <Products item={item} />}
            numColumns={2}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>

        <View style={styles.floating}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Sort')}>
            <View style={styles.sort}>
              <Icon active name="sort" size={20} style={styles.iconsort} />
              <Text style={styles.textFilter}>Sort</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Filter')}>
            <View style={styles.filter}>
              <Icon active name="filter" size={20} style={styles.iconfilter} />
              <Text style={styles.textFilter}>Filter</Text>
            </View>
          </TouchableOpacity>
        </View>
      </AndroidBackHandler>
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
  floating: {
    flexDirection: 'row',
    width: wp('45%'),
    height: hp('8%'),
    position: 'absolute',
    backgroundColor: '#FBFCFC',
    borderColor: '#E5E6E6',
    borderWidth: 1,
    alignSelf: 'center',
    bottom: hp('5%'),
    borderRadius: wp('10%'),
    alignItems: 'center',
  },
  sort: {
    flexDirection: 'row',
    marginLeft: wp('5%'),
  },
  iconsort: {
    marginRight: wp('3%'),
  },
  filter: {
    flexDirection: 'row',
    marginLeft: wp('7%'),
  },
  iconfilter: {
    marginRight: wp('3%'),
  },
  textFilter: {
    fontSize: wp('3.5%'),
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
});

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(Home),
);
