import { NavigationContainer } from '@react-navigation/native';
import React, { FunctionComponent } from 'react';
import { StatusBar, View } from 'react-native';
import AppProvider from './hooks';
import Routes from './routes';

const App: FunctionComponent = () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" backgroundColor="#312e38" translucent />
    <AppProvider>
      <View style={{ flex: 1, backgroundColor: '#312e38' }}>
        <Routes />
      </View>
    </AppProvider>
  </NavigationContainer>
);

export default App;
