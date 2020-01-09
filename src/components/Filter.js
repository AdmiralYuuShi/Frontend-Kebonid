import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {
  Header,
  Body,
  Title,
  Left,
  Item,
  Label,
  Input,
  Button,
  Picker,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {withNavigation, SafeAreaView} from 'react-navigation';

class Filter extends Component {
  constructor() {
    super();
    this.state = {
      category: '',
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
            <Title style={styles.title}>Filter</Title>
          </Body>
        </Header>
        <SafeAreaView style={styles.body}>
          <View style={styles.form1}>
            <Item stackedLabel style={styles.min}>
              <Label>Harga Minimum</Label>
              <Input />
            </Item>
          </View>
          <View style={styles.form2}>
            <Item stackedLabel style={styles.max}>
              <Label>Harga Maksimum</Label>
              <Input keyboardType="numbers-and-punctuation" />
            </Item>
          </View>
          <View style={styles.saparator} />
          <View style={styles.category}>
            <Label style={styles.label}>Kategori</Label>
            <Item>
              <Picker
                style={styles.picker}
                mode="dialog"
                selectedValue={this.state.category}
                onValueChange={value => this.setState({category: value})}>
                <Picker.Item label="Pilih Kategori" value="" />
                <Picker.Item label="Sayur" value="sayur" />
                <Picker.Item label="Buah-buahan" value="buah" />
                <Picker.Item label="Alat Perkebunan" value="perkebunan" />
                <Picker.Item label="Alat Pertanian" value="pertanian" />
              </Picker>
            </Item>
          </View>
          <View style={styles.viewbottom}>
            <Button success style={styles.button}>
              <Text style={styles.textbutton}>Tampilkan Produk</Text>
            </Button>
          </View>
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
    flexDirection: 'row',
    marginTop: hp('3%'),
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
  form1: {
    position: 'absolute',
    left: wp('5%'),
  },
  form2: {
    position: 'absolute',
    right: wp('5%'),
  },
  min: {
    width: wp('42%'),
  },
  max: {
    width: wp('42%'),
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
  saparator: {
    height: hp('0.2%'),
    width: wp('100%'),
    backgroundColor: '#E5E7E9',
    marginTop: hp('12%'),
    position: 'absolute',
  },
  category: {
    marginTop: hp('15%'),
    position: 'absolute',
    width: wp('100%'),
  },
  picker: {
    marginTop: hp('2%'),
  },
  label: {
    marginLeft: wp('2.5%'),
  },
});

export default withNavigation(Filter);
