import React, { FunctionComponent, useCallback, useRef } from 'react';
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErros';
import { Background, Container, Content } from './styles';

interface Login {
  email: string;
  passwrod: string;
}

const SignIn: FunctionComponent = () => {

  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(async (data: Login) => {
    try {
      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail Obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().required('Senha Obrigatória')
      })
      await schema.validate(data, { abortEarly: false })
    } catch (err) {
      const erros = getValidationErrors(err);
      formRef.current?.setErrors(erros)
    }
  }, []);

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <Button type="submit">Entrar</Button>
          <a href="forgot">Esqueci minha senha</a>
        </Form>

        <a href="create">
          <FiLogIn />
        Criar conta
      </a>
      </Content>
      <Background />
    </Container>
  );

}

export default SignIn;
