import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Icon } from '@ui-kitten/components';
import { Camera } from 'expo-camera';
import Slider from '@react-native-community/slider';
import { Link } from 'react-router-native';

const MagnifyScreen = (props) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [zoom, setZoom] = useState(0);
    const [flash, setFlash] = useState('off');

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const renderHeader = () => {
        return (<>
            <View style={{ height: '5%', backgroundColor: 'transparent' }}></View>
            <View style={styles.Header}>
                <Link to="/" component={TouchableOpacity} activeOpacity={0.5}>
                    <Icon name='home-outline' fill='white' style={styles.HeaderIcon} />
                </Link>
                <Text style={styles.HeaderTitle}>GUIDE DOGE</Text>
                <Icon name='settings-2-outline' fill='transparent' style={styles.HeaderIcon} />
            </View>
        </>);
    }

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        // Error Handling Page?
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={styles.Container}>
            <Camera style={styles.Camera} type={type} zoom={zoom} flashMode={flash}>
                {renderHeader()}
                <View style={styles.ButtonContainer}>
                    <View style={styles.ButtonRow}>
                        <TouchableOpacity style={styles.Button}
                            onPress={() => {
                                setType(
                                    type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                );
                            }}>
                            <Icon name='flip-2-outline' fill='white' style={styles.Icons} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.Button}
                            onPress={() => { setFlash(flash === 'off' ? 'torch' : 'off'); }}>
                            <Icon name='bulb-outline' fill='white' style={styles.Icons} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Camera>

            <View style={styles.SliderContainer}>
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
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'black',   // in case 80% camera + 20% slider leave any whitespace
    },
    Camera: {
        width: '100%',
        height: '80%'
    },
    ButtonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 10,
    },
    ButtonRow: {
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: "space-between",
        // borderColor: 'white',
        // borderWidth: 2,
    },
    Button: {
        borderColor: 'white',
        borderWidth: 2,
        width: '20%',
        alignItems: 'center',
        margin: 10
    },
    Text: {
        fontSize: 24,
        fontFamily: 'Ubuntu_400Regular',
        color: 'white',
    },
    Icons: {
        width: 30,
        height: 30,
        margin: 5
    },
    // Slider
    SliderContainer: {
        alignItems: 'center',
        width: '100%',
        height: '20%',
        backgroundColor: 'black'
    },
    Slider: {
        width: '80%',
        height: '40%',
    },
    // Header
    Header: {
        height: '7.5%', // 6 / 0.8
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        flexDirection: 'row',
    },
    HeaderTitle: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Ubuntu_400Regular',
    },
    HeaderIcon: {
        width: 30,
        height: 30,
        margin: 20
    }
});

export default MagnifyScreen;