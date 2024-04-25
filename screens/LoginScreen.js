import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { requiredSchema, yup_mail_validation, yup_password_validation } from '../util/function';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { DialogBox_danger } from '../util/alert';
import { useshopApp } from '../store/store';


export default function LoginScreen() {
    const [secureTextEntry, setsecureTextEntry] = useState(true);
    const [loginData, setLoginData] = useState([]);
    const navigation = useNavigation();
  
    const updateToken = useshopApp(state => state.updateToken);

    const loginDatam = {
        username: 'kminchelle',
        password: '0lelplR'
    };

    const LoginAPi = async (values) => {

        const loginUrl = 'https://dummyjson.com/auth/login';

        const loginData = {
            username: values?.username,
            password: values?.password
        };

        await fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData)
        })
            .then(response => {
                // console.log({response})
                if (!response.ok) {
                    DialogBox_danger('Invalid credentials','')
                }
                return response.json();
            })
            .then(data => {
                console.log( {data});
                updateToken(data)
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'MainStack' }],
                });
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }


    return (
        <ScrollView
            style={{
                flex: 1,
            }}
            contentContainerStyle={
                styles.container
            }
        >
            <Text
                style={[
                    styles.headerText,
                    {
                        top: -50,
                    },
                ]}>
                Hello!
            </Text>
            <Text
                style={[
                    styles.headerText,
                    {
                        fontSize: 18,
                        marginBottom: 20,
                    },
                ]}>
                Let's sign you in...
            </Text>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                }}
                validationSchema={Yup.object().shape({
                    username: Yup.string().concat(requiredSchema),
                    password: yup_password_validation,
                })}
                onSubmit={async values => {
                    // console.log('Form data submitted:', values);
                    setLoginData(values)
                    LoginAPi(values)
                }}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,

                    values,
                    errors,
                    touched,

                }) => (
                    <>
                        <Animatable.View
                            animation={(touched.username && errors.username) ? 'shake' : undefined}
                            style={[styles.inputview, {
                                borderColor: (touched.username && errors.username) ? 'red' : '#990099',
                                paddingHorizontal: 14,
                            }]}>

                            <TextInput

                                textContentType='username'
                                keyboardType="default"
                                placeholder="username"
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                                placeholderTextColor={'#8D8686'}
                                cursorColor={'#000'}
                                style={styles.textinput}
                            />

                        </Animatable.View>
                        {touched.username && errors.username && (
                            <View style={{ width: '80%' }}>
                                <Text
                                    style={[styles.textinputerror, {
                                        width: (errors.username?.length < 10) ? '30%' : '40%'
                                    }]}>
                                    {errors.username}
                                </Text>
                            </View>
                        )}


                        <Animatable.View
                            animation={(touched.password && errors.password) ? 'shake' : undefined}

                            style={[styles.inputview,
                            {
                                borderColor: (touched.password && errors.password) ? 'red' : '#990099',
                                paddingHorizontal: 14,
                                // paddingVertical: (touched.password && errors.password?.length > 16) ? 10 : 0
                            }]}>

                            <TextInput
                                textContentType='password'
                                placeholder="your passowrd"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                secureTextEntry={secureTextEntry}
                                value={values.password}
                                placeholderTextColor={'#8D8686'}
                                cursorColor={'#000'}
                                style={[styles.textinput, { width: '90%' }]}
                            />
                            <TouchableOpacity
                                style={{ width: '10%' }}
                                onPress={() => {
                                    // console.log('eye pressed');
                                    secureTextEntry === true
                                        ? setsecureTextEntry(false)
                                        : setsecureTextEntry(true);
                                }}>

                                <Ionicons name={secureTextEntry === true ? 'eye-off-outline' : 'eye-outline'}
                                    style={styles.eye}
                                    color={'#000'}
                                    size={26} />
                            </TouchableOpacity>

                        </Animatable.View>
                        {touched.password && errors.password && (
                            <View style={{
                                width: '80%'
                            }}>
                                <Text
                                    style={[styles.textinputerror,
                                    {
                                        width: (errors.password?.length == 9) ? '30%' :

                                            '60%',
                                    }]}>
                                    {errors.password}
                                </Text>
                            </View>
                        )}
                        <TouchableOpacity
                            style={[
                                styles.button,
                                {
                                    backgroundColor: 'rgba(0,0,0,01)',
                                },
                            ]}
                            onPress={() => handleSubmit()}>
                            <Text
                                style={[
                                    styles.buttonText,
                                    {
                                        fontSize: 24, fontWeight: 'bold',
                                    },
                                ]}>
                                Sign in
                            </Text>
                        </TouchableOpacity>
                    </>
                )}

            </Formik>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#990099',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 72,
        textAlign: 'center',

    },
    textinput: {
        color: '#000',
        width: '100%',
        // paddingStart: 14,
    },
    inputview: {
        marginVertical: 10,
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderWidth: 2,
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    textinputerror: {
        color: '#fff',
        // position: 'absolute',
        // bottom:0,
        top: -8,
        // right: 0,
        backgroundColor: '#990099',
        paddingHorizontal: 8,
        borderRadius: 4,
        textAlign: 'left',
        textTransform: 'capitalize'
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
    },
    button: {
        padding: 14,
        borderRadius: 8,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center'
    },
    eye: {
        height: 25,
        width: 25,
        position: 'absolute',
        right: 5,
        bottom: -12,
    },
})