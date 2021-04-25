import React from 'react';
import {
    Button, Text, View, StyleSheet
} from 'react-native';

const CameraScreen = (props) => {
    return (
        <View style={styles.CameraScreen}>
            <Text>Camera Screen</Text>
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
    }
});

export default CameraScreen;