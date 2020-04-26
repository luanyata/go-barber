import styled, { keyframes } from 'styled-components'

import { shade } from 'polished'
import sigUpBackgroundImg from '../../assets/sign-up-background.png'

const Background = styled.div`
  flex: 1;
  background: url(${sigUpBackgroundImg}) no-repeat center;
  background-size: cover;
`;

const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 700px;


`;

const appearFromLeft = keyframes`
  from{
    opacity: 0;
    transform: translateX(50px);
  }to {
    opacity: 1;
    transform: translateX(0);
  }
`

const AnimationContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    animation: ${appearFromLeft} 1s;

    h1{
      margin-bottom: 24px
    }
}
> a{
    color: #f4ede8;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    svg {
      margin-right: 16px;
    }

    &:hover{
      color: ${shade(0.2, '#f4ede8')};
    }
  }
`

export { AnimationContent, Background, Container, Content }
