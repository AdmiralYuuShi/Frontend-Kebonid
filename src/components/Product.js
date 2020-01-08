import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Image, View, Text} from 'react-native';
import {
  Header,
  Body,
  Title,
  Left,
  Button,
  ListItem,
  Thumbnail,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {withNavigation, SafeAreaView} from 'react-navigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ScrollView} from 'react-native-gesture-handler';
import NumberFormat from 'react-number-format';

class Product extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const product = this.props.navigation.getParam('product', {});
    return (
      <>
        <Header style={styles.header}>
          <Left>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon style={styles.icon} name="angle-left" size={wp('5.5%')} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title style={styles.title}> Produk </Title>
          </Body>
        </Header>
        <SafeAreaView style={styles.body}>
          <ScrollView style={{marginBottom: hp('8%')}}>
            <Image
              style={styles.image}
              source={{
                uri:
                  'https://www.amwaytoday.co.id/kesehatan/info-produk/Bigger-is-Better.img.png/1567420073429.png',
              }}
            />
            <View style={styles.floating}>
              <Icon name="heart" size={wp('10%')} color={'#979A9A'} />
            </View>

            <Text style={styles.textname} numberOfLines={2}>
              {product.name}
            </Text>
            <View style={styles.viewstok}>
              <NumberFormat
                value={product.code}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'Rp. '}
                renderText={value => (
                  <Text style={styles.textprice}>{value}</Text>
                )}
              />
              <Text style={styles.stok}>Stok: 500</Text>
            </View>
            <View style={styles.saparator} />
            <View>
              <Text style={styles.desc}>Deskripsi Produk</Text>
              <Text style={styles.desctext}>
                Jaket X Multifungsi terbuat dari bahan taslan yang tahan air dan
                tidak mudah ditembus angin. Cocok bagi Anda yang banyak
                beraktivitas di luar ruangan atau pengendara motor.
              </Text>
            </View>
            <View style={styles.saparator} />
            <View>
              <Text style={styles.desc}>Penjual</Text>
              <ListItem thumbnail style={styles.seller}>
                <Left>
                  <Thumbnail
                    square
                    source={{
                      uri:
                        'https://cf.shopee.co.id/file/691ed29004335e7ab3cf81ebda2497e2_tn',
                    }}
                  />
                </Left>
                <Body>
                  <Text style={styles.sellertext}>RajaCell</Text>
                </Body>
              </ListItem>
            </View>
          </ScrollView>
          <View />
          <View style={styles.viewbottom}>
            <Button style={styles.buttonchat}>
              <Icon name="comment" size={30} color={'#979A9A'} />
            </Button>
            <Button style={styles.buttonbeli}>
              <Text style={styles.textbeli}>Beli</Text>
            </Button>
            <Button style={styles.buttoncart}>
              <Text style={styles.textcart}>Tambah Ke Keranjang</Text>
            </Button>
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
  body: {
    flex: 1,
  },
  image: {
    width: wp('100%'),
    height: hp('45%'),
    resizeMode: 'stretch',
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: wp('7%'),
    marginLeft: wp('-10%'),
  },
  icon: {
    marginLeft: wp('2%'),
  },
  floating: {
    width: wp('18%'),
    height: hp('9%'),
    backgroundColor: '#fff',
    borderRadius: wp('50%'),
    position: 'absolute',
    alignSelf: 'flex-end',
    top: hp('40%'),
    right: wp('7%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewbottom: {
    height: hp('8%'),
    width: wp('100%'),
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: hp('0%'),
    alignItems: 'center',
    flexDirection: 'row',
    borderTopColor: '#D7DBDD',
    borderColor: '#fff',
    borderWidth: wp('0.3%'),
  },
  buttonchat: {
    width: wp('15%'),
    height: hp('6.5'),
    borderRadius: wp('2%'),
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginLeft: wp('2%'),
    borderColor: '#D7DBDD',
    borderWidth: wp('0.5%'),
  },
  buttonbeli: {
    width: wp('32%'),
    height: hp('6.5'),
    borderRadius: wp('2%'),
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginLeft: wp('2%'),
    borderColor: '#E5511B',
    borderWidth: wp('0.5%'),
  },
  textbeli: {
    color: '#E5511B',
    fontSize: wp('5%'),
  },
  buttoncart: {
    width: wp('45%'),
    height: hp('6.5'),
    borderRadius: wp('2%'),
    justifyContent: 'center',
    backgroundColor: '#E5511B',
    marginLeft: wp('2%'),
    borderColor: '#E5511B',
    borderWidth: wp('0.5%'),
  },
  textcart: {
    color: '#fff',
    fontSize: wp('4%'),
  },
  textname: {
    fontSize: hp('4%'),
    width: wp('70%'),
    marginLeft: wp('3%'),
    marginTop: hp('1%'),
  },
  textprice: {
    fontSize: hp('3%'),
    marginLeft: wp('3%'),
    marginTop: hp('1%'),
    color: '#E5511B',
  },
  saparator: {
    height: hp('0.2%'),
    width: wp('100%'),
    backgroundColor: '#E5E7E9',
    marginTop: hp('2%'),
  },
  desc: {
    fontSize: hp('3%'),
    width: wp('70%'),
    marginLeft: wp('3%'),
    marginTop: hp('1%'),
    color: '#CACFD2',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  desctext: {
    fontSize: hp('2%'),
    width: wp('95%'),
    marginLeft: wp('3%'),
    marginTop: hp('1%'),
    color: '#979A9A',
  },
  seller: {
    marginTop: hp('2%'),
  },
  sellertext: {
    fontSize: hp('3%'),
    width: wp('95%'),
    marginTop: hp('1%'),
    color: '#979A9A',
  },
  stok: {
    fontSize: hp('2%'),
    alignSelf: 'center',
    position: 'absolute',
    right: wp('05'),
    color: '#979A9A',
  },
  viewstok: {flexDirection: 'row', flex: 1},
});

export default withNavigation(Product);
