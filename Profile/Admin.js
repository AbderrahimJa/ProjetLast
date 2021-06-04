import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, AsyncStorage, BackHandler } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import { Avatar } from 'react-native-elements';
import Elevations from 'react-native-elevation';
import AwesomeAlert from 'react-native-awesome-alerts';



export default function Admin({ route , navigation }){
    const [Alerting, setAlerting] = useState(false);
    const { id, first_name, last_name, type } = route.params;
    const onBackPress = () => {
        setAlerting(true);
    }
    const remov = async() => {
        try{
            AsyncStorage.removeItem('refresh');
            AsyncStorage.removeItem('access');
        }catch(error){   console.error(error); }
    }
    const [varOfChange, setvarOfChange] = useState(true);
    useEffect( () => {
        // BackHandler.addEventListener("hardwareBackPress", () => { return true;} );
        // return () => BackHandler.removeEventListener("hardwareBackPress", function(){ return true; } );
    }, []);    
    return(
        <Animatable.View style={{backgroundColor: '#fcecdd' , flex: 1, paddingTop: '8%', paddingBottom: '5%'}}>
            <View style={Styles.img}>
                <Avatar
                    rounded
                    size="xlarge"
                    // source={{uri:image}}
                    source={ require('../profile1.png')}
                    containerStyle ={{ alignSelf: 'center'}}
                >
                </Avatar>
                <Text style={Styles.Title}>{first_name+" "+last_name}</Text>
                <Text style={[Styles.Title,{marginBottom: '1%'}]}>Admin</Text>
            </View>
            <View style={Styles.elem}>
                <View style={{minHeight: '14%', maxHeight: '28%', marginVertical: "-2.5%", marginTop: '1.5%',}}>
                <TouchableOpacity style={Styles.elem1} onPress={ () => { setvarOfChange(false); navigation.navigate('profilee',{id: id}) }}>
                    <View style={{justifyContent: 'flex-start', flexDirection: 'row'}}>
                        <Avatar
                            size="medium"
                            icon={{name: 'user', color: '#ff6701', type: 'font-awesome'}}
                            containerStyle={{ marginTop: "-5%"}}
                        />
                        <Text style={Styles.text}>Profile</Text>
                    </View>
                    <Feather style={ {color: '#ff6701', marginTop: "1%"}} name="chevron-right" size={22} />
                </TouchableOpacity>
                </View>
                <View style={{minHeight: '14%', maxHeight: '28%', marginVertical: "-2.5%",}}>
                <TouchableOpacity style={Styles.elem1} onPress={ () => navigation.navigate('str_Rech')}>
                    <View style={{justifyContent: 'flex-start', flexDirection: 'row'}}>
                        <Avatar
                            size="medium"
                            icon={{name: 'lab-flask', color: '#ff6701', type: 'entypo'}}
                            containerStyle={{ marginTop: "-3%"}} />
                        <Text style={Styles.text}>Structures de recherches</Text>
                    </View>
                    <Feather style={ {color: '#ff6701', marginTop: "1%"}} name="chevron-right" size={22} />
                </TouchableOpacity>
                </View>
                <View style={{minHeight: '14%', maxHeight: '28%', marginVertical: "-2.5%",}}>
                {/* <TouchableOpacity style={Styles.elem1} onPress={ () => navigation.navigate('Gestion_Comptes', {type: type})}> */}
                <TouchableOpacity style={Styles.elem1} onPress={ () => navigation.navigate('Gestion_Comptes', {type: type, id: id})}>
                    <View style={{justifyContent: 'flex-start', flexDirection: 'row'}}>
                        <Avatar
                            size="medium"
                            icon={{name: 'user-cog', color: '#ff6701', type: 'font-awesome-5'}}
                            containerStyle={{ marginTop: "-3%"}}
                        />
                        <Text style={Styles.text}>Gestion des comptes</Text>
                    </View>
                    <Feather style={ {color: '#ff6701', marginTop: "1%"}} name="chevron-right" size={22} />
                </TouchableOpacity>
                </View>
                <View style={{minHeight: '14%', maxHeight: '28%', marginTop: "-2.5%"}}>
                <TouchableOpacity style={[Styles.elem1, {justifyContent: 'flex-start'}]} onPress={ () => setAlerting(true) } >
                    <Avatar
                        size="medium"
                        icon={{name: 'sign-out', color: '#ff6701', type: 'font-awesome'}}
                        containerStyle={{ marginTop: "-2%" }}
                    />
                    <Text style={Styles.text}>Déconnexion</Text>
                </TouchableOpacity>
                <AwesomeAlert
                    show={Alerting}
                    showProgress={false}
                    progressColor="#DD6B55"
                    progressSize={50}
                    title="Déconnexion"
                    message="Êtes-vous sûr de vouloir vous déconnecter ?"
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="No"
                    confirmText="Oui"
                    confirmButtonColor="#DD6B55"
                    contentContainerStyle={{backgroundColor: '#fcecdd'}}
                    titleStyle={{ fontFamily: 'Regular404'}}
                    messageStyle={{ fontFamily: 'Regular403' }}
                    onCancelPressed={() => {
                        setAlerting(false);
                    }}
                    onConfirmPressed={() => {
                        setAlerting(false);
                        // navigation.jumpTo('Home',{screen:'Log in'});
                        navigation.goBack();
                        remov()      ;
                    }}
                />
                </View>
            </View>
        </Animatable.View>
    );
}

const Styles = StyleSheet.create({
    elem: {
        borderRadius: 10,
        flex: 1,
        maxHeight: 350,
        flexDirection: 'column',
        marginTop: "1%",
        textAlign: 'center',
        marginHorizontal: "4%",
        marginBottom: "0%",
        // paddingHorizontal: '0%',
        ...Elevations[6],
        backgroundColor: '#ffc288',
    },
    elem1: {
        borderRadius: 10,
        width: '96%',
        marginVertical: "3.9%",
        paddingVertical: "3.8%",
        paddingHorizontal: "2%",
        paddingLeft: "0.5%",
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        ...Elevations[10],
        backgroundColor: '#fcecdd',
        alignSelf: 'center'
    },
    img: {
        backgroundColor: "#ffc288",
        marginTop: "2%",
        width: '70%',
        borderRadius: 20,
        paddingVertical: '3%',
        marginBottom: '4%',
        ...Elevations[10],
        alignSelf: 'center'
    },
    Title: {
        marginTop: "6%",
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 0,
        color: '#ff6701',
        fontFamily: 'Regular400'
    },
    text: {
        marginLeft: '-2%',
        fontSize: 21,
        color: '#ff6701',
    }
})