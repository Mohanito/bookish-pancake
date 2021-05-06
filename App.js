import React from 'react';
import { SafeAreaView } from 'react-native';
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

const App = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NativeRouter>
          <SafeAreaView>
            <Switch>
              <Route path="/" exact component={HomeScreen} />
              <Route path="/camera" exact component={CameraScreen} />
              <Route path="/result" exact component={ResultScreen} />
            </Switch>
            <StatusBar style="auto" />
          </SafeAreaView>
        </NativeRouter>
      </ApplicationProvider>
    </>
  );
}

export default App;
