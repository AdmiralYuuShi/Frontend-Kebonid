import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  SafeAreaView,
  TouchableOpacity,
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

class ProductStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }

  render() {
    const items = [
      {id: 'c1', name: 'TURQUOISE', code: '900000', stok: 2},
      {id: 'c2', name: 'EMERALD ', code: '40000', stok: 99},
      {id: 'c3', name: 'PETER RIVER', code: '100000', stok: 500},
    ];
    return (
      <>
        <Header style={styles.header}>
          <Left>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon style={styles.icon} name="angle-left" size={wp('5.5%')} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title style={styles.title}>Daftar Produk</Title>
          </Body>
          <Right>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('AddProduct')}>
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
            data={items}
            renderItem={({item}) => <ListProductStore item={item} />}
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

export default withNavigation(ProductStore);
