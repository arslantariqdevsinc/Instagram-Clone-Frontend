import { createSlice } from '@reduxjs/toolkit'



const authSlice = createSlice({
    name: 'auth',
    initialState: { user: localStorage.getItem('user'), accessToken: localStorage.getItem('accessToken'), refreshToken: localStorage.getItem('refreshToken') },
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken, refreshToken } = action.payload
            state.user = user
            state.accessToken = accessToken
            state.refreshToken = refreshToken
            localStorage.setItem('user', user)
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', refreshToken)
        },

        logOut: (state, action) => {
            state.user = null
            state.accessToken = null
            state.refreshToken = null
            localStorage.clear()
        },
    }
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentAccessToken = (state) => state.auth.accessToken
export const selectCurrentRefreshToken = (state) => state.auth.refreshToken
