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
    const [speak, setSpeak] = useState(false);
    const [responseFontSize, setResponseFontSize] = useState(36);
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
            return (
                <View style={{ height: '60%', alignItems: 'center', justifyContent: 'center' }}>
                    <Spinner size='giant' />
                    <Text style={{
                        fontFamily: 'Ubuntu_400Regular',
                        fontSize: 36,
                        margin: 20
                    }}>Waiting for Results...</Text>
                </View>
            );
        else
            return (<>
                <ScrollView style={styles.ScrollView}>
                    <Text style={{
                        fontFamily: 'Ubuntu_400Regular',
                        fontSize: responseFontSize,
                    }}>
                        {response.replace(/ \\ r \\ n/g, '\n').replace(/\\r\\n/g, '\n')}
                    </Text>
                </ScrollView>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    {renderSpeakButton()}
                    {renderFontButtons()}
                </View>
            </>)
    }

    const speakResponse = () => {
        Speech.speak(response.replace(/ \\ r \\ n/g, '').replace(/\\r\\n/g, ''), {
            rate: 0.8,  // 1
            onDone: () => {
                setSpeak(false);
            }
        });
        setSpeak(true);
    };

    const stopSpeak = () => {
        Speech.stop();
        setSpeak(false);
    };

    const renderSpeakButton = () => {
        if (speak) {
            return <Button onPress={stopSpeak} style={styles.Button}>
                <Text style={styles.ButtonText}>
                    <Icon name='stop-circle-outline' fill='white' style={{ width: 30, height: 30 }} />
                    Stop
                </Text>
            </Button>
        }
        else {
            return <Button onPress={speakResponse} style={styles.Button}>
                <Text style={styles.ButtonText}>
                    <Icon name='headphones-outline' fill='white' style={{ width: 30, height: 30 }} />
                    Listen
                </Text>
            </Button>
        }
    }

    const increaseFontSize = () => {
        if (responseFontSize <= 64)
            setResponseFontSize(responseFontSize + 2);
    }

    const decreaseFontSize = () => {
        if (responseFontSize >= 20)
            setResponseFontSize(responseFontSize - 2);
    }

    const renderFontButtons = () => {
        return (<>
            <Button onPress={increaseFontSize} style={styles.Button}>
                <Text style={styles.ButtonText}>
                    <Icon name='text-outline' fill='white' style={{ width: 30, height: 30 }} />
                    larger
                </Text>
            </Button>
            <Button onPress={decreaseFontSize} style={styles.Button}>
                <Text style={styles.ButtonText}>
                    <Icon name='text-outline' fill='white' style={{ width: 30, height: 30 }} />
                    smaller
                </Text>
            </Button>
        </>);
    }

    return (
        <View style={styles.ResultScreen}>
            <View style={styles.ImagePreview}>
                {renderPreview()}
            </View>
            {renderResponse()}
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
        width: 150,
        height: 150,
        borderColor: '#a7bbc7',
        borderWidth: 2,
        borderRadius: 25,
        margin: 5
    },
    ScrollView: {
        width: '90%',
        height: '100%',
        backgroundColor: '#faf3f3',
        marginHorizontal: 20
    },
    Button: {
        backgroundColor: '#da7f8f',
        borderColor: '#da7f8f',
        width: 100,
        height: 100,
        margin: 5,
    },
    ButtonText: {
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 18,
        color: 'white'
    }
});

export default ResultScreen;