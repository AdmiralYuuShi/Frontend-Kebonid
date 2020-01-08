import * as Yup from 'yup'
import { Formik } from 'formik'
// import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage'
// import { fetchLogin } from '../public/redux/actions/login'
// import { connect } from 'react-redux'
import { Button, Container, Label, Item } from 'native-base';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { withNavigation } from 'react-navigation';
import React, { Component, Fragment } from 'react';
import { TextInput, Text, Image, StyleSheet, View } from 'react-native';
import PasswordInputText from 'react-native-hide-show-password-input'
class Login extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Formik
                initialValues={{ email: '', password: '' }}
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
                })}
            >
                {({ values, handleChange, errors, setFieldTouched, touched, isValid, setFieldValue, handleSubmit }) => (
                    <Fragment>
                        <ScrollView>
                            <Container style={style.Login}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('-20%') }}>
                                    <Image source={require('../assets/logo.png')} style={{ resizeMode: 'stretch', width: wp('80%') }} />
                                </View>
                                <View >
                                    <Label style={{ fontSize: 30, textAlign: 'center' }}>Sign In</Label>
                                    <TextInput
                                        value={values.email}
                                        onChangeText={handleChange('email')}
                                        placeholder='E-mail'
                                        onBlur={() => setFieldTouched('email')}
                                    />
                                    {touched.email && errors.email &&
                                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                                    }
                                    <PasswordInputText
                                        value={values.password}
                                        onChangeText={handleChange('password')}
                                        onBlur={() => setFieldTouched('password')}
                                        secureTextEntry={true}
                                    />
                                    {touched.password && errors.password &&
                                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
                                    }

                                    {touched.role && errors.role &&
                                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.role}</Text>
                                    }
                                    <TouchableOpacity onPress={() => alert('makanya inget dong')
                                    }>
                                        <Text style={{ textAlign: 'right', color: 'grey' }}>Forget password ?</Text>
                                    </TouchableOpacity>
                                    <Button full title='Sign In'
                                        disabled={!isValid} onPress={() => this.props.navigation.navigate('BottomNavbar')
                                        } style={{ backgroundColor: '#03AC0E', borderRadius: wp('3%'), marginTop: hp('3%') }}>
                                        <Text style={{ color: "#ffffff" }} >Sign In</Text>
                                    </Button>
                                    <Button full title='Sign Up' onPress={() => this.props.navigation.navigate('Sign Up')
                                    } style={{ backgroundColor: '#ffffff', borderRadius: wp('3%'), borderWidth: wp('0.5%'), marginTop: hp('3%'), borderColor: "#03AC0E" }}>
                                        <Text style={{ color: "#03AC0E" }} >Sign Up</Text>
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
export default withNavigation(Login)

const style = StyleSheet.create({
    Login: {
        justifyContent: "center", flexGrow: 1, padding: wp('5%')
    },
    textSignUp: {
        color: 'white',
        textAlign: 'center'
    }
})