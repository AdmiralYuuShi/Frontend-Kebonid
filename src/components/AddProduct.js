import React, {PureComponent} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
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

class AddProduct extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
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
          image: source,
          price: '',
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
            <Button success small>
              <Text style={styles.addtext}>Tambah</Text>
            </Button>
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
              !this.state.image
                ? {
                    uri:
                      'https://developer.apple.com/library/archive/referencelibrary/GettingStarted/DevelopiOSAppsSwift/Art/defaultphoto_2x.png',
                  }
                : this.state.image
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
              <Label>Nama Produk</Label>
              <Input />
            </Item>
            <Item stackedLabel style={styles.item}>
              <Label>Deskripsi Produk</Label>
              <Input multiline={true} numberOfLines={4} style={styles.desc} />
            </Item>
            <Item stackedLabel style={styles.item}>
              <Label>Harga</Label>
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
                value={this.state.advanced}
                onChangeText={text => {
                  this.setState({
                    advanced: text,
                  });
                }}
              />
            </Item>
            <Item stackedLabel last style={styles.item}>
              <Label>Stok</Label>
              <Input keyboardType="numeric" />
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
});

export default withNavigation(AddProduct);
