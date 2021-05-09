import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Text } from '@ui-kitten/components';

const HomeScreen = (props) => {
    return (
        <View style={styles.HomeScreen}>
            <View style={styles.CardStyle}>
                <Image source={require('../../assets/doggo.jpg')} style={styles.DogImage} />
                <Text style={styles.MainText}>
                    Hi! I am your Guide Doge.
                </Text>
                <Text style={styles.MainText}>
                    I will read any small texts for you!
                </Text>
                <Button onPress={() => props.history.push('/camera')} style={styles.UseButton}>
                    <Text style={styles.ButtonText}>Get Started</Text>
                </Button>
                <Button onPress={() => props.history.push('/magnify')} style={styles.UseButton}>
                    <Text style={styles.ButtonText}>Magnifying Glass</Text>
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    HomeScreen: {
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    DogImage: {
        width: 250,
        height: 250,
        borderRadius: 125,
        margin: '5%'
    },
    UseButton: {
        backgroundColor: '#1fab89',
        borderColor: '#1fab89',
        width: '90%',
        height: '10%',
        borderRadius: 50,
        marginTop: '10%'
    },
    CardStyle: {
        alignItems: 'center',
        width: '90%',
        height: '75%',
        backgroundColor: '#F5F5F5',
        borderRadius: 25,
        margin: '3%'
    },
    MainText: {
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 24
    },
    ButtonText: {
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 24,
        color: 'white'
    }
});

export default HomeScreen;