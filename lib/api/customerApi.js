import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const customerApi = createApi({
  reducerPath: 'customerApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api',
    credentials: 'include',
    prepareHeaders: (headers) => {
      // If you need to add headers, do it here
      return headers;
    }
  }),

  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: '/auth/registercustomer',
        method: 'POST',
        body: credentials,
      }),
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/logincustomer',
        method: 'POST',
        body: credentials,
      }),
    }),

    logOut: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),

  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogOutMutation,
} = customerApi;