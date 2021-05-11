import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components';
import { Camera } from 'expo-camera';
import Slider from '@react-native-community/slider';

const MagnifyScreen = (props) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [zoom, setZoom] = useState(0);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={styles.Container}>
            <Camera style={styles.Camera} type={type} zoom={zoom}>
                <View style={styles.ButtonContainer}>
                    <View style={styles.ButtonRow}>
                        <TouchableOpacity
                            style={styles.Button}
                            onPress={() => {
                                setType(
                                    type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                );
                            }}>
                            <Text style={styles.Text}> Flip </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.Button}
                            onPress={() => {
                                alert("second button pressed");
                            }}>
                            <Text style={styles.Text}> Glip </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Camera>
            <Slider
                style={styles.Slider}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#1fab89"
                maximumTrackTintColor="#FFFFFF"
                onValueChange={(value) => {
                    setZoom(value);
                }}
            />
            <Text style={styles.Text}> Zoom </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'black'
    },
    Camera: {
        width: '100%',
        height: '70%'
    },
    ButtonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    ButtonRow: {
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: "space-between",
        borderColor: 'white',
        borderWidth: 2,
    },
    Button: {
        borderColor: 'white',
        borderWidth: 2,
        width: '20%',
        alignItems: 'center',
    },
    Text: {
        fontSize: 24,
        fontFamily: 'Ubuntu_400Regular',
        color: 'white',
    },
    Slider: {
        width: '80%',
        height: 60,
    }
});

export default MagnifyScreen;