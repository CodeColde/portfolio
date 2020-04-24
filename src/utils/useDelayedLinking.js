import { useEffect } from 'react';
import { useHistory } from 'react-router';

const useDelayedLinking = (delay, pathname, setter) => {
    const historyHook = useHistory();

    const delayer = (history) => setTimeout(() => {
        history.push(pathname);
    }, delay)


     if (typeof setter !== 'undefined') {
         useEffect(() => {
            setter && delayer(historyHook);
        }, [historyHook, setter]);
    } else {
        throw new Error('This hook requires a trigger! Please pass a state trigger through!');
    }
}

export default useDelayedLinking;