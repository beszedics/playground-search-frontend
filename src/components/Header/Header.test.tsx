import React from 'react';
import { render } from '../../test-utils';
import Header from './Header';
import userEvent from '@testing-library/user-event';

describe('Header unit test', () => {
  it('Header should render searchbar with the correct placeholder', async () => {
    const { queryByPlaceholderText } = render(<Header />);
    const placeholder = queryByPlaceholderText(/Search playground.../);
    expect(placeholder).toHaveAttribute('placeholder', 'Search playground...');
  });

  // it('Header should render the avatar if the given user is logged in', async () => {
  //   const { getByRole } = render(<Header />);

  //   const avatarName = getByRole('img', {
  //     name: /test user/i,
  //   });

  //   expect(avatarName).toHaveAttribute('aria-label', 'Test User');
  // });

  it('Header should render sign up and login button if there is not logged in user', async () => {
    const { getByRole } = render(<Header />);
    const signUpBtn = getByRole('button', {
      name: /sign up/i,
    });
    const loginBtn = getByRole('button', {
      name: /login/i,
    });

    expect(signUpBtn).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
  });

  it('If Sign up button is clicked then the registration modal is opened', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<Header />);

    const signUpBtn = getByRole('button', {
      name: /sign up/i,
    });

    await user.click(signUpBtn);

    const registrationHeading = getByRole('heading', {
      name: /create your account/i,
    });

    expect(registrationHeading).toBeInTheDocument();
  });

  it('The close button is clicked then the registration modal is disappeared', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<Header />);

    const signUpBtn = getByRole('button', {
      name: /sign up/i,
    });

    await user.click(signUpBtn);

    const registrationHeading = getByRole('heading', {
      name: /create your account/i,
    });

    const closeBtn = getByRole('button', {
      name: /close/i,
    });

    await user.click(closeBtn);

    expect(registrationHeading).not.toBeInTheDocument();
  });

  it('The ESC button is clicked then the registration modal is disappeared', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<Header />);

    const signUpBtn = getByRole('button', {
      name: /sign up/i,
    });

    await user.click(signUpBtn);

    const registrationHeading = getByRole('heading', {
      name: /create your account/i,
    });

    await user.keyboard('[Escape]');

    expect(registrationHeading).not.toBeInTheDocument();
  });

  /* it('Clicking outside of the registration modal then the registration modal is disappeared', async () => {
    const user = userEvent.setup();
    const { getByRole, getByTestId } = render(<Header />);

    const signUpBtn = getByRole('button', {
      name: /sign up/i,
    });

    await user.click(signUpBtn);

    const registrationHeading = getByRole('heading', {
      name: /create your account/i,
    });

    const registrationOverlay = getByTestId('registration_overlay');

    console.log(registrationOverlay);

    await user.click(registrationOverlay);

    expect(registrationHeading).not.toBeInTheDocument();
  }); */

  it('If Login button is clicked then the login modal is opened', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<Header />);

    const loginBtn = getByRole('button', {
      name: /login/i,
    });

    await user.click(loginBtn);

    const loginHeading = getByRole('heading', {
      name: /login to your account/i,
    });

    expect(loginHeading).toBeInTheDocument();
  });

  it('The close button is clicked then the login modal is disappeared', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<Header />);

    const loginBtn = getByRole('button', {
      name: /login/i,
    });

    await user.click(loginBtn);

    const loginHeading = getByRole('heading', {
      name: /login to your account/i,
    });

    const closeBtn = getByRole('button', {
      name: /close/i,
    });

    await user.click(closeBtn);

    expect(loginHeading).not.toBeInTheDocument();
  });

  it('The ESC button is clicked then the login modal is disappeared', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<Header />);

    const loginUpBtn = getByRole('button', {
      name: /login/i,
    });

    await user.click(loginUpBtn);

    const loginHeading = getByRole('heading', {
      name: /login to your account/i,
    });

    await user.keyboard('[Escape]');

    expect(loginHeading).not.toBeInTheDocument();
  });
});
