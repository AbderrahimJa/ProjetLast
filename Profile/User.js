import React, { useState, useEffect } from 'react';
import { Text, View, BackHandler, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Avatar, Divider } from 'react-native-elements';
import Elevations from 'react-native-elevation';

export default function User( { route , navigation} ){
    const { id, first_name, last_name, phone, email, type } = route.params;
    const [panding, setpanding] = useState(true);
    const [dataUser, setdataUser] = useState([]);
    const functionOfFetching = () => {
        fetch('http://34.77.153.247:8000/api/Users/'+id)
        .then((response) => response.json())
        .then((json) => setdataUser(json))
        .then( () => setpanding(false))
        .catch((error) => console.error(error));
    }
    const [nameOfType, setnameOfType] = useState('');
    useEffect( () => { 
        // BackHandler.addEventListener("hardwareBackPress", function(){navigation.goBack();} );
        functionOfFetching();
        if( type == "ADMIN" )   setnameOfType("Admin");
        if( type == "PROF" )   setnameOfType("Professeur");
        if( type == "C_LAB" )   setnameOfType("Chef de labo");
        if( type == "C_EQ" )   setnameOfType("Chef d'equipe");
        // return () => BackHandler.removeEventListener("hardwareBackPress", function(){navigation.goBack();} );
    }, [])
    return(
        <View style={Styles.all}>
            <View style={{ marginTop: "12%", marginLeft: "5%", marginBottom: "-130%", paddingBottom: 10, flex: 1, width: '100%'}} >
                <Feather name='arrow-left' color="red" size={38} onPress={ () => navigation.goBack()} />
            </View>
            <View style={Styles.body}>
                <View style={Styles.img}>
                    <Avatar
                        rounded
                        size="xlarge"
                        source= { require('../profile1.png') }
                        containerStyle ={{ alignSelf: 'center'}}
                    >
                    </Avatar>
                </View>
                <Text style={Styles.Title}>{ !panding ? dataUser.first_name +" "+ dataUser.last_name : ''}</Text>
                <Text style={Styles.Title}>{ !panding ? nameOfType : '' }</Text>
                <Divider style={{ height: 1, backgroundColor: '#ffc288', marginTop: '4%' }} />
                <View style={{flexDirection: 'row', marginTop: '4%', marginLeft: '-4%', justifyContent: 'flex-start'}}>
                    <Avatar rounded size="medium" icon={{name: 'phone', color:"red", type: 'Feather'}}  containerStyle={{ marginTop: "-2.6%", marginHorizontal: 0}} />
                    <Text style={[Styles.Title,{ color: 'red'}]}>Telephone : </Text>
                </View>
                { !panding && <Text style={[Styles.Title,{color: '#ff6701', marginBottom: '4%'}]}>{ dataUser.phone }</Text> }
                <Divider style={{ height: 1, backgroundColor: '#ffc288' }} />
                <View style={{flexDirection: 'row', marginTop: '4%', marginLeft: '-4%', justifyContent: 'flex-start'}}>
                    <Avatar rounded size="medium" icon={{name: 'email', color:"red", type: 'Feather'}}  containerStyle={{ marginTop: "-2.6%", marginHorizontal: 0}} />
                    <Text style={[Styles.Title,{ color: 'red'}]}>Email : </Text>
                </View>
                { !panding && <Text style={[Styles.Title,{color: '#ff6701'}]}>{ dataUser.email }</Text> }
                {/* <Text style={Styles.Chef}>Email : { !panding ? dataUser.email : '' }</Text> */}
            </View>
        </View>
    );
}

const Styles = StyleSheet.create({
    all: {
        flex: 1,
        backgroundColor: '#ffc288'
    },
    body: {
        marginTop: '5%',
        marginHorizontal: 13,
        padding: '6%',
        marginBottom: '5%',
        backgroundColor: '#fcecdd',
        flex: 1,
        justifyContent: 'flex-start',
        borderRadius: 20,
        alignContent: 'center',
    },
    Title: {
        fontSize: 23,
        paddingBottom: 10,
        color: 'red',
        fontFamily: 'Regular404',
        textAlign: 'center',
        color: '#ff6701'  
    },
    Chef: {
        fontSize: 17,
        color: 'black',
        paddingVertical: 3,
    },
    img: {
        width: '70%',
        borderRadius: 10,
        paddingVertical: '4%',
        marginBottom: '4%',
        alignSelf: 'center'
    }
})