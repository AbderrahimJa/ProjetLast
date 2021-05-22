import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, TextInput, StyleSheet, RefreshControl } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function Profile({ route, navigation}){
    const IsCorrectFullName = yup.object({
        nom: yup.string().required("Saisir nouvelle nom").min(4).test( (value) => { 'Saisir nouvelle mumero de nom', "C'est le meme", setnom(value); return nom!=dataUser.nom ; }),
        prenom: yup.string().required("Saisir nouvelle prenom").min(4).test( (value) => { 'Saisir nouvelle mumero de prenom', "C'est le meme", setprenom(value); return prenom!=dataUser.prenom ; }),
    });
    const IsCorrectEmail = yup.object({
        email: yup.string().required("Saisir nouvelle numero de telephone").email().test( 'Saisir nouvelle mumero de telephone', "C'est le meme", (value) => { setemail(value); return email!=dataUser.email ; }),
    });
    const IsCorrectPhone = yup.object({
        phone: yup.number().required("Saisir nouvelle email").min(8).test( (value) => { 'Saisir nouvelle email', "C'est le meme", setphone(value); return phone!=dataUser.phone ; }),
    });
    const IsCorrectPassword = yup.object({
        password: yup.string().required("Saisir votre mot de pass").test( (value) => { 'Saisir le meme mot de pass', "C'est pas le meme", setpassword(value); return password==dataUser.password ; }),
        newPassword: yup.string().required("Saisir nouvelle mot de pass").min(8).test( 'Saisir nouvelle mot de pass', "C'est le meme", (value) => { setnewPassword(value); return newPassword!=password ; }),
        ConfirmPassword: yup.string().required("Saisir le meme mot de pass").min(8).test('Confirmer votre mot de pass', 'Not the same', (value) => { setConfirmPassword(value); return newPassword==ConfirmPassword; }),
    });
    const [password, setpassword] = useState();
    const [newPassword, setnewPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [dataUser, setdataUser] = useState({});
    const [changeFullName, setchangeFullName] = useState(false);
    const [changeEmail, setchangeEmail] = useState(false);
    const [changePhone, setchangePhone] = useState(false);
    const [nom, setnom] = useState('');
    const [prenom, setprenom] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [changePassword, setchangePassword] = useState(false);
    const [ShowOrHide1, setShowOrHide1] = useState(true);
    const [ShowOrHide2, setShowOrHide2] = useState(true);
    const [ShowOrHide3, setShowOrHide3] = useState(true);
    const idOfPerson = route.params.id;
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
        functionOfFetching();
    }, []);
    const functionOfFetching = () => {
        fetch('https://massive-monkey-9.loca.lt/Users/'+idOfPerson)
        .then((response) => response.json())
        .then((json) => setdataUser(json))
        .catch((error) => console.error(error));
    }
    useEffect( () => {
        functionOfFetching();
    }, []);
    return(
        <KeyboardAwareScrollView refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }  contentContainerStyle={Styles.body} centerContent={true}>
        <View>
            <View style={{ marginTop: 6, marginLeft: 6, marginBottom: "15%", paddingBottom: 10, flex: 1, width: '100%'}} >
                <Feather name='arrow-left' color="red" size={35} onPress={ () => navigation.goBack()} />
            </View>
            {/* <Feather name='arrow-left' size={35} color="red" style={{flex:1, }} onPress={ () => navigation.goBack()}/> */}
            {/********************************************     FullName    ********************************************/}
            <Formik
                initialValues={{ nom: '', prenom: '' }}      validationSchema={IsCorrectFullName}
                onSubmit={ (values, actions) => {
                    // functionOfFetching();
                    console.log('Full name changed');
                }}
            >
                { props => 
                    <View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: '10%'}}>
                            <View style={{flexDirection: 'row', marginTop: '2%'}}>
                                <Avatar rounded size="medium" icon={{name: 'user', color:"#ff6701", type: 'font-awesome'}} containerStyle={{ marginTop: "-5%", marginHorizontal: -2}} />
                                <Text style={[Styles.text,{color: '#ff6701'}]}>{ dataUser.nom +" "+ dataUser.prenom }</Text>
                            </View>
                            { changeFullName?
                                <Button onPress={ () => setchangeFullName(!changeFullName)} color="red" title="Fermer" type='solid' buttonStyle={Styles.button} />
                                :
                                <Button onPress={ () => setchangeFullName(!changeFullName)} title="Editer" color="silver" buttonStyle={Styles.button} />
                            }
                        </View>
                        { changeFullName && 
                            <View style={{flexDirection: 'column', marginTop: '-8%', marginBottom: '10%', backgroundColor: 'silver', padding: '2%', borderRadius: 6}}>
                                <Text style={[Styles.text,{marginLeft: '10%'}]}>Nom : </Text>
                                <View style={Styles.inp}>
                                    <TextInput style={Styles.input} onChangeText={props.handleChange('nom')} value={props.values.nom} onBlur={ props.handleBlur('nom')} />
                                </View>
                                <View style={Styles.Errors}><Text style={Styles.errors}>{ props.touched.nom && props.errors.nom }</Text></View>
                                <Text style={[Styles.text,{marginLeft: '10%'}]}>Prenom : </Text>
                                <View style={Styles.inp}>
                                    <TextInput style={Styles.input} onChangeText={props.handleChange('prenom')} value={props.values.prenom} onBlur={ props.handleBlur('prenom')} />
                                </View>
                                <View style={Styles.Errors}><Text style={Styles.errors}>{ props.touched.prenom && props.errors.prenom }</Text></View>
                                <Button onPress={ () => { setchangeFullName(!changeFullName); props.handleSubmit(); }} title="Save" buttonStyle={[Styles.button,{ alignSelf: 'center'}]}/>
                            </View>
                        }
                    </View>
                }
            </Formik>
            {/********************************************     Email    ********************************************/}
            <Formik
                initialValues={{ email: '' }}       validationSchema={IsCorrectEmail}
                onSubmit={ ( values, actions ) => {
                    console.log('Email changed');
                }}
            >
                { props => 
                    <View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: '10%'}}>
                            <View style={{flexDirection: 'row', marginTop: '2%'}}>
                                <Avatar rounded size="medium" icon={{name: 'email', color:"#ff6701", type: 'Feather'}}  containerStyle={{ marginTop: "-5%", marginHorizontal: -2}} />
                                <Text style={[Styles.text,{color: '#ff6701'}]}>{ dataUser.email }</Text>
                            </View>
                            { changeEmail?
                                <Button onPress={ () => setchangeEmail(!changeEmail)} title="Fermer" buttonStyle={Styles.button} />
                                :
                                <Button onPress={ () => setchangeEmail(!changeEmail)} title="Editer" buttonStyle={Styles.button} />
                            }
                        </View>
                        { changeEmail && 
                            <View style={{flexDirection: 'column', marginTop: '-8%'}}>
                                <Text style={[Styles.text,{marginLeft: '10%'}]}>Email : </Text>
                                <View style={Styles.inp}>
                                    <TextInput style={Styles.input} onChangeText={props.handleChange('email')} value={props.values.email} onBlur={ props.handleBlur('email')} />
                                </View>
                                <View style={Styles.Errors}><Text style={Styles.errors}>{ props.touched.email && props.errors.email }</Text></View>
                                <Button onPress={ () => { setchangeEmail(!changeEmail); props.handleSubmit() }} title="Save" buttonStyle={[Styles.button,{ alignSelf: 'center'}]} />
                            </View>
                        }
                    </View>
                }
            </Formik>
            {/********************************************     Phone    ********************************************/}
            <Formik
                initialValues={{ phone: '' }}       validationSchema={IsCorrectPhone}
                onSubmit={ ( values, actions ) => {
                    console.log('Phone number changed');
                }}
            >
                { props => 
                    <View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: '10%'}}>
                            <View style={{flexDirection: 'row', marginTop: '2%'}}>
                                <Avatar rounded size="medium" icon={{name: 'phone', color:"#ff6701", type: 'Feather'}}  containerStyle={{ marginTop: "-8%", marginHorizontal: -2}} />
                                <Text style={[Styles.text,{color: '#ff6701'}]}>{ dataUser.phone }</Text>
                            </View>
                            { changePhone?
                                <Button onPress={ () => setchangePhone(!changePhone)} title="Fermer" buttonStyle={Styles.button} />
                                :
                                <Button onPress={ () => setchangePhone(!changePhone)} title="Editer" buttonStyle={Styles.button} />
                            }
                        </View>
                        { changePhone && 
                            <View style={{flexDirection: 'column', marginTop: '-8%'}}>
                                <Text style={[Styles.text,{marginLeft: '10%'}]}>Telephone : </Text>
                                <View style={Styles.inp}>
                                    <TextInput keyboardType="numeric" style={Styles.input} onChangeText={props.handleChange('phone')} value={props.values.phone} onBlur={ props.handleBlur('phone')} />
                                </View>
                                <View style={Styles.Errors}><Text style={Styles.errors}>{ props.touched.phone && props.errors.phone }</Text></View>
                                <Button onPress={ () => { setchangePhone(!changePhone); props.handleSubmit(); }} title="Save" buttonStyle={[Styles.button,{ alignSelf: 'center'}]} />
                            </View>
                        }
                    </View>
                }
            </Formik>
            {/********************************************     Password    ********************************************/}
            <Formik
                initialValues={{password: '', newPassword: '', ConfirmPassword: ''}}        validationSchema={IsCorrectPassword}
                onSubmit={ ( values, actions ) => {
                    console.log('Password changed');
                }}
            >
                { props => 
                    <View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: '10%'}}>
                            <View style={{flexDirection: 'row', marginTop: '2%'}}>
                                <Avatar rounded size="medium" icon={{name: 'key', color:"#ff6701", type: 'entypo'}}  containerStyle={{ marginTop: "-5%", marginHorizontal: -2}} />
                                <Text style={[Styles.text,{color: '#ff6701'}]}>Changer le mot de pass</Text>
                            </View>
                            { changePassword?
                                <Button onPress={ () => setchangePassword(!changePassword)} title="Fermer" buttonStyle={Styles.button} />
                                :
                                <Button onPress={ () => setchangePassword(!changePassword)} title="Editer" buttonStyle={Styles.button} />
                            }
                        </View>
                        { changePassword && 
                            <View style={{flexDirection: 'column', marginTop: '-8%'}}>
                                <Text style={[Styles.text,{marginLeft: '10%'}]}>Votre mot de pass : </Text>
                                {/* <View style={{flexDirection: 'row'}}> */}
                                    <View style={{flexDirection: 'row', borderWidth: 1,marginBottom: 6, maxHeight: 60, minHeight: 40, borderColor: 'coral', borderRadius: 7, paddingHorizontal: '5%', justifyContent: 'space-between'}}>
                                        <TextInput
                                            label="Password"        secureTextEntry={ShowOrHide1}
                                            placeholder=""      onChangeText={props.handleChange('password')}
                                            value={props.values.password}       onBlur={ props.handleBlur('password')}
                                        />
                                        <TouchableOpacity onPress={()=>setShowOrHide1(!ShowOrHide1)}>
                                            {ShowOrHide1? 
                                                <Feather style={{paddingTop: '2%'}} name="eye-off" color={'#ff6701'} size={20} />
                                                :
                                                <Feather style={{paddingTop: '2%'}} name="eye" color={'#ff6701'} size={20} />
                                            }
                                        </TouchableOpacity>
                                    </View>
                                {/* </View> */}
                                <View style={Styles.Errors}><Text style={Styles.errors}>{ props.touched.password && props.errors.password }</Text></View>
                                {/* <View style={{flexDirection: 'row'}}> */}
                                    {/* <Text style={Styles.text}>Nouvelle mot de pass : </Text> */}
                                    <Text style={[Styles.text,{marginLeft: '10%'}]}>Nouvelle mot de pass : </Text>
                                    <View style={{flexDirection: 'row', borderWidth: 1,marginBottom: 6, maxHeight: 60, minHeight: 40, borderColor: 'coral', borderRadius: 7, paddingHorizontal: '5%', justifyContent: 'space-between'}}>
                                        <TextInput
                                            label="Password"        secureTextEntry={ShowOrHide2}
                                            placeholder=""      onChangeText={props.handleChange('newPassword')}
                                            value={props.values.newPassword}       onBlur={ props.handleBlur('newPassword')}
                                        />
                                        <TouchableOpacity onPress={()=>setShowOrHide2(!ShowOrHide2)}>
                                            {ShowOrHide2? 
                                                <Feather style={{paddingTop: '2%'}} name="eye-off" color={'#ff6701'} size={20} />
                                                :
                                                <Feather style={{paddingTop: '2%'}} name="eye" color={'#ff6701'} size={20} />
                                            }
                                        </TouchableOpacity>
                                    </View>
                                {/* </View> */}
                                <View style={Styles.Errors}><Text style={Styles.errors}>{ props.touched.newPassword && props.errors.newPassword }</Text></View>
                                {/* <View style={{flexDirection: 'row'}}> */}
                                    {/* <Text style={Styles.text}>Confirmer le mot de pass : </Text> */}
                                    <Text style={[Styles.text,{marginLeft: '10%'}]}>Confirmer le mot de pass : </Text>
                                    <View style={{flexDirection: 'row', borderWidth: 1,marginBottom: 6, maxHeight: 60, minHeight: 40, borderColor: 'coral', borderRadius: 7, paddingHorizontal: '5%', justifyContent: 'space-between'}}>
                                        <TextInput
                                            label="Password"        secureTextEntry={ShowOrHide3}
                                            placeholder=""      onChangeText={props.handleChange('ConfirmPassword')}
                                            value={props.values.ConfirmPassword}        onBlur={ props.handleBlur('ConfirmPassword')}
                                        />
                                        <TouchableOpacity onPress={()=>setShowOrHide3(!ShowOrHide3)}>
                                            {ShowOrHide3? 
                                                <Feather style={{paddingTop: '2%'}} name="eye-off" color={'#ff6701'} size={20} />
                                                :
                                                <Feather style={{paddingTop: '2%'}} name="eye" color={'#ff6701'} size={20} />
                                            }
                                        </TouchableOpacity>
                                    </View>
                                {/* </View> */}
                                <View style={Styles.Errors}><Text style={Styles.errors}>{ props.touched.ConfirmPassword && props.errors.ConfirmPassword }</Text></View>
                                <Button onPress={ () => { setchangePassword(!changePassword); props.handleSubmit() ; }} title="Save" buttonStyle={[Styles.button,{ alignSelf: 'center'}]} />
                            </View>
                        }
                    </View>
                }
            </Formik>
                    {/* </View> */}
            </View>                
            {/* }
        </Formik> */}
        </KeyboardAwareScrollView>
    );
}

const Styles = StyleSheet.create({
    body: {
        // flex: 1,
        padding: 12,
        flexDirection: 'column',
        maxHeight: 1300,
        width: '98%',

        // width: '96%',
        // height: 950,
        // flexDirection: 'column',
        // margin: "2%",
        // padding: 10,

        // justifyContent: 'center',
        // backgroundColor: 'coral',
    },
    input: {
        margin: 8,
        paddingLeft: 6,
        fontSize: 17,
    },
    inp: {
        margin: '3%',
        borderWidth: 1,
        marginBottom: 6,
        maxHeight: 60,
        minHeight: 40,
        borderColor: 'coral',
        borderRadius: 7,
        paddingHorizontal: '5%',
        justifyContent: 'space-between'
    },
    text: {
        fontSize: 17,
        // paddingLeft: '3%',
        fontWeight: 'bold',
        // marginTop: "-5%",
        color: 'black',
    },
    errors: {
        alignSelf: 'flex-end',
        fontSize: 14,
        marginRight: "7%",
        color: '#ff6701',
    },
    button: {
        width: 70,
    }
});