import useSWR from 'swr';
import API from './index';

export const useEmployRegister = (identification) => {
    const {data, error, mutate} = useSWR(`/employs/${identification}/registers`,API.fetcher);

    return {
        employsRegisters: data && data.data,
        isLoading: !error && !data,
        isError: error,
        mutate
    };
};