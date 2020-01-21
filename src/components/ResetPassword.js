import * as Yup from 'yup';
import {Formik} from 'formik';
import {Button, Container, Label} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {withNavigation} from 'react-navigation';
import React, {Component, Fragment} from 'react';
import {TextInput, Text, Image, StyleSheet, View, Alert} from 'react-native';
import PasswordInputText from 'react-native-hide-show-password-input';
import {API_KEY_URL} from 'react-native-dotenv';
import {connect} from 'react-redux';
import {reset} from '../public/redux/actions/auth';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
  }

  resetPassword = values =>{
    this.props.reset(API_KEY_URL + '/auth/reset', {otp: values.OTP, password: values.password})
    .then(result => {
      console.log(result);
      Alert.alert(
        'Password diubah',
        'Silahkan login kembali',
        [
          {
            text: 'OK',
            onPress: () => console.log('Ok Pressed'),
            style: 'cancel',
          },
        ],
        {
          cancelable: false,
        },
      );
      this.props.navigation.navigate('Login');
    })
    .catch(err => {
      console.log(err);
      Alert.alert(
        'Opps!',
        err.message,
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ],
        {
          cancelable: false,
        },
      );
    });
  }

  render() {
    return (
      <Formik
        initialValues={{OTP: ''}}
        onSubmit={values => this.resetPassword(values)}
        validationSchema={Yup.object().shape({
          OTP: Yup.string()
            .label('OTP')
            .required('Kode OTP harus di isi'),
          password: Yup.string()
            .label('password')
            .required()
            .min(3, 'Password must have more than 3 characters '),
          confirmPassword: Yup.string()
            .required()
            .label('Confirm password')
            .test('passwords-match', 'Passwords must match ', function(value) {
              return this.parent.password === value;
            }),
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
        }) => (
          <Fragment>
            <ScrollView>
              <Container style={style.container}>
                <View style={style.logo}>
                  <Image
                    source={require('../assets/logo.png')}
                    style={style.image}
                  />
                </View>
                <View>
                  <Label style={style.label}>Reset Password</Label>
                  <TextInput
                    value={values.OTP}
                    onChangeText={handleChange('OTP')}
                    placeholder="Kode OTP"
                    onBlur={() => setFieldTouched('OTP')}
                  />
                  {touched.OTP && errors.OTP && (
                    <Text style={style.errOTP}>{errors.OTP}</Text>
                  )}
                  <PasswordInputText
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={() => setFieldTouched('password')}
                    placeholder="Password"
                    secureTextEntry={true}
                  />
                  {touched.password && errors.password && (
                    <Text style={style.textError}>{errors.password}</Text>
                  )}
                  <PasswordInputText
                    value={values.confirmPassword}
                    placeholder="Confirm Password"
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={() => setFieldTouched('confirmPassword')}
                    secureTextEntry={true}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text style={style.textError}>
                      {errors.confirmPassword}
                    </Text>
                  )}
                  <Button
                    full
                    title="Submit"
                    disabled={!isValid}
                    onPress={handleSubmit}
                    style={style.submit}>
                    <Text style={style.submitText}>Submit</Text>
                  </Button>
                </View>
              </Container>
            </ScrollView>
          </Fragment>
        )}
      </Formik>
    );
  }
}


const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  reset: (url, data) => dispatch(reset(url, data)),
});

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(ResetPassword),
);

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexGrow: 1,
    padding: wp('5%'),
  },
  textSignUp: {
    color: 'white',
    textAlign: 'center',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('-20%'),
  },
  submit: {
    backgroundColor: '#ffffff',
    borderRadius: wp('3%'),
    borderWidth: wp('0.5%'),
    marginTop: hp('3%'),
    borderColor: '#03AC0E',
  },
  submitText: {
    color: '#03AC0E',
  },
  signintext: {
    color: '#ffffff',
  },
  signin: {
    backgroundColor: '#03AC0E',
    borderRadius: wp('3%'),
    marginTop: hp('3%'),
  },
  forgot: {textAlign: 'right', color: 'grey'},
  image: {resizeMode: 'stretch', width: wp('80%')},
  label: {fontSize: wp('5%'), textAlign: 'center'},
  errpass: {fontSize: wp('3%'), color: 'red'},
  erremail: {fontSize: wp('3%'), color: 'red'},
  errrole: {fontSize: wp('3%'), color: 'red'},
  textNew: {
    fontSize: wp('3%'),
    textAlign: 'center',
    marginTop: hp('3%'),
    color: 'rgba(0,0,0,0.6)',
  },
});
