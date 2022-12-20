import React from 'react';
import { render } from '@testing-library/react';
import Registration from './Registration';

const onClose = jest.fn();

describe('Registration unit test', () => {
  it('Username and password input field is shown', async () => {
    const { getByRole, getByLabelText } = render(
      <Registration isOpen onClose={onClose} />,
    );

    const firstNameInput = getByRole('textbox', {
      name: /registrationModal.firstName/i,
    });

    const lastNameInput = getByRole('textbox', {
      name: /registrationModal.lastName/i,
    });

    const emailInput = getByRole('textbox', {
      name: /registrationModal.email/i,
    });

    const usernameInput = getByRole('textbox', {
      name: /registrationModal.username/i,
    });

    const passwordInput = getByLabelText(/registrationModal.password\*/i);

    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('Log in button is shown with the already have an account text', async () => {
    const { getByRole, getByText } = render(
      <Registration isOpen onClose={onClose} />,
    );

    const alreadyHaveAnAccountText = getByText(/registrationModal.loginText/i);

    const loginUpBtn = getByRole('button', {
      name: /registrationModal.loginBtn/i,
    });

    expect(alreadyHaveAnAccountText).toBeInTheDocument();
    expect(loginUpBtn).toBeInTheDocument();
  });

  // TODO test if sign up button is pressed correct api is called
  // TODO test if one of the input fields have not value submit is not called
  // TODO test if user has account and login is clicked then registration modal is disappeared and the login modal is opened
});
