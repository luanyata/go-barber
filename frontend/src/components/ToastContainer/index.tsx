import React, { FunctionComponent } from 'react'
import { Container, Toast } from './styles'
import { FiAlertCircle, FiXCircle } from 'react-icons/fi'


const ToastContainer: FunctionComponent = () => {
  return (
    <Container>
      <Toast hasDescription>
        <FiAlertCircle size={20} />
        <div>
          <strong>Aconteceu um erro</strong>
          <p>Não foi possivel fazer login na aplicação</p>
        </div>
        <button type="button">
          <FiXCircle size={18} />
        </button>
      </Toast>

      <Toast hasDescription={false} type="success">
        <FiAlertCircle size={20} />
        <div>
          <strong>Aconteceu um erro</strong>
          {/* <p>Não foi possivel fazer login na aplicação</p> */}
        </div>
        <button type="button">
          <FiXCircle size={18} />
        </button>
      </Toast>

      <Toast hasDescription type="error">
        <FiAlertCircle size={20} />
        <div>
          <strong>Aconteceu um erro</strong>
          <p>Não foi possivel fazer login na aplicação</p>
        </div>
        <button type="button">
          <FiXCircle size={18} />
        </button>
      </Toast>
    </Container>)
}

export default ToastContainer;
