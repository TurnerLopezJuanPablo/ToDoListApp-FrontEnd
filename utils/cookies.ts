import { setAuthorizationHeader, clearAuthorizationHeader } from "./authorization";

export const cookieName =" tokenToDoListApp"

export function setCookie(value: any, name = cookieName, expirationDays = 7) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expirationDays);
    const cookieString = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
    document.cookie = cookieString;

    setAuthorizationHeader(value);
}

export function getCookie(name = cookieName) {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        const [cookieName, cookieValue] = cookies[i].split("=");
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return "";
}

export function removeCookie(name = cookieName) {
    setCookie(null, name, -1000);
    clearAuthorizationHeader();
    // location.reload();
  }
