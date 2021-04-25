import React from 'react';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NativeRouter, Switch, Route } from 'react-router-native';

import HomeScreen from './src/components/HomeScreen';
import CameraScreen from './src/components/CameraScreen';

const App = () => {
  return (
    <NativeRouter>
      <SafeAreaView>
        <Switch>
          <Route path="/" exact component={HomeScreen} />
          <Route path="/camera" exact component={CameraScreen} />
        </Switch>
        <StatusBar style="auto" />
      </SafeAreaView>
    </NativeRouter>
  );
}
export default App;
