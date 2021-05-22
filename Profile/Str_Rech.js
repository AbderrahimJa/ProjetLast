import React, { useState, useEffect } from 'react';
import { StatusBar, View, RefreshControl, Text, StyleSheet, ImageBackground, FlatList, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Modal, TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import { Avatar } from 'react-native-elements';
import StickyHeaderFooterScrollView from 'react-native-sticky-header-footer-scroll-view';
import { RadioButton } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import * as yup from 'yup';
import AwesomeAlert from 'react-native-awesome-alerts';
import { ScrollView } from 'react-native-gesture-handler';
import Elevations from 'react-native-elevation';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function Str_Rech( { navigation } ){
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
        functionOfFetching();
    }, []);
    const functionOfFetching = () => {
        setTimeout(() => {
            fetch('https://massive-monkey-9.loca.lt/Users')
            .then((response) => response.json())
            .then((json) => setdataUser(json))
            // .then( () => setpanding1(false))
            .catch((error) => console.error(error));
            fetch('https://massive-monkey-9.loca.lt/Labos')
            .then((response) => response.json())
            .then((json) => setdataLabo(json))
            .then( () => setpanding1(false))
            .catch((error) => console.error(error));
            fetch('https://massive-monkey-9.loca.lt/Equipe')
            .then((response) => response.json())
            .then((json) => setdataEquipe(json))
            .then( () => setpanding2(false))
            .catch((error) => console.error(error));
        }, 500);
    }
    const d = new Date().toLocaleDateString();
    const [dataUser, setdataUser] = useState([]);
    const [dataLabo, setdataLabo] = useState([]);
    const [dataEquipe, setdataEquipe] = useState([]);
    const [visMod1, setvisMod1] = useState(false);
    const [visMod2, setvisMod2] = useState(false);
    const [name1, setname1] = useState('');
    const [name2, setname2] = useState('');
    const [Departement, setDepartement] = useState('');
    const [Domain, setDomain] = useState('');
    const [id1, setid1] = useState('');
    const [id2, setid2] = useState('');
    const [chef_Equipe, setchef_Equipe] = useState('');
    const [id_chef_Equipe, setid_chef_Equipe] = useState('');
    const [id_labo, setid_labo] = useState('');
    const [Equipe_Members, setEquipe_Members] = useState([]);
    const [id_chef_labo, setid_chef_labo] = useState('');
    const [name_chef_labo, setname_chef_labo] = useState('');
    const [Alerting, setAlerting] = useState(false);
    const [AlertingSucc, setAlertingSucc] = useState(false);
    const [AlertingDeleteLabo, setAlertingDeleteLabo] = useState(false);
    const [AlertingDeleteEquipe, setAlertingDeleteEquipe] = useState(false);
    const [idOfDel, setidOfDel] = useState('');
    const [panding1, setpanding1] = useState(true);
    const [panding2, setpanding2] = useState(true);
    const IsCorrect1 = yup.object({
        Name: yup.string().required("Please enter a name").min(4).test( (value) => {
            setname1(value);
            return true;
        }),
        Departement: yup.string().required("Please enter the name of Departement").min(4).test( (value) => {
            setDepartement(value);
            return true;
        }),
        id_chef_labo: yup.number().required("Please enter an id").test( (value) => {
            setid_chef_labo(value);
            return true;
        }),
        Id: yup.number().required("Please enter an id").test( (value) => {
            setid1(value);
            return true;
        }),
        name_chef_labo: yup.string().required("Please enter the name of chef labo ").min(4).test( (value) => {
            setname_chef_labo(value);
            return true;
        })
    })
    const IsCorrect2 = yup.object({
        Name: yup.string().required("Please enter a name").min(4).test( (value) => {
            setname2(value);
            return true;
        }),
        Domain: yup.string().required("Please enter the name of Domain").min(4).test( (value) => {
            setDomain(value);
            return true;
        }),
        id_labo: yup.number().test( (value) => {
            if( value=='' ) setid_labo(null);
            else setid_labo(value);
            return true;
        }),
        Id: yup.number().required("Please enter an id").test( (value) => {
            setid2(value);
            return true;
        }),
        chef_Equipe: yup.string().required("Please enter the name of chef d'equipe ").min(4).test( (value) => {
            setchef_Equipe(value);
            return true;
        }),
        id_chef_Equipe: yup.number().required("Please enter an id").test( (value) => {
            setid_chef_Equipe(value);
            return true;
        })
    })
    const AddLabo = ( Labo ) => {
        // const Labo = { "id":id, "email":Email, "username":name, "nikname":nikname, "password":passP, "image":1, "type":checked};
        console.log('Begin of Add');
        fetch('https://massive-monkey-9.loca.lt/Labos',{
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Labo)
        }).then( () => {
            console.log('New Labo Added');
        })
    }
    const AddEquipe = ( Equipe ) => {
        // const Equipe = { "id":id, "email":Email, "username":name, "nikname":nikname, "password":passP, "image":1, "type":checked};
        console.log('Begin of Add');
        fetch('https://massive-monkey-9.loca.lt/Equipe',{
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Equipe)
        }).then( () => {
            console.log('New Equipe Added');
        })
    }
    const deleteLabo = (item) => {
        fetch('https://massive-monkey-9.loca.lt/Labos/'+item ,{
          method: 'DELETE'
        })
        .then(response => response.json())
        .then( () => console.log('Done'));
    }
    const deleteEquipe = (item) => {
        fetch('https://massive-monkey-9.loca.lt/Equipe/'+item ,{
          method: 'DELETE'
        })
        .then(response => response.json())
        .then( () => console.log('Done'));
    }
    useEffect( () => {
        functionOfFetching();
    }, []);
    return (
        <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() } >
            <ImageBackground source={ require('../3132.jpg') } style={Styles.imag} >
                <View style={{ marginTop: 8, marginLeft: 9, marginBottom: "8%", paddingBottom: 10, flex: 1, width: '100%'}} >
                    <Feather name='arrow-left' color="red" size={35} onPress={ () => navigation.goBack()} />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: "-15%", paddingVertical: 10, flex:1 }}>
                    <View style={{marginLeft: "-18%"}}><Text style={{fontSize: 23, color: '#ff6701', fontWeight: "bold", textShadowColor: "grey", textShadowRadius: 8 }}>Labos</Text></View>
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
                <Modal visible={visMod1} animationType='slide' transparent={true} >
                    <Formik 
                    initialValues={{ Name: '', Departement: '', Id: '', id_chef_labo: '', name_chef_labo: '' }}
                    validationSchema={IsCorrect1}
                    onSubmit={(values, actions) => {
                        AddLabo({ "id":id1, "name": name1, "Departement":Departement, "id_chef_labo":id_chef_labo, "name_chef_labo":name_chef_labo})
                        setAlerting(true);
                        setvisMod1(!visMod1);
                        actions.resetForm();
                        functionOfFetching();
                    }}
                >
                    { props =>
                        <ImageBackground
                            source={ require('../3132.jpg') }
                            style={Styles.imag}
                        >
                        <KeyboardAwareScrollView centerContent={true} contentContainerStyle={Styles.body1}>      
                            <Text style={Styles.text}>Name : </Text>
                            <TextInput
                                style={Styles.input}
                                placeholder="Name"
                                onChangeText={props.handleChange('Name')}
                                value={props.values.Name}
                                onBlur={ props.handleBlur('Name')}
                            />
                            <View style={Styles.Errors}>
                                <Text style={Styles.errors}>{ props.touched.Name && props.errors.Name }</Text>
                            </View>
                            <Text style={Styles.text}>Departement : </Text>
                            <TextInput
                                style={Styles.input}
                                placeholder="Departement"
                                onChangeText={props.handleChange('Departement')}
                                value={props.values.Departement}
                                onBlur={ props.handleBlur('Departement')}
                            />
                            <View style={Styles.Errors}>
                                <Text style={Styles.errors}>{ props.touched.Departement && props.errors.Departement }</Text>
                            </View>
                            <Text style={Styles.text}>id de chef labo : </Text>
                            <TextInput
                                keyboardType='numeric'
                                style={Styles.input}
                                placeholder="id chef labo"
                                onChangeText={props.handleChange('id_chef_labo')}
                                value={props.values.id_chef_labo}
                                onBlur={ props.handleBlur('id_chef_labo')}
                            />
                            <View style={Styles.Errors}>
                                <Text style={Styles.errors}>{ props.touched.id_chef_labo && props.errors.id_chef_labo }</Text>
                            </View>
                            <Text style={Styles.text}>Id : </Text>
                            <TextInput
                                keyboardType='numeric'
                                style={Styles.input}
                                placeholder="Id"
                                onChangeText={props.handleChange('Id')}
                                value={props.values.Id}
                                onBlur={ props.handleBlur('Id')}
                            />
                            <View style={Styles.Errors}>
                                <Text style={Styles.errors}>{ props.touched.Id && props.errors.Id }</Text>
                            </View>
                            <Text style={Styles.text}>name chef labo : </Text>
                            <TextInput
                                style={Styles.input}
                                placeholder="name chef labo"
                                onChangeText={props.handleChange('name_chef_labo')}
                                value={props.values.name_chef_labo}
                                onBlur={ props.handleBlur('name_chef_labo')}
                            />
                            <View style={Styles.Errors}>
                                <Text style={Styles.errors}>{ props.touched.name_chef_labo && props.errors.name_chef_labo }</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                                <TouchableOpacity onPress={ () => props.handleSubmit()} >
                                    <View style={{backgroundColor: 'grey', borderRadius: 10, justifyContent: 'center', padding: "9%", width: '100%', marginTop: '25%',}} >
                                        <Text style={{fontSize: 18, color: 'red', fontWeight: 'bold', textAlign: 'center'}}>Create</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={ () => setvisMod1(!visMod1)} >
                                    <View style={{backgroundColor: 'grey', borderRadius: 10, justifyContent: 'center', padding: "9%", width: '100%', marginTop: '25%',}} >
                                        <Text style={{fontSize: 18, color: 'red', fontWeight: 'bold', textAlign: 'center'}}>Cancel</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAwareScrollView>
                        </ImageBackground>
                    }
                </Formik>
            </Modal>
            <View style={{maxHeight: 225}}>
            <KeyboardAwareScrollView refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> } >
            <ScrollView style={Styles.search}>
            {panding1 && <AwesomeAlert show={panding1} showProgress={true} progressColor="#DD6B55" progressSize={40} closeOnTouchOutside={false} closeOnHardwareBackPress={false}/>}
            {/* <ScrollView style={Styles.search}> */}
                { dataLabo.map( (item) => 
                    <Animatable.View delay= {300} animation="fadeInDown" key={item.id}>
                        <TouchableOpacity onPress={ () => navigation.navigate("LaboDetails", item)} >
                            <View style={Styles.card}>
                                <Text style={Styles.title}>{ item.name }</Text>
                                <Avatar
                                    rounded
                                    backgroundColor="grey"
                                    size="small"
                                    icon={{name: 'trash-alt', color: "#ff6701", type: 'font-awesome-5', size: 26 }}
                                    onPress={ () => {setAlertingDeleteLabo(true); setidOfDel(item.id) }}
                                />
                            </View>
                        </TouchableOpacity>
                    </Animatable.View>
                )}
                </ScrollView>
            </KeyboardAwareScrollView>
            </View>
            <Modal
                style={{backgroundColor: 'aqua'}}
                visible={visMod2}
                animationType='slide'
                transparent={true}
            >
                <Formik 
                    initialValues={{ Name: '', Domain: '', id_labo: '', Id: '', chef_Equipe: '', id_chef_Equipe: '' }}
                    validationSchema={IsCorrect2}
                    onSubmit={(values, actions) => {
                        AddEquipe({ "id":id2, "id_Labo":id_labo, "name":name2, "Domain":Domain, "chef_Equipe":chef_Equipe, "id_chef_Equipe":id_chef_Equipe, "Date_Creation":d, "Equipe_Members":Equipe_Members })
                        setAlerting(true);
                        setvisMod2(!visMod2);
                        actions.resetForm();
                        functionOfFetching();
                    }}
                >
                    { props =>
                        <ImageBackground
                            source={ require('../3132.jpg') }
                            style={Styles.imag}
                        >
                        <KeyboardAwareScrollView centerContent={true} contentContainerStyle={Styles.body}>      
                            <Text style={Styles.text}>Name : </Text>
                            <TextInput
                                style={Styles.input}
                                placeholder="Name"
                                onChangeText={props.handleChange('Name')}
                                value={props.values.Name}
                                onBlur={ props.handleBlur('Name')}
                            />
                            <View style={Styles.Errors}>
                                <Text style={Styles.errors}>{ props.touched.Name && props.errors.Name }</Text>
                            </View>
                            <Text style={Styles.text}>Domain : </Text>
                            <TextInput
                                style={Styles.input}
                                placeholder="Domain"
                                onChangeText={props.handleChange('Domain')}
                                value={props.values.Domain}
                                onBlur={ props.handleBlur('Domain')}
                            />
                            <View style={Styles.Errors}>
                                <Text style={Styles.errors}>{ props.touched.Domain && props.errors.Domain }</Text>
                            </View>
                            <Text style={Styles.text}>Id labo : </Text>
                            <TextInput
                                keyboardType='numeric'
                                style={Styles.input}
                                placeholder="Id labo"
                                onChangeText={props.handleChange('id_labo')}
                                value={props.values.id_labo}
                                onBlur={ props.handleBlur('id_labo')}
                            />
                            <View style={Styles.Errors}>
                                <Text style={Styles.errors}>{ props.touched.id_labo && props.errors.id_labo }</Text>
                            </View>
                            <Text style={Styles.text}>Id d'equipe: </Text>
                            <TextInput
                                keyboardType='numeric'
                                style={Styles.input}
                                placeholder="Id d'equipe"
                                onChangeText={props.handleChange('Id')}
                                value={props.values.Id}
                                onBlur={ props.handleBlur('Id')}
                            />
                            <View style={Styles.Errors}>
                                <Text style={Styles.errors}>{ props.touched.Id && props.errors.Id }</Text>
                            </View>
                            <Text style={Styles.text}>Chef d'equipe : </Text>
                            <TextInput
                                style={Styles.input}
                                placeholder="Chef d'equipe"
                                onChangeText={props.handleChange('chef_Equipe')}
                                value={props.values.chef_Equipe}
                                onBlur={ props.handleBlur('chef_Equipe')}
                            />
                            <View style={Styles.Errors}>
                                <Text style={Styles.errors}>{ props.touched.chef_Equipe && props.errors.chef_Equipe }</Text>
                            </View>
                            <Text style={Styles.text}>Id de chef d'equipe : </Text>
                            <TextInput
                                keyboardType='numeric'
                                style={Styles.input}
                                placeholder="Id de chef d'equipe"
                                onChangeText={props.handleChange('id_chef_Equipe')}
                                value={props.values.id_chef_Equipe}
                                onBlur={ props.handleBlur('id_chef_Equipe')}
                            />
                            <View style={Styles.Errors}>
                                <Text style={Styles.errors}>{ props.touched.id_chef_Equipe && props.errors.id_chef_Equipe }</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                                <TouchableOpacity
                                    // onPress={ () => console.log(passP)}
                                    onPress={ () => props.handleSubmit()}
                                >
                                    <View style={{backgroundColor: 'grey', borderRadius: 10, justifyContent: 'center', padding: "9%", width: '100%', marginTop: '25%',}} >
                                        <Text style={{fontSize: 18, color: 'red', fontWeight: 'bold', textAlign: 'center'}}>Create</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={ () => setvisMod2(!visMod2)}
                                >
                                    <View style={{backgroundColor: 'grey', borderRadius: 10, justifyContent: 'center', padding: "9%", width: '100%', marginTop: '25%',}} >
                                        <Text style={{fontSize: 18, color: 'red', fontWeight: 'bold', textAlign: 'center'}}>Cancel</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAwareScrollView>
                        </ImageBackground>
                    }
                </Formik>
            </Modal>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, flex:1}}>
                <View style={{marginLeft: "-18%"}}><Text style={{fontSize: 23, color: '#ff6701', fontWeight: "bold", textShadowColor: "grey", textShadowRadius: 8 }}>Equipes</Text></View>
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
            <View style={{maxHeight: 225, marginBottom: 20}}>
            <KeyboardAwareScrollView>
            {panding2 && <AwesomeAlert show={panding2} showProgress={true} progressColor="#DD6B55" progressSize={40} closeOnTouchOutside={false} closeOnHardwareBackPress={false}/>}
            <ScrollView style={Styles.search}>
                { dataEquipe.map( (item) => 
                    <Animatable.View delay= {300} animation="fadeInDown" key={item.id}>
                        <TouchableOpacity onPress={ () => navigation.navigate("Team", item )} >
                            <View style={Styles.card}>
                                <Text style={Styles.title}>{ item.name }</Text>
                                <Avatar
                                    rounded
                                    backgroundColor="grey"
                                    size="small"
                                    icon={{name: 'trash-alt', color: "#ff6701", type: 'font-awesome-5', size: 26 }}
                                    onPress={ () => {setAlertingDeleteEquipe(true); setidOfDel(item.id) }}
                                />
                            </View>
                        </TouchableOpacity>
                    </Animatable.View>
                )}
            </ScrollView>
            <AwesomeAlert
                show={Alerting}
                showProgress={false}
                progressColor="#DD6B55"
                progressSize={50}
                title="Adding"
                message="Added Succesfuly"
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                // cancelText="No"
                confirmText="Greate"
                confirmButtonColor="#DD6B55"
                onConfirmPressed={() => {
                    setAlerting(false);
                }}
            />
            <AwesomeAlert
                    show={AlertingSucc}
                    showProgress={false}
                    progressColor="#DD6B55"
                    progressSize={50}
                    title="Deleting"
                    message="Delete Succesfuly"
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={true}
                    confirmText="Greate"
                    confirmButtonColor="#DD6B55"
                    onConfirmPressed={() => {
                        setAlertingSucc(false);
                    }}
                />
                <AwesomeAlert
                    show={AlertingDeleteLabo}
                    showProgress={false}
                    progressColor="#DD6B55"
                    progressSize={50}
                    title="Deleting"
                    message="Are you sure you want to delete this Labo ?"
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="No"
                    confirmText="Oui"
                    confirmButtonColor="#DD6B55"
                    onCancelPressed={() => {
                        setAlertingDeleteLabo(false);
                    }}
                    onConfirmPressed={() => {
                        setAlertingDeleteLabo(false);
                        setAlertingSucc(true);
                        deleteLabo(idOfDel);
                        functionOfFetching();
                    }}
                />
                <AwesomeAlert
                    show={AlertingDeleteEquipe}
                    showProgress={false}
                    progressColor="#DD6B55"
                    progressSize={50}
                    title="Deleting"
                    message="Are you sure you want to delete this account ?"
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="No"
                    confirmText="Oui"
                    confirmButtonColor="#DD6B55"
                    onCancelPressed={() => {
                        setAlertingDeleteEquipe(false);
                    }}
                    onConfirmPressed={() => {
                        setAlertingDeleteEquipe(false);
                        setAlertingSucc(true);
                        deleteEquipe(idOfDel);
                        functionOfFetching();
                    }}
                />
            </KeyboardAwareScrollView>
            </View>
            {/* </StickyHeaderFooterScrollView> */}
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
    body1: {
        // backgroundColor: '#F1EADF',
        width: '96%',
        height: 650,
        // flex: 2,
        flexDirection: 'column',
        // justifyContent: 'center',
        margin: "2%",
        padding: 10,
    },
    body: {
        // backgroundColor: 'aqua',
        width: '96%',
        height: 950,
        // flex: 2,
        flexDirection: 'column',
        // justifyContent: 'center',
        margin: "2%",
        padding: 10,
    },
    text: {
        fontSize: 17,
        paddingLeft: '3%',
        paddingVertical: "2%",
        color: 'black',
        fontWeight: 'bold',
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