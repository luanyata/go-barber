import React, { FunctionComponent } from 'react'
import { Container } from './styles'
import { useTransition } from 'react-spring'
import Toast from './Toast'

import { ToastMessage } from '../../hooks/toast'

interface ToastContainerProps {
  messages: ToastMessage[]
}

const ToastContainer: FunctionComponent<ToastContainerProps> = ({ messages }) => {

  const messagesWithTransitions = useTransition(
    messages,
    message => message.id,
    {
      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 }
    }
  )

  return (
    <Container>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} toast={item} style={props} />
      ))}
    </Container>)
}

export default ToastContainer;
