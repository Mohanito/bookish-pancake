import React from 'react';
import {
    Button, Text, View, StyleSheet
} from 'react-native';

const HomeScreen = (props) => {
    return (
        <View style={styles.HomeScreen}>
            <Text>Home Screen</Text>
            <Button title="Go to Camera Page" onPress={() => props.history.push('/camera')} />
        </View>
    );
}

const styles = StyleSheet.create({
    HomeScreen: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'honeydew',
        width: '100%',
        height: '80%'
    }
});

export default HomeScreen;