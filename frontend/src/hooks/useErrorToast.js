import { useEffect } from 'react';
import { toast } from 'react-toastify';

function useErrorToast(status, error) {
    useEffect(() => {
        if (status === 'failed') {
            toast.error(error);
        }
    },  [status, error]);
}

export default useErrorToast;