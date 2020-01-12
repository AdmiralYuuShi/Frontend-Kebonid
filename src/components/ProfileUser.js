import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Fontisto';
import {View} from 'native-base';
import {Avatar, ListItem} from 'react-native-elements';
import {withNavigation} from 'react-navigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Button} from 'react-native-paper';
import {Rating} from 'react-native-elements';
import {logout} from '../public/redux/actions/auth';
import {fetchDetailUsers} from '../public/redux/actions/users';
import {connect} from 'react-redux';
import jwtDecode from 'jwt-decode';
import {API_KEY_PHOTO} from 'react-native-dotenv';
class ProfileUser extends Component {
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
  }
  componentDidMount() {
    const token = this.props.auth.token;
    if (this.props.auth.user.id) {
      this.props.get(this.props.auth.user.id).then(() => {
        // console.log(this.props.users.users.result);
        this.props.users.users.result.map(item => {
          return this.setState({
            name: item.name,
            id: item.id,
            phone: item.phone,
            photo: item.photo
              ? `${API_KEY_PHOTO}/customer/${item.photo}`
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAQeOYC_Uqrxp5lVzs-DalVZJg3t6cCtAFyMHeI2NejPr1-TsUUQ&s',
            address: item.address,
          });
        });
      });
    }
    if (this.props.idUser) {
      this.props.get(this.props.idUser).then(() => {
        // console.log(this.props.users.users.result);
        this.props.users.users.result.map(item => {
          return this.setState({
            name: item.name,
            id: item.id,
            phone: item.phone,
            photo: item.photo
              ? `${API_KEY_PHOTO}/customer/${item.photo}`
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAQeOYC_Uqrxp5lVzs-DalVZJg3t6cCtAFyMHeI2NejPr1-TsUUQ&s',
            address: item.address,
          });
        });
      });
    }
  }
  handleLogout = _ => {
    this.props.logoutUser();
    Alert.alert(
      'Kamu yakin keluar?',
      'Jangan lupa balik yah',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () =>
            Alert.alert('Success!', 'See you', [
              {
                text: 'OK',
                onPress: () => this.props.navigation.push('Start'),
              },
            ]),
        },
      ],
      {cancelable: false},
    );
  };

  render() {
    return (
      <>
        <ScrollView>
          <View style={style.container}>
            <View style={style.containerImage}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.push('EditPhotoUser');
                }}>
                <Avatar
                  size="xlarge"
                  source={{uri: this.state.photo}}
                  showEditButton
                  activeOpacity={0.7}
                  title="PROFIL"
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={style.textProfil}>{this.state.name}</Text>
              <Text style={style.textProfil1}>{this.state.phone}</Text>
              <Text style={style.textProfil1}>{this.state.address}</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.push('EditUser', {
                    data: this.state,
                  });
                }}>
                <Button style={style.button}>
                  <Text style={style.textButton}>Edit</Text>
                </Button>
              </TouchableOpacity>
            </View>
          </View>
          <View style={style.card}>
            <View style={style.status}>
              <Icon name="podium-silver" size={30} color="green" />
              <Text style={style.textStatus}>Status</Text>
              <Text style={style.textStatus2}>Silver</Text>
            </View>
            <View style={style.status}>
              <Icon1 name="dollar" size={30} color="green" />
              <Text style={style.textStatus}>Saldo</Text>
              <Text style={style.textStatus2}>0</Text>
            </View>
            <View style={style.status}>
              <Icon2 name="shopping-sale" size={30} color="green" />
              <Text style={style.textStatus}>Kupon</Text>
              <Text style={style.textStatus2}>0</Text>
            </View>
          </View>
          <View style={style.ratingWrapper}>
            <Text style={style.rating}>Berikan kami rating</Text>
            <Rating
              onFinishRating={this.ratingCompleted}
              minValue={0}
              startingValue={0}
              style={{paddingVertical: 10}}
            />
          </View>
          <View>
            <ListItem title="Pesan bantuan" bottomDivider chevron />
            <ListItem title="Komplain pesanan" bottomDivider chevron />
            <ListItem title="FAQ" bottomDivider chevron />
            <ListItem title="Tentang aplikasi" bottomDivider chevron />
            <TouchableOpacity onPress={this.handleLogout}>
              <ListItem title="Keluar" bottomDivider chevron />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </>
    );
  }
}
const style = StyleSheet.create({
  containerImage: {
    marginTop: hp('2%'),
  },
  image: {
    height: undefined,
    width: undefined,
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 500,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textProfil: {
    marginTop: hp('2%'),
    textAlign: 'center',
  },
  textProfil1: {
    marginTop: 0,
    textAlign: 'center',
    width: wp('80%'),
  },
  button: {
    marginTop: hp('2%'),
    backgroundColor: 'green',
  },
  status: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  textStatus: {color: '#92999f', marginTop: 4, fontSize: wp('3%')},
  textButton: {
    color: 'white',
  },
  card: {
    marginTop: hp('3%'),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: wp('0.3%'),
    borderColor: 'green',
    margin: wp('2%'),
    padding: wp('2%'),
    borderRadius: wp('3%'),
  },
  textStatus2: {color: 'green', marginTop: 4, fontSize: wp('5%')},
  rating: {
    fontSize: hp('3%'),
    textAlign: 'center',
    marginBottom: hp('2%'),
  },
  ratingWrapper: {
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
  },
});
const mapStateToProps = state => {
  return {
    users: state.users,
    auth: state.auth,
  };
};
const mapDispatchToProps = dispatch => ({
  get: id => dispatch(fetchDetailUsers(id)),
  logoutUser: _ => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(ProfileUser));
