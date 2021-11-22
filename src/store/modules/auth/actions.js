export default {
    async signup(context, payload) {
        const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDMKgv-zWYeernfNfXR81q9DO3Bp_XKQuo', {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        });
        const responseData = await response.json();

        if (!response.ok) {
            console.log(responseData);
            const error = new Error('Failed to authenticate.');
            throw error;
        }
        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
        });
    },
    async login(context, payload){
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDMKgv-zWYeernfNfXR81q9DO3Bp_XKQuo', {
                method: 'POST',
                body: JSON.stringify({
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true
                })
            });
        const responseData = await response.json();

        if (!response.ok) {
            console.log(responseData);
            const error = new Error('Failed to authenticate.');
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