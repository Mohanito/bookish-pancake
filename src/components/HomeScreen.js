import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Text } from '@ui-kitten/components';

const HomeScreen = (props) => {
    return (
        <View style={styles.HomeScreen}>
            <Image source={require('../../assets/doggo.jpg')} style={styles.DogImage} />
            <Text category="h1">
                {`Hi! I am Guide Doge.\nI will read any small texts for you!`}
            </Text>
            <Text>
                Take a picture or pick one from your photo gallery, and I will recognize the texts from the image.
            </Text>
            <Button onPress={() => props.history.push('/camera')}>
                Start Using Now!
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    HomeScreen: {
        // justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'honeydew',
        width: '100%',
        height: '100%'
    },
    DogImage: {
        width: 250,
        height: 250,
        borderRadius: 250
    }
});

export default HomeScreen;