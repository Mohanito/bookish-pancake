import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Text } from '@ui-kitten/components';

const HomeScreen = (props) => {
    return (
        <View style={styles.HomeScreen}>
            <View style={styles.CardStyle} status='danger'>
                <Image source={require('../../assets/doggo.jpg')} style={styles.DogImage} />
                <Text category="p1">
                    {`Hi! I am Guide Doge.\nI will read any small texts for you!`}
                </Text>
            </View>
            <Button onPress={() => props.history.push('/camera')} style={styles.UseButton}>
                Get Started
            </Button>
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
        width: 200,
        height: 200,
        borderRadius: 100,
        margin: '5%'
    },
    UseButton: {
        backgroundColor: '#da7f8f',
        borderColor: '#da7f8f',
        width: '80%',
        height: '10%',
        borderRadius: 25,
        marginTop: '5%'
    },
    CardStyle: {
        alignItems: 'center',
        width: '95%',
        height: '50%',
        backgroundColor: '#faf3f3',
        borderRadius: 10,
        margin: '5%'
    },
});

export default HomeScreen;