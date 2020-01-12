import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity, View, Alert} from 'react-native';
import {
  Container,
  Header,
  Body,
  Title,
  Left,
  Form,
  Item,
  Label,
  Input,
} from 'native-base';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {withNavigation} from 'react-navigation';
import {fetchUpdateStore} from '../public/redux/actions/store';
import {connect} from 'react-redux';
import {API_KEY_PHOTO} from 'react-native-dotenv';
class EditStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      phone: '',
      photo: '',
      address: '',
      isLoading: false,
    };
    this.handleEdit = this.handleEdit.bind(this);
  }
  handleEdit = () => {
    const {name, phone, address, id} = this.state;
    console.log(address);
    if (!name || !phone || !address) {
      alert('Semua isi form harus di isi');
    } else {
      this.props.fetchUpdate(id, {name, phone, address});
      Alert.alert(
        'Submit form?',
        'Data kamu akan diperbaharui jika menekan ok',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () =>
              Alert.alert('Success!', 'Berhasil ubah data', [
                {
                  text: 'OK',
                  onPress: () => this.props.navigation.push('BottomNavbar'),
                },
              ]),
          },
        ],
        {cancelable: false},
      );
    }
  };

  componentDidMount() {
    const item = this.props.data;
    return this.setState({
      name: item.name,
      id: item.id,
      phone: item.phone,
      photo: item.photo
        ? `${API_KEY_PHOTO}/store/${item.photo}`
        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAQeOYC_Uqrxp5lVzs-DalVZJg3t6cCtAFyMHeI2NejPr1-TsUUQ&s',
      address: item.address,
    });
  }
  render() {
    return (
      <>
        <Header style={style.header}>
          <Left>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon style={style.icon} name="times" size={wp('5.5%')} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title style={style.title}>Edit Profile</Title>
          </Body>
        </Header>
        <Form>
          <View style={style.form}>
            <Item stackedLabel>
              <Label>Nama</Label>
              <Input
                type="text"
                id="Name"
                name="Name"
                value={this.state.name}
                onChangeText={value => {
                  this.setState({
                    name: value,
                  });
                }}
              />
            </Item>
            <Item stackedLabel>
              <Label>Phone</Label>
              <Input
                type="text"
                id="phone"
                name="phone"
                value={this.state.phone}
                onChangeText={value => {
                  this.setState({
                    phone: value,
                  });
                }}
              />
            </Item>
            <Item stackedLabel>
              <Label>Address</Label>
              <Input
                type="text"
                id="address"
                name="address"
                value={this.state.address}
                onChangeText={value => {
                  this.setState({
                    address: value,
                  });
                }}
              />
            </Item>
            <View style={style.buttonWrapper}>
              <Button
                onPress={this.handleEdit}
                style={style.button}
                title="Submit"
              />
            </View>
          </View>
        </Form>

        <Container />
      </>
    );
  }
}
const mapStateToProps = state => ({
  store: state.store,
});

const mapDispatchToProps = dispatch => ({
  fetchUpdate: (id, data) => dispatch(fetchUpdateStore(id, data)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(EditStore));
// export default withNavigation(EditUser);
const style = StyleSheet.create({
  button: {
    backgroundColor: 'green',
    marginBottom: hp('2%'),
    width: wp('40%'),
    alignSelf: 'center',
  },
  cardButton: {
    flexDirection: 'column',
    alignContent: 'center',
  },
  buttonWrapper: {
    justifyContent: 'center',
    width: wp('30%'),
    marginTop: wp('3%'),
    marginLeft: wp('3%'),
  },
  header: {
    backgroundColor: '#fff',
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
  textErr: {
    fontStyle: 'italic',
    color: 'red',
    marginTop: 15,
    alignItems: 'center',
  },
  form: {
    marginTop: hp('3%'),
    backgroundColor: 'white',
  },
  textTitle: {
    alignSelf: 'center',
    fontSize: wp('6%'),
    fontWeight: 'bold',
  },
});
