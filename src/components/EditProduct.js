import React, {Component} from 'react';
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
import {updateProduct} from '../public/redux/actions/products';
import {getProduct} from '../public/redux/actions/product';
import {API_KEY_PHOTO, API_KEY_URL} from 'react-native-dotenv';

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      photo: null,
      name: '',
      description: '',
      price: '',
      stock: '',
      uri: '',
      filename: '',
      filesize: 0,
    };
  }

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

  componentDidMount = async () => {
    const item = this.props.navigation.getParam('item', {});
    let url = `${API_KEY_URL}/product/${item.id}`;
    this.props.get(url).then(() => {
      this.props.product.product.map(p => {
        return this.setState({
          id: p.id,
          name: p.product_name,
          photo: p.product_photo,
          description: p.description,
          stock: p.stock,
          price: p.price,
        });
      });
    });
  };

  onUpdate = async () => {
    const {
      name,
      description,
      stock,
      price,
      id,
      photo,
      uri,
      filename,
      filesize,
    } = this.state;
    let url = `${API_KEY_URL}/product/${id}`;
    let data = new FormData();
    data.append('sellerId', '1');
    data.append('name', name);
    data.append('description', description);
    data.append('stock', stock);
    data.append('price', price);
    data.append(
      'photo',
      !uri
        ? photo
        : {
            uri,
            type: 'image/jpeg',
            name: filename,
          },
    );

    if (uri && filesize > 1 * 1024 * 1024) {
      // eslint-disable-next-line no-alert
      alert('File Too Large! Max 6 MB');
    } else {
      await this.props
        .update(url, data)
        .then(() => {
          Alert.alert('Success!', 'Berhasil Ubah Produk', [
            {
              text: 'OK',
              style: 'cancel',
            },
          ]);
          this.props.navigation.push('ProductStore');
        })
        .catch(err => {
          Alert.alert(err);
        });
    }
  };

  render() {
    const {photo, name, description, price, stock, uri} = this.state;
    return (
      <>
        <Header style={styles.header}>
          <Left>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon style={styles.icon} name="times" size={wp('5.5%')} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title style={styles.title}>Edit Produk</Title>
          </Body>
          <Right>
            {this.props.products.isLoading ? (
              <ActivityIndicator />
            ) : (
              <Button
                success
                small
                style={styles.save}
                onPress={this.onUpdate.bind(this)}>
                <Text style={styles.addtext}>Save</Text>
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
            source={uri ? photo : {uri: `${API_KEY_PHOTO}/product/${photo}`}}
          />
        </View>
        <TouchableOpacity
          onPress={this.selectImage.bind(this)}
          style={styles.viewadd}>
          <View>
            <Button
              rounded
              small
              style={styles.change}
              onPress={this.selectImage.bind(this)}>
              <Text style={styles.changetext}>Ubah</Text>
            </Button>
          </View>
        </TouchableOpacity>
        <ScrollView style={styles.viewinfo}>
          <View>
            <Item stackedLabel style={styles.item}>
              <Label style={styles.label}>Nama Produk</Label>
              <Input
                style={styles.input}
                value={name}
                onChangeText={value => this.setState({name: value})}
              />
            </Item>
            <Item stackedLabel style={styles.item}>
              <Label style={styles.label}>Deskripsi Produk</Label>
              <Input
                multiline={true}
                numberOfLines={4}
                style={styles.desc}
                value={description}
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
                value={price}
                onChangeText={value => {
                  this.setState({
                    price: value
                      .replace('Rp. ', '')
                      .split('.')
                      .join(''),
                  });
                }}
              />
            </Item>
            <Item stackedLabel last style={styles.item}>
              <Label style={styles.label}>Stok</Label>
              <Input
                style={styles.input}
                keyboardType="numeric"
                value={stock.toString()}
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
  },
  viewinfo: {
    marginLeft: wp('3%'),
    marginRight: wp('3%'),
    marginBottom: hp('8%'),
  },
  item: {
    marginTop: hp('3%'),
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
  save: {
    width: wp('15%'),
    justifyContent: 'center',
  },
  change: {
    backgroundColor: 'rgba(179, 182, 183, 0.1)',
    width: wp('15'),
    height: hp('3%'),
    justifyContent: 'center',
  },
  changetext: {
    color: '#fff',
  },
  input: {
    textAlign: 'left',
  },
  label: {
    alignSelf: 'flex-start',
  },
});

const mapStateToProps = state => {
  return {
    products: state.products,
    product: state.product,
  };
};

const mapDispatchToProps = dispatch => ({
  update: (url, data) => dispatch(updateProduct(url, data)),
  get: url => dispatch(getProduct(url)),
});

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(EditProduct),
);
