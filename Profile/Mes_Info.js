import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Alert, View, Dimensions, BackHandler, Text, StyleSheet, RefreshControl } from 'react-native';
import { Avatar, Button, Divider } from 'react-native-elements';
import { TextInput } from 'react-native-paper';
// import Feather from 'react-native-vector-icons/Feather';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import AwesomeAlert from 'react-native-awesome-alerts';
import * as Animatable from 'react-native-animatable';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modalbox';
// import * as Permissions from 'expo-permissions';
import { Image } from 'react-native';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const screen=Dimensions.get('window');

export default function Mes_Info({ route, navigation}){
    const [imageFromDevice, setimageFromDevice] = useState('');
    const IsCorrectFullName = yup.object({
        nom: yup.string().required("Saisir nouvelle nom").min(4).test( (value) => { 'Saisir nouvelle nom', "C'est le meme", setnom(value); return nom!=dataUser.first_name ; }),
        prenom: yup.string().required("Saisir nouvelle prenom").min(4).test( (value) => { 'Saisir nouvelle prenom', "C'est le meme", setprenom(value); return prenom!=dataUser.last_name ; }),
    });
    const IsCorrectUsername = yup.object({
        username: yup.string().required("Saisir nouvelle username").min(4).test( (value) => { 'Saisir nouvelle username', "C'est le meme", setusername(value); return username!=dataUser.username ; }),
    });
    const IsCorrectEmail = yup.object({
        email: yup.string().required("Saisir nouvelle email").email().test( 'Saisir nouvelle email', "C'est le meme", (value) => { setemail(value); return email!=dataUser.email ; }),
    });
    const IsCorrectPhone = yup.object({
        phone: yup.number().required("Saisir nouvelle numero de telephone").min(8).test( (value) => { 'Saisir nouvelle mumero de telephone' , "C'est le meme", setphone(value); return phone!=dataUser.phone ; }),
    });
    const IsCorrectPassword = yup.object({
        newPassword: yup.string().min(8).test( 'Saisir nouvelle mot de passe', "C'est le meme", (value) => { setnewPassword(value); return true; }),
        ConfirmPassword: newPassword!="" ? yup.string().required("Saisir le meme mot de passe").min(8).test('Confirmer votre mot de passe', "C'est pas le meme", (value) => { setConfirmPassword(value); return newPassword==ConfirmPassword; }) : yup.string().test( (value) => { setConfirmPassword(value); newPassword==ConfirmPassword; }),
    });
    const [newPassword, setnewPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [dataUser, setdataUser] = useState({});
    const [changeFullName, setchangeFullName] = useState(false);
    const [changeEmail, setchangeEmail] = useState(false);
    const [changeUsername, setchangeUsername] = useState(false);
    const [changePhone, setchangePhone] = useState(false);
    const [nom, setnom] = useState('');
    const [username, setusername] = useState('');
    const [prenom, setprenom] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [changePassword, setchangePassword] = useState(false);
    const [ShowOrHide2, setShowOrHide2] = useState(true);
    const [ShowOrHide3, setShowOrHide3] = useState(true);
    const [idOfPerson, setidOfPerson] = useState(route.params.id);
    const [panding, setpanding] = useState(true);
    const [affiche, setaffiche] = useState(false);
    const [Alerting, setAlerting] = useState(false);
    const onRefresh = React.useCallback(() => { setRefreshing(true); wait(2000).then(() => setRefreshing(false)); functionOfFetching(); }, []);
    const EditCompte = ( Compte ) => {
        console.log('Begin of Edit');
        fetch('http://34.77.153.247:8000/api/Users/'+idOfPerson , {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Compte)
        }).then( () => functionOfFetching() )
    }
    const functionOfFetching = () => {
        fetch('http://34.77.153.247:8000/api/Users/'+idOfPerson)
        .then((response) => response.json())
        .then((json) => setdataUser(json))
        .then( () => setpanding(false))
        .catch((error) => console.error(error));
    }
    const pickFromGalery = async () => {
        // const { permission_true } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY)
        // if( permission_true ){
            const data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1,1],
                quality: 0.5
            })
            if( !data.cancelled ){
                const newfile = {
                    uri:data.uri,
                    type:`test/${data.uri.split(".")[1]}`,
                    name:`test.${data.uri.split(".")[1]}`
                }
                setimageFromDevice(data.uri);
                setifchanged(true);
            }
        // }else{
        //     Alert.alert("You need to give permisson.");
        // }
    }
    const pickFromCamera = async () => {
        // const { permission_true } = await Permissions.askAsync(Permissions.CAMERA)
        // if( permission_true ){
            const data = await ImagePicker.launchCameraAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.Images,
                allowsEditing:true,
                aspect:[1,1],
                quality:0.5
            })
            if( !data.cancelled ){
                const newfile = {
                    uri:data.uri,
                    type:`test/${data.uri.split(".")[1]}`,
                    name:`test.${data.uri.split(".")[1]}`
                }
                setimageFromDevice(data.uri);
                setifchanged(true);
            }
        // }else{
        //     Alert.alert("You need to give permisson.");
        // }
    }
    useEffect( () => {
        // BackHandler.addEventListener("hardwareBackPress", function(){navigation.goBack();} );
        functionOfFetching();
        (async () => {
            if (Platform.OS !== 'web') {
                // const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted')
                    Alert.alert('Sorry, we need camera roll permissions !');
            }
        })();
        // return () => BackHandler.removeEventListener("hardwareBackPress", function(){navigation.goBack();} );
    }, []);
    const [chose, setchose] = useState(false);
    return(
        <View style={{flex:1, backgroundColor: '#ffc288'}}>
        <Modal  style={{width:screen.width-60,height:100, flexDirection: 'row', justifyContent: 'space-around', alignItems:'center' ,borderRadius: 10, paddingLeft: '10%',}}
            position='bottom'
            backdrop={true}
            isOpen={chose}
            onClosed={ () => setchose(false)}
            entry='bottom'
            animationDuration={600}
        >
            <Button icon={<Avatar size="medium" icon={{name: 'camera', color:"#ff6701", type: 'entypo'}}></Avatar>} buttonStyle={[Styles.button,{width:'75%'}]} title="Camera" onPress={ () => { pickFromCamera(); setchose(false) }}></Button>
            <Button icon={<Avatar size="medium" icon={{name: 'images', color:"#ff6701", type: 'font-awesome-5'}}></Avatar>} buttonStyle={[Styles.button,{width:'75%'}]} title="Galery" onPress={ () => { pickFromGalery(); setchose(false) }}></Button>
        </Modal>
        <Modal  style={{width:screen.width-60,height:300,justifyContent:'center',borderRadius: 10,}}
            position='center'
            backdrop={true}
            isOpen={affiche}
            onClosed={ () => setaffiche(false)}
            entry='top'
            animationDuration={600}
        >
            <Image source={ {uri:imageFromDevice} } style={{resizeMode:'cover', width:screen.width-60,height:300, borderRadius: 10}}></Image>
        </Modal>
        <KeyboardAwareScrollView refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }  contentContainerStyle={Styles.body} centerContent={true}  style={{backgroundColor: '#fcecdd'}}>
        <Animatable.View delay= {200} animation="fadeInDown">
            <Avatar
                rounded
                size="xlarge"
                // source={ panding ? require('../profile1.png') : {uri:dataUser.image}}
                source={{uri: imageFromDevice}}
                containerStyle ={{ alignSelf: 'center', marginTop: '0%', marginBottom: '8%', borderWidth: 2, borderColor: '#ff6701'}}
                onPress={ () => setaffiche(true)}
            >
                <Avatar.Accessory size={26} color='black' style={{backgroundColor:'silver',}} onPress={ () => { setchose(true);}} />
            </Avatar>
            {/********************************************     Username    ********************************************/}
            <Formik
                initialValues={{ username: '' }}      validationSchema={IsCorrectUsername}
                onSubmit={ (values, actions) => {
                    // const Compte = { "id":id, "email":Email, "first_name":name, "last_name":prenom, "password":passP, "image":1, "type":checked};
                    EditCompte({ "username":username, "password":"0" });
                    actions.resetForm();    functionOfFetching();
                    console.log('Usernam changed');
                    setAlerting(true);
                }}
            >
                { props => 
                    <View>
                        <View style={{flexDirection: 'row', width: '100%', marginBottom: '5%', justifyContent: changeUsername? 'center' : 'space-between' }}>
                            <View style={{flexDirection: 'row', marginTop: '2%'}}>
                                <Avatar rounded size="medium" icon={{name: 'user', color:"#ff6701", type: 'font-awesome'}} containerStyle={{ marginTop: "-10%", marginHorizontal: -7}} />
                                { !panding && <View><Text style={[Styles.text,{color: '#ff6701'}]}>{ dataUser.username }</Text></View> }
                            </View>        
                            { !changeUsername && <Button onPress={ () => setchangeUsername(!changeUsername)} title="Editer" buttonStyle={Styles.button}/> }
                        </View>
                        { changeUsername && 
                            <View style={Styles.inside}>
                                <View>
                                    <TextInput selectionColor='#ffc288' color style={Styles.inputNew} label="Username" mode="outlined" onChangeText={props.handleChange('username')} value={props.values.username} onBlur={ props.handleBlur('username')} />
                                </View>
                                <View style={Styles.Errors}><Text style={Styles.errors}>{ props.touched.username && props.errors.username }</Text></View>
                                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: "2%"}}>
                                    <Button onPress={ () => { setchangeUsername(!changeUsername); props.handleSubmit(); }} title="Save" buttonStyle={[Styles.button,{marginHorizontal: '8%'}]}/>
                                    <Button onPress={ () => setchangeUsername(!changeUsername)} title="Fermer" buttonStyle={Styles.button} />
                                </View>
                            </View>
                        }
                    </View>
                }
            </Formik>
            <Divider style={{ height: 1, backgroundColor: '#ffc288' }} />
            {/********************************************     FullName    ********************************************/}
            <Formik
                initialValues={{ nom: '', prenom: '' }}      validationSchema={IsCorrectFullName}
                onSubmit={ (values, actions) => {
                    // const Compte = { "id":id, "email":Email, "first_name":name, "last_name":prenom, "password":passP, "image":1, "type":checked};
                    // EditCompte({'nom':nom,'prenom':prenom});
                    EditCompte({ "username":dataUser.username, "first_name":nom, "last_name":prenom, "password":"0" });
                    actions.resetForm();    functionOfFetching();
                    console.log('Full name changed');
                    setAlerting(true);
                }}
            >
                { props => 
                    <View>
                        <View style={{flexDirection: 'row', width: '100%', marginTop: '2.5%', marginBottom: '5%', justifyContent: changeFullName? 'center' : 'space-between' }}>
                            <View style={{flexDirection: 'row', marginTop: '2%'}}>
                                <Avatar rounded size="medium" icon={{name: 'supervised-user-circle', color:"#ff6701", type: 'materialIcons'}} containerStyle={{ marginTop: "-7%", marginHorizontal: -7}} />
                                { !panding && 
                                    <View>
                                        <Text style={[Styles.text,{color: '#ff6701'}]}>{ dataUser.first_name +" "+ dataUser.last_name }</Text> 
                                    </View>
                                }
                            </View>
                            { !changeFullName && <Button onPress={ () => setchangeFullName(!changeFullName)} title="Editer" buttonStyle={Styles.button}/> }
                        </View>
                        { changeFullName && 
                            <View style={Styles.inside}>
                                <View>
                                    <TextInput selectionColor='#ffc288' color style={Styles.inputNew} label="Nome" mode="outlined" onChangeText={props.handleChange('nom')} value={props.values.nom} onBlur={ props.handleBlur('nom')} />
                                </View>
                                <View style={Styles.Errors}><Text style={Styles.errors}>{ props.touched.nom && props.errors.nom }</Text></View>
                                <View>
                                    <TextInput selectionColor='#ffc288' style={Styles.inputNew} label="Prenom" mode="outlined" onChangeText={props.handleChange('prenom')} value={props.values.prenom} onBlur={ props.handleBlur('prenom')} />
                                </View>
                                <View style={Styles.Errors}><Text style={Styles.errors}>{ props.touched.prenom && props.errors.prenom }</Text></View>
                                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: "2%"}}>
                                    <Button onPress={ () => { setchangeFullName(!changeFullName); props.handleSubmit(); }} title="Save" buttonStyle={[Styles.button,{marginHorizontal: '8%'}]}/>
                                    <Button onPress={ () => setchangeFullName(!changeFullName)} title="Fermer" buttonStyle={Styles.button} />
                                </View>
                            </View>
                        }
                    </View>
                }
            </Formik>
            <Divider style={{ height: 1, backgroundColor: '#ffc288' }} />
            {/********************************************     Email    ********************************************/}
            <Formik
                initialValues={{ email: '' }}       validationSchema={IsCorrectEmail}
                onSubmit={ ( values, actions ) => {
                    // EditCompte({'email':email});
                    EditCompte({ "email":email, "username":dataUser.username, "password":"0" });
                    actions.resetForm();    functionOfFetching();
                    console.log('Email changed');
                    setAlerting(true);
                }}
            >
                { props => 
                    <View>
                        <View style={{flexDirection: 'row', width: '100%', marginTop: '2.5%', marginBottom: '5%', justifyContent: changeEmail? 'center' : 'space-between' }}>
                            <View style={{flexDirection: 'row', marginTop: '2%'}}>
                                <Avatar rounded size="medium" icon={{name: 'email', color:"#ff6701", type: 'Feather'}}  containerStyle={{ marginTop: "-5%", marginHorizontal: -7}} />
                                { !panding && <Text style={[Styles.text,{color: '#ff6701'}]}>{ dataUser.email }</Text> }
                            </View>
                            { !changeEmail && <Button onPress={ () => setchangeEmail(!changeEmail)} title="Editer" buttonStyle={Styles.button} /> }
                        </View>
                        { changeEmail && 
                            <View style={Styles.inside}>
                                <View>
                                    <TextInput selectionColor='#ffc288' style={Styles.inputNew} label="Email" mode="outlined" onChangeText={props.handleChange('email')} value={props.values.email} onBlur={ props.handleBlur('email')} />
                                </View>
                                <View style={Styles.Errors}><Text style={Styles.errors}>{ props.touched.email && props.errors.email }</Text></View>
                                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: "2%"}}>
                                    <Button onPress={ () => { setchangeEmail(!changeEmail); props.handleSubmit() }} title="Save" buttonStyle={[Styles.button,{marginHorizontal: '8%'}]}/>
                                    <Button onPress={ () => setchangeEmail(!changeEmail)} title="Fermer" buttonStyle={Styles.button} />
                                </View>
                            </View>
                        }
                    </View>
                }
            </Formik>
            <Divider style={{ height: 1, backgroundColor: '#ffc288' }} />
            {/********************************************     Phone    ********************************************/}
            <Formik
                initialValues={{ phone: '' }}       validationSchema={IsCorrectPhone}
                onSubmit={ ( values, actions ) => {
                    EditCompte({ "username":dataUser.username, "password":"0", 'phone': phone });
                    actions.resetForm();    functionOfFetching();
                    console.log('Phone number changed');
                    setAlerting(true);
                }}
            >
                { props => 
                    <View>
                        <View style={{flexDirection: 'row', width: '100%', marginTop: '2.5%', marginBottom: '5%', justifyContent: changePhone? 'center' : 'space-between' }}>
                            <View style={{flexDirection: 'row', marginTop: '2%'}}>
                                <Avatar rounded size="medium" icon={{name: 'phone', color:"#ff6701", type: 'Feather'}}  containerStyle={{ marginTop: "-8%", marginHorizontal: -7}} />
                                { !panding && <Text style={[Styles.text,{color: '#ff6701'}]}>{ dataUser.phone }</Text> }
                            </View>
                            { !changePhone && <Button onPress={ () => setchangePhone(!changePhone)} title="Editer" buttonStyle={Styles.button} /> }
                        </View>
                        { changePhone && 
                            <View style={Styles.inside}>
                                <View>
                                    <TextInput selectionColor='#ffc288' keyboardType="numeric" style={Styles.inputNew} label="Telephone" mode="outlined"  onChangeText={props.handleChange('phone')} value={props.values.phone} onBlur={ props.handleBlur('phone')} />
                                </View>
                                <View style={Styles.Errors}><Text style={Styles.errors}>{ props.touched.phone && props.errors.phone }</Text></View>
                                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                    <Button onPress={ () => { setchangePhone(!changePhone); props.handleSubmit(); }} title="Save" buttonStyle={[Styles.button,{marginHorizontal: '8%'}]}/>
                                    <Button onPress={ () => setchangePhone(!changePhone)} title="Fermer" buttonStyle={Styles.button} />
                                </View>
                            </View>
                        }
                    </View>
                }
            </Formik>
            <Divider style={{ height: 1, backgroundColor: '#ffc288' }} />
            {/********************************************     Password    ********************************************/}
            <Formik
                initialValues={{ newPassword: '', ConfirmPassword: ''}}        validationSchema={IsCorrectPassword}
                onSubmit={ ( values, actions ) => {
                    // EditCompte({'password': newPassword,});
                    if( newPassword=="" )   setnewPassword("0");
                    EditCompte({ "username":dataUser.username, "password":newPassword });
                    actions.resetForm();    functionOfFetching();
                    console.log('Password changed');
                    setAlerting(true);
                }}
            >
                { props => 
                    <View>
                        <View style={{flexDirection: 'row', width: '100%', marginTop: '2.5%', marginBottom: '5%', justifyContent: changePassword? 'center' : 'space-between' }}>
                            <View style={{flexDirection: 'row', marginTop: '2%'}}>
                                <Avatar rounded size="medium" icon={{name: 'key', color:"#ff6701", type: 'entypo'}}  containerStyle={{ marginTop: "-5%", marginHorizontal: -7}} />
                                <Text style={[Styles.text,{color: '#ff6701'}]}>Changer le mot de passe</Text>
                            </View>
                            { !changePassword && <Button onPress={ () => setchangePassword(!changePassword)} title="Editer" buttonStyle={Styles.button} /> }
                        </View>
                        { changePassword && 
                            <View style={Styles.inside}>
                                <TextInput
                                    selectionColor='#ffc288'
                                    style={Styles.inputNew} 
                                    right={ <TextInput.Icon name= { ShowOrHide2? "eye-off" : "eye" } onPress={ () => setShowOrHide2(!ShowOrHide2) } style={{marginTop: '50%'}}/> } 
                                    label="Nouveau mot de passe"    mode="outlined"     secureTextEntry={ShowOrHide2} 
                                    onChangeText={props.handleChange('newPassword')} 
                                    value={props.values.newPassword} 
                                    onBlur={ props.handleBlur('newPassword')}
                                />
                                <View style={Styles.Errors}><Text style={Styles.errors}>{ props.touched.newPassword && props.errors.newPassword }</Text></View>                 
                                <TextInput
                                    selectionColor='#ffc288'
                                    style={Styles.inputNew} 
                                    right={ <TextInput.Icon name= { ShowOrHide3? "eye-off" : "eye" } onPress={ () => setShowOrHide3(!ShowOrHide3) } style={{marginTop: '50%'}} /> } 
                                    label="Retapez le nouveau mot de passe"    mode="outlined"     secureTextEntry={ShowOrHide3} 
                                    onChangeText={props.handleChange('ConfirmPassword')} 
                                    value={props.values.ConfirmPassword}
                                    onBlur={ props.handleBlur('ConfirmPassword')}
                                />
                                <View style={Styles.Errors}><Text style={Styles.errors}>{ props.touched.ConfirmPassword && props.errors.ConfirmPassword }</Text></View>
                                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: "2%"}}>
                                    <Button onPress={ () => { setchangePassword(!changePassword); props.handleSubmit() ; }} title="Save" buttonStyle={[Styles.button,{marginHorizontal: '8%'}]}/>
                                    <Button onPress={ () => setchangePassword(!changePassword)} title="Fermer" buttonStyle={Styles.button} />
                                </View>
                            </View>
                        }
                    </View>
                }
            </Formik>
            <AwesomeAlert
                show={Alerting}                                 title="Updating"
                message="Update Succesfuly"                      closeOnTouchOutside={true}
                closeOnHardwareBackPress={true}                showConfirmButton={true}
                confirmText="Great"                             confirmButtonColor="#DD6B55"
                onConfirmPressed={() => setAlerting(false) }
                contentContainerStyle={{backgroundColor: '#fcecdd'}}
                titleStyle={{ fontFamily: 'Regular404'}}        messageStyle={{ fontFamily: 'Regular403' }}
            />
            </Animatable.View>
        </KeyboardAwareScrollView>
        </View>
    );
}

const Styles = StyleSheet.create({
    body: {
        // flex: 1,
        paddingHorizontal: "4%",
        paddingBottom: '20%',
        // padding: 12,
        flexDirection: 'column',
        maxHeight: 2000,
        width: '100%',
        marginVertical: "3%",
    },
    inputNew: {
        marginHorizontal: "3%", 
        fontSize: 16,
        height: 50,
    },
    text: {
        fontSize: 17,
        // paddingLeft: '3%',
        fontFamily: 'Regular404',
        marginVertical: 1,
        color: 'black',
    },
    errors: {
        alignSelf: 'flex-end',
        fontSize: 14,
        marginRight: "7%",
        marginVertical: "2%",
        color: '#ff6701',
    },
    button: {
        width: 80,
        backgroundColor: '#fea82f',
        borderRadius: 10,
    },
    inside: {
        flexDirection: 'column', 
        marginTop: '-4%', 
        marginBottom: '6%', 
        backgroundColor: '#ffc288', 
        padding: '2%', 
        paddingVertical: '4%',
        borderRadius: 10,
    }
});