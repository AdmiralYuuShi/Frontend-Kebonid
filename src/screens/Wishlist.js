import React, {Component} from 'react';
import WishlistProduct from '../components/Wishlist';
import GoToLogin from '../screens/GoToLogin';
import {connect} from 'react-redux';

class Wishlist extends Component {
  render() {
    return this.props.auth.token ? <WishlistProduct /> : <GoToLogin />;
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Wishlist);
