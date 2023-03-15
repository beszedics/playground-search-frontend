import { useState } from 'react';
import axios from '../api/axios';
import { METHOD } from '../utils/consts';

type UseMutationProps = {
  url: string;
  method: METHOD;
};

type useMutationSetState = {
  isLoading: boolean;
  error: string;
};

const useMutation = ({ url, method = METHOD.POST }: UseMutationProps) => {
  const [state, setState] = useState<useMutationSetState>({
    isLoading: false,
    error: '',
  });

  const fn = async (data = []) => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));

    axios({ url, method, data })
      .then(() => {
        setState({ isLoading: false, error: '' });
      })
      .catch((error) => {
        setState({ isLoading: false, error });
      });
  };

  return { mutate: fn, ...state };
};

export default useMutation;
