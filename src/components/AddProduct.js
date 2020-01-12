import React, {PureComponent} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  Header,
  Body,
  Title,
  Button,
  Left,
  Right,
  Label,
  Input,
  Item,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {withNavigation} from 'react-navigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-picker';
import {TextInputMask} from 'react-native-masked-text';
import {connect} from 'react-redux';
import {addProduct} from '../public/redux/actions/products';
import {API_KEY_URL} from 'react-native-dotenv';

class AddProduct extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      photo: null,
      name: '',
      description: '',
      price: '',
      stock: '',
      filename: '',
      uri: '',
      nameErr: '',
      filesize: '',
    };
  }

  onAdd = async () => {
    const {name, description, stock, price, uri, filename} = this.state;
    const priceadd = price
      .replace('Rp. ', '')
      .split('.')
      .join('');
    let url = `${API_KEY_URL}/product`;
    let data = new FormData();
    data.append('sellerId', this.props.auth.user.id);
    data.append('name', name);
    data.append('description', description);
    data.append('stock', stock);
    data.append('price', priceadd);
    data.append('photo', {
      uri,
      type: 'image/jpeg',
      name: filename,
    });

    if (!filename) {
      Alert.alert('Error!', 'Harus Upload Foto Ya!', [
        {
          text: 'Ok',
          style: 'cancel',
        },
      ]);
    } else if (this.state.filesize > 6 * 1024 * 1024) {
      Alert.alert('Error!', 'Foto terlalu besar. Maksimal 6 MB', [
        {
          text: 'Ok',
          style: 'cancel',
        },
      ]);
    } else if (!name || !description || priceadd === '0' || !stock) {
      Alert.alert('Error!', 'Semua Field harus diisi', [
        {
          text: 'Ok',
          style: 'cancel',
        },
      ]);
    } else {
      await this.props
        .add(url, data)
        .then(() => {
          Alert.alert(
            'Success!',
            'Berhasil Tambah Produk',
            [
              {
                text: 'OK',
                onPress: () => {
                  this.props.navigation.push('ProductStore');
                },
              },
            ],
            {cancelable: false},
          );
        })
        .catch(err => {
          Alert.alert(err);
        });
    }
  };

  selectImage = () => {
    const options = {};
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri, isStatic: true};
        this.setState({
          photo: source,
          uri: response.uri,
          filename: response.fileName,
          filesize: response.fileSize,
        });
      }
    });
  };

  render() {
    return (
      <>
        <Header style={styles.header}>
          <Left>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon style={styles.icon} name="times" size={wp('5.5%')} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title style={styles.title}>Tambah Produk</Title>
          </Body>
          <Right>
            {this.props.products.isLoading ? (
              <ActivityIndicator />
            ) : (
              <Button success small onPress={this.onAdd.bind(this)}>
                <Text style={styles.addtext}>Tambah</Text>
              </Button>
            )}
          </Right>
        </Header>
        <View style={styles.viewimage}>
          <Image
            style={styles.imagebg}
            source={{
              uri:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEWAgICQdD0xAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=',
            }}
          />
          <Image
            style={styles.image}
            source={
              !this.state.photo
                ? {
                    uri:
                      'https://developer.apple.com/library/archive/referencelibrary/GettingStarted/DevelopiOSAppsSwift/Art/defaultphoto_2x.png',
                  }
                : this.state.photo
            }
          />
        </View>
        <TouchableOpacity
          onPress={this.selectImage.bind(this)}
          style={styles.viewadd}>
          <View>
            <Icon name="plus" color={'#fff'} />
          </View>
        </TouchableOpacity>
        <ScrollView style={styles.viewinfo}>
          <View>
            <Item stackedLabel style={styles.item}>
              <Label style={styles.label}>Nama Produk</Label>
              <Input
                onChangeText={value => this.setState({name: value})}
                style={styles.input}
              />
            </Item>
            <Item stackedLabel style={styles.item}>
              <Label style={styles.label}>Deskripsi Produk</Label>
              <Input
                multiline={true}
                numberOfLines={4}
                style={styles.desc}
                onChangeText={value => this.setState({description: value})}
              />
            </Item>
            <Item stackedLabel style={styles.item}>
              <Label style={styles.label}>Harga</Label>
              <TextInputMask
                keyboardType="numeric"
                type={'money'}
                options={{
                  precision: 0,
                  separator: ',',
                  delimiter: '.',
                  unit: 'Rp. ',
                  suffixUnit: '',
                }}
                value={this.state.price}
                onChangeText={value => {
                  this.setState({
                    price: value,
                  });
                }}
              />
            </Item>
            <Item stackedLabel last style={styles.item}>
              <Label style={styles.label}>Stok</Label>
              <Input
                style={styles.input}
                keyboardType="numeric"
                onChangeText={value => this.setState({stock: value})}
              />
            </Item>
          </View>
        </ScrollView>
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
    flexDirection: 'row',
    marginTop: hp('3%'),
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: wp('6.5%'),
    marginLeft: wp('-5%'),
  },
  icon: {
    marginLeft: wp('2%'),
  },
  addtext: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: wp('3%'),
  },
  desc: {
    width: wp('80%'),
    textAlign: 'left',
  },
  viewinfo: {
    marginLeft: wp('3%'),
    marginRight: wp('3%'),
    marginBottom: hp('8%'),
  },
  item: {
    marginTop: hp('3%'),
  },
  input: {
    textAlign: 'left',
  },
  label: {
    alignSelf: 'flex-start',
  },
  viewimage: {
    height: hp('16%'),
    marginTop: hp('3%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagebg: {
    width: wp('30%'),
    height: hp('15%'),
    borderWidth: wp('0.5%'),
    borderColor: '#fff',
    borderRadius: wp('2%'),
    position: 'absolute',
    top: hp('1.5%'),
    left: wp('37%'),
  },
  image: {
    width: wp('30%'),
    height: hp('15%'),
    borderWidth: wp('0.5%'),
    borderColor: '#fff',
    borderRadius: wp('2%'),
  },
  viewadd: {
    width: wp('30%'),
    height: hp('15%'),
    borderRadius: wp('2%'),
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: wp('35%'),
    top: hp('11%'),
  },
});

const mapStateToProps = state => {
  return {
    products: state.products,
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => ({
  add: (url, data) => dispatch(addProduct(url, data)),
});

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(AddProduct),
);
