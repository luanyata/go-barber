import { ValidationError } from 'yup'

interface Erros {
  [key: string]: string
}

function getValidationErrors(err: ValidationError): Erros {
  const validationErrors: Erros = {}

  err.inner.forEach(error => {
    validationErrors[error.path] = error.message
  })

  return validationErrors;
}


export default getValidationErrors;

