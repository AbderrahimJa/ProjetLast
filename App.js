import React from 'react';
import { StyleSheet, ImageBackground, View } from 'react-native';
import Home from './Components/Home.js';
import Search from './Components/Search.js';
import Log from './Components/Log.js';
import Navigation from './Components/Stack.js';
import { NavigationContainer } from '@react-navigation/native'
import Testing from './Profile/Chef_Labo';

export default function App(){
  return (
    // <View style={Styles.body}>
    //   <ImageBackground
    //     source={ require('./3132.jpg') }
    //     style={Styles.imag}
    //   >
    //     {/* <Home/> */}
    //   </ImageBackground>
    // </View>
    // <NavigationContainer>
    // <Stack/>
      // <Testing/>
      <Navigation/>
    // </NavigationContainer>/
  );
}

const Styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  imag: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  }
})