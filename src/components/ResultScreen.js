import React, { useState, useEffect } from 'react';
import {
    View, StyleSheet, Image, ScrollView
} from 'react-native';
import { Button, Text, Icon, Spinner } from '@ui-kitten/components';
import * as Speech from 'expo-speech';

import ocrRequest from '../api/ocr';

const ResultScreen = (props) => {
    const [image, setImage] = useState(props.location.state.image);
    const [response, setResponse] = useState('');
    // const [base64, setBase64] = useState(props.location.state.base64);

    useEffect(() => {
        // At initial render: call ocr api with image url, update state with response.
        (async () => {
            let apiResponse = await ocrRequest(props.location.state.base64);
            console.log(apiResponse);
            if (apiResponse.OCRExitCode == 1) {
                setResponse(JSON.stringify(apiResponse.ParsedResults[0].ParsedText));
            }
            else {
                setResponse(apiResponse.ErrorDetails);
            }
        })();
    }, []);

    const renderPreview = () => {
        if (image === '')
            return <Icon name='image' fill='#a7bbc7' style={{ width: 35, height: 35 }} />
        else
            return <Image source={{ uri: image }} style={styles.ImagePreview} />
    }

    const renderResponse = () => {
        if (response === '')
            return <Spinner size='giant' />
        else
            return <Text category="h2">
                {response.replace(/ \\ r \\ n/g, '\n').replace(/\\r\\n/g, '\n')}
            </Text>
    }

    const speakResponse = () => {
        Speech.speak(response.replace(/ \\ r \\ n/g, '').replace(/\\r\\n/g, ''), {
            rate: 0.8  // 1
        });
    };

    return (
        <View style={styles.ResultScreen}>
            <View style={styles.ImagePreview}>
                {renderPreview()}
            </View>
            <ScrollView style={styles.ScrollView}>
                {renderResponse()}
            </ScrollView>
            <Button onPress={speakResponse} style={styles.Button}>
                Press to hear response
            </Button>
            <Button onPress={Speech.stop} style={styles.Button}>
                Press to Stop
            </Button>
            <Button onPress={() => props.history.push('/')} style={styles.Button}>
                Back to Home Page
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    ResultScreen: {
        alignItems: 'center',
        width: '100%',
        height: '90%'
    },
    ImagePreview: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 200,
        borderColor: '#a7bbc7',
        borderWidth: 2,
        borderRadius: 50,
        margin: '5%'
    },
    ScrollView: {
        width: '100%',
        height: '40%',
        backgroundColor: '#faf3f3',
        marginHorizontal: 20
    },
    Button: {
        backgroundColor: '#da7f8f',
        borderColor: '#da7f8f',
        width: '80%',
        // height: '10%',
        // borderRadius: 25,
        marginTop: '1%',
    }
});

export default ResultScreen;