import React from 'react';
import GetStart from '../components/Start.js';
import HomeProduk from '../components/Home';
import {connect} from 'react-redux';

const Start = props => {
  return <>{props.auth.token ? <HomeProduk /> : <GetStart />}</>;
};
const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Start);
