import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useTheme, Avatar, Title, Caption, Paragraph, Drawer, TouchableRipple, Switch } from 'react-native-paper';

export default function DrawerContent( props ){
    const [theme, settheme] = useState(true);

    const toggleTheme = () =>{

    }

    return(
        <View style={Styles.Drawer}>
            <DrawerContentScrollView style={Styles.Scroll}>
                <View style={Styles.tit}>
                    <Text style={Styles.textTit}>IBnZZoHR</Text>
                </View>
                <Drawer.Section style={Styles.Items}>
                    <TouchableOpacity
                        style={Styles.Labels}
                        // onPress={ () => {props.navigation.navigate('Home')}}
                        onPress={ () => props.navigation.jumpTo('Home')}
                    >
                        <Feather
                            name="home"
                            color="#ff6701"
                            size={28}
                        />
                        <Text style={Styles.text}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={Styles.Labels}
                        onPress={ () => {props.navigation.navigate('Search')}}
                    >
                        <Feather
                            name="search"
                            color="#ff6701"
                            size={28}
                        />
                        <Text style={Styles.text}>Search</Text>
                    </TouchableOpacity>
                </Drawer.Section>
                {/* <Drawer.Section title="Preferences">
                    <TouchableRipple onPress={() => {toggleTheme()}}>
                        <View style={Styles.preference}>
                            <Text>Dark Theme</Text>
                            <View pointerEvents="none">
                                <Switch value={paperTheme.dark}/>
                            </View>
                        </View>
                    </TouchableRipple>
                </Drawer.Section> */}
            </DrawerContentScrollView>
        </View>
    );
}

const Styles = StyleSheet.create({
    Drawer: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#E7E2DA',
    },
    Labels: {
        paddingHorizontal: 15,
        paddingVertical: 6,
        flexDirection: 'row',
        margin: 4,
        borderRadius: 5,
    },
    Items: {
        marginTop: 15,
    },
    tit: {
        marginHorizontal: "20%",
        width: "55%",
        marginVertical: 10,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 6,
        borderTopLeftRadius: 20,
        borderBottomEndRadius: 20,
        borderBottomWidth: 4,
        borderTopWidth: 4,
        borderLeftWidth: 0.16,
        borderRightWidth: 0.16,
        borderColor: '#ff6701',
        backgroundColor: 'white',
    },
    textTit: {
        fontSize: 20,
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: '#ff6701',
    },
    text: {
        paddingLeft: 15,
        paddingTop: 3,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ff6701',
    }
})