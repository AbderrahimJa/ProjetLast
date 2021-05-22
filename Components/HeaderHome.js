import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export default function Header({ navigation }){
    const openMenue = () => {
        navigation.openDrawer();
    }
    return(
        <View style={Styles.header}>
            <Feather 
                style={Styles.icon}
                name="menu"
                color={'grey'}
                size={30}
                onPress={ openMenue }
            />
            <View>
                <Text style={Styles.text}>Home</Text>
            </View>
        </View>
    );
}

const Styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 28,
        fontStyle: 'italic',
        color: '#333',
        letterSpacing: 1,
    },
    icon: {
        position: 'absolute',
        right: 10,
    }
});