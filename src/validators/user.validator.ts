/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { z } from 'zod'

export const createPostDto = z.object({
    body: z.object({
        title: z.string({
            required_error: 'Title is required',
        }),
        content: z.string({
            required_error: 'Content is required',
        }),
        authorEmail: z
            .string({
                required_error: 'Email is required',
            })
            .email('Not a valid email'),
    }),
})
