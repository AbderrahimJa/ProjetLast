import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback, StyleSheet, StatusBar, Alert, AsyncStorage, ActivityIndicator } from 'react-native';
// import { MMKV } from 'react-native-mmkv';
import jwt_decode from "jwt-decode";
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import { Formik } from 'formik';
import * as yup from 'yup';
import AwesomeAlert from 'react-native-awesome-alerts';

const wait = () => {
    return new Promise(resolve => setTimeout(resolve, 2000));
}

export default function LogIn({navigation }){
    // onRefresh = () => React.useCallback(() => {  functionOfFetching();    wait();  } , []);
    const [dataUser, setdataUser] = useState([]);
    const [ShowOrHide, setShowOrHide] = useState(true);
    const [panding, setpanding] = useState(false);
    const [Alerting, setAlerting] = useState(false);
    const IsCorrect = yup.object({
        Username: yup.string().required("Please enter your username"),
        Password: yup.string().required("Please enter your password"),
    })
    // const loginChek = (Email, Password) => {
    //     const foundUser = dataUser.filter( item => { return Email == item.email && Password == item.password; } );
    //     if ( foundUser.length == 0 ) { setAlerting(true);   return;  }
    //     for (let i = 0; i < dataUser.length; i++) {
    //         const ele = dataUser[i];
    //         if( Email == ele.email ){
    //             if( Password == ele.password ){
    //                 setTimeout(() => {
    //                     setpanding(false);
    //                     navigation.jumpTo( ele.type , {screen:ele.type , params: ele });
    //                 }, 500);
    //                 setpanding(true);
    //                 break;
    //             }
    //         }
    //     }
    // }

    const _onValueChange = async (item, selectedValue) => {
        try {
          await AsyncStorage.setItem(item, selectedValue);
            // MMKV.set(item, selectedValue);
        } catch (error) {
          console.log('AsyncStorage error: ' + error.message);
        }
    }
    let x = '' ;
    _retrieveData = async () => {
        try {
            const value1 = JSON.parse( await AsyncStorage.getItem('refresh'));
            const value2 = JSON.parse( await AsyncStorage.getItem('access'));
            if ( value1 !== null && value2 !== null ) {
                console.log(" refresh : "+value1.token_type);
                console.log(" access : "+value2.token_type);
            }else    console.log("BIDe VIDEEEE");
        } catch (error) {
            console.error(error);
        }
    };

    const Login = (username, password) => {
        fetch('http://34.77.153.247:8000/api/token/',{
            method: "POST",
            headers: { 
                "Content-Type": "application/json" ,
                "Accept" : "application/json" 
            },
            body: JSON.stringify({ "username": username , "password": password })
        }).then( (response) => response.json() )
        .then( (responseData) => {
            if( responseData.refresh !== undefined && responseData.access !== undefined ){
                console.log(JSON.stringify(responseData));
                const a = JSON.stringify(jwt_decode(responseData.refresh));
                const b = JSON.stringify(jwt_decode(responseData.access));
                console.log(jwt_decode(responseData.refresh).user_id);
                console.log( typeof(jwt_decode(responseData.refresh).user_id));
                _onValueChange( 'refresh' , a);
                _onValueChange( 'access' , b);
                x = jwt_decode(responseData.refresh).user_id ;
                fun1();
            }else   setAlerting(true);
        })
    }
    const fun1 = () => {
        for (let i = 0; i < dataUser.length; i++) {
            const element = dataUser[i];
            if( element.id == x ){
            // if( element.id == 21 ){
                setTimeout(() => {
                    setpanding(false);
                    navigation.jumpTo( element.type , {screen:element.type , params: element });
                }, 500);
                setpanding(true);
                break;
            }
        }
    }
    const functionOfFetching = () => {
        fetch('http://34.77.153.247:8000/api/Users/')
        .then((response) => response.json())
        .then((json) => setdataUser(json))
        .catch((error) => console.error(error));
    }
    const remov = async() => {
        try{
            AsyncStorage.removeItem('refresh');
            AsyncStorage.removeItem('access');
        }catch(error){   console.error(error); }
    }
    useEffect( () => {
        functionOfFetching();
        remov();
        // _retrieveData();
    }, []);
    return (
        <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() } >
            <View style={styles.Presenting}>
                <StatusBar backgroundColor='black' barStyle="light-content"/>
                <View style={styles.Backg}>
                    <Animatable.View style={styles.header} delay= {200} animation="slideInRight" >
                            <Text style={styles.text_header}>Welcome back!</Text>
                    </Animatable.View>
                </View>
                <Animatable.View animation="slideInLeft" delay= {200} style={styles.Form} >
                    <Formik 
                        initialValues={{ Username: '', Password: '' }}
                        validationSchema={IsCorrect}
                        onSubmit={(values, actions) => {
                            Login( values.Username, values.Password );
                            // functionOfFetching();
                            // loginChek(values.Email, values.Password);
                            values.Password='';
                            setShowOrHide(true);
                        }}
                    >
                        { props => 
                            <View>
                                <Text style={styles.text_Form}>Username</Text>
                                <View style={styles.action}>
                                    <Feather name="user" color={'#ff6701'} size={20} />
                                    <TextInput 
                                        placeholder="Username"
                                        placeholderTextColor="#666666"
                                        style={styles.textInput}
                                        autoCapitalize="none"
                                        onChangeText={props.handleChange('Username')}
                                        value={props.values.Username}
                                        onBlur={ props.handleBlur('Username')}
                                    />
                                </View>
                                <View style={styles.Errors}><Text style={styles.errors}>{ props.touched.Username && props.errors.Username }</Text></View>
                                <Text style={[styles.text_Form, { marginTop: 25 }]}>Mot de passe</Text>
                                <View style={styles.action}>
                                    <Feather name="lock" color={'#ff6701'} size={20} />
                                    <TextInput 
                                        label="Password"
                                        placeholder="Votre mot de passe"
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
                                            <Feather name="eye-off" color={'#ff6701'} size={20} />      
                                            :
                                            <Feather name="eye" color={'#ff6701'} size={20} />
                                        }
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.Errors}><Text style={styles.errors}>{ props.touched.Password && props.errors.Password }</Text></View>
                                <View style={styles.button}>
                                    <TouchableOpacity style={styles.signIn} onPress={ () =>  props.handleSubmit() } >
                                        <Text style={styles.textSign}>Connexion</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                    </Formik>
                    <AwesomeAlert
                        show={Alerting}
                        title="Invalid compte!"
                        message="Email ou mot de passe est incorrect."
                        closeOnTouchOutside={false}
                        closeOnHardwareBackPress={false}
                        showCancelButton={false}
                        showConfirmButton={true}
                        confirmText="D'accord"
                        confirmButtonColor="#ff6701"
                        onConfirmPressed={() => {
                            setAlerting(false);
                        }}
                        titleStyle={{ fontFamily: 'Regular404'}}
                        // messageStyle={{fontFamily: 'Regular405'}}
                        contentContainerStyle={{backgroundColor: '#fcecdd'}}
                        // style={{backgroundColor: '#ffc288'}}
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
      backgroundColor: '#ffc288',
    },
    Backg: {
        flex: 1.5,
        backgroundColor: '#fcecdd',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        marginHorizontal: 2,
        paddingBottom: 50,
        backgroundColor: '#ffc288',
        borderBottomStartRadius: 70,
    },
    Form: {
        flex: 4,
        backgroundColor: '#fcecdd',
        borderTopEndRadius: 70,
        paddingHorizontal: 30,
        paddingVertical: 30,
        marginHorizontal: 1, 
    },
    text_header: {
        paddingLeft: 10,
        color: '#ff6701',
        // fontWeight: 'bold',
        // fontStyle: 'italic',
        fontFamily: 'Regular403',
        fontSize: 30,
        textAlign: 'center',
    },
    text_Form: {
        color: '#ff6701',
        fontSize: 18,
        marginTop: -10 ,
        paddingLeft: 5,
        fontFamily: 'Regular403',
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
        marginTop: 40,
    },
    signIn: {
        width: '70%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#ffc288',
    },
    textSign: {
        color: '#ff6701',
        fontSize: 26,
        // fontStyle: 'italic',
        fontFamily: 'Regular404',
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
