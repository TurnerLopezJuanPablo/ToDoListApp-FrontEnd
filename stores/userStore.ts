import { defineStore } from 'pinia'
import { instance } from '../utils/authorization'
import apiUrl from '../config/config'
import { setCookie, removeCookie } from '../utils/cookies'

export const userStore = defineStore('user', {
    state: () => ({
        url: `${apiUrl}user`,
        currentUserData: null,
    }),
    actions: {
        async logIn(email: String, password: String) {
            const data = {
                email, password
            }

            try {
                const response = await instance.post(`${this.url}/login`, data, { withCredentials: true });
          
                setCookie(response.data.user.token)

                if (response.data.success) {
                    this.getAllUserData();
                }

                return response.data.message;
            } catch (error) {
                return `Error: ${error.message}`
            }
        },
        async logOut() {
            try {
                const response = await instance.post(`${this.url}/logout`, { withCredentials: true });
                alert(response.data.message);

                if (response.data.success) {
                    removeCookie();
                }
            } catch (error) {
                console.log(error)
            }
        },
        async getAllUserData() {
            try {
                const response = await instance.get(`${this.url}/getAllData`, { withCredentials: true });

                return response.data.message;
            } catch (error) {
                return `Error: ${error.message}`
            }
        },
    },
    getters: {
    }
})