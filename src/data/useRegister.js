import useSWR from 'swr';
import API from './index';

export const useRegister = (id) => {
    const {data, error} = useSWR(`/registers/${id}`,API.fetcher);

    return {
        Register: data && data.data,
        isLoading: !error && !data,
        isError: error,
    };
};