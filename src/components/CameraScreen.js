import React, { useState } from 'react';
import {
    Button, Text, View, StyleSheet, Platform, Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const CameraScreen = (props) => {
    // String: contains image URL
    const [image, setImage] = useState('');

    const takeImage = async () => {
        // FIXME: requests unhandled after initial rejection
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
                return;
            }
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
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
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const displayPreview = () => {
        if (image === '')
            return <Text style={styles.ImagePreview}>Upload Image to Start</Text>
        else
            return <Image source={{ uri: image }} style={styles.ImagePreview} />
    }

    return (
        <View style={styles.CameraScreen}>
            <Text>Camera Screen</Text>
            {displayPreview()}
            <Button title="Choose Photo from Library" onPress={selectImage} />
            <Button title="Take Photo using Camera" onPress={takeImage} />
            <Button title="Back to Home Screen" onPress={() => props.history.push('/')} />
        </View>
    );
}

const styles = StyleSheet.create({
    CameraScreen: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'honeydew',
        width: '100%',
        height: '80%'
    },
    ImagePreview: {
        width: 250,
        height: 250
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