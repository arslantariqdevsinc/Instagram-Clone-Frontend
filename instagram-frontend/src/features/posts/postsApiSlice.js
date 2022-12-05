import { apiSlice } from "../../app/api/apiSlice";


export const postsApiSlice = apiSlice.injectEndpoints({
  tagTypes: ['posts'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => 'core/posts',
      providesTags: ['posts']
    }),

    addPost: builder.mutation({
      query: (post) => ({
        url: 'core/posts',
        method: 'POST',
        body: post
      }),
      invalidatesTags: ['posts']
    }),

    updatePost: builder.mutation({
      query: (post) => ({
        url: `core/posts/${post.id}`,
        method: 'PATCH',
        body: post,
      }),
      invalidatesTags: ['posts']
    }),

    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: `core/posts/${id}`,
        method: 'DELETE',
        body: id
      }),
    }),

  })
})


export const {
  useGetPostsQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApiSlice
