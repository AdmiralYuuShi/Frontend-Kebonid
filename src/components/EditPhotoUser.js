import React, {Component} from 'react';
import {Image, StyleSheet, TouchableOpacity, View, Alert} from 'react-native';
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
import {withNavigation} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Bubbles} from 'react-native-loader';
import {fetchUpdatePhotoUsers} from '../public/redux/actions/users';
import {connect} from 'react-redux';
import {API_KEY_PHOTO} from 'react-native-dotenv';
class EditPhotoUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      isLoading: false,
      isSelectedPhoto: 0,
      uri: '',
      fileName: '',
      photoErr: '',
      photo: '',
    };
    this.editPhoto = this.editPhoto.bind(this);
    this.backTo = this.backTo.bind(this);
  }
  componentDidMount() {
    console.log(this.props.auth.user.id);
    const id = this.props.auth.user.id;
    const photo = this.props.photo;
    this.setState({
      photo: photo,
      id: id,
    });
  }
  backTo() {
    this.props.navigation.push('BottomNavbar');
  }
  editPhoto() {
    const photo = {
      uri: this.state.uri,
      type: 'image/jpeg',
      name: this.state.fileName,
    };
    console.log(photo);

    const formData = new FormData();
    formData.append('id', this.state.id);
    formData.append('file', photo);
    const config = {
      headers: {
        'content-type': 'multipart/form-data' + formData,
      },
    };
    this.props.fetchUpdate(this.state.id, formData, config);
    Alert.alert(
      'Kamu yakin?',
      'Avatar kamu akan di rubah',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            this.backTo();
          },
        },
      ],
      {cancelable: false},
    );
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
      if (response.fileSize > 6291456) {
        this.setState({
          photoErr: 'File too large max 6 MB',
        });
      }
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.uri};

        this.setState({
          photo: source,
          isSelectedPhoto: 1,
          uri: response.uri,
          fileName: response.fileName,
        });
      }
    });
  };
  render() {
    const {isLoading, photoErr, fileName} = this.state;
    setTimeout(
      function() {
        this.setState({isLoading: true});
      }.bind(this),
      2000,
    );
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
        {!isLoading ? (
          <View style={style.loader}>
            <Bubbles size={10} style={style.loading} color="green" />
          </View>
        ) : (
          <Container>
            <Content>
              <Card style={style.cardWrapper}>
                <CardItem>
                  <Body style={style.imageBody}>
                    <Image
                      source={
                        this.state.isSelectedPhoto
                          ? this.state.photo
                          : this.state.photo === ''
                          ? {
                              uri:
                                'https://http://raivens.com/wp-content/uploads/2016/08/Dummy-image.jpg',
                            }
                          : {uri: this.state.photo}
                      }
                      style={style.image}
                    />
                  </Body>
                </CardItem>
                <CardItem>
                  <Text style={style.textRequirement}>
                    Besar file: maksimum 10.000.000 bytes (10 Megabytes)
                    Ekstensi file yang diperbolehkan: .JPG .JPEG .PNG
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
                    <Button
                      buttonStyle={style.button1}
                      title="SIMPAN"
                      onPress={this.editPhoto}
                    />
                  </Body>
                </CardItem>
              </Card>
            </Content>
          </Container>
        )}
      </>
    );
  }
}
const mapStateToProps = state => ({
  users: state.users,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  fetchUpdate: (id, data, config) =>
    dispatch(fetchUpdatePhotoUsers(id, data, config)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(EditPhotoUser));
const style = StyleSheet.create({
  cardWrapper: {
    flex: 0,
    marginLeft: wp('3%'),
    marginRight: wp('3%'),
    marginTop: wp('3%'),
  },
  image: {height: hp('34'), width: wp('61%'), flex: 1},
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
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('30%'),
  },
  loading: {marginTop: hp('50%')},
});
