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
import Tab1 from './ProfileUser';
import Tab2 from './ProfileStore';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default class Profile extends Component {
  render() {
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
            <Tab1 />
          </Tab>
          <Tab
            heading="Akun penjual"
            textStyle={style.cBlack}
            activeTextStyle={style.cGreen}
            tabStyle={style.bgWhite}
            activeTabStyle={style.bgWhite}>
            <Tab2 />
          </Tab>
        </Tabs>
      </Container>
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
