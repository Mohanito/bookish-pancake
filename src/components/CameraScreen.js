import React, { useState } from 'react';
import {
    View, StyleSheet, Platform, Image
} from 'react-native';
import { Button, Icon, Text } from '@ui-kitten/components';
import * as ImagePicker from 'expo-image-picker';

const CameraScreen = (props) => {
    // String: contains image URL
    const [image, setImage] = useState('');
    const [base64, setBase64] = useState('');

    // Merge takeImage and selectImage later since they share similar codes
    const takeImage = async () => {
        // FIXME: requests unhandled after initial rejection
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
                return;
            }
        }

        // FIXME: Cannot move crop box on y-axis? overflow
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0,   // 0 - 1
            base64: true
        });

        if (!result.cancelled) {
            setImage(result.uri);
            setBase64(result.base64);
        }
    };

    const selectImage = async () => {
        // need testing
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
                return;
            }
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0,
            base64: true
        });

        if (!result.cancelled) {
            setImage(result.uri);
            setBase64(result.base64);
        }
    };

    const renderPreview = () => {
        if (image === '')
            return <Icon name='image' fill='#EEEEEE' style={{ width: 35, height: 35 }} />
        else
            return <Image source={{ uri: image }} style={styles.ImagePreview} />
    }

    const renderUseImageButton = () => {
        if (image !== '')
            return <Button onPress={() => props.history.push('/result', { image: image, base64: base64 })} style={styles.UseButton}>
                <Text style={styles.ButtonText}>Use Image</Text>
            </Button>
        else {
            return (<>
                <Text style={styles.MainText}>① Select an image</Text>
                <Text style={styles.MainText}>② Crop the text area</Text>
            </>);
        }
    }

    return (
        <View style={styles.CameraScreen}>
            <View style={styles.ImagePreview}>
                {renderPreview()}
            </View>

            {renderUseImageButton()}

            <Button onPress={selectImage} style={styles.Button}>
                <Text style={styles.ButtonText}>Photos Library</Text>
            </Button>
            <Button onPress={takeImage} style={styles.Button}>
                <Text style={styles.ButtonText}>Camera</Text>
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    CameraScreen: {
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    ImagePreview: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 300,
        borderColor: '#EEEEEE',
        borderWidth: 2,
        borderRadius: 25,
        margin: '5%'
    },
    Button: {
        backgroundColor: '#1fab89',
        borderColor: '#1fab89',
        width: '80%',
        height: '8%',
        borderRadius: 50,
        marginTop: '5%',
    },
    UseButton: {
        backgroundColor: '#07689f',
        borderColor: '#07689f',
        width: '80%',
        height: '8%',
        borderRadius: 50,
        marginTop: '5%',
    },
    ButtonText: {
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 24,
        color: 'white'
    },
    MainText: {
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 24
    }
});

export default CameraScreen;

// useEffect(() => {
    //     (async () => {
    //         if (Platform.OS !== 'web') {
    //             const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //             if (status !== 'granted') {
    //                 alert('Sorry, we need camera roll permissions to make this work!');
    //             }
    //         }
    //     })();
    // }, []);