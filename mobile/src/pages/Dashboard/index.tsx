import React, { FunctionComponent, useCallback } from 'react';

import { useAuth } from '../../hooks/auth';
import {Container, Header, HeaderTitle, UserName, ProfileButton, UserAvatar} from './styles'
import { useNavigation } from '@react-navigation/native';



const Dashboard: FunctionComponent = () => {
  const { signOut, user } = useAuth();
  const {navigate} = useNavigation();

  const navigateToProfile = useCallback(() => {
navigate('Profile')
  },[navigate])

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {"\n"}
  <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{uri: user.avatarUrl}}/>
        </ProfileButton>
      </Header>
    </Container>
  )
}

export default Dashboard;
