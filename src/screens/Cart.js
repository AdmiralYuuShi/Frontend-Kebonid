import React, {Component} from 'react';
import CartList from '../components/Cart';
import GoToLogin from '../screens/GoToLogin';
import {connect} from 'react-redux';

class Cart extends Component {
  render() {
    return this.props.auth.token ? <CartList /> : <GoToLogin />;
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Cart);
