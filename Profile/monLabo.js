import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, BackHandler, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Keyboard, RefreshControl } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import { Avatar, Divider, Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AwesomeAlert from 'react-native-awesome-alerts';
import Elevations from 'react-native-elevation';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modalbox';
import Swipeout from 'react-native-swipeout';
import { TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const screen=Dimensions.get('window');

export default function monLabo( { route , navigation } ){
    const [AlertingSucc, setAlertingSucc] = useState(false);            const [AlertingDeleteEquipe, setAlertingDeleteEquipe] = useState(false);
    const [changeName, setchangeName] = useState(false);                const [changDomaine, setchangDomaine] = useState(false);
    const [refreshing, setRefreshing] = useState(false);                const [dataLabo, setdataLabo] = useState([]);                       
    const [panding, setpanding] = useState(true);                       const [idOfDel, setidOfDel] = useState('');                         
    const [Alerting, setAlerting] = useState(false);                    const [dataOfRemoving, setdataOfRemoving] = useState('');
    const [Name, setName] = useState('');                               const [Domaine, setDomaine] = useState('');
    const nameModal = [{
        backgroundColor: 'transparent',
        color: '#ff6701',
        component: ( <Button title="Editer" buttonStyle={[Styles.button,{marginTop: '-0.2%'}]} onPress={ () =>{ setchangeName(!changeName) }}/> )
    }];
    const domainModal = [{
        backgroundColor: 'transparent',
        color: '#ff6701',
        component: ( <Button title="Editer" buttonStyle={[Styles.button,{marginTop: '18%'}]} onPress={ () =>{ setchangDomaine(!changDomaine) }}/> )
    }];
    const onRefresh = React.useCallback(() => { setRefreshing(true); wait(2000).then(() => setRefreshing(false)); functionOfFetching(); }, []);
    const { id } = route.params;
    const EditLabo = ( Labo ) => {
        console.log('Begin of Edit');
        fetch('http://34.77.153.247:8000/api/Labs/'+route.params.id , {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Labo)
        }).then( () => console.log('Labo Edited') )
    }
    const functionOfFetching = async () => {
        fetch('http://34.77.153.247:8000/api/Lab-Users/'+route.params.id)
        // fetch('http://34.77.153.247:8000/api/Lab-Users/'+11)
        .then((response) => response.json())
        .then((json) => setdataLabo(json))
        .then( () => setpanding(false))
        // .then( () => setdataLa(dataLabo))
        .catch((error) => console.error(error));
    }
    // const deleteEquipe = (item) => {
    //     fetch('https://mighty-zebra-71.loca.lt/Equipe/'+item ,{ method: 'DELETE' })
    //     .then(response => response.json())
    //     .then( () => console.log('Done'));
    // }
    const RemoveEquipe = ( Equipe, item ) => {
        console.log('Begin of Edit');
        fetch('http://34.77.153.247:8000/api/Team-Users/'+item , {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Equipe)
        }).then( () => console.log('Equipe Removed') )
    }
    const IsCorrectName = yup.object({
        name: yup.string().required("Saisir nouvelle nom").min(4).test( (value) => { 'Saisir nouvelle nom', "C'est le meme", setName(value); return Name!=dataLabo.name ; }),
    });
    const IsCorrectDomaine = yup.object({
        domaine: yup.string().required("Saisir nouvelle theme").min(4).test( (value) => { 'Saisir nouvelle mumero de domaine' , "C'est le meme", setDomaine(value); return Domaine!=dataLabo.theme ; }),
    });
    useEffect( () => {
        // BackHandler.addEventListener("hardwareBackPress", function(){navigation.goBack();} );
        functionOfFetching();
        // return () => BackHandler.removeEventListener("hardwareBackPress", function(){navigation.goBack();} );
    }, []);
    return(
        <View style={Styles.all}>
            <Modal  style={{width:screen.width-60,height:300,justifyContent:'center',borderRadius: 10,backgroundColor: '#ffc288'}}
                position='center'
                backdrop={true}
                isOpen={changeName}
                onClosed={ () => setchangeName(false)}
            >
                <Formik
                    initialValues={{ name: '' }}      
                    validationSchema={IsCorrectName}
                    onSubmit={ (values, actions) => {
                        // EditLabo({ "name": Name, "Departement":dataLabo.Departement, "C_LAB":dataLabo.id_chef_labo, "theme":dataLabo.theme, "creation_DateTime": dataLabo.dataEquipe});
                        EditLabo({ "name": Name });
                        actions.resetForm();    functionOfFetching();
                        setchangeName(!changeName);
                        console.log('Name changed');
                        setAlerting(true);
                    }}
                >
                    { props => 
                        <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
                        <View>
                            <View style={{flexDirection: 'row', width: '100%', marginBottom: '10%', justifyContent: 'center' }}>
                                <Text style={[Styles.title,{color: 'black', marginTop: '2%'}]}>Nom : </Text>
                                <View style={{flexDirection: 'row', marginTop: '2%'}}>
                                    <Text style={[Styles.title,{color: '#ff6701'}]}>{ dataLabo.name }</Text>
                                </View>
                            </View>
                                <View style={Styles.inside}>
                                    <View>
                                        <TextInput selectionColor='#ffc288' color style={Styles.inputNew} label="Nom" mode="outlined" onChangeText={props.handleChange('name')} value={props.values.name} onBlur={ props.handleBlur('name')} />
                                    </View>
                                    <View style={Styles.Errors}><Text style={Styles.errors}>{ props.touched.name && props.errors.name }</Text></View>
                                    <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: "2%"}}>
                                        <Button onPress={ () => { props.handleSubmit(); }} title="Save" buttonStyle={[Styles.button,{marginHorizontal: '8%'}]}/>
                                        <Button onPress={ () => setchangeName(!changeName) } title="Fermer" buttonStyle={Styles.button} />
                                    </View>
                                </View>
                        </View>
                        </TouchableWithoutFeedback>
                    }
                </Formik>
            </Modal>
            <Modal  style={{width:screen.width-60,height:300,justifyContent:'center',borderRadius: 10,backgroundColor: '#ffc288'}}
                position='center'
                backdrop={true}
                isOpen={changDomaine}
                onClosed={ () => setchangDomaine(false)}
            >
                <Formik
                    initialValues={{ domaine: '' }}       validationSchema={IsCorrectDomaine}
                    onSubmit={ ( values, actions ) => {
                        // EditLabo({ "name": dataLabo.name, "Departement":dataLabo.Departement, "C_LAB":dataLabo.id_chef_labo, "theme":Domaine, "creation_DateTime": dataLabo.dataEquipe});
                        EditLabo({ "theme":Domaine });
                        actions.resetForm();    functionOfFetching();
                        setchangDomaine(!changDomaine);
                        console.log('Domaine changed');
                        setAlerting(true);
                    }}
                >
                    { props => 
                        <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
                        <View>
                            <View style={{flexDirection: 'row', width: '100%', marginVertical: '10%', justifyContent: 'center' }}>
                                <Text style={[Styles.title,{color: 'black', marginTop: '2%'}]}>Domaine : </Text>
                                <View style={{flexDirection: 'row', marginTop: '2%'}}>
                                    <Text style={[Styles.title,{color: '#ff6701'}]}>{ dataLabo.theme }</Text>
                                </View>
                            </View>
                            <View style={Styles.inside}>
                                <View>
                                    <TextInput selectionColor='#ffc288' style={Styles.inputNew} label="Theme" mode="outlined"  onChangeText={props.handleChange('domaine')} value={props.values.domaine} onBlur={ props.handleBlur('domaine')} />
                                </View>
                                <View style={Styles.Errors}><Text style={Styles.errors}>{ props.touched.domaine && props.errors.domaine }</Text></View>
                                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                    <Button onPress={ () => { props.handleSubmit(); }} title="Save" buttonStyle={[Styles.button,{marginHorizontal: '8%'}]}/>
                                    <Button onPress={ () => setchangDomaine(!changDomaine)} title="Fermer" buttonStyle={Styles.button} />
                                </View>
                            </View>
                        </View>
                        </TouchableWithoutFeedback>
                    }
                </Formik>
            </Modal>
            <View style={{ marginTop: "7%", paddingHorizontal: "5%", marginBottom: '-120%', flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}} >
                <Feather name='arrow-left' color="red" size={35} onPress={ () => navigation.goBack()} />
            </View>
            <View style={Styles.body}>
            { !panding &&
            <KeyboardAwareScrollView refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> } >
                <Swipeout right={nameModal} backgroundColor={"transparent"} close autoClose buttonWidth={80} >
                    <TouchableOpacity style={{width: '100%'}}>
                        <Text  style={Styles.Title}>{ dataLabo.name }</Text>
                    </TouchableOpacity>
                </Swipeout>
                <Divider style={{ height: 1, backgroundColor: '#ffc288', width: '100%', alignSelf: 'center' }} />
                    <TouchableOpacity style={{width: '100%'}}>
                        <Text style={Styles.info}>Chef de labo : </Text>
                            <Text style={Styles.infos} >{ dataLabo.C_LAB_firstname +" "+ dataLabo.C_LAB_last_name }</Text>
                    </TouchableOpacity>
                <Divider style={{ height: 1, backgroundColor: '#ffc288', width: '80%', alignSelf: 'center' }} />
                <Swipeout right={domainModal} backgroundColor={"transparent"} close autoClose buttonWidth={80} >
                    <TouchableOpacity style={{width: '100%'}}>
                        <Text style={Styles.info}>Theme : </Text>
                        <Text style={Styles.infos}>{ dataLabo.theme }</Text>
                    </TouchableOpacity>
                </Swipeout>
                <Divider style={{ height: 1, backgroundColor: '#ffc288', width: '60%', alignSelf: 'center' }} />
                <Text style={Styles.info}>Les equipes du labo : </Text>                    
                <View style={{flex: 2, flexDirection: 'column',marginHorizontal:'0%', justifyContent:'center', alignItems:'center'}}>
                    <ScrollView horizontal={true} contentContainerStyle={{paddingHorizontal: '1%'}} showsHorizontalScrollIndicator={false}>
                        { dataLabo.teams.map( (item) => 
                            <View key={item.id} style={{marginTop: '1%', marginBottom: '1%', flex: 1, width: 210, }}>
                                <Animatable.View delay={300} animation="slideInRight" style={{flexDirection:'column', paddingVertical: '1%', marginBottom: '1.6%', width: 202, borderRadius: 10, backgroundColor: '#ffc288', ...Elevations[6], marginHorizontal: '1%' ,}}>
                                    <TouchableOpacity onPress={ () => navigation.navigate("Team", { dataa:item, bol: false } ) }>
                                        <Image  source={require('../equipe.png')} style={{ borderRadius: 10, alignSelf: 'center',width: 140, height: 140}}/> 
                                        <Text style={{textAlign: 'center', marginTop: '3%', marginBottom: '3%', fontFamily: 'Regular404', fontSize: 20, color: '#ff6701' }}>{ item.name }</Text>
                                        <Text style={{textAlign: 'center', marginTop: '3%', marginBottom: '3%', fontFamily: 'Regular403', fontSize: 16, color: '#ff6701' }}>{ item.C_EQ_first_name+" "+item.C_EQ_last_name }</Text>
                                    </TouchableOpacity>
                                    <View style={{flexDirection: 'row', justifyContent:'space-between', paddingHorizontal: '4%'}}>
                                        <Feather name='trash-2' color="red" size={27} color="coral" onPress={ () => { setAlertingDeleteEquipe(true); setidOfDel(item.id); setdataOfRemoving(item) } } />
                                        <Feather name='edit-2' color="red" size={27} color="coral" onPress={ () => navigation.navigate("Team", { dataa:item, bol: true } ) }/>
                                    </View>
                                </Animatable.View>
                            </View>
                        )}
                        </ScrollView>
                    </View>
                    <AwesomeAlert
                        show={Alerting}                                 title="Updating"
                        message="Update Succesfuly"                      closeOnTouchOutside={true}
                        closeOnHardwareBackPress={true}                showConfirmButton={true}
                        confirmText="Great"                             confirmButtonColor="#DD6B55"
                        onConfirmPressed={() => setAlerting(false) }
                        contentContainerStyle={{backgroundColor: '#fcecdd'}}
                        titleStyle={{ fontFamily: 'Regular404'}}        messageStyle={{ fontFamily: 'Regular403' }}
                    />
                    <AwesomeAlert
                        show={AlertingSucc}                             title="Removing"
                        message="Remove Succesfuly"                     closeOnTouchOutside={false}
                        closeOnHardwareBackPress={false}                showConfirmButton={true}
                        confirmText="Greate"                            confirmButtonColor="#DD6B55"
                        onConfirmPressed={() => setAlertingSucc(false) }
                        contentContainerStyle={{backgroundColor: '#fcecdd'}}
                        titleStyle={{ fontFamily: 'Regular404'}}        messageStyle={{ fontFamily: 'Regular403' }}
                    />
                    <AwesomeAlert
                        show={AlertingDeleteEquipe}                                 title="Removing"
                        message="Are you sure you want to remove this team ?"    closeOnTouchOutside={false}
                        closeOnHardwareBackPress={false}                            showCancelButton={true}
                        showConfirmButton={true}                                    cancelText="No"
                        confirmText="Oui"                                           confirmButtonColor="#DD6B55"
                        onCancelPressed={() => setAlertingDeleteEquipe(false) }
                        contentContainerStyle={{backgroundColor: '#fcecdd'}}
                        titleStyle={{ fontFamily: 'Regular404'}}        messageStyle={{ fontFamily: 'Regular403' }}
                        onConfirmPressed={() => {
                            setAlertingDeleteEquipe(false);     setAlertingSucc(true);
                            RemoveEquipe({ "id_Labo": null },idOfDel);      functionOfFetching();
                        }}
                    />
                </KeyboardAwareScrollView>
                }
            </View>
        </View>
    );
}

const Styles = StyleSheet.create({
    
    all: {
        flex: 1,
        backgroundColor: '#ffc288',
    },
    info: {
        fontSize: 18,
        color: 'black',
        fontFamily: 'Regular404',
        marginLeft: '2%',
        marginTop: '2%',
    },
    infos: {
        marginTop: '1%',
        fontSize: 19,
        color: '#ff6701',
        textAlign: 'center',
        fontFamily: 'Regular404',
        marginBottom: '2%'
    },
    title: { 
        fontSize: 17, 
        color: 'coral',
        fontFamily: 'Regular403',
    },
    Title: {
        fontSize: 27,
        textAlign: 'center',
        paddingBottom: '0%',
        fontFamily: 'Regular403',
        color: 'red',
        marginTop: '-1%'
    },
    button: {
        width: 80,
        backgroundColor: '#fea82f',
        borderRadius: 10,
    },
    inside: {
        flexDirection: 'column', 
        marginTop: '-4%', 
        marginBottom: '16%', 
        backgroundColor: '#ffc288', 
        padding: '2%', 
        paddingVertical: '4%',
        borderRadius: 10,
        marginHorizontal: '3%',
        ...Elevations[24]
    },
    errors: {
        alignSelf: 'flex-end',
        fontSize: 14,
        marginRight: "7%",
        marginVertical: "2%",
        color: '#ff6701',
    },
    inputNew: {
        marginHorizontal: "3%", 
        fontSize: 16,
        height: 50,
        backgroundColor: '#fcecdd'
    },
    body: {
        marginHorizontal: 13,
        paddingBottom: '4%',
        paddingTop: '4%',
        paddingHorizontal: '6%',
        marginTop: '-4%',

        // marginTop: '2%',
        marginBottom: '4%',
        // marginHorizontal: '3%',
        // paddingBottom: '6%',
        // paddingHorizontal: '5%',
        // height: 200,
        backgroundColor: '#fcecdd',
        flex: 1,
        justifyContent: 'flex-start',
        borderRadius: 20,
        alignContent: 'center',
    },
})