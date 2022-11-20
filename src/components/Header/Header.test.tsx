import React from 'react';
import { render } from '../../test-utils';
import Header from './Header';

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
});
