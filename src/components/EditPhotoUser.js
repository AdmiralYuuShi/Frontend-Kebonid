import React, {Component} from 'react';
import {Image, StyleSheet} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  //   Button,
  Icon,
  Left,
  Body,
} from 'native-base';
import {Button} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default class EditPhotoUser extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Card style={style.cardWrapper}>
            <CardItem>
              <Body style={style.imageBody}>
                <Image
                  source={require('../assets/LogoDummy.png')}
                  style={style.image}
                />
              </Body>
            </CardItem>
            <CardItem>
              <Text style={style.textRequirement}>
                Besar file: maksimum 10.000.000 bytes (10 Megabytes) Ekstensi
                file yang diperbolehkan: .JPG .JPEG .PNG{' '}
              </Text>
            </CardItem>
            <CardItem style={style.cardButton}>
              <Body style={style.buttonWrapper}>
                <Button buttonStyle={style.button} title="PILIH FOTO" />
                <Button buttonStyle={style.button1} title="SIMPAN" />
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
const style = StyleSheet.create({
  cardWrapper: {
    flex: 0,
    marginLeft: wp('3%'),
    marginRight: wp('3%'),
    marginTop: wp('3%'),
  },
  image: {height: 200, width: 200, flex: 1},
  button1: {
    backgroundColor: '#009e00',
    marginBottom: hp('2%'),
    width: wp('40%'),
  },
  imageBody: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'green',
    marginBottom: hp('2%'),
    width: wp('40%'),
  },
  textRequirement: {
    color: 'rgba(0,0,0,.5)',
    fontSize: wp('3%'),
    marginLeft: wp('3%'),
  },
  cardButton: {
    flexDirection: 'column',
    alignContent: 'center',
  },
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
