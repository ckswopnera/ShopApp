import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import FastImage from 'react-native-fast-image';
import { windowWidth } from '../util/function';
import { DialogBox_success } from '../util/alert';
import { emoji } from '../util/emoji';
import { useshopApp } from '../store/store';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
    const [isLoading, setisLoading] = useState(true)
    const token = useshopApp(state => state.token);
    const removeAllBears = useshopApp(state => state.removeAllBears)
    const [data, setData] = useState([])
    const navigation = useNavigation();

    const fetchUserDetails = async () => {
        try {
            setisLoading(true)
            const response = await fetch('https://dummyjson.com/auth/me', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token?.token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user details');
            }
            const userData = await response.json();
            console.log('User details:', userData);
            setData(userData);
            setisLoading(false)
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    useEffect(() => {
        console.log({ token })
        fetchUserDetails();
    }, [])

    return (
        <>{isLoading === true ? <ActivityIndicator size={28} color={'#990099'} style={{ marginTop: windowWidth }} /> :
            <ScrollView contentContainerStyle={{
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <FastImage
                    style={styles.image}
                    source={{
                        uri: data?.image,
                        headers: { Authorization: 'someAuthToken' },
                        priority: FastImage.priority.high,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                />

                <View style={{
                    paddingHorizontal: 4,
                    width: '100%',
                    marginTop: 10,
                    // flex: 1,

                }}>
                    <View style={{
                        padding: 12,
                        borderWidth: 2,
                        borderColor: '#990099',
                        borderTopRightRadius: 8,
                        borderTopLeftRadius: 8,
                        // height: windowWidth,
                        marginBottom: 4,

                    }}>
                        <View style={{ flexDirection: 'row', paddingVertical: 4 }}>
                            <Text style={styles.textHeader}>
                                Name:
                            </Text>
                            <Text style={{
                                fontSize: 18,
                                color: '#333',
                                textAlign: 'center',
                                // fontWeight:'bold',
                            }}>
                                {data?.firstName} {data?.lastName}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingVertical: 4 }}>
                            <Text style={styles.textHeader}>
                                Address:
                            </Text>
                            <Text style={{
                                fontSize: 18,
                                color: '#333',
                                textAlign: 'center',
                                // fontWeight:'bold',
                            }}>
                                {data?.address?.address}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingVertical: 4 }}>
                            <Text style={styles.textHeader}>
                                postalCode:
                            </Text>
                            <Text style={{
                                fontSize: 18,
                                color: '#333',
                                textAlign: 'center',
                                // fontWeight:'bold',
                            }}>
                                {data?.address?.postalCode}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingVertical: 4 }}>
                            <Text style={styles.textHeader}>
                                state:
                            </Text>
                            <Text style={{
                                fontSize: 18,
                                color: '#333',
                                textAlign: 'center',
                                // fontWeight:'bold',
                            }}>
                                {data?.address?.state}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingVertical: 4 }}>
                            <Text style={styles.textHeader}>
                                birthDate:
                            </Text>
                            <Text style={{
                                fontSize: 18,
                                color: '#333',
                                textAlign: 'center',
                                // fontWeight:'bold',
                            }}>
                                {data?.birthDate}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingVertical: 4 }}>
                            <Text style={styles.textHeader}>
                                Age:
                            </Text>
                            <Text style={{
                                fontSize: 18,
                                color: '#333',
                                textAlign: 'center',
                                // fontWeight:'bold',
                            }}>
                                {data?.age}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingVertical: 4 }}>
                            <Text style={styles.textHeader}>
                                gender:
                            </Text>
                            <Text style={{
                                fontSize: 18,
                                color: '#333',
                                textAlign: 'center',
                                // fontWeight:'bold',
                            }}>
                                {data?.gender}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingVertical: 4 }}>
                            <Text style={styles.textHeader}>
                                phone:
                            </Text>
                            <Text style={{
                                fontSize: 18,
                                color: '#333',
                                textAlign: 'center',
                                // fontWeight:'bold',
                            }}>
                                {data?.phone}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingVertical: 4 }}>
                            <Text style={styles.textHeader}>
                                weight:
                            </Text>
                            <Text style={{
                                fontSize: 18,
                                color: '#333',
                                textAlign: 'center',
                                // fontWeight:'bold',
                            }}>
                                {data?.weight}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingVertical: 4 }}>
                            <Text style={styles.textHeader}>
                                university:
                            </Text>
                            <Text style={{
                                fontSize: 18,
                                color: '#333',
                                textAlign: 'center',
                                // fontWeight:'bold',
                            }}>
                                {data?.university}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingVertical: 4 }}>
                            <Text style={styles.textHeader}>
                                email:
                            </Text>
                            <Text style={{
                                fontSize: 18,
                                color: '#333',
                                textAlign: 'center',
                                // fontWeight:'bold',
                            }}>
                                {data?.email}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingVertical: 4 }}>
                            <Text style={styles.textHeader}>
                                company:
                            </Text>
                            <Text style={{
                                fontSize: 18,
                                color: '#333',
                                textAlign: 'center',
                                // fontWeight:'bold',
                            }}>
                                {data?.company?.name}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingVertical: 4 }}>
                            <Text style={styles.textHeader}>
                                designation:
                            </Text>
                            <Text style={{
                                fontSize: 18,
                                color: '#333',
                                textAlign: 'center',
                                // fontWeight:'bold',
                            }}>
                                {data?.company?.title}
                            </Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity

                    onPress={() => {
                        removeAllBears()
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Login' }],
                        });
                        DialogBox_success(`Successfully logout ${emoji.smile_emoji}`, '')
                    }}
                    style={{
                        backgroundColor: '#990099',
                        width: '80%',
                        borderRadius: 10,
                        // alignSelf: 'center',
                        paddingVertical: 12,
                        marginTop: 20,
                    }}>
                    <Text style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 22,
                        color: '#fff',

                    }}>SignOut</Text>

                </TouchableOpacity>
            </ScrollView>
        }</>
    )
}

const styles = StyleSheet.create({
    image: {
        height: windowWidth / 2,
        width: windowWidth / 3,
        borderWidth: 4,
        borderColor: '#990099',
        borderRadius: windowWidth,
        padding: 14,
        alignSelf: 'center',
        marginTop: 10
    },
    textHeader: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
        paddingRight: 4, textAlign: 'center',
        textTransform: 'capitalize'
    },
})