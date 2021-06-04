import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, BackHandler, RefreshControl } from 'react-native';
import { Avatar, Button, Divider } from 'react-native-elements';
import { TextInput } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Mes_Info from './Mes_Info';

function Mes_Articles({ route, navigation}){
    useEffect(() => {
        // BackHandler.addEventListener("hardwareBackPress", function(){navigation.popToTop()} );
        // return () => BackHandler.removeEventListener("hardwareBackPress", function(){navigation.popToTop()} );
    }, [])
    return(<View style={{backgroundColor: '#fcecdd', flex:1}}><Text>Articles</Text></View>);
}

const Tab = createMaterialTopTabNavigator();

export default function Profile(){
    return (
        <Tab.Navigator
            initialRouteName="Mes infos"
            backBehavior="none"
            lazy={false}
            // lazyPlaceholder="Loading..."
            // initialLayout={{ width: Dimensions.get('window').width }}
            tabBarOptions={{
                activeTintColor: 'white',
                pressColor : 'orange',
                // inactiveTintColor: '',
                labelStyle: { fontSize: 18, fontFamily: 'Regular403', width: '100%', },
                contentContainerStyle:{backgroundColor: '#fea82f', borderWidth: 3, marginTop: '-0%' },
                style:{height: '9%'}
            }}
        >
            <Tab.Screen name="Mes infos" component={Mes_Info} options={{ tabBarLabel: 'Mees infos' }} />
            <Tab.Screen name="Mes articles" component={Mes_Articles} options={{ tabBarLabel: 'Mes articles' }}/>
        </Tab.Navigator>
    );
}