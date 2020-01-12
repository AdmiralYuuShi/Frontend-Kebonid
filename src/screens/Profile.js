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
import Tab1 from '../components/ProfileUser';
import Tab2 from '../components/ProfileStore';
import Tab3 from '../components/AddStore';
import GoToLogin from '../screens/GoToLogin';
import {connect} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
class Profile extends Component {
  render() {
    const id = this.props.navigation.getParam('id', {});
    return this.props.auth.token ? (
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
            <Tab2 />
          </Tab>
          <Tab
            heading="Coba"
            textStyle={style.cBlack}
            activeTextStyle={style.cGreen}
            tabStyle={style.bgWhite}
            activeTabStyle={style.bgWhite}>
            <Tab3 />
          </Tab>
        </Tabs>
      </Container>
    ) : (
      <GoToLogin />
    );
  }
}
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

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Profile);
