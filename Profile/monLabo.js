import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, TouchableOpacity, TouchableWithoutFeedback, Keyboard, RefreshControl } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import { Avatar } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AwesomeAlert from 'react-native-awesome-alerts';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function monLabo( { route , navigation } ){
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
        functionOfFetching();
    }, []);
    const [panding, setpanding] = useState(true);
    const functionOfFetching = () => {
        setTimeout(() => {
            fetch('https://massive-monkey-9.loca.lt/Users')
            .then((response) => response.json())
            .then((json) => setdataUser(json))
            .then( () => setpanding(false))
            .catch((error) => console.error(error));
            fetch('https://massive-monkey-9.loca.lt/Labos?id_chef_labo='+id)
            .then((response) => response.json())
            .then((json) => setdataLabo(json))
            .then( () => setpanding(false))
            .catch((error) => console.error(error));
            fetch('https://massive-monkey-9.loca.lt/Equipe')
            .then((response) => response.json())
            .then((json) => setdataEquipe(json))
            .then( () => setpanding(false))
            .catch((error) => console.error(error));
        }, 500);
    }
    const { id } = route.params;
    const [dataUser, setdataUser] = useState([]);
    const [dataLabo, setdataLabo] = useState([]);
    const [dataEquipe, setdataEquipe] = useState([]);
    useEffect( () => {
        functionOfFetching();
    }, []);
    return (
        <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() } >
            <ImageBackground source={ require('../3132.jpg') } style={Styles.imag} >
                <KeyboardAwareScrollView refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> } >
                <Feather name='arrow-left' color="red" size={35} style={{position:'absolute', top: 10, left: 10}} onPress={ () => navigation.goBack()}/>
                    <View
                        style={{flexDirection: 'row', justifyContent: 'center', marginTop: '10%', backgroundColor: 'silver', width: '50%', padding: 10, borderRadius: 4, alignSelf: 'center'}}
                    >
                        <Text
                            style={{ fontSize: 23, color: '#ff6701', fontWeight: "bold", textShadowColor: "grey", textShadowRadius: 8 }}
                        >Mon Labo</Text>
                    </View>
                    {panding && <AwesomeAlert show={panding} showProgress={true} progressColor="#DD6B55" progressSize={40} closeOnTouchOutside={false} closeOnHardwareBackPress={false}/>}
                    <View style={Styles.search}>
                        <FlatList
                            data={dataLabo}
                            renderItem={( {item} ) =>
                                <Animatable.View delay= {300} animation="fadeInDown" >
                                    <TouchableOpacity 
                                        onPress={ () => navigation.navigate("LaboDetails", item) } >
                                        <View style={Styles.card}>
                                            <Text style={Styles.title}>{ item.name }</Text>
                                        </View>
                                    </TouchableOpacity>
                                </Animatable.View>
                            }
                        />
                    </View>
                </KeyboardAwareScrollView>
            </ImageBackground>
        </TouchableWithoutFeedback>
    );
}

const Styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        minHeight: 50,
        borderRadius: 7,
        padding: 10,
        flex: 1,
        justifyContent: 'center',
        marginVertical: 2.5,
        flexDirection: 'row',
    },
    title: { fontSize: 22, color: 'coral' },
    search: {
        flex: 1,
        padding: 10,
        paddingHorizontal: 30,
        justifyContent: 'center',
        marginTop: 20,
        flexDirection: 'column',
    },
    imag: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
})