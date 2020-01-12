import React, {Component} from 'react';
import {Text, StyleSheet, View, ScrollView, Image} from 'react-native';
import {Header, Body, Title, Button, Card, CardItem} from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
class Invoice extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const data = this.props.navigation.getParam('data', {});
    const payment = this.props.payment.result;
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
            {console.log(payment.status_code)}
            {console.log(payment.actions[0].url)}
            {payment.status_code === '406' ? 
            <View style={style.wrapper}>
              <Text style={{fontWeight: 'bold', fontSize: 50}}>{payment.status_code}</Text>
              <Text style={style.text}>
                {payment.status_message}
              </Text>
              <View style={style.buttonWrapper}>
                <Button
                  onPress={() => this.props.navigation.push('BottomNavbar')}
                  style={style.button}
                  title="Kembali ke Home">
                  <Text style={style.buttontext}>Kembali ke Home</Text>
                </Button>
              </View>
            </View>
          :
            <View style={style.wrapper}>
              <Text style={style.text}>
                Selamat kamu sukses memesan barangnya. Ini dia status pesanan
                kamu :
              </Text>
              <Card style={{width: 300}}>
            <CardItem header bordered>
              <Text style={{fontWeight: 'bold'}}>Detail Pesanan</Text>
            </CardItem>
            <CardItem bordered>
                <Text>
                No transaksi : {'\n' + payment.order_id}
                </Text>
            </CardItem>
            <CardItem bordered>
                <Text>
               Total Harga : {'\n Rp ' + payment.gross_amount}
                </Text>
            </CardItem>
            <CardItem bordered>
                <Text>
                Metode Pembayaran : {'\n' + payment.payment_type}
                </Text>
            </CardItem>
            <CardItem footer bordered>
              <Text>Scan QR Code dibawah ini di aplikasi gojek mu.</Text>
            </CardItem>
          </Card>
          {/* <Image
              source={{uri: payment.actions[0].url}}
            /> */}
            <Image
          style={{width: 300, height: 300}}
          source={{uri: payment.actions[0].url}}
        />
              <View style={style.buttonWrapper}>
                <Button
                  onPress={() => this.props.navigation.push('BottomNavbar')}
                  style={style.button}
                  title="Kembali ke Home">
                  <Text style={style.buttontext}>Kembali ke Home</Text>
                </Button>
              </View>
            </View> 
          }
          </View>
        </ScrollView>
      </>
    );
  }
}


const mapStateToProps = state => {
  return {
    payment: state.payment,
    auth: state.auth,
  };
};

export default withNavigation(
  connect(mapStateToProps)(Invoice),
);

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
    textAlign: 'center',
  },
  image: {height: hp('30%'), resizeMode: 'contain', alignSelf: 'center'},
  buttontext: {
    color: '#fff',
  },
});
