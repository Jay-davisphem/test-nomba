import axios from 'axios';

// Store access token in memory
let accessToken = null;

export const getAccessToken = async () => {
    const data = {
        grant_type: 'client_credentials', 
        client_id: process.env.NEXT_PUBLIC_NOMBA_CLIENT_ID, 
        client_secret: process.env.NEXT_PUBLIC_NOMBA_CLIENT_SECRET
    };

    try {
        const res = await axios.post('https://api.nomba.com/v1/auth/token/issue', data, {
            headers: {
                'Content-Type': 'application/json',
                'accountId': process.env.NEXT_PUBLIC_NOMBA_ACCOUNT_ID,
            }
        });

        const tokenData = res.data?.data;
        const accessToken = tokenData?.access_token;
        setRefreshToken(tokenData?.refresh_token);

        return accessToken;
    } catch (error) {
        console.error('Error getting access token:', error);
        return null;
    }
};

// Store refresh token in HttpOnly cookie via API
const setRefreshToken = async (refreshToken) => {
    await fetch('/api/auth/set-refresh-token', {
        method: 'POST',
        credentials: 'include', // Ensures cookies are sent
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
    });
};

export const refreshAccessToken = async () => {
    try {
        const res = await fetch('/api/auth/refresh', {
            method: 'POST',
            credentials: 'include', // Send HttpOnly cookies
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await res.json();
        console.log(data, 'refreshtoken data')
        if (data.accessToken) {
            accessToken = data.accessToken;
            return accessToken;
        }
        return null;
    } catch (error) {
        console.error('Error refreshing access token:', error);
        return null;
    }
};
