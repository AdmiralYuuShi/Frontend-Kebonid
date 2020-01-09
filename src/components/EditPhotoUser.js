import React, {Component} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Title,
  Left,
} from 'native-base';
import {Button} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default class EditPhotoUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      data: null,
      id: '',
      isLoading: false,
      isSelectedPhoto: 0,
      uri: '',
      fileName: '',
      photoErr: '',
      Photo: '',
    };
  }

  UploadPhoto = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
      if (response.fileSize > 10485760) {
        this.setState({
          photoErr: 'File too large max 2 MB',
        });
      }
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.uri};

        this.setState({
          Photo: source,
          isSelectedPhoto: 1,
          uri: response.uri,
          fileName: response.fileName,
          type: response.type,
          data: response.data,
        });
      }
    });
  };
  render() {
    const {isLoading, photoErr, fileName} = this.state;
    return (
      <>
        <Header style={style.header}>
          <Left>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon style={style.icon} name="times" size={wp('5.5%')} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title style={style.title}>Edit Foto</Title>
          </Body>
        </Header>
        <Container>
          <Content>
            <Card style={style.cardWrapper}>
              <CardItem>
                <Body style={style.imageBody}>
                  <Image
                    source={require('../assets/LogoDummy.png')}
                    style={style.image}
                  />
                </Body>
              </CardItem>
              <CardItem>
                <Text style={style.textRequirement}>
                  Besar file: maksimum 10.000.000 bytes (10 Megabytes) Ekstensi
                  file yang diperbolehkan: .JPG .JPEG .PNG
                </Text>
              </CardItem>
              <CardItem>
                <Text>{fileName}</Text>
                <Text style={style.textErr}>{photoErr}</Text>
              </CardItem>
              <CardItem style={style.cardButton}>
                <Body style={style.buttonWrapper}>
                  <Button
                    buttonStyle={style.button}
                    onPress={this.UploadPhoto}
                    title="PILIH FOTO"
                  />
                  <Button buttonStyle={style.button1} title="SIMPAN" />
                </Body>
              </CardItem>
            </Card>
          </Content>
        </Container>
      </>
    );
  }
}
const style = StyleSheet.create({
  cardWrapper: {
    flex: 0,
    marginLeft: wp('3%'),
    marginRight: wp('3%'),
    marginTop: wp('3%'),
  },
  image: {height: 200, width: 200, flex: 1},
  button1: {
    backgroundColor: '#009e00',
    marginBottom: hp('2%'),
    width: wp('40%'),
  },
  imageBody: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'green',
    marginBottom: hp('2%'),
    width: wp('40%'),
  },
  textRequirement: {
    color: 'rgba(0,0,0,.5)',
    fontSize: wp('3%'),
    marginLeft: wp('3%'),
  },
  cardButton: {
    flexDirection: 'column',
    alignContent: 'center',
  },
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: 'green',
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
  textErr: {
    fontStyle: 'italic',
    color: 'red',
    marginTop: 15,
    alignItems: 'center',
  },
});
