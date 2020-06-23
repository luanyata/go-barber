import React, { FunctionComponent, useEffect } from 'react'
import { Container } from './styles'
import { FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi'
import { useToast, ToastMessage } from '../../../hooks/toast';

interface ToastProps {
  toast: ToastMessage;
  style: object
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
}

const Toast: FunctionComponent<ToastProps> = ({ toast, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, 3000);
    return () => {
      clearTimeout(timer)
    }
  }, [removeToast, toast.id])

  return (
    <Container style={style} type={toast.type} hasDescription={Number(!!toast.description)}>
      {icons[toast.type || 'info']}
      <div>
        <strong>{toast.title}</strong>
        {toast.description && <p>{toast.description}</p>}
      </div>
      <button onClick={() => removeToast(toast.id)} type="button">
        <FiXCircle size={18} />
      </button>
    </Container>
  )
}

export default Toast;
