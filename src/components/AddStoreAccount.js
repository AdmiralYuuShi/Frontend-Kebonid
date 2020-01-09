import React, {Component} from 'react';
import {Image, Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Container,
  Header,
  Body,
  Title,
  Left,
  Card,
  CardItem,
} from 'native-base';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Formik} from 'formik';
import {Input} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-picker';
import {withNavigation, ScrollView} from 'react-navigation';
class AddStoreAccount extends Component {
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
            <Title style={style.title}>Edit Profile</Title>
          </Body>
        </Header>
        <Formik
          initialValues={{email: '', name: '', hp: '', address: ''}}
          onSubmit={values => console.log(values)}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <ScrollView>
              <View style={style.form}>
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
                      Besar file: maksimum 10.000.000 bytes (10 Megabytes)
                      Ekstensi file yang diperbolehkan: .JPG .JPEG .PNG
                    </Text>
                  </CardItem>
                  <Text>{fileName}</Text>
                  <Text style={style.textErr}>{photoErr}</Text>
                  <CardItem style={style.cardButton}>
                    <Button
                      buttonStyle={style.button}
                      onPress={this.UploadPhoto}
                      title="PILIH FOTO"
                    />
                  </CardItem>
                </Card>
                <Input
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  placeholder="Name"
                  value={values.name}
                  leftIcon={<Icon name="user" size={wp('6%')} color="green" />}
                />
                <Input
                  onChangeText={handleChange('hp')}
                  onBlur={handleBlur('hp')}
                  placeholder="No. Handphone"
                  value={values.hp}
                  leftIcon={<Icon name="phone" size={wp('6%')} color="green" />}
                />
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
                <View style={style.buttonWrapper}>
                  <Button
                    onPress={() => this.props.navigation.navigate('Profile')}
                    style={style.button}
                    title="Submit"
                  />
                </View>
              </View>
            </ScrollView>
          )}
        </Formik>

        <Container />
      </>
    );
  }
}
export default withNavigation(AddStoreAccount);
const style = StyleSheet.create({
  button: {
    backgroundColor: 'green',
    marginBottom: hp('2%'),
    width: wp('40%'),
    alignSelf: 'center',
  },
  cardButton: {
    flexDirection: 'column',
    alignContent: 'center',
    marginTop: hp('-7%'),
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
  textErr: {
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
  textRequirement: {
    fontSize: wp('3'),
    color: 'grey',
    textAlign: 'center',
    marginTop: hp('-2%'),
  },
});
