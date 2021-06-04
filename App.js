import React from 'react';
import Navigation from './Components/Stack.js';
import { NavigationContainer } from '@react-navigation/native'
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

export default function App() {
    let [fontsLoaded] = useFonts({
        'Regular401': require('./assets/fonts/Poppins-Light.ttf'),
        'Regular402': require('./assets/fonts/Poppins-ExtraLight.ttf'),
        'Regular403': require('./assets/fonts/Poppins-Medium.ttf'),
        'Regular400': require('./assets/fonts/Poppins-Regular.ttf'),
        'Regular404': require('./assets/fonts/Nunito-BoldItalic.ttf'),
        'Regular405': require('./assets/fonts/Nunito-Regular.ttf'),
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    }else{
        return (
            <Navigation />
        );
    }
}