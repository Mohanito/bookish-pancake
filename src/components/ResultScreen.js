import React, { useState, useEffect } from 'react';
import {
    View, StyleSheet, Image, ScrollView, TouchableOpacity
} from 'react-native';
import { Button, Text, Icon, Spinner } from '@ui-kitten/components';
import Slider from '@react-native-community/slider';
import * as Speech from 'expo-speech';

import ocrRequest from '../api/ocr';

const ResultScreen = (props) => {
    const [image, setImage] = useState(props.location.state.image);
    const [response, setResponse] = useState('');
    const [speak, setSpeak] = useState(false);
    const [responseFontSize, setResponseFontSize] = useState(30);
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
                setResponse(apiResponse.ErrorMessage[0]);
            }
        })();
    }, []);

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
        if (response !== '') {
            if (speak) {
                return <TouchableOpacity onPress={stopSpeak} style={styles.StopButton}>
                    <Text style={styles.SpeakButtonText}>
                        <Icon name='stop-circle-outline' fill='white' style={{ width: 24, height: 24 }} />
                        Stop
                    </Text>
                </TouchableOpacity>
            }
            else {
                return <TouchableOpacity onPress={speakResponse} style={styles.SpeakButton}>
                    <Text style={styles.SpeakButtonText}>
                        <Icon name='headphones-outline' fill='white' style={{ width: 24, height: 24 }} />
                        Listen
                    </Text>
                </TouchableOpacity>
            }
        }
    }

    const renderPreview = () => {
        if (image === '')
            return <Icon name='image' fill='#EEEEEE' style={{ width: 35, height: 35 }} />
        else
            return <Image source={{ uri: image }} style={styles.ImagePreview} />
    }

    const renderFontSlider = () => {
        return (
            <View style={styles.SliderContainer}>
                <Slider style={styles.Slider}
                    value={30}
                    minimumValue={20} maximumValue={64}
                    minimumTrackTintColor="#1fab89" maximumTrackTintColor="#000000"
                    onValueChange={(value) => { setResponseFontSize(value); }}
                />
                <Text style={styles.Text}> -  Font Size  + </Text>
            </View>
        );
    }

    const renderResponse = () => {
        if (response === '')
            return (
                <View style={{ height: '60%', alignItems: 'center', justifyContent: 'center' }}>
                    <Spinner size='giant' />
                    <Text style={{
                        fontFamily: 'Ubuntu_400Regular',
                        fontSize: 30,
                        margin: 20
                    }}>Waiting for Results...</Text>
                </View>
            );
        else
            return (<>
                <View style={styles.ScrollViewContainer}>
                    <ScrollView style={styles.ScrollView}>
                        <Text style={{
                            fontFamily: 'Ubuntu_400Regular',
                            fontSize: responseFontSize,
                            margin: '3%',
                            // textAlign: 'center'
                        }}>
                            {response !== '""' ? response.slice(1, response.length - 1).replace(/ \\ r \\ n/g, '\n').replace(/\\r\\n/g, '\n') : 'Unable to detect texts.'}
                        </Text>
                    </ScrollView>
                </View>
                {renderFontSlider()}
            </>)
    }

    return (
        <View style={styles.ResultScreen}>
            <View style={styles.TopContainer}>
                <View style={styles.ImagePreview}>
                    {renderPreview()}
                </View>
                {renderSpeakButton()}
            </View>
            {renderResponse()}
        </View>
    );
}

const styles = StyleSheet.create({
    ResultScreen: {
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    TopContainer: {
        width: '100%',
        flexDirection: 'row',
        height: 175,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    ImagePreview: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 150,
        borderColor: '#EEEEEE',
        borderWidth: 2,
        borderRadius: 10,
        margin: '2%'
    },
    ScrollViewContainer: {
        width: '90%',
        height: '55%',
        borderRadius: 10,

        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    ScrollView: {
        width: '100%',
        height: '100%',
    },
    SpeakButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1fab89',
        borderColor: '#1fab89',
        width: 120,
        height: 120,
        borderRadius: 60
    },
    StopButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e84545',
        borderColor: '#e84545',
        width: 120,
        height: 120,
        borderRadius: 60
    },
    SpeakButtonText: {
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 28,
        color: 'white'
    },
    Button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1fab89',
        borderColor: '#1fab89',
        width: 100,
        height: 100,
        margin: '5%',
    },
    // Slider
    SliderContainer: {
        alignItems: 'center',
        width: '100%',
        height: '10%',
    },
    Slider: {
        width: '80%',
        height: '80%',
    },
    Text: {
        fontSize: 24,
        fontFamily: 'Ubuntu_400Regular',
    },
});

export default ResultScreen;