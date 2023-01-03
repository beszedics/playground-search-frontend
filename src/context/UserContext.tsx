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
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  password?: string;
  status?: boolean;
  created_at?: string;
  updated_at?: string;
};

type UserContext = {
  user?: User;
  setUser?: Dispatch<SetStateAction<User | undefined>>;
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
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<ErrorProps>();

  useEffect(() => {
    axios({
      url: '/auth',
      method: 'GET',
      headers: {
        token: localStorage.getItem('token'),
      },
    })
      .then((res) => {
        if (res.data.error) {
          setUser?.({ ...user, status: false });
        } else {
          setUser?.({
            id: res.data.id,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            email: res.data.email,
            username: res.data.username,
            status: true,
          });
        }
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, error }}>
      {children}
    </UserContext.Provider>
  );
};
