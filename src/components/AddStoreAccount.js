import React, {Component, Fragment} from 'react';
import {
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {
  Container,
  Header,
  Body,
  Title,
  Left,
  Card,
  CardItem,
  Button,
} from 'native-base';
// import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Input} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-picker';
import {logout} from '../public/redux/actions/auth';
import {fetchAddStore} from '../public/redux/actions/store';
import {connect} from 'react-redux';
import {withNavigation, ScrollView} from 'react-navigation';
class AddStoreAccount extends Component {
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
    this.addStore = this.addStore.bind(this);
    this.backTo = this.backTo.bind(this);
  }
  backTo() {
    this.props.navigation.push('BottomNavbar');
  }
  addStore = v => {
    const photo = {
      uri: this.state.uri,
      type: 'image/jpeg',
      name: this.state.fileName,
    };
    const formData = new FormData();
    formData.append('id', this.props.auth.user.id);
    formData.append('photo', photo);
    formData.append('name', v.name);
    formData.append('address', v.address);
    formData.append('phone', v.phone);
    const config = {
      headers: {
        'content-type': 'multipart/form-data' + formData,
      },
    };
    console.log(formData);
    this.props.post(formData, config);
    Alert.alert(
      'Sudah yakin?',
      'Toko kamu akan di tambahkan',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () =>
            Alert.alert('Sukses!', 'Berhasil ditambahkan', [
              {
                text: 'OK',
                onPress: () => {
                  this.backTo();
                },
              },
            ]),
        },
      ],
      {cancelable: false},
    );
  };
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
    const {fileName, photoErr} = this.state;
    return (
      <>
        <Header style={style.header}>
          <Left>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon style={style.icon} name="times" size={wp('5.5%')} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title style={style.title}>BUAT TOKO</Title>
          </Body>
        </Header>
        <Formik
          initialValues={{name: '', phone: '', address: ''}}
          onSubmit={values => this.addStore(values)}
          validationSchema={Yup.object().shape({
            name: Yup.string()
              .label('name')
              .required('Tolong masukan nama anda'),
            phone: Yup.string()
              .label('phone')
              .required('Tolong masukan nomor telepon anda'),
            address: Yup.string()
              .label('address')
              .required('Tolong masukan alamat anda'),
          })}>
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid,
            setFieldValue,
            handleSubmit,
            handleBlur,
          }) => (
            <Fragment>
              <ScrollView>
                <View style={style.form}>
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
                    <Text>{fileName}</Text>
                    <Text style={style.textError}>{photoErr}</Text>
                    <CardItem style={style.cardButton}>
                      <Button
                        title="Sign Up"
                        onPress={this.UploadPhoto}
                        style={style.signUp}>
                        <Text style={style.textButtonSignUp}>PILIH FOTO</Text>
                      </Button>
                    </CardItem>
                  </Card>
                  <Input
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    placeholder="Nama"
                    value={values.name}
                    leftIcon={
                      <Icon name="user" size={wp('6%')} color="green" />
                    }
                  />
                  {touched.name && errors.name && (
                    <Text style={style.textError}>{errors.name}</Text>
                  )}
                  <Input
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    placeholder="No. Handphone"
                    value={values.hp}
                    leftIcon={
                      <Icon name="phone" size={wp('6%')} color="green" />
                    }
                  />
                  {touched.phone && errors.phone && (
                    <Text style={style.textError}>{errors.phone}</Text>
                  )}
                  <Input
                    onChangeText={handleChange('address')}
                    onBlur={handleBlur('address')}
                    placeholder="Alamat"
                    value={values.address}
                    leftIcon={
                      <Icon
                        name="search-location"
                        size={wp('6%')}
                        color="green"
                      />
                    }
                  />
                  {touched.address && errors.address && (
                    <Text style={style.textError}>{errors.address}</Text>
                  )}
                  <View style={style.buttonWrapper}>
                    <Button
                      full
                      title="Sign Up"
                      disabled={!isValid}
                      onPress={handleSubmit}
                      style={style.signUp}>
                      <Text style={style.textButtonSignUp}>Submit</Text>
                    </Button>
                  </View>
                </View>
              </ScrollView>
            </Fragment>
          )}
        </Formik>

        <Container />
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    store: state.store,
    auth: state.auth,
  };
};
const mapDispatchToProps = dispatch => ({
  post: (id, data, config) => dispatch(fetchAddStore(id, data, config)),
  logoutUser: _ => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(AddStoreAccount));
const style = StyleSheet.create({
  signUp: {
    justifyContent: 'center',
    flexGrow: 1,
    padding: wp('5%'),
    marginLeft: wp('3%'),
    backgroundColor: 'green',
  },
  textSignUp: {
    color: 'white',
    textAlign: 'center',
  },
  cardButton: {
    flexDirection: 'column',
    alignContent: 'center',
    marginTop: hp('-10%'),
  },
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('35%'),
    marginTop: hp('3%'),
    marginBottom: wp('3%'),
  },
  header: {
    backgroundColor: '#fff',
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
  textError: {
    fontStyle: 'italic',
    color: 'red',
    marginTop: 15,
    alignItems: 'center',
  },
  form: {
    backgroundColor: 'white',
  },
  textTitle: {
    alignSelf: 'center',
    fontSize: wp('6%'),
    fontWeight: 'bold',
  },
  image: {height: hp('35%'), width: wp('62%'), flex: 1},
  cardWrapper: {
    flex: 0,
    marginLeft: wp('3%'),
    marginRight: wp('3%'),
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
    fontSize: wp('3'),
    color: 'grey',
    textAlign: 'center',
    marginTop: hp('-2%'),
  },
});
