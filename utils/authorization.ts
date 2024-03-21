import axios from "axios";
import { cookieName } from "./cookies";

export const instance = axios.create();

export const setAuthorizationHeader = (token: any) => {
    instance.defaults.headers.common['Authorization'] = `${cookieName}=${token}`.trim();
};  

export const clearAuthorizationHeader = () => {    
    delete instance.defaults.headers.common['Authorization'];
};