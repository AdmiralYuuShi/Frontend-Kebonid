import React, {Component} from 'react';
import {Text, StyleSheet, View, ScrollView, Image} from 'react-native';
import {Header, Body, Title, Button} from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {withNavigation} from 'react-navigation';
class Invoice extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const data = this.props.navigation.getParam('data', {});
    return (
      <>
        <Header style={style.header}>
          <Body>
            <Title style={style.title}>Status Transaksi</Title>
          </Body>
        </Header>
        <ScrollView>
          <View style={style.container}>
            <Image
              source={require('../assets/brocoli.png')}
              style={style.image}
            />
            <View style={style.wrapper}>
              <Text style={style.text}>
                Selamat kamu sukses memesan barangnya. Ini dia status pesanan
                kamu :
              </Text>
              <Text style={style.textDesc1}>No transaksi : 1</Text>
              <Text style={style.textDesc1}>Total harga : 128000</Text>
              <Text style={style.textDesc1}>Ongkir : 10000</Text>
              <Text style={style.textDesc1}>Total tagihan : 138000</Text>
              <Text style={style.textDesc1}>Kurir : {data.courier}</Text>
              <Text style={style.textDesc1}>Bank : {data.bank}</Text>
              <Text style={style.text}>Jangan lupa bayar ya Keboners...</Text>
              <View style={style.buttonWrapper}>
                <Button
                  onPress={() => this.props.navigation.push('BottomNavbar')}
                  style={style.button}
                  title="Kembali ke Home">
                  <Text style={style.buttontext}>Kembali ke Home</Text>
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}
export default withNavigation(Invoice);
const style = StyleSheet.create({
  button: {
    backgroundColor: '#03AC0E',
    borderRadius: wp('3%'),
    marginTop: hp('-2%'),
    alignItems: 'center',
    width: wp('50%'),
    justifyContent: 'center',
  },
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('60%'),
    marginTop: hp('5%'),
    marginLeft: wp('3%'),
  },
  header: {
    backgroundColor: '#fff',
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: wp('7%'),
    textAlign: 'center',
  },
  row2: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  textDesc2: {
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    width: wp('90%'),
    textAlign: 'center',
    marginBottom: hp('3%'),
    marginTop: hp('2%'),
    fontWeight: 'bold',
  },
  wrapper: {
    alignItems: 'center',
  },
  image: {height: hp('30%'), resizeMode: 'contain', alignSelf: 'center'},
  buttontext: {
    color: '#fff',
  },
});
