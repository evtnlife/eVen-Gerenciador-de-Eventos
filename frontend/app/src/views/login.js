import React, {useContext, useEffect, useState, useCallback} from 'react'
import {
    Button,
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    Image
} from 'react-native'

import {Formik} from 'formik';
import AuthContext from '../contexts/auth';
import AuthService from "../services/auth";
import AppLoading from "expo-app-loading";
import Common from '../global/common'
import Storage from '../global/storage';


const Login = () => {
    const {signed, context, setContext} = useContext(AuthContext);
    const [isReady, setIsReady] = useState(true);
    const [authError, setAuthError] = useState(false);

    async function doLogin(values) {
        try {
            setIsReady(false);

            console.log(values);
            const response = await AuthService.signIn(values);
            console.log(response);
            if (response === undefined)
                setAuthError(true);
            else {
                setAuthError(false);
                setContext(response);
                await Storage.save({
                    key: 'user',
                    data: response
                });
            }
        } catch (ex) {
            console.log(ex);
            setAuthError(true);
        }
    }

    if (!isReady) {
        return (
            <AppLoading
                startAsync={doLogin}
                onFinish={() => setIsReady(true)}
                onError={console.warn}
            />
        );
    }
    return (
        <ScrollView contentContainerStyle={styles.outer}>
            <View style={styles.inner}>
                <Formik
                    initialValues={{
                        matricula: '',
                        password: ''
                    }}
                    onSubmit={
                        values => doLogin(values)
                    }>
                    {({handleChange, handleBlur, handleSubmit, values}) => (
                        <View style={styles.loginContainer}>
                            <View style={styles.container}>
                                <Image
                                    style={styles.logo}
                                    source={require('../../assets/unipac.br-logo-lafaiete.png')}
                                />
                                {
                                    authError === true ?
                                        <Text style={styles.AuthError}>Usuário não autorizado!</Text> : <Text/>
                                }
                            </View>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={handleChange('matricula')}
                                onBlur={handleBlur('matricula')}
                                placeholder="Matrícula"
                                value={values.matricula}
                            />
                            <TextInput
                                style={styles.textInput}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                placeholder="Senha"
                                value={values.password}
                                secureTextEntry
                            />
                            <View style={styles.buttonContainer}>
                                <Button
                                    style={styles.button}
                                    onPress={handleSubmit}
                                    color={Common.AZUL}
                                    title="Entrar"/>
                            </View>
                        </View>
                    )}
                </Formik>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    outer: {
        flex: 1,
    },
    inner: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    loginContainer: {
        width: '80%',
        alignItems: 'center',
        padding: 10,
        elevation: 10,
        backgroundColor: '#e6e6e6'
    },
    textInput: {
        height: 40,
        width: '100%',
        margin: 10,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: StyleSheet.hairlineWidth,
        textAlign: 'center',
        borderRadius: 10,
    },
    buttonContainer: {
        padding: 10,
        width: 150,
    },
    button: {
        width: '100%',
    },
    logo: {
        width: 270,
        maxHeight: 70
    },
    AuthError: {
        textAlign: 'center',
        color: 'red'
    }
});

export default Login;
