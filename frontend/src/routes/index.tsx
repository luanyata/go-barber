import React, { FunctionComponent } from 'react'
import { Switch } from 'react-router-dom'

import Route from './Route'

import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Dashboard from '../pages/Dashboard'
import ForgotPassword from '../pages/ForgotPassword'


const Routes: FunctionComponent = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/dashboard" component={Dashboard} isPrvate />
  </Switch>
)

export default Routes;
