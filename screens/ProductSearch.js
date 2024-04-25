import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { windowHeight, windowWidth } from '../util/function';
import SearchBar from "react-native-dynamic-search-bar";
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import { emoji } from '../util/emoji';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { DialogBox_warning } from '../util/alert';

export default function ProductSearch() {
    const [data, setData] = useState();
    const [spinnerVisibility, setSpinnerVisibility] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const [searchText, setSearchText] = useState('')
    const navigation = useNavigation()

    const GetProductList = async () => {
        try {
            setIsLoading(true)
            const apiCall = await fetch(`https://dummyjson.com/products`);
            const response = await apiCall.json();
            setData(response?.products);
            setIsLoading(false)
        }
        catch (err) {
            DialogBox_warning(err,'')

        }
    }

    const handleOnChangeText = async (text) => {
        // console.log(text);
        // setSpinnerVisibility(true);
        // setSearchText(text);

        // setTimeout(() => {
        //     setSpinnerVisibility(false);
        // }, 1000);
        try {
            setSpinnerVisibility(true);
            setSearchText(text);
            const apiCall = await fetch(`https://dummyjson.com/products/search?q=${text}`)
            const response = await apiCall.json();
            console.log('response', response);
            setData(response?.products);

            setTimeout(() => {
                setSpinnerVisibility(false);
            }, 1000);
        }
        catch (err) {
            DialogBox_warning(err,'')

        }
    }

    useEffect(() => {
        GetProductList();
    }, [])

    return (
        <>
            <SearchBar
                height={50}
                fontSize={18}
                shadowColor="#282828"
                //   backgroundColor="#990099"
                spinnerVisibility={spinnerVisibility}
                spinnerColor='#fff'
                spinnerSize={22}
                placeholder="Search any product ..."
                placeholderTextColor='#fff'
                shadowStyle={styles.searchBarShadowStyle}
                searchIconComponent={<Ionicons name='search' color='#fff' size={22} />}
                clearIconComponent={<Entypo name='cross' color='#fff' size={22} />}
                textInputStyle={{
                    color: '#fff',
                    cursorColor: '#fff'
                }}
                style={{
                    backgroundColor: '#990099',
                    paddingVertical: 10,
                    marginTop: 10,
                    marginBottom: 6,
                }}
                onChangeText={handleOnChangeText}
                onClearPress={GetProductList}
            />
            <FlatList
                // style={{
                //     paddingHorizontal:14
                // }}
                data={data}
                keyExtractor={(i, j) => j.toString()}
                numColumns={2}
                columnWrapperStyle={{
                    justifyContent: 'space-between',
                    paddingHorizontal: 8,
                    // paddingVertical:15
                }}
                renderItem={({ item, index }) => {
                    // console.log({ item })
                    return (
                        <View
                            style={{
                                alignItems: 'center',
                                // justifyContent: 'center',
                                width: windowWidth / 2 - 20,
                                //   height: 240,
                                margin: 5,
                                borderRadius: 8,
                                borderWidth: 2,
                                borderColor: '#990099'
                            }}>
                            <FastImage
                                style={styles.image}
                                source={{
                                    uri: item?.thumbnail,
                                    headers: { Authorization: 'someAuthToken' },
                                    priority: FastImage.priority.high,
                                }}
                                resizeMode={FastImage.resizeMode.stretch}
                            />

                            <Text style={{
                                textTransform: 'capitalize',
                                fontWeight: 'bold',
                                paddingTop: 8,
                                marginHorizontal: 2,
                                color: '#990099',
                                // height:50
                            }}>{item?.title}</Text>

                            <Text style={{
                                padding: 4,
                                marginHorizontal: 4,
                                textTransform: 'capitalize',
                                textAlign: 'center',
                                // height:50

                            }}>{item?.brand} {item?.category}</Text>

                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-evenly',
                                paddingVertical: 8,
                                width: '100%',

                                // position:'absolute',
                                // bottom:0
                            }}>
                                <TouchableOpacity
                                onPress={() => navigation.navigate('Edit', { data: item.id })}
                                    style={{
                                        backgroundColor: "#990099",
                                        paddingVertical: 4,
                                        width: '40%',
                                        borderRadius: 8,
                                    }}
                                ><Text style={{ color: '#fff', textAlign: 'center' }}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: "#990099",
                                        paddingVertical: 4,
                                        width: '40%',
                                        borderRadius: 8,
                                    }}
                                    onPress={() => navigation.navigate('Details', { data: item.id })}
                                ><Text style={{ color: '#fff', textAlign: 'center' }}>Info</Text>
                                </TouchableOpacity>

                            </View>
                        </View>

                    )
                }}
                ListEmptyComponent={
                    <>
                        {isLoading === true ?
                            <ActivityIndicator size={24} color={'#990099'} style={{ marginTop: windowWidth }} />
                            :
                            <Text style={{
                                color: '#000',
                                textAlign: 'center',
                                marginTop: windowWidth,
                            }}>No item found... {emoji.cry_emoji}</Text>}
                    </>
                }
            />

        </>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#990099',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchBarShadowStyle: {
        backgroundColor: '#990099'
    },
    image: {
        marginTop: 2,
        // marginHorizontal:10,
        height: 100,
        width: windowWidth / 2 - 28,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,

    }
})