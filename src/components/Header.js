import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Icon } from '@ui-kitten/components';
import { Link } from 'react-router-native';

const Header = (props) => {
    return (<>
        <View style={{height: '4%', backgroundColor: '#1fab89'}}></View>
        <View style={styles.Header}>
            <Link to="/" component={TouchableOpacity} activeOpacity={0.5}>
                <Icon name='home-outline' fill='white' style={styles.Icons} />
            </Link>
            <Text style={styles.HeaderTitle}>GUIDE DOGE</Text>
            <Icon name='settings-2-outline' fill='transparent' style={styles.Icons} />
        </View>
    </>
    );
}

const styles = StyleSheet.create({
    Header: {
        height: '6%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#1fab89',
        flexDirection: 'row'
    },
    HeaderTitle: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Ubuntu_400Regular',
    },
    Icons: {
        width: 30,
        height: 30,
        margin: 20
    }
});

export default Header;