import * as Yup from 'yup';
import {Formik} from 'formik';
// import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage'
// import { fetchLogin } from '../public/redux/actions/login'
// import { connect } from 'react-redux'
import {Button, Container, Label} from 'native-base';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {withNavigation} from 'react-navigation';
import React, {Component, Fragment} from 'react';
import {TextInput, Text, Image, StyleSheet, View, Item} from 'react-native';
import {CheckBox} from 'react-native-elements';
import PasswordInputText from 'react-native-hide-show-password-input';
class SignUp extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
          agreeToTerms: false,
        }}
        onSubmit={values => this.getSignUp(values)}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .label('email')
            .email('Enter a valid email')
            .required('Please enter a registered email'),
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
          agreeToTerms: Yup.boolean().oneOf(
            [true],
            'Please check the agreement',
          ),
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
              <Container style={style.SignUp}>
                <View style={style.logo}>
                  <Image
                    source={require('../assets/logo.png')}
                    style={style.imageLogo}
                  />
                </View>
                <View style={style.form}>
                  <Label style={style.title}>Sign Up</Label>
                  <TextInput
                    value={values.email}
                    onChangeText={handleChange('email')}
                    placeholder="E-mail"
                    onBlur={() => setFieldTouched('email')}
                  />
                  {touched.email && errors.email && (
                    <Text style={style.textError}>{errors.email}</Text>
                  )}
                  <PasswordInputText
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={() => setFieldTouched('password')}
                    secureTextEntry={true}
                  />
                  {touched.password && errors.password && (
                    <Text style={style.textError}>{errors.password}</Text>
                  )}
                  <PasswordInputText
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={() => setFieldTouched('confirmPassword')}
                    secureTextEntry={true}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text style={style.textError}>
                      {errors.confirmPassword}
                    </Text>
                  )}
                  <CheckBox
                    // containerStyle={styles.checkBoxContainer}
                    checkedIcon="check-box"
                    iconType="material"
                    uncheckedIcon="check-box-outline-blank"
                    title="Agree to terms and conditions"
                    checkedTitle="You agreed to our terms and conditions"
                    checked={values.agreeToTerms}
                    onPress={() =>
                      setFieldValue('agreeToTerms', !values.agreeToTerms)
                    }
                  />

                  {touched.agreeToTerms && errors.agreeToTerms && (
                    <Text style={style.textError}>{errors.agreeToTerms}</Text>
                  )}
                  <TouchableOpacity onPress={() => alert('makanya inget dong')}>
                    <Text style={style.textForget}>Forget password ?</Text>
                  </TouchableOpacity>
                  <Button
                    full
                    title="Sign Up"
                    disabled={!isValid}
                    onPress={() => this.props.navigation.navigate('Register')}
                    style={style.signUp}>
                    <Text style={style.textButtonSignUp}>Sign Up</Text>
                  </Button>
                  <Button
                    full
                    title="Sign In"
                    onPress={() => this.props.navigation.navigate('Login')}
                    style={style.buttonSignIn}>
                    <Text style={style.textButtonSignIn}>Sign In</Text>
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
export default withNavigation(SignUp);

const style = StyleSheet.create({
  SignUp: {
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
    marginTop: hp('-10%'),
  },
  imageLogo: {
    resizeMode: 'stretch',
    width: wp('80%'),
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
  },
  textError: {
    fontSize: 10,
    color: 'red',
  },
  textForget: {textAlign: 'right', color: 'grey'},
  signUp: {
    backgroundColor: '#03AC0E',
    borderRadius: wp('3%'),
    marginTop: hp('3%'),
  },
  textButtonSignUp: {color: '#ffffff'},
  buttonSignIn: {
    backgroundColor: '#ffffff',
    borderRadius: wp('3%'),
    borderWidth: wp('0.5%'),
    marginTop: hp('3%'),
    borderColor: '#03AC0E',
  },
  textButtonSignIn: {color: '#03AC0E'},
  form: {
    marginTop: hp('-8%'),
  },
});
