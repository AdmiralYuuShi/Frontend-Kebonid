import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {
  Container,
  Header,
  Tab,
  Tabs,
  ScrollableTab,
  Body,
  Title,
} from 'native-base';
import {withNavigation} from 'react-navigation';
import Tab1 from '../components/ProfileUser';
import Tab2 from '../components/ProfileStore';
import Tab3 from '../components/AddStore';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {fetchDetailStore} from '../public/redux/actions/store';
class Profile extends Component {
  render() {
    const id = this.props.navigation.getParam('id', {});
    const isSeller = this.props.auth.user.isSeller;
    console.log(this.props.auth.user);

    return (
      <Container>
        <Header style={style.bgWhite}>
          <Body>
            <Title style={style.title}>Profil</Title>
          </Body>
        </Header>
        <Tabs renderTabBar={() => <ScrollableTab style={style.bgWhite} />}>
          <Tab
            heading="Akun pembeli"
            tabStyle={style.bgWhite}
            textStyle={style.cBlack}
            activeTextStyle={style.cGreen}
            activeTabStyle={style.bgWhite}>
            <Tab1 idUser={id} />
          </Tab>
          <Tab
            heading="Akun penjual"
            textStyle={style.cBlack}
            activeTextStyle={style.cGreen}
            tabStyle={style.bgWhite}
            activeTabStyle={style.bgWhite}>
            {isSeller === 1 ? <Tab2 /> : <Tab3 />}
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    store: state.store,
    auth: state.auth,
  };
};
const mapDispatchToProps = dispatch => ({
  get: id => dispatch(fetchDetailStore(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(Profile));
const style = StyleSheet.create({
  bgWhite: {
    backgroundColor: 'white',
    alignContent: 'center',
  },
  cBlack: {
    color: 'black',
  },
  cGreen: {
    color: 'green',
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: wp('7%'),
    alignSelf: 'center',
  },
});
