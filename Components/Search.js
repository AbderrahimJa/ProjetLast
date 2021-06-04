import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, RefreshControl } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import ModalDropdown from 'react-native-modal-dropdown';
import * as Animatable from 'react-native-animatable';
import { Avatar, Divider } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Elevations from 'react-native-elevation';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function Search( { navigation } ){
    const [dataUser, setdataUser] = useState([]);           const [dataEquipe, setdataEquipe] = useState([]);
    const [dataLabo, setdataLabo] = useState([]);           const [ SearUser, setSearUser ] = useState([]);
    const [ SearEquipe, setSearEquipe ] = useState([]);     const [ SearLabo, setSearLabo ] = useState([]);
    const [refreshing, setRefreshing] = useState(false);    const [panding1, setpanding1] = useState(true);
    const [panding2, setpanding2] = useState(true);         const [panding3, setpanding3] = useState(true);
    const onRefresh = React.useCallback(() => { setRefreshing(true); wait(2000).then(() => setRefreshing(false)); functionOfFetching(); }, []);
    // const [ Val , setVal ] = useState('');
    // let val = '' ;
    const [Filtring, setFiltring] = useState('Tous');
    // let Filtring = 'Tous';
    const Searching = () => {
        setSearEquipe([]);      setSearLabo([]);    setSearUser([]);
        if( val != '' ){
            let ch = val.toUpperCase();
            if( Filtring!="Labos" && Filtring!="Comptes" ){
                if( val == '*' ){
                    setSearEquipe(dataEquipe);
                }else{
                    for( let i = 0 ; i < dataEquipe.length ; i++ ){
                        let sh = dataEquipe[i].name.toUpperCase() ;
                        if( sh.includes(ch)){
                            setSearEquipe((Last) => {
                                return [dataEquipe[i], ...Last];
                            });
                        }
                    }
                }
            }
            if( Filtring!="Labos" && Filtring!="Equipes" ){
                if( val == '*' ){
                    setSearUser(dataUser);
                }else{
                    for( let i = 0 ; i < dataUser.length ; i++ ){
                        let sh = dataUser[i].first_name.toUpperCase() ;
                        if( sh.includes(ch)){
                            setSearUser((Last) => {
                                return [dataUser[i], ...Last];
                            });
                        }
                    }
                }
            }
            if( Filtring!="Comptes" && Filtring!="Equipes" ){
                if( val == '*' ){
                    setSearLabo(dataLabo);
                }else{
                    for( let i = 0 ; i < dataLabo.length ; i++ ){
                        let sh = dataLabo[i].name.toUpperCase() ;
                        if( sh.includes(ch)){
                            setSearLabo((Last) => {
                                return [dataLabo[i], ...Last];
                            });
                        }
                    }
                }
            }
        }
    }
    const functionOfFetching = () => {
        fetch('http://34.77.153.247:8000/api/Users/')
        .then((response) => response.json())
        .then( (data) => setdataUser(data))
        .then( () => setpanding1(false))
        .catch((error) => console.error(error));
        fetch('http://34.77.153.247:8000/api/Labs/')
        .then((response) => response.json())
        .then( (data) => setdataLabo(data))
        .then( () => setpanding2(false))
        .catch((error) => console.error(error));
        fetch('http://34.77.153.247:8000/api/Teams/')
        .then((response) => response.json())
        .then( (data) => setdataEquipe(data))
        .then( () => setpanding3(false))
        .catch((error) => console.error(error));
    }
    useEffect( () => {
        functionOfFetching();
    }, []);
    const [val, setVal] = useState('');
    return (
        <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() } >
            <View style={Styles.body}>
                    <Animatable.View delay= {100} animation="slideInRight" style={{marginBottom: 10}}>
                        <View style={Styles.SearchSpace}>
                            <View style={{ marginLeft: '3%'}}>
                            <TouchableOpacity>
                                <Feather name="search" size= {30} color= '#ff6701' style={Styles.icon} onPress={ () => Searching() } />
                            </TouchableOpacity>
                            </View>
                            <TextInput 
                                placeholder="Search"    placeholderTextColor="#666666"  style={Styles.textInput}
                                autoCapitalize="none"   value={val}     
                                onChangeText={ Val =>{ 
                                    // setVal(val);
                                    setVal(Val);
                                    // val = Val;
                                    // setTimeout(() => {
                                        Searching() ;
                                    // }, 3000);
                                }}
                            />
                            { val!='' &&
                                <Feather
                                    name="delete"   size= {30}  color= '#ff6701'    style={Styles.icon}
                                    onPress={ () => { 
                                        // setVal(''), 
                                        setVal('');
                                        // val = '';
                                        setSearLabo([]); setSearUser([]); setSearEquipe([]); }}
                                />
                            }
                        </View>
                        <ModalDropdown
                            options={['Tous', 'Comptes', 'Labos', 'Equipes']}       dropdownTextStyle={{fontSize: 16}}
                            style={{backgroundColor: '#fcecdd', width: '25%', alignItems:'center', paddingVertical: 4, borderRadius: 3, marginRight: "6%", alignSelf: 'flex-end'}}
                            textStyle={{fontSize: 16, fontWeight: 'bold', fontStyle: 'italic', color: '#ff6701', padding: '2%'}}     dropdownTextHighlightStyle={{color: '#ff6701'}}
                            defaultIndex={0}        defaultValue='Tous'
                            onSelect={(itemIndex, itemValue) =>{
                                console.log(itemValue);
                                setFiltring(itemValue);
                                // Filtring = itemValue;  
                                // setTimeout(() => {
                                Searching();
                                // }, 1000);
                                // Searching()
                            }}
                            accessible={true}       dropdownStyle={{height: 168.5, marginTop: -20, marginLeft: -13 }}
                        />   
                    </Animatable.View>
                    <KeyboardAwareScrollView refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> } >
                    <View style={Styles.search}>
                        { !panding3 && SearEquipe.map( (item) => 
                            <Animatable.View delay= {300} animation="fadeInDown" key={item.id}>
                                <TouchableOpacity onPress={ () => navigation.navigate("Team", { dataa:item, bol: false}) } >
                                    <View style={[Styles.card,{backgroundColor: '#f2dac3',}]}>
                                        <Text style={Styles.title}>{ item.name }</Text>
                                        {/* <Text style={Styles.title}>{ item.Equipe_Members.length } Profs</Text> */}
                                    </View>
                                </TouchableOpacity>
                            </Animatable.View>
                        )}
                        { !panding2 && SearLabo.map( (item) => 
                            <Animatable.View delay= {300} animation="fadeInDown" key={item.id}>
                                <TouchableOpacity onPress={ () => navigation.navigate("LaboDetails", { dataa:item, bol: false}) } >
                                    <View style={[Styles.card,{backgroundColor: '#c8c2bc',}]}>
                                        <Text style={Styles.title}>{ item.name }</Text>
                                    </View>
                                </TouchableOpacity>
                            </Animatable.View>
                        )}
                        { !panding1 && SearUser.map( (item) => 
                            <Animatable.View delay= {300} animation="fadeInDown" key={item.id}>
                                <TouchableOpacity onPress={ () => navigation.navigate("User", item) } >
                                    <View style={[Styles.card,{backgroundColor: '#ffefcf', flexDirection: 'row',}]}>
                                        <Avatar
                                            rounded
                                            size="medium"
                                            source= { require('../profile1.png')}
                                            // source= {{uri:item.image}}
                                            // containerStyle ={{ alignSelf: 'center'}}
                                        >
                                        </Avatar>
                                        <View style={{marginLeft: '3%', alignSelf: 'center'}}><Text style={Styles.title}>{ item.first_name+' '+item.last_name }</Text></View>
                                    </View>
                                </TouchableOpacity>
                            </Animatable.View>
                        )}
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </TouchableWithoutFeedback>
    );
}

const Styles = StyleSheet.create({
    card: {
        backgroundColor: 'silver',
        minHeight: 50,
        borderRadius: 7,
        padding: 10,
        flex: 1,
        marginVertical: 5,
        ...Elevations[3],
    },
    title: { fontSize: 19, color: 'coral', fontFamily: 'Regular403', textAlign: 'center' },
    search: {
        flex: 1,
        padding: 10,
        paddingHorizontal: 30,
        justifyContent: 'center',
        marginTop: 3,
        flexDirection: 'column',
    },
    imag: { flex: 1, resizeMode: "cover", justifyContent: "center" },
    textInput: { flex: 1, height: 40, paddingLeft: 15, fontSize: 16 },
    SearchSpace: {
        backgroundColor: '#fcecdd',
        padding: 4,
        marginVertical: "4%",
        marginTop: '13%',
        borderRadius: 25,
        marginHorizontal: "4%",
        alignContent: 'center',
        flexDirection: 'row',
    }, 
    icon: { marginHorizontal: 9, marginTop: 6 },
    body: {
        flex: 1,
        backgroundColor: '#ffc288',
    }
})