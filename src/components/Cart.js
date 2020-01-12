import React, {Component} from 'react';
import {StyleSheet, FlatList, SafeAreaView, View, Text} from 'react-native';
import {Header, Body, Title, Button} from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CartList from './CartList';
import {withNavigation} from 'react-navigation';
import NumberFormat from 'react-number-format';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      items: [
        {id: 'c1', name: 'TURQUOISE', code: 500000, stok: 1, totalStok: 4},
        {id: 'c2', name: 'EMERALD ', code: 40000, stok: 1, totalStok: 12},
        {id: 'c3', name: 'PETER RIVER', code: 60000, stok: 1, totalStok: 7},
        {id: 'c4', name: 'AMAZON', code: 250000, stok: 1, totalStok: 10},
        {id: 'c5', name: 'SILVER ', code: 150000, stok: 1, totalStok: 2},
      ],
    };
  }

  minus = (item, index) => {
    const items = [...this.state.items];
    items[index].stok -= 1;
    this.setState({items});
  };

  plus = (item, index) => {
    const items = [...this.state.items];
    items[index].stok += 1;
    this.setState({items});
  };

  render() {
    const {items} = this.state;
    let totalQuantity = 0;
    let totalPrice = 0;
    items.forEach(item => {
      totalQuantity += item.stok;
      totalPrice += item.stok * item.code;
    });
    return (
      <>
        <Header style={styles.header}>
          <Body>
            <Title style={styles.title}>Keranjang</Title>
          </Body>
        </Header>

        <SafeAreaView style={styles.list}>
          <View style={styles.toko}>
            <Text style={styles.tokotext}>Toko :</Text>
            <Text style={styles.tokoname}>RajaCell</Text>
          </View>
          <FlatList
            data={this.state.items}
            renderItem={({item, index}) => (
              <CartList
                item={item}
                add={() => this.plus(item, index)}
                reduce={() => this.minus(item, index)}
              />
            )}
            keyExtractor={item => item.id}
          />
          <View style={styles.bottom}>
            <View style={styles.totalharga}>
              <Text style={styles.harga}>Total Harga</Text>
              <NumberFormat
                value={totalPrice}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'Rp. '}
                renderText={value => <Text style={styles.total}>{value}</Text>}
              />
            </View>
            <View style={styles.space} />
            <View>
              <Button
                style={styles.buttonbeli}
                onPress={() => this.props.navigation.navigate('Transaction')}>
                <Text style={styles.textbeli}>Bayar ({totalQuantity})</Text>
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
  },
  space: {
    width: wp('44%'),
  },
  totalharga: {
    marginLeft: wp('2%'),
    left: wp('0%'),
  },
  harga: {
    fontWeight: 'bold',
  },
  total: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: '#E5511B',
  },
});

export default withNavigation(Cart);
