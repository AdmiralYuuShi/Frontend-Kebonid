import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Header,
  Body,
  Title,
  Left,
  ListItem,
  Right,
  Radio,
  Text,
  Button,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {withNavigation, SafeAreaView} from 'react-navigation';

class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemSelected: 'name_asc',
    };
  }

  onSort = () => {
    this.props.navigation.push('BottomNavbar', {
      sortValue: this.state.itemSelected,
    });
  };

  render() {
    return (
      <>
        <Header style={styles.header}>
          <Left>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon style={styles.icon} name="times" size={wp('5.5%')} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title style={styles.title}>Urutkan</Title>
          </Body>
        </Header>
        <SafeAreaView style={styles.body}>
          <ListItem onPress={() => this.setState({itemSelected: 'name/asc'})}>
            <Left>
              <Text>Nama Produk A - Z</Text>
            </Left>
            <Right>
              <Radio
                onPress={() => this.setState({itemSelected: 'name/asc'})}
                selected={this.state.itemSelected === 'name/asc'}
              />
            </Right>
          </ListItem>
          <ListItem onPress={() => this.setState({itemSelected: 'name/desc'})}>
            <Left>
              <Text>Nama Produk Z - A</Text>
            </Left>
            <Right>
              <Radio
                onPress={() => this.setState({itemSelected: 'name/desc'})}
                selected={this.state.itemSelected === 'name/desc'}
              />
            </Right>
          </ListItem>
          <ListItem
            onPress={() => this.setState({itemSelected: 'date_updated/desc'})}>
            <Left>
              <Text>Terbaru</Text>
            </Left>
            <Right>
              <Radio
                onPress={() =>
                  this.setState({itemSelected: 'date_updated/desc'})
                }
                selected={this.state.itemSelected === 'date_updated/desc'}
              />
            </Right>
          </ListItem>
          <ListItem onPress={() => this.setState({itemSelected: 'price/asc'})}>
            <Left>
              <Text>Harga Terendah</Text>
            </Left>
            <Right>
              <Radio
                onPress={() => this.setState({itemSelected: 'price/asc'})}
                selected={this.state.itemSelected === 'price/asc'}
              />
            </Right>
          </ListItem>
          <ListItem onPress={() => this.setState({itemSelected: 'price/desc'})}>
            <Left>
              <Text>Harga Tertinggi</Text>
            </Left>
            <Right>
              <Radio
                onPress={() => this.setState({itemSelected: 'price/desc'})}
                selected={this.state.itemSelected === 'price/desc'}
              />
            </Right>
          </ListItem>
        </SafeAreaView>
        <View style={styles.viewbottom}>
          <Button
            success
            style={styles.button}
            onPress={this.onSort.bind(this)}>
            <Text style={styles.textbutton}>Tampilkan Produk</Text>
          </Button>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
  },
  body: {
    flex: 1,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: wp('7%'),
    marginLeft: wp('-10%'),
  },
  icon: {
    marginLeft: wp('2%'),
  },
  viewbottom: {
    height: hp('10%'),
    width: wp('100%'),
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: hp('0%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: wp('95%'),
    height: hp('6.5'),
    borderRadius: wp('2%'),
    justifyContent: 'center',
  },
  textbutton: {
    color: '#fff',
    fontSize: wp('5%'),
  },
});

export default withNavigation(Sort);
