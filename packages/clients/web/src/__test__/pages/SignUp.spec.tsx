import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import SignUp from '../../pages/SignUp';

const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('SignOut Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });
  it('Should be able to sign up', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const nameField = getByPlaceholderText('Nome');
    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Cadastrar');

    fireEvent.change(nameField, { target: { value: 'Luan Lima' } });
    fireEvent.change(emailField, { target: { value: 'luan@example.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    // fireEvent.click(buttonElement);

    // await wait(() => {
    //   expect(mockedHistoryPush).toHaveBeenCalledWith('/');
    // });
  });
});
