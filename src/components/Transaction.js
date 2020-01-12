import {
  Header,
  Body,
  Title,
  Button,
  Left,
  Picker,
  Form,
  Item,
  H3,
} from 'native-base';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {withNavigation} from 'react-navigation';
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Divider, Image} from 'react-native-elements';
import {payment} from '../public/redux/actions/payment';
import {getTransaction} from '../public/redux/actions/transaction';
import {API_KEY_URL} from 'react-native-dotenv';

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
      selectedBank: undefined,
      total: 10000,
      orderId: "qwerty333",
      email: "mymaial@mail.com",
      firstName: "Jimy",
      lastName: "UwU",
      itemDetails: [{
        "id": "iniid999",
        "price": 2000,
        "quantity": 3,
        "name": "Kopi"
     },
     {
        "id": "iniid333",
        "price": 4000,
        "quantity": 1,
        "name": "Susu"
     },
     {
        "id": "iniid333",
        "price": 4000,
        "quantity": 1,
        "name": "Susu"
     }]
    };
  }

  componentDidMount() {
    this.getData();
    this.focusListener = this.props.navigation.addListener('willFocus', () => {
      this.onFocusFunction();
    });
  }

  onFocusFunction = () => {
    // do some stuff on every screen focus
    this.getData();
  };

  getData = async() => {
    const id = '52184134-cc7b-42a6-9b0f-24f4e7d7d77f'
    const url = API_KEY_URL+'/transaction/latest/'+id
    await this.props.getTransaction(url)
    .then(result => {
      console.log(result)
    })
    .catch(err => {
      console.log(err)
    })
  }


  onValueChange(value) {
    this.setState({
      selected: value,
    });
  }
  onValueChangeBank(value) {
    this.setState({
      selectedBank: value,
    });
  }

  handlePayNow = _ => {
    const transactions = this.props.transactions
    const data = {
      payment_type: this.state.selectedBank,
      transaction_details: {
          gross_amount: this.props.transactions.total[0].total,
          order_id: transactions.result[0].group_id
      },
      gopay: {
        enable_callback: true,
        callback_url: "someapps://callback"
      },
        customer_details: {
            email: this.props.auth.user.email,
            first_name: this.props.auth.user.email.split("@", 1)[0].replace(/[0-9]/g, '') || 'customer',
            last_name: 'kebonid'
        },
        item_details: transactions.result.map(t => (
          {
            id: t.id,
            price: t.price,
            quantity: t.amount,
            name: t.product_name
          })
        )
    }
    const url = 'https://api.sandbox.midtrans.com/v2/charge'
    this.props.payment(url, data)
    .then(result => {
      console.log("resssssssssssssssssss: "+JSON.stringify(result))
      this.props.navigation.navigate('Invoice', {
        data: {
          courier: this.state.selected,
          bank: this.state.selectedBank,
          },
        })
      }
    )
  }

  renderIt() {
    return this.props.transactions.result.map(transaction => {
      return (
        <View style={{marginTop: 10}} key={transaction.id}>
        {/* <Image
          source={require('../assets/bg.jpeg')}
          style={style.img}
          PlaceholderContent={<ActivityIndicator />}
          /> */}
          <H3>{transaction.product_name}</H3>
          <Text style={style.textDesc}>Rp {transaction.price} / {transaction.product_name}</Text>
          <Text style={style.textDesc}>Jumlah : {transaction.amount} pcs</Text>
          <Text style={style.textDesc}>Sub Total : Rp {transaction.sub_total}</Text>
        </View>
      )
    })
  }

  render() {
    return (
      <>
        <Header style={style.header}>
          <Left>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon style={style.icon} name="left" size={wp('5.5%')} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title style={style.title}>Transaksi</Title>
          </Body>
        </Header>
        <ScrollView>
          {/* <View style={style.container}>
            <Text style={style.text1}>Alamat Pengiriman</Text>
            <Divider style={style.divider} />
            <View style={style.Desc}>
              <Text style={style.textDesc}>Arkademy</Text>
              <Text style={style.textDesc}>0812345678</Text>
              <Text style={style.textDesc}>Tebet, Jakarta Selatan</Text>
            </View>
          </View> */}
          <View style={style.container}>
            <Text style={style.text1}>Detail Pesanan</Text>
            <Divider style={style.divider} />
            <View style={style.Desc}>
              <View style={style.row}>
                <View>
                  {console.log('transactionnnnnn' +JSON.stringify(this.props.transactions))}
                  {this.renderIt()}
                  <Divider style={style.divider} />
                  <H3 style={{marginTop: 10}}>Total : Rp {this.props.transactions.total[0].total}</H3>
                </View>
              </View>
            </View>
          </View>
          <View style={style.container}>
            <Text style={style.text1}>Kurir Pilihan</Text>
            <Divider style={style.divider} />
            <Form>
              <Picker
                mode="dropdown"
                placeholder="Select One"
                note={false}
                style={style.picker}
                selectedValue={this.state.selected}
                onValueChange={this.onValueChange.bind(this)}>
                <Picker.Item label="Pilih kurir" value="key0" />
                <Picker.Item label="KebonExpress" value="KebonExpress" />
                <Picker.Item label="SiCepak" value="SiCepak" />
                <Picker.Item label="JeEnTe" value="JeEnTe" />
              </Picker>
            </Form>
            <Text style={style.select}>
              Kurir pilihan kamu adalah :
              {this.state.selected ? (
                this.state.selected
              ) : (
                <Text style={style.courier}> "Pilih dulu ya"</Text>
              )}
            </Text>
          </View>
          <View style={style.container}>
            <Text style={style.text1}>Ringkasan Belanja</Text>
            <Divider style={style.divider} />
            <View style={style.Desc}>
              <View style={style.row2}>
                <Text style={style.textDesc1}>Total Harga :</Text>
                <Text style={style.textDesc2}>Rp {this.props.transactions.total[0].total}</Text>
              </View>
              <View style={style.row2}>
                <Text style={style.textDesc1}>Ongkos Kirim :</Text>
                <Text style={style.textDesc2}>Rp 0</Text>
              </View>
              <Divider style={style.divider} />
              <View style={style.row3}>
                <Text style={style.textDesc3}>Total Tagihan :</Text>
                <Text style={style.textDesc4}>Rp {this.props.transactions.total[0].total}</Text>
              </View>
              <Divider style={style.divider} />
              <Form>
                <Picker
                  mode="dropdown"
                  placeholder="Select One"
                  style={style.picker}
                  note={false}
                  selectedValue={this.state.selectedBank}
                  onValueChange={this.onValueChangeBank.bind(this)}>
                  <Picker.Item label="Pilih Metode Pembayaran" value="key0" />
                  <Picker.Item label="GO PAY" value="gopay" />
                </Picker>
              </Form>
              <Text style={style.select}>
                Metode pembayaran :{' '}
                {this.state.selectedBank ? (
                  this.state.selectedBank
                ) : (
                  <Text style={style.courier}> "Pilih dulu ya"</Text>
                )}
              </Text>
            </View>
            <Button
              full
              title="Bayar Sekarang"
              onPress={this.handlePayNow}
              style={style.button}>
              <Text style={style.buttontext}>Bayar Sekarang</Text>
            </Button>
          </View>
        </ScrollView>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    transactions: state.transaction,
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => ({
  payment: (url, data) => dispatch(payment(url, data)),
  getTransaction: (url) => dispatch(getTransaction(url))
});

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(Transaction),
);

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    padding: wp('5%'),
  },
  header: {
    backgroundColor: '#fff',
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: wp('7%'),
    marginLeft: wp('3%'),
  },
  divider: {backgroundColor: 'green', marginTop: hp('2%')},
  text1: {
    fontSize: wp('5%'),
    color: 'green',
  },
  Desc: {
    marginTop: hp('2%'),
    flex: 1,
  },
  textDesc: {
    fontSize: wp('4%'),
    width: wp('75%'),
  },
  row: {
    flexDirection: 'row',
  },
  img: {
    width: wp('40%'),
    height: hp('20%'),
    resizeMode: 'contain',
    marginRight: wp('2%'),
  },
  row2: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  textDesc2: {
    alignSelf: 'flex-end',
  },
  row3: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginTop: hp('2%'),
  },
  textDesc4: {
    alignSelf: 'flex-end',
    fontWeight: 'bold',
  },
  textDesc3: {
    fontSize: wp('4%'),
    width: wp('75%'),
    fontWeight: 'bold',
  },
  courier: {
    color: 'red',
  },
  button: {
    backgroundColor: '#03AC0E',
    borderRadius: wp('3%'),
    marginTop: hp('3%'),
  },
  buttontext: {
    color: '#ffffff',
  },
  select: {
    marginLeft: wp('3%'),
  },
  picker: {
    color: 'orange',
  },
});
