<h1 align="center">Kebon.Id App</h1>
<p align="center">
  <img width="250" src="./src/public/assets/logo_transparent.png"/>
  <img width="250" src="./screenshoot/native.png">
</p>
<p align="center">
  Built with React Native.
</p>

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Requirements](#requirements)
- [Usage](#usage-for-development)
- [Create Environment Variable](#create-environment-variable)
- [Screenshots](#screenshots)
- [Release APK](#release-apk)
- [Related Project](#related-project-backend)
- [Contributors](#contributors)

## Introduction

<b>Kebon.Id App</b> is a simple e-commerce mobile application that can engaged in agriculture where the target is farmers who can sell their products through this application and the target buyers are people who do not want to queue in the market only through the application of goods can be sent according to procedure.

## Features

- Users/Customers who are not logged in can only view the product
- Users/Customers must sign up and sign in to make a transaction and see their profiles
- Farmers can add their products to sell to customers
- Users/Customers can add the products to their wishlist and their cart for later transaction
- And others

## Requirements

- [`npm`](https://www.npmjs.com/get-npm)
- [`react-native`](https://facebook.github.io/react-native/docs/getting-started)
- [`react-native-cli`](https://facebook.github.io/react-native/docs/getting-started)
- [`Backend Kebon.id`](https://github.com/AdmiralYuuShi/Backend-Kebonid.git)

## Usage for development

1. Open your terminal or command prompt
2. Type `git clone https://github.com/AdmiralYuuShi/Frontend-Kebonid.git`
3. Open the folder and type `npm install` for install dependencies
4. Create Environment Variable [here](#create-environment-variable)
5. Before run this, you must run backend first
6. Type `react-native run-android` for run this app. **_Make sure your device is connected with debugging mode_**.

## Create Environment Variable

```
$ cp .env.example .env
$ nano .env
```

```
# Set API KEY
API_KEY_URL=YOUR_HOST_URL
API_KEY_PHOTO=YOUR_HOST_PHOTO
```

## Screenshots

<div align="center">
    <img width="250" src="./screenshoot/splash.png">   
    <img width="250" src="./screenshoot/signin.png">
    <img width="250" src="./screenshoot/list.png">
</div>
<div align="center">
    <img width="250" src="./screenshoot/cart.png">   
    <img width="250" src="./screenshoot/detail.png">
    <img width="250" src="./screenshoot/addstore.png">
</div>
<div align="center">
    <img width="250" src="./screenshoot/addproduct.png">   
    <img width="250" src="./screenshoot/transaction.png">
    <img width="250" src="./screenshoot/payment.png">
</div>
<div align="center">
    <img width="250" src="./screenshoot/profile.png">   
    <img width="250" src="./screenshoot/profileseller.png">
    <img width="250" src="./screenshoot/photo.png">
</div>

## Release APK

<a href="https://drive.google.com/file/d/1FnNj6UN7lHS7SSvX2s3LsN7swwnscQzh/view?usp=drivesdk">
  <img src="https://img.shields.io/badge/Download%20on%20the-Google%20Drive-blue.svg?style=popout&logo=google-drive"/>
</a>

## Related Project (Backend)

- [`Backend Kebon.id`](https://github.com/AdmiralYuuShi/Backend-Kebonid.git)

## Contributors

1. <a href="https://github.com/AdmiralYuuShi"><img src="https://avatars1.githubusercontent.com/u/47265524?s=400&v=4" title="AdmiralYuuShi" width="50" height="50"></a> Hapid Moch Jamil
2. <a href="https://github.com/alfatahh54"><img src="https://avatars3.githubusercontent.com/u/55615664?s=400&v=4" title="alfatahh54" width="50" height="50"></a> Alfatah Hidayat
3. <a href="https://github.com/kurniawandenyy"><img src="https://avatars0.githubusercontent.com/u/48039021?s=400&v=4" title="kurniawandenyy" width="50" height="50"></a> Deny Kurniawan
4. <a href="https://github.com/ihsan2"><img src="https://avatars1.githubusercontent.com/u/39041267?s=400&u=6dc608d72a78f0fde1d830f5e99f9a6020558c25&v=4" title="ihsan2" width="50" height="50"></a> Nur Ihsan
5. <a href="https://github.com/vikavp"><img src="https://avatars2.githubusercontent.com/u/52590370?s=400&v=4" title="vikavp" width="50" height="50"></a> Vika Vitaloka Pramansah
