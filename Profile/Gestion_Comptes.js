import React, { useEffect, useState } from 'react';
import { SafeAreaView, Picker, ScrollView, RefreshControl, View, Text, StyleSheet, ImageBackground, FlatList, TouchableOpacity, TouchableWithoutFeedback, Keyboard, BackHandler, Modal, TextInput, StatusBar } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import { Avatar } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import * as yup from 'yup';
import Elevations from 'react-native-elevation';
import AwesomeAlert from 'react-native-awesome-alerts';
// import {Picker} from '@react-native-picker/picker';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function Gestion_Comptes( { navigation, route } ){
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
        functionOfFetching();
    }, []);
    const [panding, setpanding] = useState(true);
    const functionOfFetchingAdmin = () => {
        setTimeout(() => {
            fetch('https://massive-monkey-9.loca.lt/Users')
            .then((response) => response.json())
            .then((json) => setdataUser(json))
            .then( () => setpanding(false))
            .catch((error) => console.error(error));
        }, 500);
    }
    const functionOfFetchingCh_Labo = () => {
        setTimeout(() => {
            fetch('https://massive-monkey-9.loca.lt/Users?type=ch_Labo&type=ch_Eq&type=prof')
            .then((response) => response.json())
            .then((json) => setdataUser(json))
            .then( () => setpanding(false))
            .catch((error) => console.error(error));
        }, 500);
    }
    const functionOfFetchingCh_Equipe = () => {
        setTimeout(() => {
            fetch('https://massive-monkey-9.loca.lt/Users?type=ch_Eq&type=prof')
            .then((response) => response.json())
            .then((json) => setdataUser(json))
            .then( () => setpanding(false))
            .catch((error) => console.error(error));
        }, 500);
    }
    const functionOfFetching = () => {
        if( route.params.type == 'admin' )  functionOfFetchingAdmin();
        else if( route.params.type == 'ch_Labo' )  functionOfFetchingCh_Labo();
        else functionOfFetchingCh_Equipe();
    }
    const [ShowOrHide1, setShowOrHide1] = useState(true);
    const [ShowOrHide2, setShowOrHide2] = useState(true);
    const [passP, setpassP] = useState('');
    const [confP, setconfP] = useState('');
    const [Email, setEmail] = useState('');
    const [name, setname] = useState('');
    const [prenom, setprenom] = useState('');
    const [phone, setphone] = useState('');
    const [visMod, setvisMod] = useState(false);
    const [checked, setChecked] = useState('prof');
    const [dataUser, setdataUser] = useState([]);
    const [Alerting, setAlerting] = useState(false);
    const [AlertingSucc, setAlertingSucc] = useState(false);
    const [AlertingDelete, setAlertingDelete] = useState(false);
    const [idOfDel, setidOfDel] = useState('');
    useEffect(() => {
        functionOfFetching();
    }, [])
    const IsCorrect = yup.object({
        Name: yup.string().required("Please enter a name").min(4).test( (value) => { setname(value); return true; }),
        prenom: yup.string().required("Please enter a prenom").min(4).test( (value) => { setprenom(value); return true; }),
        Email: yup.string().required("Please enter an Email").email().test( (value) => { setEmail(value); return true; }),
        phone: yup.number().required("Please enter phone number").min(8).test( (value) => { setphone(value); return true; }),
        Password: yup.string().required("Please enter a password").min(8).test( (value) => { setpassP(value); return true; }),
        ConfirmPassword: yup.string().required("Please enter the same password").min(8).test('Confirm your password', 'Not the same', (value) => { setconfP(value); return passP==confP; }),
    })
    const deleteUser = (item) => {
        fetch('https://massive-monkey-9.loca.lt/Users/'+item ,{
          method: 'DELETE'
        })
        .then(response => response.json())
        .then( () => console.log('Done'));
    }
    const AddCompte = ( Compte ) => {
        // const Compte = { "id":id, "email":Email, "nom":name, "prenom":prenom, "password":passP, "image":1, "type":checked};
        console.log('Begin of Add Added');
        fetch('https://massive-monkey-9.loca.lt/Users',{
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Compte)
        }).then( () => {
            console.log('New Compte Added');
        })
    }
    const v = 'https://miro.medium.com/max/2400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg' ;
    return (
        <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
        <ImageBackground source={ require('../3132.jpg') } style={Styles.imag} >
            {/* <View style={{ marginTop: 10, marginLeft: 0, marginBottom: 0, paddingBottom: 0, width: '100%', flex: 1, backgroundColor: 'green'}} > */}
            {/* <View style={{ marginTop: 8, marginLeft: 9, marginBottom: "-30%", paddingBottom: 10, flex: 1, width: '100%', backgroundColor: 'green'}} > */}
            <View style={{ marginTop: 8, marginLeft: 9, marginBottom: "-100%", paddingBottom: 10, flex: 1, width: '100%'}} >
                <Feather name='arrow-left' color="red" size={35} onPress={ () => navigation.goBack()} />
            </View>
            <View style={{flexDirection: 'row', maxHeight: 60, justifyContent: 'space-around', marginBottom: '0%', marginTop: '-35%', paddingVertical: 10, flex: 1}}>
                <View style={{marginLeft: "-14%"}}><Text style={{fontSize: 23, color: '#ff6701', fontWeight: "bold", textShadowColor: "grey", textShadowRadius: 8 }}>Comptes</Text></View>
                <Avatar 
                    rounded backgroundColor="grey" size="small" 
                    icon={{name: 'add', color: "#ff6701", type: 'Ionicons', size: 40 }} 
                    containerStyle={{ marginRight: "-14%"}} onPress={ () => setvisMod(!visMod)} >
                </Avatar>
            </View>
            <View style={{ flex:1, marginBottom: 20,}}>
                <KeyboardAwareScrollView refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }>
                    <Modal style={{backgroundColor: 'aqua'}} visible={visMod} >
                        <Formik 
                            initialValues={{ Name: '', prenom: '', Email: '', phone: '', Password: '', ConfirmPassword: '' }}
                            validationSchema={IsCorrect}
                            onSubmit={(values, actions) => {
                                // AddCompte({ "id":id, "email":Email, "nom":name, "prenom":prenom, "password":passP, "image":1, "type":checked});
                                AddCompte({ Email, name, prenom, phone, passP, v, checked});
                                setAlerting(true);      setvisMod(!visMod);
                                actions.resetForm();        setShowOrHide1(true);
                                setShowOrHide2(true);       functionOfFetching();
                            }}
                        >
                            { props =>
                                <KeyboardAwareScrollView centerContent={true} contentContainerStyle={Styles.body}>      
                                    <Text style={Styles.text}>Name : </Text>
                                    <TextInput
                                        style={Styles.input}
                                        placeholder="Name"      onChangeText={props.handleChange('Name')}
                                        value={props.values.Name}       onBlur={ props.handleBlur('Name')}
                                    />
                                    <View style={Styles.Errors}>
                                        <Text style={Styles.errors}>{ props.touched.Name && props.errors.Name }</Text>
                                    </View>
                                    <Text style={Styles.text}>Prenom : </Text>
                                    <TextInput
                                        style={Styles.input}
                                        placeholder="prenom"       onChangeText={props.handleChange('prenom')}
                                        value={props.values.prenom}        onBlur={ props.handleBlur('prenom')}
                                    />
                                    <View style={Styles.Errors}>
                                        <Text style={Styles.errors}>{ props.touched.prenom && props.errors.prenom }</Text>
                                    </View>
                                    <Text style={Styles.text}>Email : </Text>
                                    <TextInput
                                        keyboardType='email-address'
                                        style={Styles.input}
                                        placeholder="Email"     onChangeText={props.handleChange('Email')}
                                        value={props.values.Email}      onBlur={ props.handleBlur('Email')}
                                    />
                                    <View style={Styles.Errors}>
                                        <Text style={Styles.errors}>{ props.touched.Email && props.errors.Email }</Text>
                                    </View>
                                    <Text style={Styles.text}>Phone : </Text>
                                    <TextInput
                                        keyboardType='numeric'
                                        style={Styles.input}
                                        placeholder="phone"        onChangeText={props.handleChange('phone')}
                                        value={props.values.phone} onBlur={ props.handleBlur('phone')}
                                    />
                                    <View style={Styles.Errors}>
                                        <Text style={Styles.errors}>{ props.touched.phone && props.errors.phone }</Text>
                                    </View>
                                    <Text style={Styles.text}>Password : </Text>
                                    <View style={{flexDirection: 'row', borderWidth: 1,marginBottom: 6, maxHeight: 60, minHeight: 40, borderColor: 'coral', borderRadius: 7, paddingHorizontal: '5%', justifyContent: 'space-between'}}>
                                        <TextInput
                                            label="Password"        secureTextEntry={ShowOrHide1}
                                            placeholder="Password"      onChangeText={props.handleChange('Password')}
                                            value={props.values.Password}       onBlur={ props.handleBlur('Password')}
                                        />
                                        <TouchableOpacity onPress={()=>setShowOrHide1(!ShowOrHide1)}>
                                            {ShowOrHide1? 
                                                <Feather style={{paddingTop: '2%'}} name="eye-off" color={'#ff6701'} size={20} />
                                                :
                                                <Feather style={{paddingTop: '2%'}} name="eye" color={'#ff6701'} size={20} />
                                            }
                                        </TouchableOpacity>
                                    </View>
                                    <View style={Styles.Errors}>
                                        <Text style={Styles.errors}>{ props.touched.Password && props.errors.Password }</Text>
                                    </View>
                                    <Text style={Styles.text}>Confirm password : </Text>
                                    <View style={{flexDirection: 'row', borderWidth: 1,marginBottom: 6, maxHeight: 60, minHeight: 40, borderColor: 'coral', borderRadius: 7, paddingHorizontal: '5%', justifyContent: 'space-between'}}>
                                        <TextInput
                                            label="Password"        secureTextEntry={ShowOrHide2}
                                            placeholder="Confirm password"      onChangeText={props.handleChange('ConfirmPassword')}
                                            value={props.values.ConfirmPassword}        onBlur={ props.handleBlur('ConfirmPassword')}
                                        />
                                        <TouchableOpacity onPress={()=>setShowOrHide2(!ShowOrHide2)}>
                                            {ShowOrHide2? 
                                                <Feather style={{paddingTop: '2%'}} name="eye-off" color={'#ff6701'} size={20} />
                                                :
                                                <Feather style={{paddingTop: '2%'}} name="eye" color={'#ff6701'} size={20} />
                                            }
                                        </TouchableOpacity>
                                    </View>
                                    <View style={Styles.Errors}>
                                        <Text style={Styles.errors}>{ props.touched.ConfirmPassword && props.errors.ConfirmPassword }</Text>
                                    </View>
                                    {/* <View style={{ flexDirection: 'row', marginTop: '3%', justifyContent: 'flex-start'}}>
                                        <Text style={{marginTop: 8, marginLeft: '7%', marginRight: '18.5%'}}>Admin</Text>
                                        <RadioButton value="admin" status={ checked === 'admin' ? 'checked' : 'unchecked' } onPress={() => setChecked('admin')} />
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: '3%', justifyContent: 'flex-start'}}>
                                        <Text style={{marginTop: 8, marginHorizontal: '7%'}}>Chef de labo</Text>
                                        <RadioButton value="ch_Labo" status={ checked === 'ch_Labo' ? 'checked' : 'unchecked' } onPress={() => setChecked('ch_Labo')} />
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: '3%', justifyContent: 'flex-start'}}>
                                        <Text style={{marginTop: 8, marginLeft: '7%', marginRight: '5%'}}>Chef d'equipe</Text>
                                        <RadioButton value="ch_Eq" status={ checked === 'ch_Eq' ? 'checked' : 'unchecked' } onPress={() => setChecked('ch_Eq')} />
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: '3%', justifyContent: 'flex-start'}}>
                                        <Text style={{marginTop: 8, marginLeft: '7%', marginRight: '23%'}}>Prof</Text>
                                        <RadioButton value="prof" status={ checked === 'prof' ? 'checked' : 'unchecked' } onPress={() => setChecked('prof')} />
                                    </View> */}
                                    <Picker
                                        selectedValue={checked}
                                        onValueChange={(itemValue, itemIndex) => setChecked(itemValue) }
                                    >
                                        <Picker.Item label="Prof" value="prof" />
                                        <Picker.Item label="Admin" value="admin" />
                                        <Picker.Item label="Chef d'equipe" value="ch_Eq" />
                                        <Picker.Item label="Chef de labo" value="ch_Labo" />
                                    </Picker>
                                    <Text style={{fontSize: 20, alignSelf: 'center', color: 'red'}}>{checked}</Text>
                                    {/* <RNPickerSelect
                                        placeholder={{ label: "Choisir le type d'utilisateur..", value: null }}
                                        style={{height: 100}}
                                        onValueChange={(value) => console.log(value)}
                                        items={[
                                            { label: 'Prof', value: 'prof' },
                                            { label: 'Admin', value: 'Admin' },
                                            { label: "Chef d'equipe", value: 'ch_Eq' },
                                            { label: "Chef de labo", value: 'ch_Labo' }
                                        ]}
                                    /> */}
                                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                                        <TouchableOpacity onPress={ () => props.handleSubmit()}>
                                            <View style={{backgroundColor: 'grey', borderRadius: 10, justifyContent: 'center', padding: "9%", width: '100%', marginTop: '25%',}} >
                                                <Text style={{fontSize: 18, color: 'red', fontWeight: 'bold', textAlign: 'center'}}>Create</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={ () => setvisMod(!visMod)} >
                                            <View style={{backgroundColor: 'grey', borderRadius: 10, justifyContent: 'center', padding: "9%", width: '100%', marginTop: '25%',}} >
                                                <Text style={{fontSize: 18, color: 'red', fontWeight: 'bold', textAlign: 'center'}}>Cancel</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </KeyboardAwareScrollView>
                            }
                        </Formik>
                    </Modal>
                    {panding && <AwesomeAlert show={panding} showProgress={true} progressColor="#DD6B55" progressSize={40} closeOnTouchOutside={false} closeOnHardwareBackPress={false}/>}
                    <ScrollView style={Styles.search}>
                        { dataUser.map( (item) => 
                            <Animatable.View delay= {300} animation="fadeInDown" key={item.id}>
                                <TouchableOpacity onPress={ () => navigation.navigate("User", item) } >
                                    <View style={Styles.card}>
                                        <Text style={Styles.title}>{ item.nom +" "+ item.prenom }</Text>
                                        <Avatar
                                            rounded     backgroundColor="grey"  size="small"
                                            icon={{name: 'trash-alt', color: "#ff6701", type: 'font-awesome-5', size: 26 }}
                                            onPress={ () => {setAlertingDelete(true); setidOfDel(item.id) }}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </Animatable.View>
                        )}
                        <AwesomeAlert
                            show={Alerting}                                 title="Adding"
                            message="Added Succesfuly"                      closeOnTouchOutside={false}
                            closeOnHardwareBackPress={false}                showConfirmButton={true}
                            confirmText="Great"                             confirmButtonColor="#DD6B55"
                            onConfirmPressed={() => setAlerting(false) }
                        />
                        <AwesomeAlert
                            show={AlertingSucc}                             title="Deleting"
                            message="Delete Succesfuly"                     closeOnTouchOutside={false}
                            closeOnHardwareBackPress={false}                showConfirmButton={true}
                            confirmText="Greate"                            confirmButtonColor="#DD6B55"
                            onConfirmPressed={() => setAlertingSucc(false) }
                        />
                        <AwesomeAlert
                            show={AlertingDelete}                                       title="Deleting"
                            message="Are you sure you want to delete this account ?"    closeOnTouchOutside={false}
                            closeOnHardwareBackPress={false}                            showCancelButton={true}
                            showConfirmButton={true}                                    cancelText="No"
                            confirmText="Oui"                                           confirmButtonColor="#DD6B55"
                            onCancelPressed={() => setAlertingDelete(false) }
                            onConfirmPressed={() => {
                                setAlertingDelete(false);   setAlertingSucc(true);
                                deleteUser(idOfDel);    functionOfFetching();
                            }}
                        />
                    </ScrollView>
                </KeyboardAwareScrollView>
            </View>
        </ImageBackground>
        </TouchableWithoutFeedback>
    );
}

const Styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        maxHeight: 50,
        borderRadius: 7,
        padding: 10,
        flex: 1,
        justifyContent: 'space-between',
        marginVertical: 3,
        flexDirection: 'row',
        ...Elevations[3],
    },
    title: {
        fontSize: 19,
        color: 'coral',
    },
    search: {
        backgroundColor: '#ff6701',
        flex: 1,
        width: "88%",
        borderRadius: 10,
        marginHorizontal: "6%",
        paddingHorizontal: 5,
        // marginVertical: 3,
        flexDirection: 'column',
    },
    imag: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    body: {
        width: '96%',
        height: 950,
        flexDirection: 'column',
        margin: "2%",
        padding: 10,
    },
    text: {
        fontSize: 17,
        paddingLeft: '3%',
        paddingVertical: "2%",
        color: 'black',
    },
    input: {
        borderWidth: 1,
        paddingHorizontal: '5%',
        borderColor: 'coral',
        borderRadius: 7,
        maxHeight: 60,
        minHeight: 40,
        marginBottom: 4,
    },
    Errors: {
        alignItems: 'flex-end',
        paddingVertical: 3,
        paddingRight: 4,
    },
    errors: {
        fontSize: 13,
        color: '#ff6701',
    }
})