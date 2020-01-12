import * as Yup from 'yup';
import {Formik} from 'formik';
// import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage'
import {signUp} from '../public/redux/actions/auth';
import {connect} from 'react-redux';
import {Button, Container, Label} from 'native-base';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  StackActions,
  NavigationActions,
  withNavigation,
} from 'react-navigation';
import React, {Component, Fragment} from 'react';
import {
  TextInput,
  Text,
  Image,
  StyleSheet,
  View,
  Item,
  Alert,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {API_KEY_URL} from 'react-native-dotenv';
import PasswordInputText from 'react-native-hide-show-password-input';
import AwesomeAlerts from 'react-native-awesome-alerts';
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      color: '',
      message: '',
    };
  }
  getSignUp(values) {
    const data = {
      email: values.email,
      password: values.password,
      name: values.email.split('@')[0],
    };
    this.props
      .signUp(API_KEY_URL + '/auth/register', data)
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
          message: this.props.auth.message,
        });
      });
  }

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };
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
                  <Button
                    full
                    title="Sign Up"
                    disabled={!isValid}
                    onPress={handleSubmit}
                    style={style.signUp}>
                    <Text style={style.textButtonSignUp}>Sign Up</Text>
                  </Button>
                  <Button
                    full
                    title="Sign In"
                    onPress={() => {
                      const resetAction = StackActions.reset({
                        index: 0,
                        actions: [
                          NavigationActions.navigate({routeName: 'Login'}),
                        ],
                      });
                      this.props.navigation.dispatch(resetAction);
                    }}
                    style={style.buttonSignIn}>
                    <Text style={style.textButtonSignIn}>Sign In</Text>
                  </Button>
                </View>
              </Container>
            </ScrollView>
            <AwesomeAlerts
              show={this.state.showAlert}
              showProgress={false}
              message={this.state.message}
              closeOnTouchOutSide={true}
              closeOnHardwareBackPress={false}
              showCancelButton={false}
              showConfirmButton={true}
              confirmText="OK"
              confirmButtonColor={this.state.color}
              onConfirmPressed={() => {
                this.hideAlert();
                this.state.message === 'Successfully Register New User'
                  ? this.props.navigation.dispatch(
                      StackActions.reset({
                        index: 0,
                        actions: [
                          NavigationActions.navigate({routeName: 'Login'}),
                        ],
                      }),
                    )
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
  signUp: (url, data) => dispatch(signUp(url, data)),
});

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(SignUp),
);

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
