import React, { useState, useEffect } from 'react';
import {
    Button, Text, View, StyleSheet, Image, ScrollView
} from 'react-native';
import { Icon, Spinner } from '@ui-kitten/components';
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
            return <Icon name='image' fill='#000000' style={{ width: 35, height: 35 }} />
        else
            return <Image source={{ uri: image }} style={styles.ImagePreview} />
    }

    const renderResponse = () => {
        if (response === '')
            return <Spinner size='giant' />
        else
            return <Text>
                {response.replace(/ \\ r \\ n/g, '\n').replace(/\\r\\n/g, '\n')}
            </Text>
    }

    const speakResponse = () => {
        Speech.speak(response.replace(/ \\ r \\ n/g, '').replace(/\\r\\n/g, ''), {
            rate: 0.75  // 1
        });
    };

    return (
        <View style={styles.ResultScreen}>
            <View style={styles.ImagePreview}>
                {renderPreview()}
            </View>
            <Text>Result Screen</Text>
            <ScrollView style={styles.ScrollView}>
                {renderResponse()}
            </ScrollView>
            <Button title="Back to Home Page" onPress={() => props.history.push('/')} />
            <Button title="Press to hear response" onPress={speakResponse} />
            <Button title="Press to Stop" onPress={Speech.stop} />
        </View>
    );
}

const styles = StyleSheet.create({
    ResultScreen: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'honeydew',
        width: '100%',
        height: '90%'
    },
    ImagePreview: {
        width: 250,
        height: 250
    },
    ScrollView: {
        width: '100%',
        height: '40%',
        backgroundColor: 'pink',
        marginHorizontal: 20
    }
});

export default ResultScreen;