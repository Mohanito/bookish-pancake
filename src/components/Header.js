import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Icon } from '@ui-kitten/components';
import { Link } from 'react-router-native';

const Header = (props) => {
    return (
        <View style={styles.Header}>
            <Link to="/" component={TouchableOpacity} activeOpacity={0.5}>
                <Icon name='home-outline' fill='white' style={styles.Icons} />
            </Link>
            <Text style={styles.HeaderTitle}>GUIDE DOGE</Text>
            <Icon name='settings-2-outline' fill='white' style={styles.Icons} />
        </View>
    );
}

const styles = StyleSheet.create({
    Header: {
        height: '7%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#da7f8f',
        flexDirection: 'row'
    },
    HeaderTitle: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Ubuntu_400Regular',
    },
    Icons: {
        width: 35,
        height: 35,
        margin: 20
    }
});

export default Header;