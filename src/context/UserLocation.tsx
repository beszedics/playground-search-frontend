import React, { ReactNode, createContext } from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type UserLocationProviderProps = {
  children: ReactNode;
};

type UserLocationContextType = {
  latitude?: number;
  longitude?: number;
  error?: string;
  setLatitude?: React.Dispatch<React.SetStateAction<number | undefined>>;
  setLongitude?: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export const UserLocationContext = createContext<UserLocationContextType>({});

export const UserLocationProvider: React.FC<UserLocationProviderProps> = ({
  children,
}) => {
  const { t } = useTranslation();
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    // Check if the browser supports Geolocation
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Get the latitude and longitude from the position object
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
        },
        (error) => {
          setError(error.message);
        },
      );
    } else {
      setError(String(t('errors.no_geolocation')));
    }
  }, []);

  return (
    <UserLocationContext.Provider
      value={{ latitude, setLatitude, longitude, setLongitude, error }}
    >
      {children}
    </UserLocationContext.Provider>
  );
};
