import React, { FunctionComponent, useCallback, useRef } from 'react';
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { Link, useHistory } from 'react-router-dom'

import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErros';
import { AnimationContent, Background, Container, Content } from './styles';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface Crendentials {
  email: string;
  password: string;
}

const SignIn: FunctionComponent = () => {

  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();


  const handleSubmit = useCallback(async (data: Crendentials) => {

    try {
      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail Obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().required('Senha Obrigatória')
      })

      await schema.validate(data, { abortEarly: false })

      await signIn({
        email: data.email,
        password: data.password
      })

      history.push('/dashboard')

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErrors(err);
        formRef.current?.setErrors(erros);
        return;
      }

      addToast({
        type: 'error',
        title: 'Erro na autenticação',
        description: 'Ocorreu um erro ao fazer login, cheque as credencias.'
      })
    }
  }, [signIn, addToast, history]);

  return (
    <Container>
      <Content>
        <AnimationContent>
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
          <Link to="signup">
            <FiLogIn />
        Criar conta
      </Link>
        </AnimationContent>
      </Content>
      <Background />
    </Container>
  );

}

export default SignIn;
