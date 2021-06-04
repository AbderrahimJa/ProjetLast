import React, { useState, useEffect } from 'react';
import { StatusBar, View, RefreshControl, Text, StyleSheet, BackHandler, ImageBackground, FlatList, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Modal, TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import { Avatar } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import * as yup from 'yup';
import AwesomeAlert from 'react-native-awesome-alerts';
import Elevations from 'react-native-elevation';
import { ScrollView } from 'react-native-gesture-handler';
import Swipeout from 'react-native-swipeout';
import ModalSelector from 'react-native-modal-selector-searchable';
import MultiSelect from 'react-native-multiple-select';
import { setStatusBarHidden } from 'expo-status-bar';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function Str_Rech( { navigation } ){
    const [refreshing, setRefreshing] = useState(false);
    const [dataUser, setdataUser] = useState([]);
    const onRefresh = React.useCallback(() => { setRefreshing(true); wait(2000).then(() => setRefreshing(false)); functionOfFetching(); }, []);
    const [labels1, setlabels1] = useState([]);
    const [labels2, setlabels2] = useState([]);
    const [labels3, setlabels3] = useState([]);
    const [dataUserOfEquipe, setdataUserOfEquipe] = useState();
    const EditCompte = ( Compte, id ) => {
        console.log('Begin of Edit compte');
        fetch('http://34.77.153.247:8000/api/Users/'+id , {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Compte)
        }).then( () => functionOfFetching() )
    }
    const fun1 = () => {
        functionOfFetching();
        setlabels1([]);
        for (let i = 0; i < dataUser.length; i++) {
            const element = dataUser[i];
            if( element.team == null && element.type == 'PROF'){
                setlabels1((Last) => {
                    return [ { key: element.id, label: element.first_name+" "+element.last_name }, ...Last];
                });
            }
        }
        functionOfFetching();
    }
    const fun2 = () => {
        setlabels2([]);
        functionOfFetching();
        for (let i = 0; i < dataEquipe.length; i++) {
            const element = dataEquipe[i];
            if( element.Lab == null ){
                setlabels2((Last) => {
                    return [ { key: element.id, label: element.name }, ...Last];
                });
            }
        }
        functionOfFetching();
    }
    const fun3 = () => {
        // functionOfFetching();
        console.log(dataUserOfEquipe.accounts);
        setlabels3([]);
        for (let i = 0; i < dataUserOfEquipe.accounts.length; i++) {
            const element = dataUserOfEquipe.accounts[i];
            if( element.type == 'PROF'){
                setlabels3((Last) => {
                    return [ { key: element.id, label: element.first_name+" "+element.last_name }, ...Last];
                });
            }
        }
        functionOfFetching();
    }
    const [newChefEq, setnewChefEq] = useState(null);
    // let newChefLab = '' ;
    let newEquipe = '' ;
    const [newChefLab, setnewChefLab] = useState('');
    // const [newEquipe, setnewEquipe] = useState('');
    const functionOfChangeEq = () => {
        let a = '';
        if( newChefEq != null ){
            functionOfFetching();
            // setTimeout(() => {
                // for (let i = 0; i < dataEquipe.length; i++) {
                //     const element = dataEquipe[i];
                //     if( element.C_EQ == newChefEq )   a = element.id ;
                // }
                // if( a != '' ){
                    for (let i = 0; i < dataUser.length; i++) {
                        const element = dataUser[i];
                        if( element.id == newChefEq ){
                            // EditCompte({ "username": element.username, "email": element.email, "first_name": element.first_name, "last_name": element.last_name, 'password':'0', 'type':"C_EQ", 'phone': element.phone, 'team': a}, element.id);
                            EditCompte({ 'username': element.username,'password':'0', 'type':"C_EQ"}, element.id);
                        }
                    }
                // }
            // }, 5000);
        }
        functionOfFetching();
    }
    const functionOfChangeLab = () => {
        let a = 1;
        // console.log(" hanta "+newChefLab);
        if( newChefLab != null ){
            // for (let i = 0; i < dataUser.length; i++) {
            //     const elements = dataUser[i];
            //     if( elements.id == newChefLab ){
            //         EditCompte({ "username": elements.username, "password":"0", "type":"C_LAB" }, elements.id);
            //     }
            // }
            // setTimeout(() => {
            dataLabo.map( (item) => {
                console.log(" C_LAB "+item.C_LAB);
                if( item.C_LAB == newChefLab )  { 
                    EditEquipe({ "Lab": item.id } , newEquipe) ;
                    console.log(" id of new lab : "+item.id); 
                    // EditEquipe({ "Lab": a } , newEquipe);
                }
            })
            console.log(" var = "+newChefLab);
            for (let i = 0; i < dataUser.length; i++) {
                console.log("h1h1");
                const elements = dataUser[i];
                if( elements.id == newChefLab ){
                    // console.log("h1h1");
                    EditCompte({ "username": elements.username, "password":"0", "type":"C_LAB" }, elements.id);
                }
            }
                // for (let i = 0; i < dataLabo.length; i++) {
                //     const element = dataLabo[i];
                //     // console.log("Hanta xof : "+ element.C_LAB );
                //     if( element.C_LAB == newChefLab )  { 
                //         EditEquipe({ "Lab": element.id } , newEquipe) ;
                //         console.log(" id of new lab : "+element.id); 
                //         EditEquipe({ "Lab": a } , newEquipe);
                //     }
                // }
                // if( a != '' ){
                    // EditEquipe({ "Lab": a } , newEquipe);
                    // for (let i = 0; i < dataUser.length; i++) {
                    //     const element = dataUser[i];
                    //     if( element.id == newChefLab ){
                    //         EditCompte({ "username": element.username, "password":"0", "type":"C_LAB" }, element.id);
                    //     }
                    // }
                // }
            // }, 5000);
        }
        functionOfFetching();
    }
    const functionOfFetching = () => {
        fetch('http://34.77.153.247:8000/api/Labs/')
        .then((response) => response.json())
        .then((json) => setdataLabo(json))
        .then( () => setpanding1(false))
        .catch((error) => console.error(error));
        fetch('http://34.77.153.247:8000/api/Teams/')
        .then((response) => response.json())
        .then((json) => setdataEquipe(json))
        .then( () => setpanding2(false))
        .catch((error) => console.error(error));
        fetch('http://34.77.153.247:8000/api/Users/')
        .then((response) => response.json())
        .then((json) => setdataUser(json))
        .catch((error) => console.error(error));
    }
    const d = new Date().toLocaleDateString();                              const [name2, setname2] = useState('');
    const [dataLabo, setdataLabo] = useState([]);
    const [dataEquipe, setdataEquipe] = useState([]);                       const [visMod1, setvisMod1] = useState(false);
    const [visMod2, setvisMod2] = useState(false);                          const [name1, setname1] = useState('');
    const [Domain, setDomain] = useState('');                               const [id_labo, setid_labo] = useState('');                             
    const [id_chef_labo, setid_chef_labo] = useState('');                   const [idOfDel, setidOfDel] = useState('');
    const [Alerting, setAlerting] = useState(false);                        const [AlertingSucc, setAlertingSucc] = useState(false);
    const [AlertingDeleteLabo, setAlertingDeleteLabo] = useState(false);    const [AlertingDeleteEquipe, setAlertingDeleteEquipe] = useState(false);    
    const [panding1, setpanding1] = useState(true);                         const [panding2, setpanding2] = useState(true);
    const IsCorrect1 = yup.object({
        Name: yup.string().required("Saisir le nom du labo").min(4).test( (value) => { setname1(value); return true; }),
        Domain: yup.string().required("Saisir le theme ").min(4).test( (value) => { setDomain(value); return true; })
    })
    const IsCorrect2 = yup.object({
        Name: yup.string().required("Saisir le nom d'equipe").min(4).test( (value) => { setname2(value); return true; }),
        Domain: yup.string().required("Saisir le theme ").min(4).test( (value) => { setDomain(value); return true; }),
        id_labo: yup.number().test( (value) => {
            if( value=='' ) setid_labo(null);
            else setid_labo(value);
            return true;
        }),
        // chef_Equipe: yup.string().required("Saisir le nom du chef d'equipe ").min(4).test( (value) => { setchef_Equipe(value); return true; }),
        // id_chef_Equipe: yup.number().required("Saisir une id").test( (value) => { setid_chef_Equipe(value); return true; })
    })
    const AddLabo = ( Labo ) => {
        console.log('Begin of Add');
        fetch('http://34.77.153.247:8000/api/Labs/',{
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Labo)
        }).then( () => functionOfFetching() )
    }
    const AddEquipe = ( Equipe ) => {
        console.log('Begin of Add');
        fetch('http://34.77.153.247:8000/api/Teams/',{
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Equipe)
        }).then( () => functionOfFetching() )
    }
    const deleteLabo = async(item) => {
        // console.log("Var1 : "+Var);
        await fetch('http://34.77.153.247:8000/api/Labs/'+item ,{ method: 'DELETE' })
        .then(response => response.json())
        .then( () => functionOfFetching() )
        .catch( (error) => console.error(error));
        // console.log("Var2 : "+Var);
        // for (let i = 0; i < dataUser.length; i++) {
        //     const element = dataUser[i];
        //     if( element.id == Var ){
        //         EditCompte( { "username": element.username ,"password":"0", "type":"PROF"} ,element.id);                
                // EditEquipe({ "Lab": null },element.id);
                // for (let j = 0; j < dataUser.length; j++) {
                    // const elements = dataUser[j];
                    // if( elements.team == element.id && elements.type == "C_LAB" )  EditCompte( { "username": elements.username ,"password":"0", "type":"PROF"} ,elements.id);
                // }
            // }
        // }
    }
    // const [Var, setVar] = useState('');
    const deleteEquipe = (item) => {
        fetch('http://34.77.153.247:8000/api/Teams/'+item ,{ method: 'DELETE' })
        .then(response => response.json())
        .then( () => functionOfFetching() );
        for (let i = 0; i < dataUser.length; i++) {
            const element = dataUser[i];
            if( element.team == item )  EditCompte({ "username": element.username ,"password":"0", "team":null, "type":"PROF" },element.id)
        }
    }
    const EditEquipe = ( Equipe, id ) => {
        console.log('Begin of Editing team');
        fetch('http://34.77.153.247:8000/api/Teams/'+id , {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Equipe)
        }).then( () => functionOfFetching() )
    }
    useEffect( () => { 
        // BackHandler.addEventListener("hardwareBackPress", function(){navigation.goBack();} );
        functionOfFetching(); 
        // return () => BackHandler.removeEventListener("hardwareBackPress", function(){navigation.goBack();} );
    }, []);
    const [hide, sethide] = useState(false);
    return (
        <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() } >
            <View style={Styles.all}>
                <Modal visible={visMod1} animationType='slide' transparent={false} >
                    <Formik 
                        initialValues={{ Name: '', id_chef_labo: '', Domain: '' }}
                        validationSchema={IsCorrect1}
                        onSubmit={(values, actions) => {
                            console.log("9bek mn add : "+newChefLab);
                            AddLabo({ "name": name1, "C_LAB":newChefLab, "theme":Domain});
                            // setTimeout(() => {
                            functionOfChangeLab();
                            // }, 5000);
                            setAlerting(true);
                            setvisMod1(!visMod1);
                            sethide(false);
                            actions.resetForm();
                        }}
                    >
                        { props =>
                            <View style={Styles.modl}>
                            <KeyboardAwareScrollView centerContent={true} contentContainerStyle={Styles.body1}>      
                                <Text style={Styles.text}>Name : </Text>
                                <TextInput
                                    style={Styles.input}
                                    placeholder="Name"
                                    onChangeText={props.handleChange('Name')}
                                    value={props.values.Name}
                                    onBlur={ props.handleBlur('Name')}
                                />
                                <View style={Styles.Errors}><Text style={Styles.errors}>{ props.touched.Name && props.errors.Name }</Text></View>
                                <Text style={Styles.text}>Les equipes du labo : </Text>
                                <View style={{flexDirection:'column'}}>
                                    <ModalSelector
                                        data={labels2}
                                        initValue="Cliquer pour selecter un equipes !"
                                        initValueTextStyle={{color: 'red', fontFamily: 'Regular403', fontSize: 14}}
                                        style={{backgroundColor: '#fcecdd', borderRadius: 6, marginBottom: '10%', marginHorizontal: '2%'}}
                                        optionStyle={{backgroundColor: '#fcecdd', marginVertical: '0.8%', borderRadius: 16,}}
                                        optionTextStyle={{color: '#ff6701'}}
                                        searchStyle={{backgroundColor:'white',paddingVertical: 5, marginBottom: '2%'}}
                                        searchText="Choisir un equipe"
                                        cancelStyle={{backgroundColor: '#ff6701', marginHorizontal: '6%'}}
                                        cancelTextStyle={{color: '#fcecdd'}}
                                        optionContainerStyle={{backgroundColor: '#ffc288', marginHorizontal: '6%'}}
                                        onModalOpen={ () => fun2() }
                                        onChange={(option)=>{ 
                                            newEquipe = option.key;
                                            sethide(true);
                                            fetch('http://34.77.153.247:8000/api/Team-Users/'+newEquipe)
                                            .then((response) => response.json())
                                            .then((json) => setdataUserOfEquipe(json))
                                            .catch((error) => console.error(error));
                                            console.log(newEquipe);
                                        }} 
                                    />
                                </View>
                                { hide &&
                                <View>
                                    <Text style={Styles.text}>Chef du labo : </Text>
                                    <View style={{flexDirection:'column'}}>
                                        <ModalSelector
                                            data={labels3}
                                            initValue="Cliquer pour selecter un chef du labo !"
                                            initValueTextStyle={{color: 'red', fontFamily: 'Regular403', fontSize: 14}}
                                            style={{backgroundColor: '#fcecdd', borderRadius: 6, marginBottom: '10%', marginHorizontal: '2%'}}
                                            optionStyle={{backgroundColor: '#fcecdd', marginVertical: '0.8%', borderRadius: 16,}}
                                            optionTextStyle={{color: '#ff6701'}}
                                            searchStyle={{backgroundColor:'white',paddingVertical: 5, marginBottom: '2%'}}
                                            searchText="Choisir un chef de labo"
                                            cancelStyle={{backgroundColor: '#ff6701', marginHorizontal: '6%'}}
                                            cancelTextStyle={{color: '#fcecdd'}}
                                            optionContainerStyle={{backgroundColor: '#ffc288', marginHorizontal: '6%'}}
                                            onModalOpen={ () => fun3() }    
                                            onChange={(option)=>{ setnewChefLab(option.key); console.log(newChefLab) }} 
                                        />
                                    </View>
                                </View>
                                }
                                <Text style={Styles.text}>Theme : </Text>
                                <TextInput
                                    style={Styles.input}
                                    placeholder="theme"
                                    onChangeText={props.handleChange('Domain')}
                                    value={props.values.Domain}
                                    onBlur={ props.handleBlur('Domain')}
                                />
                                <View style={Styles.Errors}><Text style={Styles.errors}>{ props.touched.Domain && props.errors.Domain }</Text></View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                                    <TouchableOpacity onPress={ () => props.handleSubmit()} >
                                        <View style={{backgroundColor: '#ff6701', borderRadius: 10, justifyContent: 'center', padding: "9%", width: '100%', marginTop: '25%',}} >
                                            <Text style={{fontSize: 18, color: '#fcecdd', fontWeight: 'bold', textAlign: 'center'}}>Create</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={ () => setvisMod1(!visMod1)} >
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
                <Modal visible={visMod2} animationType='slide' transparent={false} >
                    <Formik 
                        initialValues={{ Name: '', Domain: '', id_labo: '' }}
                        validationSchema={IsCorrect2}
                        onSubmit={(values, actions) => {
                            if( newChefEq != null ){
                                AddEquipe({ "Lab":id_labo, "name":name2, "theme":Domain, "C_EQ":newChefEq, "creation_DateTime":d })
                                setTimeout(() => {
                                    functionOfChangeEq(newChefEq);
                                }, 1000);
                                setAlerting(true);
                                setvisMod2(!visMod2);
                                actions.resetForm();
                                functionOfFetching();
                            }else console.log("chose chef equipe");
                        }}
                    >
                        { props =>
                            <View style={Styles.modl}>
                            <KeyboardAwareScrollView centerContent={true} contentContainerStyle={Styles.body}>      
                                <Text style={Styles.text}>Name : </Text>
                                <TextInput
                                    style={Styles.input}
                                    placeholder="Name"
                                    onChangeText={props.handleChange('Name')}
                                    value={props.values.Name}
                                    onBlur={ props.handleBlur('Name')}
                                />
                                <View style={Styles.Errors}><Text style={Styles.errors}>{ props.touched.Name && props.errors.Name }</Text></View>
                                <Text style={Styles.text}>Theme : </Text>
                                <TextInput
                                    style={Styles.input}
                                    placeholder="theme"
                                    onChangeText={props.handleChange('Domain')}
                                    value={props.values.Domain}
                                    onBlur={ props.handleBlur('Domain')}
                                />
                                <View style={Styles.Errors}><Text style={Styles.errors}>{ props.touched.Domain && props.errors.Domain }</Text></View>
                                <Text style={Styles.text}>Id labo : </Text>
                                <TextInput
                                    keyboardType='numeric'
                                    style={Styles.input}
                                    placeholder="Id labo"
                                    onChangeText={props.handleChange('id_labo')}
                                    value={props.values.id_labo}
                                    onBlur={ props.handleBlur('id_labo')}
                                />
                                <View style={Styles.Errors}><Text style={Styles.errors}>{ props.touched.id_labo && props.errors.id_labo }</Text></View>
                                <Text style={Styles.text}>Chef d'equipe : </Text>
                                <View style={{flexDirection:'column'}}>
                                    <ModalSelector
                                        data={labels1}
                                        initValue="Cliquer pour selecter un chef d'equipe !"
                                        initValueTextStyle={{color: 'red', fontFamily: 'Regular403', fontSize: 14}}
                                        style={{backgroundColor: '#fcecdd', borderRadius: 6, marginBottom: '10%', marginHorizontal: '2%'}}
                                        optionStyle={{backgroundColor: '#fcecdd', marginVertical: '0.8%', borderRadius: 16,}}
                                        optionTextStyle={{color: '#ff6701'}}
                                        searchStyle={{backgroundColor:'white',paddingVertical: 5, marginBottom: '2%'}}
                                        searchText="Choisir un chef d'equipe"
                                        cancelStyle={{backgroundColor: '#ff6701', marginHorizontal: '6%'}}
                                        cancelTextStyle={{color: '#fcecdd'}}
                                        optionContainerStyle={{backgroundColor: '#ffc288', marginHorizontal: '6%'}}
                                        onModalOpen={ () => fun1()}      
                                        onChange={(option)=>{ setnewChefEq(option.key) }} 
                                    />
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                                    <TouchableOpacity onPress={ () => props.handleSubmit()} >
                                        <View style={{backgroundColor: '#ff6701', borderRadius: 10, justifyContent: 'center', padding: "9%", width: '100%', marginTop: '25%',}} >
                                            <Text style={{fontSize: 18, color: '#fcecdd', fontWeight: 'bold', textAlign: 'center'}}>Create</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={ () => setvisMod2(!visMod2)} >
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
                <View style={{ marginTop: 8, marginLeft: 9, marginBottom: "-50%", paddingBottom: 0, flex: 1, width: '100%'}} >
                    <Feather name='arrow-left' color="red" size={35} onPress={ () => navigation.goBack()} />
                </View>
                { !panding1 && !panding2 &&
                <View style={{flex: 1, marginTop: '-50%'}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: "-25%", paddingVertical: 5, flex:0.5, marginBottom: '-15%' }}>
                        <View style={{marginLeft: "-18%"}}><Text style={{fontSize: 23, color: '#ff6701', fontFamily: 'Regular403', textShadowColor: "#ffc288", textShadowRadius: 8 }}>Labos</Text></View>
                        <Avatar
                            rounded
                            backgroundColor="grey"
                            size="small"
                            icon={{name: 'add', color: "#ff6701", type: 'Ionicons', size: 40 }}
                            containerStyle={{ marginRight: "-18%"}}
                            onPress={ () => setvisMod1(!visMod1)}
                        >
                        </Avatar>
                    </View>
                    <View style={{maxHeight: 400, flex:1}}>
                        <KeyboardAwareScrollView refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> } >
                            <ScrollView style={Styles.search}>
                                { dataLabo.map( (item) => 
                                    <Animatable.View delay= {300} animation="fadeInDown" key={item.id}>
                                        <Swipeout 
                                            right={[{
                                                backgroundColor: 'transparent',
                                                onPress: () => { setAlertingDeleteLabo(true); setidOfDel(item.id); setVar(item.C_LAB) },
                                                color: '#ff6701',
                                                component: ( <Feather size={33} name='trash-2' color='#ff6701' style={{alignSelf: 'center', marginTop: '18%'}} /> )
                                            }]}
                                            left={[{
                                                backgroundColor: 'transparent',
                                                onPress: () => { navigation.navigate("LaboDetails", { dataa:item, bol: true}); console.log(item.id) },
                                                color: '#ff6701',
                                                component: ( <Feather size={33} name='edit-2' color='#ff6701' style={{alignSelf: 'center', marginTop: '18%'}} /> )
                                            }]}
                                            backgroundColor={"transparent"} close autoClose
                                        >
                                            <TouchableOpacity onPress={ () => navigation.navigate("LaboDetails", { dataa:item, bol: false}) } >
                                                <View style={Styles.card}><Text style={Styles.title}>{ item.name }</Text></View>
                                            </TouchableOpacity>
                                        </Swipeout>
                                    </Animatable.View>
                                )}
                            </ScrollView>
                        </KeyboardAwareScrollView>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingTop: '5%', flex:0.5, marginBottom: '-15%'}}>
                        <View style={{marginLeft: "-18%"}}><Text style={{fontSize: 23, color: '#ff6701', fontFamily: 'Regular403', textShadowColor: "#ffc288", textShadowRadius: 8 }}>Equipes</Text></View>
                        <Avatar
                            rounded     backgroundColor="grey"      size="small"
                            icon={{name: 'add', color: "#ff6701", type: 'Ionicons', size: 40 }}
                            containerStyle={{ marginRight: "-18%"}}     onPress={ () => setvisMod2(!visMod2)}
                        >
                        </Avatar>
                    </View>
                    <View style={{maxHeight: 400, marginBottom: 20, flex:1}}>
                        <KeyboardAwareScrollView>
                            <ScrollView style={Styles.search}>
                                { dataEquipe.map( (item) => item.Lab == null && 
                                    <Animatable.View delay= {300} animation="fadeInDown" key={item.id}>
                                        <Swipeout 
                                            right={[
                                                {
                                                    backgroundColor: 'transparent',
                                                    onPress: () => { setAlertingDeleteEquipe(true); setidOfDel(item.id) },
                                                    color: '#ff6701',
                                                    component: ( <Feather size={33} name='trash-2' color='#ff6701' style={{alignSelf: 'center', marginTop: '18%'}} /> )
                                                }
                                            ]}
                                            left={[
                                                {
                                                    backgroundColor: 'transparent',
                                                    onPress: () => { navigation.navigate("Team", { dataa:item, bol: true}); console.log(item.id) },
                                                    color: '#ff6701',
                                                    component: ( <Feather size={33} name='edit-2' color='#ff6701' style={{alignSelf: 'center', marginTop: '18%'}} /> )
                                                }
                                            ]}
                                            backgroundColor={"transparent"} close autoClose
                                        >
                                            <TouchableOpacity onPress={ () => navigation.navigate("Team", { dataa:item, bol: false} )} >
                                                <View style={Styles.card}>
                                                    <Text style={Styles.title}>{ item.name }</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </Swipeout>
                                    </Animatable.View>
                                )}
                            </ScrollView>
                            <AwesomeAlert
                                show={Alerting}                             title="Adding"
                                message="Added Succesfuly"                  closeOnTouchOutside={false}
                                closeOnHardwareBackPress={false}            showConfirmButton={true}
                                confirmText="Greate"                        confirmButtonColor="#DD6B55"
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
                                show={AlertingDeleteLabo}                                   title="Deleting"
                                message="Are you sure you want to delete this Labo ?"       closeOnTouchOutside={false}
                                closeOnHardwareBackPress={false}                            showCancelButton={true}
                                showConfirmButton={true}                                    cancelText="No"
                                confirmText="Oui"                                           confirmButtonColor="#DD6B55"
                                onCancelPressed={() => setAlertingDeleteLabo(false) }
                                contentContainerStyle={{backgroundColor: '#fcecdd'}}
                                titleStyle={{ fontFamily: 'Regular404'}}        messageStyle={{ fontFamily: 'Regular403' }}
                                onConfirmPressed={() => {
                                setAlertingDeleteLabo(false);   setAlertingSucc(true);
                                deleteLabo(idOfDel);    functionOfFetching();
                                }}
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
                    </View>
                </View>}
                {panding2 && <AwesomeAlert show={panding2} showProgress={true} progressColor="#DD6B55" progressSize={40} closeOnTouchOutside={false} closeOnHardwareBackPress={false}/>}
                {panding1 && <AwesomeAlert show={panding1} showProgress={true} progressColor="#DD6B55" progressSize={40} closeOnTouchOutside={false} closeOnHardwareBackPress={false}/>}
            </View>
        </TouchableWithoutFeedback>
    );
}

const Styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffefcf',
        marginVertical: 5,
        minHeight: 40,
        borderRadius: 7,
        padding: '3%',
        flex: 1,
        marginHorizontal: '2%',
        justifyContent: 'center',
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
        width: "80%",        
        marginHorizontal: "6%",
        // flex: 1,
        // width: 320,
        borderRadius: 10,
        // paddingHorizontal: 5,
        // marginVertical: 3,
        flexDirection: 'column',
        alignSelf: 'center'
    },
    all: {
        flex: 1,
        backgroundColor: '#fcecdd'
    },
    body1: {
        width: '96%',
        maxHeight: 650,
        flexDirection: 'column',
        margin: "2%",
        paddingHorizontal: '4%',
        paddingVertical: '8%',
    },
    body: {
        width: '96%',
        maxHeight: 950,
        flexDirection: 'column',
        margin: "2%",
        paddingHorizontal: '4%',
        paddingVertical: '8%',
    },
    text: {
        fontSize: 18,
        fontFamily: 'Regular403',
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
        minHeight: 48,
        marginBottom: 4,
        backgroundColor: '#fcecdd'
    },
    Errors: { alignItems: 'flex-end', paddingVertical: 3, paddingRight: 4 },
    errors: { fontSize: 13, color: '#ff6701' },
    modl: {
        flex: 1,
        backgroundColor: '#ffc288',
    }
})