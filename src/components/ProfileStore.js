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
import {View, Button as ButtonNB} from 'native-base';
import {Avatar, ListItem} from 'react-native-elements';
import {withNavigation} from 'react-navigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Button} from 'react-native-paper';
import {Rating} from 'react-native-elements';
import {fetchDetailStore} from '../public/redux/actions/store';
import {connect} from 'react-redux';
import {Bubbles} from 'react-native-loader';
import {logout} from '../public/redux/actions/auth';
import {API_KEY_PHOTO} from 'react-native-dotenv';
class ProfileStore extends Component {
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
    this.props.get(this.props.auth.user.id).then(() => {
      this.props.store.store.data.map(item => {
        return this.setState({
          name: item.name,
          id: item.id,
          phone: item.phone,
          photo: item.photo
            ? `${API_KEY_PHOTO}/store/${item.photo}`
            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAQeOYC_Uqrxp5lVzs-DalVZJg3t6cCtAFyMHeI2NejPr1-TsUUQ&s',
          address: item.address,
        });
      });
    });
  }
  handleLogout = _ => {
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
                onPress: () => {
                  this.props.logoutUser() &&
                    this.props.navigation.push('Start');
                },
              },
            ]),
        },
      ],
      {cancelable: false},
    );
  };

  render() {
    const {isLoading} = this.state;
    setTimeout(
      function() {
        this.setState({isLoading: true});
      }.bind(this),
      2000,
    );
    return (
      <>
        {!isLoading ? (
          <View style={style.loader}>
            <Bubbles size={10} style={style.loading} color="green" />
          </View>
        ) : (
          <ScrollView>
            <View style={style.container}>
              <View style={style.containerImage}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.push('EditPhotoStore', {
                      photo: this.state.photo,
                    });
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
                    this.props.navigation.push('EditStore', {
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
                <Icon name="credit-card" size={30} color="green" />
                <Text style={style.textStatus}>Credit</Text>
                <Text style={style.textStatus2}>0</Text>
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
              <Text style={style.rating}>Produk</Text>
              <ButtonNB
                light
                style={style.buttonadd}
                onPress={() => this.props.navigation.navigate('AddProduct')}>
                <Icon name="plus" size={18} color={'#B3B6B7'} />
                <Text style={style.textadd}>Tambah Produk</Text>
              </ButtonNB>
              <View style={style.productWrapper}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('ProductStore')
                  }>
                  <ListItem title="Produk Anda" bottomDivider chevron />
                </TouchableOpacity>
              </View>
            </View>
            <View style={style.ratingWrapper}>
              <Text style={style.rating}>Berikan kami rating</Text>
              <Rating
                onFinishRating={this.ratingCompleted}
                minValue={0}
                startingValue={0}
                style={style.ratings}
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
        )}
      </>
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
  logoutUser: _ => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(ProfileStore));
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
  ratings: {paddingVertical: 10},
  buttonadd: {
    borderWidth: wp('0.5%'),
    borderColor: '#B3B6B7',
    borderRadius: wp('2%'),
    width: wp('90%'),
    alignSelf: 'center',
    height: hp('6.5%'),
    justifyContent: 'center',
  },
  textadd: {
    color: '#B3B6B7',
    fontSize: wp('4.5%'),
    marginLeft: wp('3%'),
  },
  productWrapper: {
    marginTop: hp('1.5%'),
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('30%'),
  },
  loading: {marginTop: hp('50%')},
});
// export default withNavigation(ProfileUser);
