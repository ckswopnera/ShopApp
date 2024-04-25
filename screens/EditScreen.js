import React, { useRef, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Modal,
    Alert,
    Pressable,
    TextInput,
} from 'react-native';
import ImageCarousel from 'react-native-image-carousel';
import { windowHeight, windowWidth } from '../util/function';
import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-reanimated-carousel';
import { DialogBox_success, DialogBox_warning } from '../util/alert';
import Stars from 'react-native-stars';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { emoji } from '../util/emoji';

const EditScreen = (props) => {
    const [data, setData] = useState([]);
    const [newdata, setNewdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentIndex, setcurrentIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
const navigation=useNavigation();


    const GetProductDetails = async () => {
        try {
            setIsLoading(true)
            const apiCall = await fetch(`https://dummyjson.com/products/${props.route.params.data}`);
            const response = await apiCall.json();
            // console.log({ response })
            setData(response);
            setIsLoading(false)

        }
        catch (err) {
            DialogBox_warning(err, '')

        }
    }

    const deleteProduct = async () => {
        try {
            setIsLoading(true)
            const apiCall = await fetch(`https://dummyjson.com/products/${props.route.params.data}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }});
            const response = await apiCall.json();
            console.log('delete response', response )
            // setData(response);
            setIsLoading(false);
            navigation.goBack();
DialogBox_success(`Product deleted ${emoji.smile_emoji}`,'')
        }
        catch (err) {
            DialogBox_warning(err, '')

        }
    }
    useEffect(() => {
        // console.log(props.route.params.data)
        GetProductDetails();
    }, []);
   
    const renderDots = () => (
        <View style={styles.dotContainer}>
            {data?.images?.map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.dot,
                        index === currentIndex ? styles.currentDot : null,
                    ]}
                />
            ))}
        </View>
    );

    const handleEditProduct = async () => {

        try {
            setIsLoading(true);
            const response = await fetch(`https://dummyjson.com/products/${props.route.params.data}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...newdata,
                    images: [],
                    thumbnail: '',
                }),
            });
            const responseData = await response.json();
            console.log(responseData);
            setData({
                ...newdata,
                images: data?.images,
                thumbnail: data?.thumbnail,
            })
            setIsLoading(false);
            DialogBox_success(`Product edited successfully ${emoji.smile_emoji}`,'')

        } catch (error) {
            DialogBox_warning(error, '')

        }

    };
    return (
        <>{isLoading === true ? <ActivityIndicator
            size={28}
            color={'#990099'}
            style={{ marginTop: windowWidth }} /> :
            <>

                <ScrollView
                    contentContainerStyle={{
                        // flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            //   Alert.alert('Modal has been closed.');
                            setModalVisible(!modalVisible);
                        }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={styles.textInput}>
                                    <TextInput
                                        keyboardType="default"
                                        placeholder="Title"
                                        onChangeText={t => setNewdata({ title: t })}
                                        value={newdata?.title}
                                        placeholderTextColor={'#8D8686'}
                                        cursorColor={'#000'}
                                        style={{
                                            color: '#000',
                                            width: '100%',
                                            paddingVertical: 4,
                                        }}
                                    />
                                </View>

                                <View style={styles.textInput}>
                                    <TextInput
                                        keyboardType="default"
                                        placeholder="Brand"
                                        onChangeText={t => setNewdata({ ...newdata, brand: t })}
                                        value={newdata?.brand}
                                        placeholderTextColor={'#8D8686'}
                                        cursorColor={'#000'}
                                        style={{
                                            color: '#000',
                                            width: '100%',
                                            paddingVertical: 4,
                                        }}
                                    />
                                </View>
                                <View style={styles.textInput}>
                                    <TextInput
                                        keyboardType="default"
                                        placeholder="Category"
                                        onChangeText={t => setNewdata({ ...newdata, category: t })}
                                        value={newdata?.category}
                                        placeholderTextColor={'#8D8686'}
                                        cursorColor={'#000'}
                                        style={{
                                            color: '#000',
                                            width: '100%',
                                            paddingVertical: 4,
                                        }}
                                    />
                                </View>
                                <View style={styles.textInput}>
                                    <TextInput
                                        keyboardType="default"
                                        placeholder="Description"
                                        onChangeText={t => setNewdata({ ...newdata, description: t })}
                                        value={newdata?.description}
                                        placeholderTextColor={'#8D8686'}
                                        cursorColor={'#000'}
                                        style={{
                                            color: '#000',
                                            width: '100%',
                                            paddingVertical: 4,
                                        }}
                                    />
                                </View>
                                <View style={styles.textInput}>
                                    <TextInput
                                        keyboardType="decimal-pad"
                                        placeholder="Discount"
                                        onChangeText={t => setNewdata({ ...newdata, discountPercentage: t })}
                                        value={newdata?.discountPercentage}
                                        placeholderTextColor={'#8D8686'}
                                        cursorColor={'#000'}
                                        style={{
                                            color: '#000',
                                            width: '100%',
                                            paddingVertical: 4,
                                        }}
                                    />
                                </View>
                                <View style={styles.textInput}>
                                    <TextInput
                                        keyboardType="decimal-pad"
                                        placeholder="Price"
                                        onChangeText={t => setNewdata({ ...newdata, price: t })}
                                        value={newdata?.price}
                                        placeholderTextColor={'#8D8686'}
                                        cursorColor={'#000'}
                                        style={{
                                            color: '#000',
                                            width: '100%',
                                            paddingVertical: 4,
                                        }}
                                    />
                                </View>
                                <View style={styles.textInput}>
                                    <TextInput
                                        keyboardType="decimal-pad"
                                        placeholder="Rating"
                                        onChangeText={t => setNewdata({ ...newdata, rating: t })}
                                        value={newdata?.rating}
                                        placeholderTextColor={'#8D8686'}
                                        cursorColor={'#000'}
                                        style={{
                                            color: '#000',
                                            width: '100%',
                                            paddingVertical: 4,
                                        }}
                                    />
                                </View>
                                <View style={styles.textInput}>
                                    <TextInput
                                        keyboardType="decimal-pad"
                                        placeholder="Stock"
                                        onChangeText={t => setNewdata({ ...newdata, stock: t })}
                                        value={newdata?.stock}
                                        placeholderTextColor={'#8D8686'}
                                        cursorColor={'#000'}
                                        style={{
                                            color: '#000',
                                            width: '100%',
                                            paddingVertical: 4,
                                        }}
                                    />
                                </View>
                                <Pressable
                                    style={styles.button}
                                    onPress={() => {
                                        handleEditProduct();
                                        setModalVisible(!modalVisible)
                                    }}>
                                    <Text style={styles.textStyle}>Submit</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                    <View style={{ flex: 1 }}>
                        <Carousel
                            loop
                            width={windowWidth}
                            height={windowWidth / 2}
                            autoPlay={true}
                            data={data?.images}
                            scrollAnimationDuration={3000}
                            onSnapToItem={(index) => setcurrentIndex(index)}
                            renderItem={({ item, index }) => (
                                <View
                                    style={{
                                        flex: 1,
                                        // borderRightWidth: 1,
                                        // borderLeftWidth:1,
                                        // borderColor:'#990099',

                                        justifyContent: 'center',
                                        // paddingTop:4,
                                    }}
                                >
                                    <FastImage
                                        style={styles.image}
                                        source={{
                                            uri: item,
                                            headers: { Authorization: 'someAuthToken' },
                                            priority: FastImage.priority.high,
                                        }}
                                        resizeMode={FastImage.resizeMode.contain}
                                    />
                                </View>
                            )}
                        />
                        {renderDots()}
                    </View>
                    <Text style={{
                        fontSize: 28,
                        color: '#333',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        paddingVertical: 10,
                        textTransform: 'capitalize',
                    }}>
                        {data?.title}
                    </Text>

                    <View style={{
                        paddingHorizontal: 4,
                        // position: 'absolute',
                        // bottom: -100,
                        width: '100%',
                        // paddingTop: 160,


                    }}>
                        <View style={{
                            padding: 12,
                            borderWidth: 2,
                            borderColor: '#990099',
                            borderTopRightRadius: 8,
                            borderTopLeftRadius: 8,
                            height: windowWidth,
                            marginBottom: 4,

                        }}>
                            <View style={{ flexDirection: 'row', paddingVertical: 4 }}>
                                <Text style={styles.textHeader}>
                                    Brand:
                                </Text>
                                <Text style={{
                                    fontSize: 18,
                                    color: '#333',
                                    // fontWeight:'bold',
                                }}>
                                    {data?.brand}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', paddingVertical: 4 }}>
                                <Text style={styles.textHeader}>
                                    Category:
                                </Text>
                                <Text style={{
                                    fontSize: 18,
                                    color: '#333',
                                    // fontWeight:'bold',
                                }}>
                                    {data?.category}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', paddingVertical: 4 }}>
                                <Text style={styles.textHeader}>
                                    Description:
                                </Text>
                                <Text style={{
                                    fontSize: 18,
                                    color: '#333',
                                    width: '72%'

                                    // fontWeight:'bold',
                                }}>
                                    {data?.description}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', paddingVertical: 4 }}>
                                <Text style={styles.textHeader}>
                                    Discount:
                                </Text>
                                <Text style={{
                                    fontSize: 18,
                                    color: '#333',
                                    // fontWeight:'bold',
                                }}>
                                    {data?.discountPercentage}%
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', paddingVertical: 4 }}>
                                <Text style={styles.textHeader}>
                                    Price:
                                </Text>
                                <Text style={{
                                    fontSize: 18,
                                    color: '#333',
                                    // fontWeight:'bold',
                                }}>
                                    {data?.price}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', paddingVertical: 4, alignItems: 'center' }}>
                                <Text style={styles.textHeader}>
                                    Rating:
                                </Text>
                                <Stars
                                    default={data?.rating}
                                    count={5}
                                    half={true}
                                    starSize={50}
                                    fullStar={<MaterialCommunityIcons name={'star'} style={[styles.myStarStyle]} />}
                                    emptyStar={<MaterialCommunityIcons name={'star-outline'} style={[styles.myStarStyle, styles.myEmptyStarStyle]} />}
                                    halfStar={<MaterialCommunityIcons name={'star-half'} style={[styles.myStarStyle]} />}
                                />
                            </View>



                            <View style={{ flexDirection: 'row', paddingVertical: 4 }}>
                                <Text style={styles.textHeader}>
                                    Stock:
                                </Text>
                                <Text style={{
                                    fontSize: 18,
                                    color: '#333',
                                    // fontWeight:'bold',
                                }}>
                                    {data?.stock}
                                </Text>
                            </View>

                        </View>
                    </View>

                </ScrollView>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-evenly',
                    marginBottom: 4,
                }}>
                    <TouchableOpacity
                        // onPress={handleAddProduct}
                        onPress={() => setModalVisible(true)}
                        style={{
                            width: '40%',
                            paddingVertical: 14,
                            backgroundColor: '#990099',
                            // alignItems: 'center',
                            // justifyContent:'center',
                            alignSelf: 'center',
                            // marginHorizontal:4,
                            borderRadius: 8,
                            // margin:4,
                        }}
                    ><Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 22, textAlign: 'center' }}>Edit Product</Text></TouchableOpacity>

                    <TouchableOpacity
                        onPress={deleteProduct}
                        style={{
                            width: '40%',
                            paddingVertical: 14,
                            backgroundColor: '#990099',
                            // alignItems: 'center',
                            // justifyContent:'center',
                            alignSelf: 'center',
                            // marginHorizontal:4,
                            borderRadius: 8,
                            // margin:4,
                        }}
                    ><Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 22, textAlign: 'center' }}>Delete Product</Text></TouchableOpacity>
                </View>
            </>

        }
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    closeText: {
        color: 'white',
        textAlign: 'right',
        padding: 10,
    },
    footerText: {
        color: '#fff',
        textAlign: 'center',
        // backgroundColor: 'green'

    },
    image: {
        marginRight: 2,
        height: windowWidth / 2,
        width: windowWidth,

        // backgroundColor: 'green'

    },
    dot: {
        backgroundColor: '#990099',
        borderRadius: 12,
        height: 8
        , width: 8,
        margin: 2,
    },
    dotContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    currentDot: {
        height: 12,
        width: 12,
    },



    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 22,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        marginTop: 10,
        borderRadius: 20,
        paddingVertical: 10,
        // paddingHorizontal: 45,
        width: windowWidth / 2,
        elevation: 2,
        backgroundColor: '#990099',

    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    textInput: {
        marginVertical: 8,
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderWidth: 2,
        borderRadius: 8,
        backgroundColor: '#fff',
        borderColor: '#990099'
    },
    textHeader: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
        paddingRight: 4
    },
    myStarStyle: {
        color: 'yellow',
        backgroundColor: 'transparent',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    myEmptyStarStyle: {
        color: 'white',
    },
});

export default EditScreen;

