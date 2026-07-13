import { TimeoutError } from './errors.js';

const withTimeout = (promise, timeoutMs=30000) => {
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new TimeoutError());
        }, timeoutMs);
    });   

    return Promise.race([promise, timeoutPromise]);
}

export { withTimeout }