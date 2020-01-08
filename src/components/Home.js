import React, {Component} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  FlatList,
  View,
  SafeAreaView,
} from 'react-native';
import {Header, Body, Title, Right, Text} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Item, Input} from 'native-base';
import Products from './Products';
import {withNavigation} from 'react-navigation';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClick: 0,
      search: '',
    };
  }

  render() {
    const {isClick} = this.state;
    const items = [
      {id: 'c1', name: 'TURQUOISE', code: '900000'},
      {id: 'c2', name: 'EMERALD ', code: '40000'},
      {id: 'c3', name: 'PETER RIVER', code: '100000'},
      {id: 'c4', name: 'AMETHYST', code: '25000'},
      {id: 'c5', name: 'WET ASPHALT', code: '345000'},
      {id: 'c6', name: 'GREEN SEA', code: '10000'},
      {id: 'c7', name: 'NEPHRITIS', code: '75000'},
      {id: 'c8', name: 'BELIZE HOLE', code: '1500000'},
      {id: 'c9', name: 'WISTERIA', code: '400000'},
      {id: 'c10', name: 'MIDNIGHT BLUE', code: '230000'},
      {id: 'c11', name: 'SUN FLOWER', code: '20000'},
      {id: 'c12', name: 'CARROT', code: '60000'},
      {id: 'c13', name: 'ALIZARIN', code: '125000'},
      {id: 'c14', name: 'CLOUDS', code: '45000'},
      {id: 'c15', name: 'CONCRETE', code: '96000'},
      {id: 'c16', name: 'ORANGE', code: '820000'},
      {id: 'c17', name: 'PUMPKIN', code: '1200000'},
      {id: 'c18', name: 'POMEGRANATE', code: '175000'},
      {id: 'c19', name: 'SILVER', code: '500000'},
      {id: 'c20', name: 'ASBESTOS', code: '5000'},
      {id: 'c21', name: 'TURQUOISE', code: '900000'},
      {id: 'c22', name: 'EMERALD', code: '40000'},
      {id: 'c23', name: 'PETER RIVER', code: '100000'},
      {id: 'c24', name: 'AMETHYST', code: '25000'},
      {id: 'c25', name: 'WET ASPHALT', code: '345000'},
      {id: 'c26', name: 'GREEN SEA', code: '10000'},
      {id: 'c27', name: 'NEPHRITIS', code: '75000'},
      {id: 'c28', name: 'BELIZE HOLE', code: '1500000'},
      {id: 'c29', name: 'WISTERIA', code: '400000'},
      {id: 'c30', name: 'MIDNIGHT BLUE', code: '230000'},
      {id: 'c31', name: 'SUN FLOWER', code: '20000'},
      {id: 'c32', name: 'CARROT', code: '60000'},
      {id: 'c33', name: 'ALIZARIN', code: '125000'},
      {id: 'c34', name: 'CLOUDS', code: '45000'},
      {id: 'c35', name: 'CONCRETE', code: '96000'},
      {id: 'c36', name: 'ORANGE', code: '820000'},
      {id: 'c37', name: 'PUMPKIN', code: '1200000'},
      {id: 'c38', name: 'POMEGRANATE', code: '175000'},
      {id: 'c39', name: 'SILVER', code: '500000'},
      {id: 'c40', name: 'ASBESTOS', code: '5000'},
    ];
    return (
      <>
        <Header style={styles.header}>
          <Body>
            <Title style={styles.title}>Home</Title>
          </Body>
          <Right>
            <TouchableOpacity
              onPress={() =>
                !isClick
                  ? this.setState({isClick: 1})
                  : this.setState({isClick: 0})
              }>
              <Icon name="search" size={wp('5.5%')} style={styles.righticon} />
            </TouchableOpacity>
          </Right>
        </Header>
        {isClick ? (
          <View style={styles.viewsearch}>
            <Item style={styles.item}>
              <Icon active name="search" />
              <Input placeholder="Search Product ... " />
            </Item>
          </View>
        ) : (
          <View />
        )}

        <SafeAreaView style={styles.list}>
          <FlatList
            data={items}
            renderItem={({item}) => <Products item={item} />}
            numColumns={2}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>

        <View style={styles.floating}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Sort')}>
            <View style={styles.sort}>
              <Icon active name="sort" size={20} style={styles.iconsort} />
              <Text style={styles.textFilter}>Sort</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Filter')}>
            <View style={styles.filter}>
              <Icon active name="filter" size={20} style={styles.iconfilter} />
              <Text style={styles.textFilter}>Filter</Text>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: wp('7%'),
    marginLeft: wp('3%'),
  },
  righticon: {
    marginRight: wp('3%'),
  },
  list: {
    flex: 1,
    marginTop: hp('2%'),
    alignSelf: 'center',
  },
  viewsearch: {
    height: hp('7.5%'),
  },
  viewnotsearch: {
    height: hp('0%'),
  },
  item: {
    marginLeft: wp('3.5%'),
    marginRight: wp('3.5%'),
  },
  floating: {
    flexDirection: 'row',
    width: wp('45%'),
    height: hp('8%'),
    position: 'absolute',
    backgroundColor: '#FBFCFC',
    borderColor: '#E5E6E6',
    borderWidth: 1,
    alignSelf: 'center',
    bottom: hp('5%'),
    borderRadius: wp('10%'),
    alignItems: 'center',
  },
  sort: {
    flexDirection: 'row',
    marginLeft: wp('5%'),
  },
  iconsort: {
    marginRight: wp('3%'),
  },
  filter: {
    flexDirection: 'row',
    marginLeft: wp('7%'),
  },
  iconfilter: {
    marginRight: wp('3%'),
  },
  textFilter: {
    fontSize: wp('3.5%'),
  },
});

export default withNavigation(Home);
