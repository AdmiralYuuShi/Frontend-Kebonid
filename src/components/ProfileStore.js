import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Button} from 'native-base';
import {withNavigation} from 'react-navigation';

class ProfileStore extends Component {
  render() {
    return (
      <View>
        <Button onPress={() => this.props.navigation.navigate('AddProduct')}>
          <Text>Tambah Produk</Text>
        </Button>
      </View>
    );
  }
}

export default withNavigation(ProfileStore);
