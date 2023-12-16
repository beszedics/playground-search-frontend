import React, {
  createContext,
  Dispatch,
  ReactFragment,
  ReactNode,
  ReactPortal,
  SetStateAction,
  useContext,
  useState,
} from 'react';

export type User = {
  id?: string;
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  isAdmin?: boolean;
  password?: string;
  isLoggedIn?: boolean;
  created_at?: string;
  updated_at?: string;
};

type UserContext = {
  user: User | null;
  setUser?: Dispatch<SetStateAction<User | null>>;
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

export const UserContext = createContext<UserContext>({ user: null });

export const useUser = () => {
  const user = useContext(UserContext);

  if (!user) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return user;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<ErrorProps>();

  return (
    <UserContext.Provider value={{ user, setUser, error }}>
      {children}
    </UserContext.Provider>
  );
};
