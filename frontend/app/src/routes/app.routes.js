import React from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faBolt, faUniversity, faBars} from "@fortawesome/free-solid-svg-icons";

import Dashboard from '../views/dashboard';
import Ministrar from '../views/ministrar';
import Cursos from '../views/cursos';

import Common from '../global/common'

const Tab = createBottomTabNavigator();

const AppRoutes = () => {
    return (
        <Tab.Navigator
            initialRouteName="Dashboard"
            tabBarOptions={{
                activeTintColor: Common.BRANCO,
                inactiveTintColor: Common.BRANCO,
                style: {
                    backgroundColor: Common.LARANJA,
                },
                labelStyle: {
                    fontSize: 12,
                    margin: 0,
                    padding: 0,
                },
            }}>
            <Tab.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    unmountOnBlur: true,
                    tabBarLabel: 'DASHBOARD',
                    tabBarIcon: ({color, size}) => (
                        <FontAwesomeIcon size={25} color={'white'} icon={faBolt}/>
                    ),
                }}
            />
            <Tab.Screen
                name="Ministrar"
                component={Ministrar}
                options={{
                    unmountOnBlur: true,
                    tabBarLabel: 'MINISTRAR',
                    tabBarIcon: ({color, size}) => (
                        <FontAwesomeIcon size={25} color={'white'} icon={faUniversity}/>
                    ),
                }}
            />
            <Tab.Screen
                name="Cursos"
                component={Cursos}
                options={{
                    unmountOnBlur: true,
                    tabBarLabel: 'CURSOS',
                    tabBarIcon: ({color, size}) => (
                        <FontAwesomeIcon size={25} color={'white'} icon={faBars}/>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default AppRoutes;
