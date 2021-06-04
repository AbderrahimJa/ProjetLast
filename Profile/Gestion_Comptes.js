import React, { useEffect, useState } from 'react';
import { Picker, ScrollView, RefreshControl, View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, BackHandler, Modal, TextInput, StatusBar } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import { Avatar } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import * as yup from 'yup';
import Elevations from 'react-native-elevation';
import AwesomeAlert from 'react-native-awesome-alerts';
import Swipeout from 'react-native-swipeout';
// import {Picker} from '@react-native-picker/picker';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function Gestion_Comptes( { navigation, route } ){
    const d = new Date().toLocaleDateString();
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(() => { setRefreshing(true);    wait(2000).then(() => setRefreshing(false));    functionOfFetching(); } , []);
    const [panding, setpanding] = useState(true);
    const functionOfFetchingAdmin = () => {
            fetch('http://34.77.153.247:8000/api/Users/')
            .then((response) => response.json())
            .then((json) => setdataUser(json))
            .then( () => setpanding(false))
            .catch((error) => console.error(error));
    }
    const functionOfFetchingCh_Labo = () => {
        // fetch('http://34.77.153.247:8000/api/Users/')
        fetch('http://34.77.153.247:8000/api/Lab-Users/'+route.params.id)
        .then((response) => response.json())
        .then( (json) => {
            console.log( json.teams.length);
            console.log( json.teams);
            for (let i = 0; i < json.teams.length; i++) {
                const element = json.teams[i];
                for (let j = 0; j < element.accounts.length; j++) {
                    const elements = element.accounts[j];
                    setdataUser( (prev) => [elements, ...prev]);
                }
            }
            setpanding(false);
        })
        .then( () => setTimeout(() => { setpanding(false) }, 1000))
        // .then((json) => setdataUser(json.teams))
        // .then( () => setpanding(false))
        .catch((error) => console.error(error));
    }
    const functionOfFetchingCh_Equipe = () => {
            fetch('http://34.77.153.247:8000/api/Team-Users/'+route.params.team)
            .then((response) => response.json())
            .then((json) => setdataUser(json.accounts))
            .then( () => setpanding(false))
            .catch((error) => console.error(error));
    }
    const [isTeamNull, setisTeamNull] = useState(true);
    const functionOfFetching = () => {
        if( route.params.type == 'ADMIN' )  functionOfFetchingAdmin();
        else if( route.params.type == 'C_LAB' )  functionOfFetchingCh_Labo();
        else { functionOfFetchingCh_Equipe(); setisTeamNull(false) }
    }
    const [ShowOrHide1, setShowOrHide1] = useState(true);       const [ShowOrHide2, setShowOrHide2] = useState(true);
    const [passP, setpassP] = useState('');                     const [confP, setconfP] = useState('');
    const [Email, setEmail] = useState('');                     const [name, setname] = useState('');
    const [prenom, setprenom] = useState('');                   const [phone, setphone] = useState('');
    const [visMod, setvisMod] = useState(false);                const [checked, setChecked] = useState('PROF');
    const [dataUser, setdataUser] = useState([]);               const [Alerting, setAlerting] = useState(false);
    const [AlertingSucc, setAlertingSucc] = useState(false);    const [AlertingDelete, setAlertingDelete] = useState(false);
    const [idOfDel, setidOfDel] = useState('');                 const [Username, setUsername] = useState('');
    useEffect(() => { 
        // BackHandler.addEventListener("hardwareBackPress", function(){navigation.popToTop();} );
        console.log( route.params.id);
        functionOfFetching(); 
        // return () => BackHandler.removeEventListener("hardwareBackPress", function(){navigation.popToTop();} );
    }, [])
    const IsCorrect = yup.object({
        Name: yup.string().required("Please enter a name").min(2).test( (value) => { setname(value); return true; }),
        Username: yup.string().required("Please enter a username").min(2).test( (value) => { setUsername(value); return true; }),
        prenom: yup.string().required("Please enter a prenom").min(2).test( (value) => { setprenom(value); return true; }),
        Email: yup.string().email().test( (value) => { setEmail(value); return true; }),
        phone: yup.number().min(8).test( (value) => { setphone(value); return true; }),
        Password: yup.string().required("Please enter a password").test( (value) => { setpassP(value); return true; }),
        ConfirmPassword: yup.string().required("Please enter the same password").test('Confirm your password', 'Not the same', (value) => { setconfP(value); return passP==confP; }),
    })
    const deleteUser = (item) => {
        fetch('http://34.77.153.247:8000/api/Users/'+item ,{ method: 'DELETE' } )
        .then(response => response.json())
        .then( () => functionOfFetching());
    }
    const AddCompte = ( Compte ) => {
        console.log('Begin of Add Added');
        fetch('http://34.77.153.247:8000/api/Users/',{
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Compte)
        }).then( () => functionOfFetching() )
    }
    return (
        <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
        <View style={Styles.all}>
            <View style={{ marginTop: 8, marginLeft: 9, marginBottom: "-100%", paddingBottom: 10, flex: 1, width: '100%'}} >
                <Feather name='arrow-left' color="red" size={35} onPress={ () => navigation.goBack()} />
            </View>
            { !panding && 
            <View style={{flexDirection: 'row', maxHeight: 60, justifyContent: 'space-around', marginBottom: '0%', marginTop: '-35%', paddingVertical: 10, flex: 1}}>
                <View style={{marginLeft: "-14%"}}><Text style={{fontSize: 23, color: '#ff6701', fontWeight: "bold", textShadowColor: "grey", textShadowRadius: 8 }}>Comptes</Text></View>
                <Avatar 
                    rounded backgroundColor="grey" size="small" 
                    icon={{name: 'add', color: "#ff6701", type: 'Ionicons', size: 40 }} 
                    containerStyle={{ marginRight: "-14%"}} onPress={ () => setvisMod(!visMod)} >
                </Avatar>
            </View>}
            { !panding && 
            <View style={{ flex:1, marginBottom: 20,}}>
                <KeyboardAwareScrollView refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }>
                    <Modal visible={visMod} >
                        <Formik 
                            initialValues={{ Username: '', Name: '', prenom: '', Email: '', phone: '', Password: '', ConfirmPassword: '' }}
                            validationSchema={IsCorrect}
                            onSubmit={(values, actions) => {
                                if( isTeamNull )
                                    AddCompte({ "username": Username, "email":Email, "first_name":name, "last_name":prenom, "password":passP, "type":checked, 'phone': phone, 'team':null});
                                else
                                    AddCompte({ "username": Username, "email":Email, "first_name":name, "last_name":prenom, "password":passP, "type":checked, 'phone': phone, 'team':route.params.team});
                                setAlerting(true);      setvisMod(!visMod);
                                actions.resetForm();        setShowOrHide1(true);
                                setShowOrHide2(true);       functionOfFetching();
                            }}
                        >
                            { props =>
                                <View style={Styles.modl}>
                                <KeyboardAwareScrollView centerContent={true} contentContainerStyle={Styles.body}>      
                                    <Text style={Styles.text}>Username : </Text>
                                    <TextInput
                                        style={Styles.input}
                                        placeholder="Username"      onChangeText={props.handleChange('Username')}
                                        value={props.values.Username}       onBlur={ props.handleBlur('Username')}
                                    />
                                    <View style={Styles.Errors}><Text style={Styles.errors}>{ props.touched.Username && props.errors.Username }</Text></View>
                                    <Text style={Styles.text}>Nom : </Text>
                                    <TextInput
                                        style={Styles.input}
                                        placeholder="Nom"      onChangeText={props.handleChange('Name')}
                                        value={props.values.Name}       onBlur={ props.handleBlur('Name')}
                                    />
                                    <View style={Styles.Errors}><Text style={Styles.errors}>{ props.touched.Name && props.errors.Name }</Text></View>
                                    <Text style={Styles.text}>Prenom : </Text>
                                    <TextInput
                                        style={Styles.input}
                                        placeholder="Prenom"       onChangeText={props.handleChange('prenom')}
                                        value={props.values.prenom}        onBlur={ props.handleBlur('prenom')}
                                    />
                                    <View style={Styles.Errors}><Text style={Styles.errors}>{ props.touched.prenom && props.errors.prenom }</Text></View>
                                    <Text style={Styles.text}>Email : </Text>
                                    <TextInput
                                        keyboardType='email-address'
                                        style={Styles.input}
                                        placeholder="Email"     onChangeText={props.handleChange('Email')}
                                        value={props.values.Email}      onBlur={ props.handleBlur('Email')}
                                    />
                                    <View style={Styles.Errors}><Text style={Styles.errors}>{ props.touched.Email && props.errors.Email }</Text></View>
                                    <Text style={Styles.text}>Telephone : </Text>
                                    <TextInput
                                        keyboardType='numeric'
                                        style={Styles.input}
                                        placeholder="Telephone"        onChangeText={props.handleChange('phone')}
                                        value={props.values.phone} onBlur={ props.handleBlur('phone')}
                                    />
                                    <View style={Styles.Errors}><Text style={Styles.errors}>{ props.touched.phone && props.errors.phone }</Text></View>
                                    <Text style={Styles.text}>Mot de passe : </Text>
                                    <View style={{flexDirection: 'row', borderWidth: 1,marginBottom: 6, maxHeight: 60, minHeight: 48, borderColor: 'coral', borderRadius: 7, paddingHorizontal: '5%', justifyContent: 'space-between', backgroundColor: '#fcecdd'}}>
                                        <TextInput
                                            label="Password"        secureTextEntry={ShowOrHide1}
                                            placeholder="Mot de passe"      onChangeText={props.handleChange('Password')}
                                            value={props.values.Password}       onBlur={ props.handleBlur('Password')}
                                        />
                                        <TouchableOpacity onPress={()=>setShowOrHide1(!ShowOrHide1)}>
                                            {ShowOrHide1? 
                                                <Feather style={{paddingTop: '4%'}} name="eye-off" color={'#ff6701'} size={20} />
                                                :
                                                <Feather style={{paddingTop: '4%'}} name="eye" color={'#ff6701'} size={20} />
                                            }
                                        </TouchableOpacity>
                                    </View>
                                    <View style={Styles.Errors}><Text style={Styles.errors}>{ props.touched.Password && props.errors.Password }</Text></View>
                                    <Text style={Styles.text}>Confirmer le mot de passe : </Text>
                                    <View style={{flexDirection: 'row', borderWidth: 1,marginBottom: 6, maxHeight: 60, minHeight: 48, borderColor: 'coral', borderRadius: 7, paddingHorizontal: '5%', justifyContent: 'space-between', backgroundColor: '#fcecdd'}}>
                                        <TextInput
                                            label="Password"        secureTextEntry={ShowOrHide2}
                                            placeholder="Confirmer le mot de passe"      onChangeText={props.handleChange('ConfirmPassword')}
                                            value={props.values.ConfirmPassword}        onBlur={ props.handleBlur('ConfirmPassword')}
                                        />
                                        <TouchableOpacity onPress={()=>setShowOrHide2(!ShowOrHide2)}>
                                            {ShowOrHide2? 
                                                <Feather style={{paddingTop: '4%'}} name="eye-off" color={'#ff6701'} size={20} />
                                                :
                                                <Feather style={{paddingTop: '4%'}} name="eye" color={'#ff6701'} size={20} />
                                            }
                                        </TouchableOpacity>
                                    </View>
                                    <View style={Styles.Errors}><Text style={Styles.errors}>{ props.touched.ConfirmPassword && props.errors.ConfirmPassword }</Text></View>
                                    {/* <View style={{borderColor: 'red', borderWidth: 1, width: '60%', alignSelf: 'center', borderRadius: 10, backgroundColor: '#fea82f'}}>
                                        <Picker
                                            selectedValue={checked}
                                            onValueChange={(itemValue, itemIndex) => setChecked(itemValue) }
                                            style={{width: '60%', alignSelf: 'center', color: 'black' }}
                                        >
                                            <Picker.Item label="Prof" value="PROF" />
                                            <Picker.Item label="Admin" value="ADMIN" /> 
                                            <Picker.Item label="Chef d'equipe" value="C_EQ" /> 
                                            <Picker.Item label="Chef de labo" value="C_LAB" /> 
                                        </Picker>
                                    </View> */}
                                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                                        <TouchableOpacity onPress={ () => props.handleSubmit()}>
                                            <View style={{backgroundColor: '#ff6701', borderRadius: 10, justifyContent: 'center', padding: "9%", width: '100%', marginTop: '25%',}} >
                                                <Text style={{fontSize: 18, color: '#fcecdd', fontWeight: 'bold', textAlign: 'center'}}>Create</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={ () => setvisMod(!visMod)} >
                                            <View style={{backgroundColor: '#ff6701', borderRadius: 10, justifyContent: 'center', padding: "9%", width: '100%', marginTop: '25%',}} >
                                                <Text style={{fontSize: 18, color: '#fcecdd', fontWeight: 'bold', textAlign: 'center'}}>Cancel</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </KeyboardAwareScrollView>
                                </View>
                            }
                        </Formik>
                    </Modal>
                    <ScrollView style={Styles.search}>
                        { dataUser.map( (item) => 
                            <Animatable.View delay= {300} animation="fadeInDown" key={item.id}>
                                <Swipeout 
                                    right={[
                                        {
                                            backgroundColor: 'transparent',
                                            onPress: () => { setAlertingDelete(true); setidOfDel(item.id) },
                                            color: '#ff6701',
                                            component: (
                                                <Feather
                                                    size={33}
                                                    name='trash-2'
                                                    color='#ff6701'
                                                    style={{alignSelf: 'center', marginTop: '30%'}}
                                                />
                                            )
                                        }
                                    ]}
                                    left={[
                                        {
                                            backgroundColor: 'transparent',
                                            onPress: () => navigation.navigate('profile',{ screen: 'Mes infos' , params: {id: item.id}}) ,
                                            // onPress: () => { 
                                                // navigation.navigate('profile',{id: item.id}); 
                                                // console.log(item.id) },
                                            color: '#ff6701',
                                            component: (
                                                <Feather
                                                    size={33}
                                                    name='edit-2'
                                                    color='#ff6701'
                                                    style={{alignSelf: 'center', marginTop: '30%'}}
                                                />
                                            )
                                        }
                                    ]}
                                    backgroundColor={"transparent"} close autoClose
                                >
                                <TouchableOpacity onPress={ () => navigation.navigate("User", item) } >
                                    <View style={Styles.card}>
                                        <Avatar
                                            rounded
                                            size="medium"
                                            source= { require('../profile1.png') }
                                            // source= {{uri:item.image}}
                                        >
                                        </Avatar>
                                        <View style={{marginLeft: '3%', alignSelf: 'center'}}><Text style={Styles.title}>{ item.first_name+' '+item.last_name }</Text></View>
                                    </View>
                                </TouchableOpacity>
                                </Swipeout>
                            </Animatable.View>
                        )}
                        <AwesomeAlert
                            show={Alerting}                                 title="Adding"
                            message="Added Succesfuly"                      closeOnTouchOutside={true}
                            closeOnHardwareBackPress={true}                showConfirmButton={true}
                            confirmText="Great"                             confirmButtonColor="#DD6B55"
                            onConfirmPressed={() => setAlerting(false) }
                            contentContainerStyle={{backgroundColor: '#fcecdd'}}
                            titleStyle={{ fontFamily: 'Regular404'}}        messageStyle={{ fontFamily: 'Regular403' }}
                        />
                        <AwesomeAlert
                            show={AlertingSucc}                             title="Deleting"
                            message="Delete Succesfuly"                     closeOnTouchOutside={true}
                            closeOnHardwareBackPress={true}                showConfirmButton={true}
                            confirmText="Greate"                            confirmButtonColor="#DD6B55"
                            onConfirmPressed={() => setAlertingSucc(false) }
                            contentContainerStyle={{backgroundColor: '#fcecdd'}}
                            titleStyle={{ fontFamily: 'Regular404'}}        messageStyle={{ fontFamily: 'Regular403' }}
                        />
                        <AwesomeAlert
                            show={AlertingDelete}                                       title="Deleting"
                            message="Are you sure you want to delete this account ?"    closeOnTouchOutside={false}
                            closeOnHardwareBackPress={false}                            showCancelButton={true}
                            showConfirmButton={true}                                    cancelText="No"
                            confirmText="Oui"                                           confirmButtonColor="#DD6B55"
                            onCancelPressed={() => setAlertingDelete(false) }
                            contentContainerStyle={{backgroundColor: '#fcecdd'}}
                            titleStyle={{ fontFamily: 'Regular404'}}        messageStyle={{ fontFamily: 'Regular403' }}
                            onConfirmPressed={() => {
                                setAlertingDelete(false);   setAlertingSucc(true);
                                deleteUser(idOfDel);    functionOfFetching();
                            }}
                        />
                    </ScrollView>
                </KeyboardAwareScrollView>
            </View>
            }
            {panding && <AwesomeAlert show={panding} showProgress={true} progressColor="#DD6B55" progressSize={40} closeOnTouchOutside={false} closeOnHardwareBackPress={false}/>}
        </View>
        </TouchableWithoutFeedback>
    );
}

const Styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffefcf',
        marginVertical: 5,
        minHeight: 50,
        borderRadius: 7,
        padding: '3%',
        flex: 1,
        marginHorizontal: '2%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        ...Elevations[5],
    },
    title: {
        fontSize: 19,
        color: 'coral',
        fontFamily: 'Regular403', 
        textAlign: 'center' 
    },
    search: {
        // backgroundColor: '#ffc288',
        flex: 1,
        width: "88%",
        borderRadius: 10,
        marginHorizontal: "6%",
        paddingHorizontal: 5,
        // marginVertical: 3,
        flexDirection: 'column',
    },
    all: {
        flex: 1,
        backgroundColor: '#fcecdd'
    },
    body: {
        width: '96%',
        maxHeight: 1050,
        flexDirection: 'column',
        margin: "2%",
        padding: '4%',
        paddingVertical: '8%',
    },
    text: {
        fontSize: 18,
        fontFamily: 'Regular403',
        paddingLeft: '3%',
        paddingVertical: "1%",
        color: 'black',
    },
    input: {
        borderWidth: 1,
        paddingHorizontal: '5%',
        borderColor: 'coral',
        borderRadius: 7,
        maxHeight: 60,
        minHeight: 48,
        marginBottom: 4,
        backgroundColor: '#fcecdd'
    },
    Errors: {
        alignItems: 'flex-end',
        paddingVertical: 3,
        paddingRight: 4,
    },
    errors: {
        fontSize: 13,
        color: '#ff6701',
    },
    modl: {
        // flex: 1,
        backgroundColor: '#ffc288',
    }
})