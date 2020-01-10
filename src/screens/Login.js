import React from 'react';
import LoginUser from '../components/Login';
import HomeProduk from '../components/Home';
import {connect} from 'react-redux';

const Login = props => {
  return <>{props.auth.token ? <HomeProduk /> : <LoginUser />}</>;
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Login);
