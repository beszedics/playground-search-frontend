import React, {
  createContext,
  Dispatch,
  ReactFragment,
  ReactNode,
  ReactPortal,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import axios from '../api/axios';

type User = {
  [key: string]: string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  created_at: string;
  updated_at: string;
};

type UserContext = {
  user?: User;
  setUser?: Dispatch<SetStateAction<undefined>>;
  error?: ErrorProps;
};

type ErrorProps = {
  message?: string;
};

type UserProviderProps = {
  children?:
    | ReactNode
    | ReactFragment
    | ReactPortal
    | boolean
    | null
    | undefined;
};

export const UserContext = createContext<UserContext>({});

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState();
  const [error, setError] = useState<ErrorProps>();

  useEffect(() => {
    axios({
      url: '/auth/users/549fd6ca-72d9-4d4a-a136-5785c70c2c11',
      method: 'GET',
    })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, error }}>
      {children}
    </UserContext.Provider>
  );
};
