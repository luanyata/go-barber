import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from './styles/global';

import Routes from './routes';

import AppProvider from './hooks';

const App: FunctionComponent = () => (
  <Router>
    <AppProvider>
      <Routes />
    </AppProvider>

    <GlobalStyle />
  </Router>
);

export default App;
