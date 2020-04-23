import React, { FunctionComponent } from 'react';
import GlobalStyle from './styles/global';
import SignIn from './pages/Signin';

const App: FunctionComponent = () => (
  <>
    <GlobalStyle />
    <SignIn />
  </>
);

export default App;
