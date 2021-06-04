import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home';
import Log from './Log';
import Search from './Search';
import Team from './Team';
import Admin from '../Profile/Admin';
import Ch_Labo from '../Profile/Chef_Labo';
import Ch_Eq from '../Profile/Chef_Equipe';
import Prof from '../Profile/Prof';
import Str_Rech from '../Profile/Str_Rech';
import LaboDetails from "../Profile/LaboDetails";
import Gestion_Comptes from '../Profile/Gestion_Comptes';
import User from '../Profile/User';
import monLabo from '../Profile/monLabo';
import monEquipe from '../Profile/monEquipe';
import Mes_Info from '../Profile/Mes_Info';
import Profile from '../Profile/Profile';

const Stack = createStackNavigator();

function StackHome(){
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home}
        // options={ ({navigation} ) => {
        //   return{
        //     headerTitle: () => <Header1 navigation={navigation}/>
        //   }
        // } }
      />
      <Stack.Screen name="Log in" component={Log} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Team" component={Team} />
      <Stack.Screen name="LaboDetails" component={LaboDetails} />
      <Stack.Screen name="User" component={User} />
    </Stack.Navigator>
  );
};

function StackAdmin(){
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ADMIN" component={Admin} />
      <Stack.Screen name="profilee" component={Mes_Info} />
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="str_Rech" component={Str_Rech} />
      <Stack.Screen name="Team" component={Team} />
      <Stack.Screen name="LaboDetails" component={LaboDetails} />
      <Stack.Screen name="Gestion_Comptes" component={Gestion_Comptes} />
      <Stack.Screen name="User" component={User} />
    </Stack.Navigator>
  );
};

function StackCh_Labo(){
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="C_LAB" component={Ch_Labo} />
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="monLabo" component={monLabo} />
      <Stack.Screen name="Team" component={Team} />
      <Stack.Screen name="LaboDetails" component={LaboDetails} />
      <Stack.Screen name="Gestion_Comptes" component={Gestion_Comptes} />
      <Stack.Screen name="User" component={User} />
    </Stack.Navigator>
  );
};

function StackCh_Eq(){
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="C_EQ" component={Ch_Eq} />
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="monEquipe" component={monEquipe} />
      <Stack.Screen name="Team" component={Team} />
      <Stack.Screen name="Gestion_Comptes" component={Gestion_Comptes} />
      <Stack.Screen name="User" component={User} />
    </Stack.Navigator>
  );
};

function StackProf(){
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="PROF" component={Prof} />
      <Stack.Screen name="profile" component={ Profile }/>
      {/* <Stack.Screen name="profile" component={Profile} /> */}
      {/* <Stack.Screen name="LabDetails" component={Str_Rech} /> */}
      {/* <Stack.Screen name="Team" component={Team} /> */}
      {/* <Stack.Screen name="LaboDetails" component={LaboDetails} /> */}
      {/* <Stack.Screen name="User" component={User} /> */}
    </Stack.Navigator>
  );
};

// const Tab = createMaterialTopTabNavigator();

// function Profile(){
//   return (
//       <Tab.Navigator
//           initialRouteName="Mes infos"
//           backBehavior="none"
//           lazy={false}
//           lazyPlaceholder="Loading..."
//           // initialLayout={{ width: Dimensions.get('window').width }}
//           tabBarOptions={{
//               activeTintColor: '#e91e63',
//               labelStyle: { fontSize: 12 },
//               style: { backgroundColor: 'powderblue' },
//           }}
//       >
//         <Tab.Screen name="Mes infos" component={Mes_Info} options={{ tabBarLabel: 'meees Innnfos' }}/>
//         <Tab.Screen name="Mes articles" component={Mes_Articles} options={{ tabBarLabel: 'Artticles' }}/>
//       </Tab.Navigator>
//   );
// }

const Drawer = createDrawerNavigator();

export default function Navigation(){
    return(
        <NavigationContainer>
              <Drawer.Navigator
                drawerPosition="left"
                drawerType="front"
                initialRouteName="Home"
                drawerStyle={{
                  width: "70%",
                }}
                screenOptions={{ gestureEnabled: false }}
                drawerContentOptions={{
                  activeTintColor: 'white',
                  activeBackgroundColor: "grey",
                  inactiveTintColor: "grey",
                  itemStyle: { marginVertical: 10 },
                }}
                // drawerContent={props => <DrawerContent {...props} />}
              >
                 <Drawer.Screen name="Home" component={ StackHome } />
                 <Drawer.Screen name="ADMIN" component={ StackAdmin }/>
                 <Drawer.Screen name="C_LAB" component={ StackCh_Labo }/>
                 <Drawer.Screen name="C_EQ" component={ StackCh_Eq }/>
                 <Drawer.Screen name="PROF" component={ StackProf }/>
                 {/* <Drawer.Screen name="profile" component={ Profile }/> */}
             </Drawer.Navigator>
         </NavigationContainer>
     );
}