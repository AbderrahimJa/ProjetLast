import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, RefreshControl } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import ModalDropdown from 'react-native-modal-dropdown';
import * as Animatable from 'react-native-animatable';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function Search( { navigation } ){
    const [dataUser, setdataUser] = useState([]);
    const [dataEquipe, setdataEquipe] = useState([]);
    const [dataLabo, setdataLabo] = useState([]);
    const [ SearUser, setSearUser ] = useState([]);
    const [ SearEquipe, setSearEquipe ] = useState([]);
    const [ SearLabo, setSearLabo ] = useState([]);
    const [ val , setVal ] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [Filtring, setFiltring] = useState('Tous');
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
        functionOfFetching();
    }, []);
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
                        let sh = dataUser[i].nom.toUpperCase() ;
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
        fetch('https://massive-monkey-9.loca.lt/Users')
        .then((response) => response.json())
        .then((json) => setdataUser(json))
        .catch((error) => console.error(error));
        fetch('https://massive-monkey-9.loca.lt/Labos')
        .then((response) => response.json())
        .then((json) => setdataLabo(json))
        .catch((error) => console.error(error));
        fetch('https://massive-monkey-9.loca.lt/Equipe')
        .then((response) => response.json())
        .then((json) => setdataEquipe(json))
        .catch((error) => console.error(error));
    }
    useEffect( () => {
        functionOfFetching();
    }, []);
    return (
        <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() } >
            <ImageBackground source={ require('../3132.jpg') } style={Styles.imag} >
                    <Animatable.View delay= {100} animation="slideInRight" style={{marginBottom: 10}}>
                        <View style={Styles.SearchSpace}>
                            <TouchableOpacity>
                                <Feather name="search" size= {30} color= '#ff6701' style={Styles.icon} onPress={ Searching } />
                            </TouchableOpacity>
                            <TextInput 
                                placeholder="Search"    placeholderTextColor="#666666"  style={Styles.textInput}
                                autoCapitalize="none"   value={val}     onChangeText={ val => setVal(val) }
                            />
                            { val!=''? 
                                <Feather
                                    name="delete"   size= {30}  color= '#ff6701'    style={Styles.icon}
                                    onPress={ () => { setVal(''), setSearLabo([]), setSearUser([]), setSearEquipe([]) }}
                                />
                                :
                                true
                            }
                        </View>
                        <ModalDropdown
                            options={['Tous', 'Comptes', 'Labos', 'Equipes']}       dropdownTextStyle={{fontSize: 16}}
                            style={{backgroundColor: 'grey', width: '25%', alignItems:'center', paddingVertical: 4, borderRadius: 3, marginLeft: 10, marginTop: -28}}
                            textStyle={{fontSize: 16, fontWeight: 'bold', fontStyle: 'italic'}}     dropdownTextHighlightStyle={{color: 'red'}}
                            defaultIndex={0}        defaultValue='Tous'
                            onSelect={(itemIndex, itemValue) =>{
                                console.log(itemValue),
                                setFiltring(itemValue)
                                // Searching()
                            }}
                            accessible={true}       dropdownStyle={{height: 168.5, marginTop: -20, marginLeft: -13 }}
                        />   
                    </Animatable.View>
                    <KeyboardAwareScrollView refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> } >
                    <View style={Styles.search}>
                        <FlatList
                            data={SearEquipe}
                            renderItem={( {item} ) =>
                                <Animatable.View delay= {300} animation="fadeInDown" >
                                    <TouchableOpacity onPress={ () => navigation.navigate("Team", item) } >
                                        <View style={Styles.card}>
                                            <Text style={Styles.title}>{ item.name }</Text>
                                            <Text style={Styles.title}>{ item.Equipe_Members.length } Profs</Text>
                                        </View>
                                    </TouchableOpacity>
                                </Animatable.View>
                            }
                        />
                        <FlatList
                            data={SearLabo}
                            renderItem={( {item} ) =>
                                <Animatable.View delay= {300} animation="fadeInDown" >
                                    <TouchableOpacity onPress={ () => navigation.navigate("LaboDetails", item) } >
                                        <View style={Styles.card}>
                                            <Text style={Styles.title}>{ item.name }</Text>
                                        </View>
                                    </TouchableOpacity>
                                </Animatable.View>
                            }
                        />
                        <FlatList
                            data={SearUser}
                            renderItem={( {item} ) =>
                                <Animatable.View delay= {300} animation="fadeInDown" >
                                    <TouchableOpacity onPress={ () => navigation.navigate("User", item) } >
                                        <View style={Styles.card}>
                                            <Text style={Styles.title}>{ item.nom+' '+item.prenom }</Text>
                                        </View>
                                    </TouchableOpacity>
                                </Animatable.View>
                            }
                        />
                    </View>
                </KeyboardAwareScrollView>
            </ImageBackground>
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
        justifyContent: 'space-between',
        marginVertical: 5,
        flexDirection: 'row',
    },
    title: { fontSize: 19, color: 'coral' },
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
        backgroundColor: '#F6F3EE',
        padding: 4,
        margin: 35,
        marginTop: "5%",
        borderRadius: 25,
        marginHorizontal: 7,
        flexDirection: 'row',
    }, 
    icon: { marginHorizontal: 9, marginTop: 6 }
})