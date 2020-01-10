import React from 'react';
import LoginUser from '../components/Login';
import {connect} from 'react-redux';

const Login = props => {
  return (
    <>
      <LoginUser />
    </>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Login);
