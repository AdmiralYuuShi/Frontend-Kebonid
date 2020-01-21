import React from 'react';
import SignUpUser from '../components/SignUp'
import {connect} from 'react-redux';

const SignUp = () => {
    return (
        <SignUpUser />
    )
}

const mapStateToProps = state => ({
    user: state.auth.user,
  });
  
  export default connect(mapStateToProps)(SignUp);
