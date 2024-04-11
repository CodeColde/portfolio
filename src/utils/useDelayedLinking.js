import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const useDelayedLinking = (delay, pathname, setter) => {
    const navigate = useNavigate();

    const delayer = (navigate) => setTimeout(() => {
        navigate(pathname);
    }, delay)


     if (typeof setter !== 'undefined') {
         useEffect(() => {
            setter && delayer(navigate);
        }, [navigate, setter]);
    } else {
        throw new Error('This hook requires a trigger! Please pass a state trigger through!');
    }
}

export default useDelayedLinking;