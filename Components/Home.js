import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';

export default function Home({ navigation }){
    const ChangeToSearch = () => {
        // navigation.jumpTo('Search');
        navigation.navigate('Search');
    }
    const ChangeToLog = () => {
        navigation.navigate('Log in');
    }

    return (
        <ImageBackground
            source={ require('../3132.jpg') }
            style={Styles.imag}
        >
            <View style={Styles.home}>
                <View style={Styles.title}>
                    <View style={Styles.tit}>
                        <Text style={Styles.textTit}>Ibn Zohr</Text>
                    </View>
                </View>
                <View style={Styles.body}>
                    <TouchableOpacity
                        onPress={ ChangeToSearch }
                    >
                        <View style={Styles.oneThing}>
                            <FontAwesome name="search" size={22} color="white"  style={Styles.icon}/>
                            <Text style={Styles.text}>Rechercher</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={ ChangeToLog }
                    >
                        <View style={Styles.oneThing}>
                            <MaterialCommunityIcons name="login" size={22} color="white" style={Styles.icon}/>
                            <Text style={Styles.text}>Connexion</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

const Styles = StyleSheet.create({
    home: {
        flex: 1,
        paddingVertical: 30,
        justifyContent: 'center',
        flexDirection: 'column',
    },
    oneThing: {
        alignItems: 'center',
        alignSelf: 'center',
        width: 260,
        padding: 20,
        backgroundColor: '#ff6701',
        marginVertical: 20,
        borderRadius: 33,
        flexDirection: 'row',
    },
    icon: {
        marginHorizontal: 3,
        justifyContent: 'flex-start',
    },
    text: {
        fontStyle: 'italic',
        fontSize: 19,
        marginHorizontal: "23%",
        color: 'white',
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