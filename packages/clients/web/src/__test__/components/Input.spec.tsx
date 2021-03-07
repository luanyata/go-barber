import React from 'react';

import { render, fireEvent, wait } from '@testing-library/react';
import Input from '../../components/Input';

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      };
    },
  };
});
describe('Input Component', () => {
  it('Should be able to render an input', () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
  });

  it('Should render highlight on input focus', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    const inputElement = getByPlaceholderText('E-mail');

    fireEvent.focus(inputElement);

    const containerElement = getByTestId('input-container');

    await wait(() => {
      expect(containerElement).toHaveStyle('border-color:#ff9000');
      expect(containerElement).toHaveStyle('color:#ff9000');
    });
  });

  it('Should render highlight on input blur', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    const inputElement = getByPlaceholderText('E-mail');

    fireEvent.focus(inputElement);
    fireEvent.blur(inputElement);

    const containerElement = getByTestId('input-container');

    await wait(() => {
      expect(containerElement).not.toHaveStyle('border-color:#ff9000');
      expect(containerElement).not.toHaveStyle('color:#ff9000');
    });
  });

  it('Should keep input border highlight when input filled', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    const inputElement = getByPlaceholderText('E-mail');

    fireEvent.change(inputElement, {
      target: { value: 'luan@example.com' },
    });
    fireEvent.blur(inputElement);

    const containerElement = getByTestId('input-container');

    await wait(() => {
      expect(containerElement).toHaveStyle('color:#ff9000');
    });
  });
});
