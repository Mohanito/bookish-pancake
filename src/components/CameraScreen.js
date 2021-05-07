import React, { useState } from 'react';
import {
    View, StyleSheet, Platform, Image
} from 'react-native';
import { Button, Icon } from '@ui-kitten/components';
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
            return <Icon name='image' fill='#a7bbc7' style={{ width: 35, height: 35 }} />
        else
            return <Image source={{ uri: image }} style={styles.ImagePreview} />
    }

    const renderUseImageButton = () => {
        if (image !== '')
            return <Button onPress={() => props.history.push('/result', { image: image, base64: base64 })} style={styles.Button}>
                Use this Image
            </Button>
        return null;
    }

    return (
        <View style={styles.CameraScreen}>
            <View style={styles.ImagePreview}>
                {renderPreview()}
            </View>
            {renderUseImageButton()}
            <Button onPress={selectImage} style={styles.Button}>
                Choose Photo from Library
            </Button>
            <Button onPress={takeImage} style={styles.Button}>
                Take Photo using Camera
            </Button>
            <Button onPress={() => props.history.push('/')} style={styles.Button}>
                Back to Home Screen
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    CameraScreen: {
        // justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'honeydew',
        width: '100%',
        height: '100%'
    },
    ImagePreview: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 300,
        borderColor: '#a7bbc7',
        borderWidth: 2,
        borderRadius: 50,
        margin: '5%'
    },
    Button: {
        backgroundColor: '#da7f8f',
        borderColor: '#da7f8f',
        width: '80%',
        height: '10%',
        borderRadius: 25,
        marginTop: '5%',
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