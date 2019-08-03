import { handleResponse } from '../_helpers/handle-response.js';
import { authHeader } from '../_helpers/auth-header.js';

export const userService = {
    getAll
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    console.log(requestOptions);
    return fetch('http://localhost:3000/users', requestOptions).then(handleResponse);
}