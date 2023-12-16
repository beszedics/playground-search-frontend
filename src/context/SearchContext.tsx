import React, {
  ChangeEvent,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';

type SearchContext = {
  searchItem: string;
  handleInputChange: (value: ChangeEvent<HTMLInputElement>) => void;
};

export const SearchContext = createContext<SearchContext | undefined>(
  undefined,
);

export const useSearch = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }

  return context;
};

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchItem, setSearchItem] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchItem(event.target.value);
  };

  return (
    <SearchContext.Provider value={{ searchItem, handleInputChange }}>
      {children}
    </SearchContext.Provider>
  );
};
