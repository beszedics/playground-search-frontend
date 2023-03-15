import { useEffect, useState } from 'react';
import axios from '../api/axios';

type UseQueryProps = {
  url: string;
};

const useQuery = ({ url }: UseQueryProps) => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    error: '',
  });

  useEffect(() => {
    const fetch = async () => {
      axios
        .get(url)
        .then(({ data }) => setState({ data, isLoading: false, error: '' }))
        .catch((error) =>
          setState({ data: null, isLoading: false, error: error.message }),
        );
    };

    fetch();
  }, [url]);

  return state;
};

export default useQuery;
