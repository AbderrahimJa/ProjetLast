import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { NavigationContainer } from '@react-navigation/native';

export default function Home({ navigation }){
    const ChangeToSearch = () => navigation.navigate('Search')
    const ChangeToLog = () => navigation.navigate('Log in')
    return (
        <View style={Styles.home}>
            <View style={Styles.title}>
                <View style={Styles.tit}>
                    <Text style={Styles.textTit}>Ibn Zohr</Text>
                </View>
            </View>
            <View style={Styles.body}>
                <TouchableOpacity onPress={ ChangeToSearch } >
                    <Animatable.View style={Styles.oneThing} delay= {100} animation="slideInRight">
                        <FontAwesome name="search" size={22} color="white"  style={Styles.icon}/>
                        <Text style={Styles.text}>Rechercher</Text>
                    </Animatable.View>
                </TouchableOpacity>
                <TouchableOpacity onPress={ ChangeToLog } >
                    <Animatable.View style={Styles.oneThing} delay= {100} animation="slideInLeft">
                        <MaterialCommunityIcons name="login" size={22} color="white" style={Styles.icon}/>
                        <Text style={Styles.text}>Connexion</Text>
                    </Animatable.View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const Styles = StyleSheet.create({
    home: {
        flex: 1,
        paddingVertical: 30,
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#ffc288',
    },
    oneThing: {
        alignItems: 'center',
        alignSelf: 'center',
        width: 260,
        padding: 20,
        backgroundColor: '#ff6701',
        marginVertical: 20,
        borderRadius: 30,
        flexDirection: 'row',
    },
    icon: {
        marginLeft: "4%",
        marginRight: "-5%",
        justifyContent: 'flex-start',
    },
    text: {
        fontSize: 19,
        marginHorizontal: "20%",
        color: 'white',
        fontFamily: 'Regular403'
    },
    title: {
        flex: 1,
        paddingVertical: 10,
        justifyContent: 'center',
        marginHorizontal: 20,
    },
    tit: {
        justifyContent: 'center',
        paddingHorizontal: "1.5%",
        paddingVertical: 5,
        borderTopLeftRadius: 20,
        borderBottomEndRadius: 20,
        borderBottomWidth: 4,
        borderTopWidth: 4,
        borderLeftWidth: 0.16,
        borderRightWidth: 0.16,
        borderColor: '#ff6701',
        width: 160,
        alignItems: 'center',
        alignSelf: 'center',
    },
    body: {
        flex: 1,
        paddingVertical: 95,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    textTit: {
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: '#ff6701',
    },
    imag: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    }
})