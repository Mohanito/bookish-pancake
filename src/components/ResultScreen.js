import React, { useState, useEffect } from 'react';
import {
    Button, Text, View, StyleSheet, Image
} from 'react-native';

import ocrRequest from '../api/ocr';

const ResultScreen = (props) => {
    const [image, setImage] = useState(props.location.state.image);
    const [response, setResponse] = useState('');
    const [base64, setBase64] = useState(props.location.state.base64);

    useEffect(() => {
        console.log(base64);
        // setImage(props.location.state.image);
        // call ocr api with image url, update state with response.
        // TODO: check: "ParsedText" exists or ErrorMessage?
        (async () => {
            let apiResponse = await ocrRequest(image, base64);
            console.log(apiResponse);
            setResponse(JSON.stringify(apiResponse));
        })();
    }, []);

    const renderPreview = () => {
        if (image === '')
            return <Text style={styles.ImagePreview}>Upload Image to Start</Text>
        else
            return <Image source={{ uri: image }} style={styles.ImagePreview} />
    }

    return (
        <View style={styles.ResultScreen}>
            {renderPreview()}
            <Text>Result Screen</Text>
            <Text>{props.location.state.image}</Text>
            <Text>API response: {response}</Text>
            <Button title="Back to Home Page" onPress={() => props.history.push('/')} />
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
    }
});

export default ResultScreen;