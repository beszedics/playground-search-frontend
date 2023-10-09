import React from 'react';
import { render } from '@testing-library/react';
import Login from './Login';

const onClose = jest.fn();

describe('Login unit test', () => {
  it('Username and password input field is shown', async () => {
    const setShowRegistrationModal = jest.fn();
    const setShowLoginModal = jest.fn();
    const { getByRole, getByLabelText } = render(
      <Login
        isOpen
        onClose={onClose}
        setShowRegistrationModal={setShowRegistrationModal}
        setShowLoginModal={setShowLoginModal}
      />,
    );

    const usernameInput = getByRole('textbox', {
      name: /loginModal.username/i,
    });

    const passwordInput = getByLabelText(/loginModal.password\*/i);

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('Sign up button is shown with the need an account text', async () => {
    const setShowRegistrationModal = jest.fn();
    const setShowLoginModal = jest.fn();
    const { getByRole, getByText } = render(
      <Login
        isOpen
        onClose={onClose}
        setShowRegistrationModal={setShowRegistrationModal}
        setShowLoginModal={setShowLoginModal}
      />,
    );

    const needAnAccountText = getByText(/loginModal.registrationText/i);

    const signUpBtn = getByRole('button', {
      name: /loginModal.registrationBtn/i,
    });

    expect(needAnAccountText).toBeInTheDocument();
    expect(signUpBtn).toBeInTheDocument();
  });

  // TODO test if login button is pressed correct api is called
  // TODO test if one of the input fields have not value submit is not called
  // TODO test if user has not account and sign up is clicked then login modal is disappeared and the registration modal is opened
});
