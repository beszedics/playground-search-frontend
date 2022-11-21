import React from 'react';
import { render } from '@testing-library/react';
import Login from './Login';

const onClose = jest.fn();

describe('Login unit test', () => {
  it('Username and password input field is shown', async () => {
    const { getByRole, getByLabelText } = render(
      <Login isOpen onClose={onClose} />,
    );

    const usernameInput = getByRole('textbox', {
      name: /username/i,
    });

    const passwordInput = getByLabelText(/password\*/i);

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('Sign up button is shown with the need an account text', async () => {
    const { getByRole, getByText } = render(<Login isOpen onClose={onClose} />);

    const needAnAccountText = getByText(/need an account\?/i);

    const signUpBtn = getByRole('button', {
      name: /sign up/i,
    });

    expect(needAnAccountText).toBeInTheDocument();
    expect(signUpBtn).toBeInTheDocument();
  });

  // TODO test if login button is pressed correct api is called
  // TODO test if one of the input fields have not value submit is not called
  // TODO test if user has not account and sign up is clicked then login modal is disappeared and the registration modal is opened
});
