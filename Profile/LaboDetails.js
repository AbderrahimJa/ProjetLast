import React, { useState, useEffect } from 'react';
import { Text, View, RefreshControl, StyleSheet, Image, TouchableOpacity, Dimensions, TouchableWithoutFeedback, BackHandler, Keyboard } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Avatar, Divider, Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import AwesomeAlert from 'react-native-awesome-alerts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Elevations from 'react-native-elevation';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modalbox';
import Swipeout from 'react-native-swipeout';
import { TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import ModalSelector from 'react-native-modal-selector-searchable';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const screen=Dimensions.get('window');

export default function LaboDetails( { route , navigation } ){
    const [changeChefLabo, setchangeChefLabo] = useState(false);    const [changeName, setchangeName] = useState(false);
    const [changDomaine, setchangDomaine] = useState(false);        const [changeDepartement, setchangeDepartement] = useState(false);
    const [idOfDel, setidOfDel] = useState('');                     const [chefLabo, setchefLabo] = useState([]);
    const [dataEquipe, setdataEquipe] = useState([]);               const [dataLabo, setdataLabo] = useState([]);
    const [refreshing, setRefreshing] = useState(false);            const [panding, setpanding] = useState(true);
    const [domaineOfLabo, setdomaineOfLabo] = useState('');         const [nameOfDepart, setnameOfDepart] = useState('');
    const [dcrt, setdcrt] = useState('');                           const [idChef_lab, setidChef_lab] = useState(route.params.dataa.C_LAB);
    const [nameOfLab, setnameOfLab] = useState('');                 const [Alerting, setAlerting] = useState(false);
    const [AlertingSucc, setAlertingSucc] = useState(false);        const [AlertingDeleteEquipe, setAlertingDeleteEquipe] = useState(false);
    const [Name, setName] = useState('');                           const [ChefLabo, setChefLabo] = useState('');
    const [Domaine, setDomaine] = useState('');                     const [departement, setdepartement] = useState('');
    const { id, name, C_LAB , theme } = route.params.dataa;
    const bo = route.params.bol;
    const nameModal = [{
        backgroundColor: 'transparent',
        color: '#ff6701',
        component: ( <Button title="Editer" buttonStyle={[Styles.button,{marginTop: '-0.2%'}]} onPress={ () =>{ setchangeName(!changeName); fun() }}/> )
    }];
    const domainModal = [{
        backgroundColor: 'transparent',
        color: '#ff6701',
        component: ( <Button title="Editer" buttonStyle={[Styles.button,{marginTop: '18%'}]} onPress={ () =>{ setchangDomaine(!changDomaine); fun() }}/> )
    }];
    const chefModal = [{
        backgroundColor: 'transparent',
        color: '#ff6701',
        component: ( <Button title="Editer" buttonStyle={[Styles.button,{marginTop: '18%'}]} onPress={ () =>{ setchangeChefLabo(!changeChefLabo); fun() }}/> )
    }];
    const onRefresh = React.useCallback(() => { setRefreshing(true); wait(2000).then(() => setRefreshing(false)); functionOfFetching(); }, []);
    const EditLabo = ( Labo ) => {
        console.log('Begin of Edit');
        fetch('http://34.77.153.247:8000/api/Labs/'+route.params.dataa.id , {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Labo)
        }).then( () => console.log('Labo Edited') )
    }
    const [labels, setlabels] = useState([]);
    const fun1 = () => {
        setlabels([]);
        for (let i = 0; i < dataLabo.teams.length; i++) {
            const element = dataLabo.teams[i];
            for (let j = 0; j < element.accounts.length; j++) {
                const element1 = element.accounts[j];
                if( element1.type == "PROF" )
                setlabels((Last) => {
                    return [ { key: element1.id, label: element1.first_name+" "+element1.last_name }, ...Last];
                });
            }            
        }
    }
    const EditCompte = ( Compte, id ) => {
        console.log('Begin of Add Added');
        fetch('http://34.77.153.247:8000/api/Users/'+id , {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Compte)
        }).then( () => functionOfFetching() )
    }
    const deleteEquipe = (item) => {
        fetch('http://34.77.153.247:8000/api/Teams/'+item ,{ method: 'DELETE' })
        .then(response => response.json())
        .then( () => console.log('Done'));
    }
    const functionOfChange = ( idofNEW ) => {
        if( idofNEW != '' && idofNEW != dataLabo.C_LAB ){
            let a = dataLabo.C_LAB ;
            let b = '';
            EditLabo({ "C_LAB":idofNEW });
            console.log(dataLabo.teams.length);
            for (let i = 0; i < dataLabo.teams.length; i++) {
                const element = dataLabo.teams[i];
                console.log(element.accounts.length);
                for (let j = 0; j < element.accounts.length; j++) {
                    const elements = element.accounts[j];
                    console.log( j );
                    if( elements.id == a ){
                        EditCompte({ "username": elements.username, "password":"0", "type":"PROF" }, elements.id);
                    }
                    if( elements.id == idofNEW ){
                        EditCompte({ "username": elements.username, "password":"0", "type":"C_LAB" }, elements.id);
                    }   
                }
            }
            functionOfFetching();
        }
    }
    const fun = () => {
        setdomaineOfLabo(dataLabo.theme);
        setidChef_lab(dataLabo.C_LAB);
        setnameOfLab(dataLabo.name);
        setdcrt(dataLabo.Date_Creation);
    }
    const functionOfFetching = async () => {
        fetch('http://34.77.153.247:8000/api/Lab-Users/'+route.params.dataa.id)
        .then((response) => response.json())
        .then((json) => setdataLabo(json))
        .then( () => setpanding(false))
        .catch((error) => console.error(error));
    }
    useEffect(() => {
        // BackHandler.addEventListener("hardwareBackPress", function(){navigation.goBack();} );
        functionOfFetching();              
        // return () => BackHandler.removeEventListener("hardwareBackPress", function(){navigation.goBack();} );
    }, [])
    const IsCorrectName = yup.object({
        name: yup.string().required("Saisir nouvelle nom").min(4).test( (value) => { 'Saisir nouvelle nom', "C'est le meme", setName(value); return Name!=dataLabo.name ; }),
    });
    const IsCorrectDomaine = yup.object({
        domaine: yup.string().required("Saisir nouvelle nom de domaine").min(4).test( (value) => { 'Saisir nouvelle mumero de domaine' , "C'est le meme", setDomaine(value); return Domaine!=dataLabo.theme ; }),
    });
    let idOfnew = '';
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
                        // EditLabo({ "name": Name, "Departement":dataLabo.Departement, "C_LAB":dataLabo.C_LAB, "theme":dataLabo.theme, "creation_DateTime": dataLabo.dataEquipe});
                        EditLabo({ "name": Name, "C_LAB":idChef_lab, "theme":domaineOfLabo, "creation_DateTime": dcrt});
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
                        // EditLabo({ "name": dataLabo.name, "Departement":dataLabo.Departement, "C_LAB":dataLabo.C_LAB, "theme":Domaine, "creation_DateTime": dataLabo.dataEquipe});
                        EditLabo({ "name": nameOfLab, "C_LAB":idChef_lab, "theme":Domaine, "creation_DateTime": dcrt});
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
                                <Text style={[Styles.title,{color: 'black', marginTop: '2%'}]}>Theme : </Text>
                                <View style={{flexDirection: 'row', marginTop: '2%'}}>
                                {/* { dataLabo.map( (item) =>  */}
                                <Text style={[Styles.title,{color: '#ff6701'}]}>{ dataLabo.theme }</Text>
                                {/* } */}
                                </View>
                            </View>
                            <View style={Styles.inside}>
                                <View>
                                    <TextInput selectionColor='#ffc288' style={Styles.inputNew} label="Domaine" mode="outlined"  onChangeText={props.handleChange('domaine')} value={props.values.domaine} onBlur={ props.handleBlur('domaine')} />
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
            <Modal  style={{width:screen.width-60,height:200,justifyContent:'center',borderRadius: 10}}
                position='center'
                backdrop={true}
                isOpen={changeChefLabo}
                onClosed={ () => setchangeChefLabo(false)}
            >
                <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
                    <View style={{flexDirection:'column'}}>
                        <ModalSelector
                            data={labels}
                            initValue="Cliquer pour selecter un chef de labo !"
                            initValueTextStyle={{color: 'red', fontFamily: 'Regular403', fontSize: 14}}
                            style={{backgroundColor: '#ffc288', borderRadius: 6, marginBottom: '10%', marginHorizontal: '2%'}}
                            optionStyle={{backgroundColor: '#fcecdd', marginVertical: '0.8%', borderRadius: 16,}}
                            optionTextStyle={{color: '#ff6701'}}
                            searchStyle={{backgroundColor:'white',paddingVertical: 5, marginBottom: '2%'}}
                            searchText="Choisir un chef de labo"
                            cancelStyle={{backgroundColor: '#ff6701', marginHorizontal: '6%'}}
                            cancelTextStyle={{color: '#fcecdd'}}
                            optionContainerStyle={{backgroundColor: '#ffc288', marginHorizontal: '6%'}}
                            onModalOpen={ () => fun1()}      
                            onChange={(option)=>{ idOfnew = option.key }} 
                        />
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <Button onPress={ () =>{ functionOfChange(idOfnew); setchangeChefLabo(!changeChefLabo) }} title="Save" buttonStyle={[Styles.button,{marginHorizontal: '8%'}]}/>
                            <Button onPress={ () => setchangeChefLabo(!changeChefLabo)} title="Fermer" buttonStyle={Styles.button} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <View style={{ marginTop: "12%", paddingHorizontal: "5%", marginBottom: '-120%', flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}} >
                <Feather name='arrow-left' color="red" size={35} onPress={ () => navigation.goBack()} />
            </View>
            <View style={Styles.body}>
            { !panding && 
            <KeyboardAwareScrollView refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> } >
                <Swipeout right={nameModal} backgroundColor={"transparent"} close autoClose buttonWidth={80} disabled={!bo} >
                    <TouchableOpacity style={{width: '100%'}}>
                        <Text style={Styles.Title}>{ dataLabo.name }</Text> 
                    </TouchableOpacity>
                </Swipeout>
                <Divider style={{ height: 1, backgroundColor: '#ffc288', width: '100%', alignSelf: 'center' }} />
                <Swipeout right={chefModal} backgroundColor={"transparent"} close autoClose buttonWidth={80} disabled={!bo} >
                    <TouchableOpacity style={{width: '100%'}}>
                        <Text style={Styles.info}>Chef de labo : </Text>
                        <Text style={Styles.infos} >{ dataLabo.C_LAB_firstname +" "+ dataLabo.C_LAB_last_name}</Text>
                    </TouchableOpacity>
                </Swipeout>
                <Divider style={{ height: 1, backgroundColor: '#ffc288', width: '80%', alignSelf: 'center' }} />
                <Swipeout right={domainModal} backgroundColor={"transparent"} close autoClose buttonWidth={80} disabled={!bo} >
                    <TouchableOpacity style={{width: '100%'}}>
                        <Text style={Styles.info}>Theme : </Text>
                        <Text style={Styles.infos}>{ dataLabo.theme }</Text>
                    </TouchableOpacity>
                </Swipeout>
                <Divider style={{ height: 1, backgroundColor: '#ffc288', width: '60%', alignSelf: 'center' }} />
                <Text style={Styles.info}>Les equipes du labo : </Text>                    
                <View style={{flex: 2, flexDirection: 'column',marginHorizontal:'0%', alignItems: 'center'}}>
                    <ScrollView horizontal={true} contentContainerStyle={{paddingHorizontal: '1%'}} showsHorizontalScrollIndicator={false}>
                        { dataLabo.teams.map( (item) => 
                            <TouchableOpacity onPress={ () => navigation.navigate("Team", { dataa:item, bol: false } ) } key={item.id} style={{marginTop: '1%', marginBottom: '1%', flex: 1, width: 210 }}>
                                <Animatable.View delay={300} animation="slideInRight" style={{flexDirection:'column', paddingVertical: '1%', marginBottom: '1.6%', width: 202, borderRadius: 10, backgroundColor: '#ffc288', ...Elevations[6], marginHorizontal: '1%' }}>
                                        <Image  source={require('../equipe.png')} style={{ borderRadius: 10, alignSelf: 'center',width: 140, height: 140}}/> 
                                        <Text style={{textAlign: 'center', marginTop: '3%', marginBottom: '3%', fontFamily: 'Regular404', fontSize: 20, color: '#ff6701' }}>{ item.name }</Text>
                                        <Text style={{textAlign: 'center', marginTop: '3%', marginBottom: '3%', fontFamily: 'Regular403', fontSize: 15, color: '#ff6701' }}>{ item.C_EQ_first_name +" "+ item.C_EQ_last_name }</Text>
                                        { bo && 
                                            <View style={{flexDirection: 'row', justifyContent:'space-between', paddingHorizontal: '4%'}}>
                                                <Feather name='trash-2' color="red" size={27} color="coral" onPress={ () => { AlertingDeleteEquipe(true); setidOfDel(item.id) } } />
                                                <Feather name='edit-2' color="red" size={27} color="coral" onPress={ () => navigation.navigate("Team", { dataa:item, bol: true } ) }/>
                                            </View>
                                        }
                                </Animatable.View>
                            </TouchableOpacity>
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
                        show={AlertingSucc}                             title="Deleting"
                        message="Delete Succesfuly"                     closeOnTouchOutside={false}
                        closeOnHardwareBackPress={false}                showConfirmButton={true}
                        confirmText="Greate"                            confirmButtonColor="#DD6B55"
                        onConfirmPressed={() => setAlertingSucc(false) }
                        contentContainerStyle={{backgroundColor: '#fcecdd'}}
                        titleStyle={{ fontFamily: 'Regular404'}}        messageStyle={{ fontFamily: 'Regular403' }}
                    />
                    <AwesomeAlert
                        show={AlertingDeleteEquipe}                                 title="Deleting"
                        message="Are you sure you want to delete this team ?"    closeOnTouchOutside={false}
                        closeOnHardwareBackPress={false}                            showCancelButton={true}
                        showConfirmButton={true}                                    cancelText="No"
                        confirmText="Oui"                                           confirmButtonColor="#DD6B55"
                        onCancelPressed={() => setAlertingDeleteEquipe(false) }
                        contentContainerStyle={{backgroundColor: '#fcecdd'}}
                        titleStyle={{ fontFamily: 'Regular404'}}        messageStyle={{ fontFamily: 'Regular403' }}
                        onConfirmPressed={() => {
                            setAlertingDeleteEquipe(false);     setAlertingSucc(true);
                            deleteEquipe(idOfDel);      functionOfFetching();
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
    body: {
        marginHorizontal: 13,
        paddingBottom: '4%',
        paddingTop: '4%',
        paddingHorizontal: '6%',
        marginBottom: '4%',
        marginTop: '-4%',
        // height: 200,
        backgroundColor: '#fcecdd',
        flex: 1,
        justifyContent: 'flex-start',
        borderRadius: 20,
        alignContent: 'center',
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
    }
})