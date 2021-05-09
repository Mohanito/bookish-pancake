import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
// UI Kitten
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
// RN Router
import { NativeRouter, Switch, Route } from 'react-router-native';

// Components / Screens
import HomeScreen from './src/components/HomeScreen';
import CameraScreen from './src/components/CameraScreen';
import ResultScreen from './src/components/ResultScreen';
import Header from './src/components/Header';
import MagnifyScreen from './src/components/MagnifyScreen';

import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Ubuntu_300Light,
  Ubuntu_300Light_Italic,
  Ubuntu_400Regular,
  Ubuntu_400Regular_Italic,
  Ubuntu_500Medium,
  Ubuntu_500Medium_Italic,
  Ubuntu_700Bold,
  Ubuntu_700Bold_Italic,
} from '@expo-google-fonts/ubuntu';

const App = () => {

  let [fontsLoaded] = useFonts({
    Ubuntu_300Light,
    Ubuntu_300Light_Italic,
    Ubuntu_400Regular,
    Ubuntu_400Regular_Italic,
    Ubuntu_500Medium,
    Ubuntu_500Medium_Italic,
    Ubuntu_700Bold,
    Ubuntu_700Bold_Italic,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  else {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <NativeRouter>
            <View>
              <Header />
              <SafeAreaView>
                <Switch>
                  <Route path="/" exact component={HomeScreen} />
                  <Route path="/camera" exact component={CameraScreen} />
                  <Route path="/result" exact component={ResultScreen} />
                  <Route path="/magnify" exact component={MagnifyScreen} />
                </Switch>
                <StatusBar style="auto" />
              </SafeAreaView>
            </View>
          </NativeRouter>
        </ApplicationProvider>
      </>
    );
  }
}

export default App;
