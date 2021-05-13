import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Icon } from '@ui-kitten/components';

const HomeScreen = (props) => {
    return (
        <View style={styles.ScrollViewContainer}>
            <ScrollView style={styles.ScrollView}>
                <View style={styles.Container}>

                    <Image source={require('../../assets/doggo.jpg')} style={styles.DogImage} />

                    <Text style={styles.MainText}>
                        Hi! I am your Guide Doge.
                    </Text>
                    <Text style={styles.MainText}>
                        Here's what I can do for you:
                    </Text>

                    <View style={styles.CardsContainer}>
                        <TouchableOpacity onPress={() => props.history.push('/camera')} style={styles.Card}>
                            <Text style={styles.CardTitle}>
                                <Icon name='camera-outline' fill='#1fab89' style={{ width: 30, height: 30 }} />
                                OCR Text Recognition
                            </Text>
                            <Text style={styles.CardText}>
                                {`- Scans texts from images\n- Converts text results to speech`}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => props.history.push('/magnify')} style={styles.Card}>
                            <Text style={styles.CardTitle}>
                                <Icon name='maximize-outline' fill='#1fab89' style={{ width: 30, height: 30 }} />
                                Magnifying Glass
                            </Text>
                            <Text style={styles.CardText}>
                                {`- Flashlight for dark lightings\n- Autofocus\n- Read prescription bottles, menu items, labels, etc. without glasses`}
                            </Text>
                        </TouchableOpacity>
                        <View style={{ width: '90%', marginTop: 20 }}>
                            <Text style={styles.CardText}>
                                Guide Doge is a free application designed to assist low vision people,
                                specifically the elderly people with presbyopia.
                            </Text>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    ScrollViewContainer: {
        alignItems: 'center',
        width: '100%',
        height: '95%',
    },
    ScrollView: {
        width: '100%',
        height: '100%'
    },
    Container: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    DogImage: {
        width: 250,
        height: 250,
        borderRadius: 125,
        margin: '5%'
    },
    MainText: {
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 24
    },
    // Cards
    CardsContainer: {
        alignItems: 'center',
        width: '100%',
        height: 550,
    },
    Card: {
        backgroundColor: 'white',
        width: '90%',
        height: 175,
        borderRadius: 10,
        marginTop: '5%',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    CardTitle: {
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 24,
        marginHorizontal: 10,
        marginVertical: 10
    },
    CardText: {
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 20,
        marginHorizontal: 20,
        color: 'gray'
    }
});

export default HomeScreen;