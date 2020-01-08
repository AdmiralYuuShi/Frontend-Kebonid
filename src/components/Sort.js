import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  Header,
  Body,
  Title,
  Left,
  ListItem,
  Right,
  Radio,
  Text,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {withNavigation, SafeAreaView} from 'react-navigation';

class Sort extends Component {
  constructor() {
    super();
    this.state = {
      itemSelected: 'nama_asc',
    };
  }

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
          <ListItem onPress={() => this.setState({itemSelected: 'nama_asc'})}>
            <Left>
              <Text>Nama Produk A - Z</Text>
            </Left>
            <Right>
              <Radio
                onPress={() => this.setState({itemSelected: 'nama_asc'})}
                selected={this.state.itemSelected === 'nama_asc'}
              />
            </Right>
          </ListItem>
          <ListItem onPress={() => this.setState({itemSelected: 'nama_desc'})}>
            <Left>
              <Text>Nama Produk Z - A</Text>
            </Left>
            <Right>
              <Radio
                onPress={() => this.setState({itemSelected: 'nama_desc'})}
                selected={this.state.itemSelected === 'nama_desc'}
              />
            </Right>
          </ListItem>
          <ListItem onPress={() => this.setState({itemSelected: 'harga_asc'})}>
            <Left>
              <Text>Harga Terendah</Text>
            </Left>
            <Right>
              <Radio
                onPress={() => this.setState({itemSelected: 'harga_asc'})}
                selected={this.state.itemSelected === 'harga_asc'}
              />
            </Right>
          </ListItem>
          <ListItem onPress={() => this.setState({itemSelected: 'harga_desc'})}>
            <Left>
              <Text>Harga Tertinggi</Text>
            </Left>
            <Right>
              <Radio
                onPress={() => this.setState({itemSelected: 'harga_desc'})}
                selected={this.state.itemSelected === 'harga_desc'}
              />
            </Right>
          </ListItem>
        </SafeAreaView>
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
});

export default withNavigation(Sort);
