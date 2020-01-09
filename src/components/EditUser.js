import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Container, Header, Body, Title, Left} from 'native-base';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Formik} from 'formik';
import {Input} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {withNavigation} from 'react-navigation';
class EditUser extends Component {
  render() {
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
            <View style={style.form}>
              <Input
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                placeholder="Name"
                value={values.name}
                leftIcon={<Icon name="user" size={wp('6%')} color="green" />}
              />

              <Input
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                placeholder="E-mail"
                value={values.email}
                leftIcon={
                  <Icon name="mail-bulk" size={wp('6%')} color="green" />
                }
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
                  <Icon name="search-location" size={wp('6%')} color="green" />
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
          )}
        </Formik>

        <Container />
      </>
    );
  }
}
export default withNavigation(EditUser);
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
  },
  buttonWrapper: {
    justifyContent: 'center',
    width: wp('30%'),
    marginTop: wp('3%'),
    marginLeft: wp('3%'),
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
    marginTop: hp('3%'),
    backgroundColor: 'white',
  },
  textTitle: {
    alignSelf: 'center',
    fontSize: wp('6%'),
    fontWeight: 'bold',
  },
});
