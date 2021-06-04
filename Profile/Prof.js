import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, BackHandler, Image, ImageBackground, AsyncStorage } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Avatar } from 'react-native-elements';
import Elevations from 'react-native-elevation';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function Prof({ route , navigation }){
    const [Alerting, setAlerting] = useState(false);
    const remov = async() => {
        try{
            AsyncStorage.removeItem('refresh');
            AsyncStorage.removeItem('access');
        }catch(error){   console.error(error); }
    }
    const { id, first_name, last_name, type } = route.params;
    useEffect(() => {
        // BackHandler.addEventListener("hardwareBackPress", function(){ return true;} );
        // return () => BackHandler.removeEventListener("hardwareBackPress", function(){ return true; } );
    }, [])
    return(
        <View style={{backgroundColor:'#fcecdd', flex: 1}}>
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
                <Text style={Styles.Title}>Professeur</Text>
            </View>
            <View style={Styles.elem}>
                <View style={{minHeight: '15%', maxHeight: '38%', marginVertical: "-2.5%", marginTop: '1.5%',}}>
                    <TouchableOpacity style={[Styles.elem1, {backgroundColor:'#F9F8F2'}]} onPress={ () => navigation.navigate('profile',{ screen: 'Mes infos' , params: {id: id}})}>
                        <View style={{justifyContent: 'flex-start', flexDirection: 'row'}}>
                        <Avatar size="medium" icon={{name: 'user', color:'#ff6701', type: 'font-awesome'}} containerStyle={{ marginTop: "-10%"}} />
                        <Text style={Styles.text} >Profile</Text>
                        </View>
                        <Feather style={ {color:'#ff6701'}} name="chevron-right" size={22} />
                    </TouchableOpacity>
                </View>
                <View style={{minHeight: '15%', maxHeight: '38%', marginVertical: "-2.5%", marginBottom: 3,}}>
                    <TouchableOpacity style={[Styles.elem1, {justifyContent: 'flex-start', backgroundColor:'#F9F8F2'}]} onPress={ () => setAlerting(true) } >
                        <Avatar
                            size="medium"
                            icon={{name: 'sign-out', color:'#ff6701', type: 'font-awesome'}}
                            containerStyle={{ marginTop: "-4%" }}
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
                        onCancelPressed={() => {
                            setAlerting(false);
                        }}
                        onConfirmPressed={() => {
                            setAlerting(false);
                            navigation.goBack();
                            remov();
                        }}
                    />
                </View>
            </View>
        </View>
        // </ImageBackground>
    );
}

const Styles = StyleSheet.create({
    elem: {
        borderRadius: 10,
        flex: 0.8,
        flexDirection: 'column',
        marginTop: "1%",
        textAlign: 'center',
        marginHorizontal: "3%",
        marginBottom: "4%",
        // paddingHorizontal: '0%',
        ...Elevations[6],
        backgroundColor: '#ffc288',
    },
    elem1: {
        borderRadius: 10,
        width: "86%",
        marginVertical: "5%",
        paddingVertical: "3.5%",
        paddingHorizontal: "4%",
        paddingLeft: "0.5%",
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        ...Elevations[10],
        backgroundColor: '#fcecdd',
        alignSelf: 'center'
    },
    // elem: {
    //     borderRadius: 10,
    //     flex: 1,
    //     flexDirection: 'column',
    //     marginTop: "1%",
    //     textAlign: 'center',
    //     marginHorizontal: "4%",
    //     marginBottom: "0%",
    //     // paddingHorizontal: '0%',
    //     ...Elevations[6],
    //     backgroundColor: '#ffc288',
    // },
    // elem1: {
    //     borderRadius: 10,
    //     width: 310,
    //     marginVertical: "3.9%",
    //     paddingVertical: "3.8%",
    //     paddingHorizontal: "4%",
    //     paddingLeft: "0.5%",
    //     flex: 1,
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     ...Elevations[10],
    //     backgroundColor: '#fcecdd',
    //     alignSelf: 'center'
    // },
    img: {
        backgroundColor: "#ffc288",
        marginTop: "8%",
        width: '70%',
        borderRadius: 10,
        paddingVertical: '4%',
        marginBottom: '6%',
        ...Elevations[10],
        alignSelf: 'center'
    },
    Title: {
        marginTop: "6%",
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 0,
        color: '#ff6701',
        fontFamily: 'Regular400'
    },
    text: {
        marginLeft: '-2%',
        fontSize: 18,
        color: '#ff6701',
    }
})