import React, {Component} from 'react';
import {StyleSheet, FlatList, View, SafeAreaView} from 'react-native';
import {Header, Body, Title} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Item, Input} from 'native-base';
import WishlistProduct from './WishlistProduct';
import {withNavigation} from 'react-navigation';

class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }

  render() {
    const items = [
      {id: 'c1', name: 'TURQUOISE', code: '900000'},
      {id: 'c2', name: 'EMERALD ', code: '40000'},
      {id: 'c3', name: 'PETER RIVER', code: '100000'},
      {id: 'c4', name: 'AMETHYST', code: '25000'},
      {id: 'c5', name: 'WET ASPHALT', code: '345000'},
      {id: 'c6', name: 'GREEN SEA', code: '10000'},
      {id: 'c7', name: 'NEPHRITIS', code: '75000'},
      {id: 'c8', name: 'BELIZE HOLE', code: '1500000'},
      {id: 'c9', name: 'WISTERIA', code: '400000'},
    ];
    return (
      <>
        <Header style={styles.header}>
          <Body>
            <Title style={styles.title}>Wishlist</Title>
          </Body>
        </Header>
        <View style={styles.viewsearch}>
          <Item style={styles.item}>
            <Icon active name="search" />
            <Input placeholder="Search Wishlist ... " />
          </Item>
        </View>
        <SafeAreaView style={styles.list}>
          <FlatList
            data={items}
            renderItem={({item}) => <WishlistProduct item={item} />}
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
});

export default withNavigation(Wishlist);
