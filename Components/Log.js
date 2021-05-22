import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback, StyleSheet, StatusBar, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import { Formik } from 'formik';
import * as yup from 'yup';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function LogIn({navigation }){
    const [dataUser, setdataUser] = useState([]);
    const [ShowOrHide, setShowOrHide] = useState(true);
    const [panding, setpanding] = useState(false);
    const [Alerting, setAlerting] = useState(false);
    const IsCorrect = yup.object({
        Email: yup.string().required("Please enter your Email").email(),
        Password: yup.string().required("Please enter your password"),
    })
    const loginChek = (Email, Password) => {
        console.log(dataUser);
        const foundUser = dataUser.filter( item => {
            return Email == item.email && Password == item.password;
        } );
        if ( foundUser.length == 0 ) {
            setAlerting(true);
            // Alert.alert('Invalid User!', 'Email or password is incorrect.', [
            //     {text: "D'accord"}
            // ]);
            return;
        }
        for (let i = 0; i < dataUser.length; i++) {
            const ele = dataUser[i];
            if( Email == ele.email ){
                if( Password == ele.password ){
                    setTimeout(() => {
                        setpanding(false);
                        navigation.jumpTo( ele.type , {screen:ele.type , params: ele });
                        
                    }, 500);
                    setpanding(true);
                    break;
                }
            }
        }
    }
    const functionOfFetching = () => {
        fetch('https://massive-monkey-9.loca.lt/Users')
        .then((response) => response.json())
        .then((json) => setdataUser(json))
        .then( () => console.log('errror'))
        .catch((error) => console.error(error));
    }
    useEffect( () => {
        functionOfFetching();
    }, []);
    return (
        <TouchableWithoutFeedback
            onPress={ () => { Keyboard.dismiss(); } }
        >
            <View style={styles.Presenting}>
                <StatusBar backgroundColor='black' barStyle="light-content"/>
                <View style={styles.Backg}>
                    <Animatable.View
                        style={styles.header} 
                        delay= {200}
                        animation="slideInRight"
                    >
                            <Text style={styles.text_header}>Welcome back!</Text>
                    </Animatable.View>
                </View>
                <Animatable.View 
                    animation="slideInLeft"
                    delay= {200}
                    style={styles.Form}
                >
                    <Formik 
                        initialValues={{ Email: '', Password: '' }}
                        validationSchema={IsCorrect}
                        onSubmit={(values, actions) => {
                            loginChek(values.Email, values.Password);
                            // values.Password='';
                            setShowOrHide(true);
                        }}
                    >
                        { props => 
                            <View>
                                <Text style={styles.text_Form}>Email</Text>
                                <View style={styles.action}>
                                    <Feather 
                                        name="mail"
                                        color={'#ff6701'}
                                        size={20}
                                    />
                                    <TextInput 
                                        placeholder="Your Email"
                                        placeholderTextColor="#666666"
                                        style={styles.textInput}
                                        autoCapitalize="none"
                                        onChangeText={props.handleChange('Email')}
                                        value={props.values.Email}
                                        onBlur={ props.handleBlur('Email')}
                                    />
                                </View>
                                <View style={styles.Errors}>
                                    <Text style={styles.errors}>{ props.touched.Email && props.errors.Email }</Text>
                                </View>
                                <Text style={[styles.text_Form, { marginTop: 25 }]}>Password</Text>
                                <View style={styles.action}>
                                    <Feather 
                                        name="lock"
                                        color={'#ff6701'}
                                        size={20}
                                    />
                                    <TextInput 
                                        label="Password"
                                        placeholder="Your Password"
                                        secureTextEntry={ShowOrHide}
                                        placeholderTextColor="#666666"
                                        style={styles.textInput}
                                        autoCapitalize="none"
                                        onChangeText={props.handleChange('Password')}
                                        value={props.values.Password}
                                        onBlur={ props.handleBlur('Password')}
                                    />
                                    <TouchableOpacity onPress={()=>setShowOrHide(!ShowOrHide)}>
                                        {ShowOrHide? 
                                            <Feather 
                                                name="eye-off"
                                                color={'#ff6701'}
                                                size={20}
                                            />      
                                        :
                                            <Feather 
                                                name="eye"
                                                color={'#ff6701'}
                                                size={20}
                                            />
                                        }
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.Errors}>
                                    <Text style={styles.errors}>{ props.touched.Password && props.errors.Password }</Text>
                                </View>
                                <TouchableOpacity>
                                    <Text style={{color: '#009387', marginTop: 17 , fontSize: 16}}>Forgot password ?</Text>
                                </TouchableOpacity>
                                <View style={styles.button}>
                                    <TouchableOpacity
                                        style={styles.signIn}
                                        onPress={ () => props.handleSubmit() }
                                    >
                                        <Text style={styles.textSign}>Sign In</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                    </Formik>
                    <AwesomeAlert
                        show={Alerting}
                        showProgress={false}
                        progressColor="#DD6B55"
                        progressSize={50}
                        title="Invalid User!"
                        message="Email or password is incorrect."
                        closeOnTouchOutside={false}
                        closeOnHardwareBackPress={false}
                        showCancelButton={false}
                        showConfirmButton={true}
                        confirmText="D'accord"
                        confirmButtonColor="#DD6B55"
                        onConfirmPressed={() => {
                            setAlerting(false);
                        }}
                    />
                    {panding && <AwesomeAlert show={panding} showProgress={true} progressColor="#DD6B55" progressSize={40} closeOnTouchOutside={false} closeOnHardwareBackPress={false}/>}
                </Animatable.View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    Presenting: {
      flex: 1, 
      backgroundColor: '#F1EADD',
    },
    Backg: {
        flex: 1.5,
        backgroundColor: 'white',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        marginHorizontal: 2,
        paddingBottom: 50,
        backgroundColor: '#F1EADD',
        borderBottomStartRadius: 70,
    },
    Form: {
        flex: 4,
        backgroundColor: 'white',
        borderTopEndRadius: 70,
        paddingHorizontal: 30,
        paddingVertical: 30,
        marginHorizontal: 1, 
    },
    text_header: {
        paddingLeft: 10,
        color: '#ff6701',
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 30,
    },
    text_Form: {
        color: '#ff6701',
        fontSize: 18,
        marginTop: -10 ,
        paddingLeft: 5,
    },
    action: {
        flexDirection: 'row',
        marginTop: 13,
        borderBottomWidth: 0.2,
        borderBottomColor: 'grey',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        paddingLeft: 15,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 30,
    },
    signIn: {
        width: '50%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#F1EADD',
    },
    textSign: {
        color: '#ff6701',
        fontSize: 23,
        fontStyle: 'italic',
        fontWeight: 'bold'
    },
    imag: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    Errors: {
        alignItems: 'flex-end',
        paddingTop: 3,
    },
    errors: {
        fontSize: 13,
        color: '#ff6701',
    }
  });
