import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../../features/auth/authSlice'


const baseQuery = fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000",
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const accessToken = getState().auth.accessToken
        if (accessToken) {
            headers.set("authorization", `Bearer ${accessToken}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result.error && result?.error?.status === 401) {
        const refreshArgs = { url: '/users/api/token/refresh/', method: 'POST', body: { "refresh": api.getState().auth.refreshToken } }
        const refreshResult = await baseQuery(refreshArgs, api, extraOptions)

        if (refreshResult?.data) {
            const user = api.getState().auth.user
            // store new
            api.dispatch(setCredentials({ accessToken: refreshResult.data.access, refreshToken: refreshResult.data.refresh, user }))
            // retry the original query
            result = await baseQuery(args, api, extraOptions)
        }
        else {
            api.dispatch(logOut())
        }
    }
    return result
}


export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({})
})

