import useSWR from 'swr';
import API from './index';

export const useRegisters = () => {
    const { data, error, mutate } = useSWR( '/registers', API.fetcher );

    return {
        employsRegisters: data && data.data,
        isLoading: !error && !data,
        isError: error,
        mutate
    };
};