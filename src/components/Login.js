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
import {StackActions, NavigationActions, withNavigation} from 'react-navigation';
import React, {Component, Fragment} from 'react';
import {TextInput, Text, Image, StyleSheet, View} from 'react-native';
import PasswordInputText from 'react-native-hide-show-password-input';
import {login} from '../public/redux/actions/auth';
import {connect} from 'react-redux';
import {API_KEY_URL} from 'react-native-dotenv';
import AwesomeAlerts from 'react-native-awesome-alerts';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      color: '',
      message: '',
    };
  }

  getLogin = values => {
    let data = {
      email: values.email,
      password: values.password,
    };
    this.props
      .login(API_KEY_URL + '/auth/login', data)
      .then(result => {
        this.setState({
          showAlert: true,
          color: '#42B549',
          message: this.props.auth.message,
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          showAlert: true,
          color: '#E53935',
          message: 'Login Failed',
        });
      });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  render() {
    const {showAlert, color, message} = this.state;
    return (
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={values => this.getLogin(values)}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .label('email')
            .email('Enter a valid email')
            .required('Please enter a registered email'),
          password: Yup.string()
            .label('password')
            .required()
            .min(3, 'Password must have more than 3 characters '),
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
              <Container style={style.Login}>
                <View style={style.logo}>
                  <Image
                    source={require('../assets/logo.png')}
                    style={style.image}
                  />
                </View>
                <View>
                  <Label style={style.label}>Sign In</Label>
                  <TextInput
                    value={values.email}
                    onChangeText={handleChange('email')}
                    placeholder="E-mail"
                    onBlur={() => setFieldTouched('email')}
                  />
                  {touched.email && errors.email && (
                    <Text style={style.erremail}>{errors.email}</Text>
                  )}
                  <PasswordInputText
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={() => setFieldTouched('password')}
                    secureTextEntry={true}
                  />
                  {touched.password && errors.password && (
                    <Text style={style.errpass}>{errors.password}</Text>
                  )}
                  {touched.role && errors.role && (
                    <Text style={style.errrole}>{errors.role}</Text>
                  )}
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('RequestForgotPassword')
                    }>
                    <Text style={style.forgot}>Forget password ?</Text>
                  </TouchableOpacity>
                  <Button
                    full
                    title="Sign In"
                    disabled={!isValid}
                    onPress={handleSubmit}
                    style={style.signin}>
                    <Text style={style.signintext}>Sign In</Text>
                  </Button>
                  <Button
                    full
                    title="Sign Up"
                    onPress={() => {
                      const resetAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({routeName: 'Register'})],
                      });
                      this.props.navigation.dispatch(resetAction);
                    }}
                    style={style.signup}>
                    <Text style={style.signuptext}>Sign Up</Text>
                  </Button>
                </View>
              </Container>
            </ScrollView>
            <AwesomeAlerts
              show={showAlert}
              showProgress={false}
              message={message}
              closeOnTouchOutSide={true}
              closeOnHardwareBackPress={false}
              showCancelButton={false}
              showConfirmButton={true}
              confirmText="OK"
              confirmButtonColor={color}
              onConfirmPressed={() => {
                this.hideAlert();
                message === 'Success login'
                  ? this.props.navigation.navigate('BottomNavbar')
                  : this.forceUpdate();
              }}
            />
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
  login: (url, data) => dispatch(login(url, data)),
});

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(Login),
);

const style = StyleSheet.create({
  Login: {
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
  signup: {
    backgroundColor: '#ffffff',
    borderRadius: wp('3%'),
    borderWidth: wp('0.5%'),
    marginTop: hp('3%'),
    borderColor: '#03AC0E',
  },
  signuptext: {
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
  label: {fontSize: 30, textAlign: 'center'},
  errpass: {fontSize: 10, color: 'red'},
  erremail: {fontSize: 10, color: 'red'},
  errrole: {fontSize: 10, color: 'red'},
});
