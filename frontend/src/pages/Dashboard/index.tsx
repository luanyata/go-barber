import React, { FunctionComponent } from 'react'
import { Container } from './styles'
import Diego from '../../assets/diego.jpg'

const Dashboard: FunctionComponent = () => (
  <>
    <h1>Dashboard</h1>
    <Container>
      <img src={Diego} alt="Diego Rocketseat" />
      <p>Em construção !!!</p>
    </Container>
  </>
)

export default Dashboard;
