import { createStackNavigator } from '@react-navigation/stack';
import React, { FunctionComponent } from 'react';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import CreateAppointment from '../pages/CreateAppointment';
import AppointmentCreated from '../pages/AppointmentCreated';


const App = createStackNavigator();

const AppRoutes: FunctionComponent = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >

    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="CreateAppointment" component={CreateAppointment} />
    <App.Screen name="AppointmentCreated" component={AppointmentCreated} />
    <App.Screen name="Profile" component={Profile} />

  </App.Navigator>
);

export default AppRoutes;
