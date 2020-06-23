import React, { FunctionComponent, useCallback, useRef } from 'react';
import { FiLock } from 'react-icons/fi';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { useHistory, useLocation } from 'react-router-dom'

import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErros';
import { AnimationContent, Background, Container, Content } from './styles';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

interface ResetPasswordFormData {
  email: string;
  password: string;
  passwordConfirmation: string
}

const ResetPassword: FunctionComponent = () => {

  const formRef = useRef<FormHandles>(null);


  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation()


  const handleSubmit = useCallback(async (data: ResetPasswordFormData) => {

    try {
      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        password: Yup.string().required('Senha Obrigatória'),
        passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Senha não são semelhantes')
      })

      await schema.validate(data, { abortEarly: false })

      const { password, passwordConfirmation } = data;
      const token = location.search.replace('?token=', '')

      if (!token) {
        throw new Error()
      }

      await api.post('/password/reset', {
        password,
        passwordConfirmation,
        token
      })

      history.push('/')

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErrors(err);
        formRef.current?.setErrors(erros);
        return;
      }

      addToast({
        type: 'error',
        title: 'Erro ao resetar senha',
        description: 'Ocorreu um erro ao resetar a senha, tente novamente.'
      })
    }
  }, [location.search, addToast, history]);

  return (
    <Container>
      <Content>
        <AnimationContent>
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar Senha</h1>

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova Senha"
            />

            <Input
              name="passwordConfirmation"
              icon={FiLock}
              type="password"
              placeholder="COnfirmação da Senha"
            />
            <Button type="submit">Alterar Senha</Button>

          </Form>
        </AnimationContent>
      </Content>
      <Background />
    </Container>
  );

}

export default ResetPassword;
