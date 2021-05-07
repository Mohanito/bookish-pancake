import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';

const Header = (props) => {
    return (
        <View style={styles.Header}>
            <Text style={styles.HeaderTitle}>GUIDE DOGE</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    Header: {
        height: '8%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#da7f8f'
    },
    HeaderTitle: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 18
    }
});

export default Header;