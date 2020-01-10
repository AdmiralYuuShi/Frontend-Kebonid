import React from 'react';
import GetStart from '../components/Start.js';
import {connect} from 'react-redux';

const Start = props => {
  return (
    <>
      {/* {props.auth.token ? (
        props.navigation.navigate('BottomNavbar')
      ) : ( */}
      {/* {console.log(persist)} */}
      <GetStart />
      {/* )} */}
    </>
  );
};
const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Start);
