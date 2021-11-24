export default {
    async signup(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'signup'
        })
    },
    async login(context, payload){
        return context.dispatch('auth',{
            ...payload,
            mode: 'login'
        })
    },
    async auth(context,payload){
        const mode = payload.mode;

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDMKgv-zWYeernfNfXR81q9DO3Bp_XKQuo';

        if (mode === 'signup'){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDMKgv-zWYeernfNfXR81q9DO3Bp_XKQuo';
        }
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        });
        const responseData = await response.json();

        if (!response.ok) {
            let message;
            for (const key in responseData) {
                message = responseData[key].message
            }
            const error = new Error(message || 'Failed to authenticate.');
            throw error;
        }
        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
        });
    },
    async logout(context){
        context.commit('setUser', {
            token: null,
            userId: null,
        });
    }
};