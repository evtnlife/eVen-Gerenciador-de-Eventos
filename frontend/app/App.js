import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import Routes from "./src/routes/routes";
import {AuthProvider} from "./src/contexts/auth";
import {StatusBar} from "react-native";

export default function App() {
    console.disableYellowBox = true;
    return (
        <NavigationContainer>
            <StatusBar hidden={true} />
            <AuthProvider>
                <Routes />
            </AuthProvider>
        </NavigationContainer>
    )
};
