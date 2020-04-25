import React, { FunctionComponent } from 'react';
import GlobalStyle from './styles/global';
// import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const App: FunctionComponent = () => (
  <>
    <GlobalStyle />
    <SignUp />

  </>
);

export default App;
