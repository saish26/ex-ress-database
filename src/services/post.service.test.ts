/* eslint-disable @typescript-eslint/unbound-method */

import * as PostService from '../services/post.service'
import prisma from '../libs/__mocks__/prisma'
import { describe, beforeEach, vi, it, expect } from 'vitest'
import { Post } from '@prisma/client'

vi.mock('../libs/prisma')
vi.mock('randomcolor', () => ({
    default: vi.fn(() => '#ffffff'),
}))

describe('tags.service', () => {
    beforeEach(() => {
        vi.restoreAllMocks()
    })

    describe('findPostById', () => {
        // Just a silly example, no need to test these
        it('should return throw an error if post does not exist', async () => {
            prisma.post.findUniqueOrThrow.mockImplementation(() => {
                throw new Error('There was an error.')
            })

            await expect(PostService.findPostById('200')).rejects.toThrow()
            await expect(PostService.findPostById('200')).rejects.toThrowError(
                'There was an error'
            )
            expect(prisma.post.findUniqueOrThrow).toHaveBeenCalled()
        })
        it('should return the post if the post exist', async () => {
            const dummyPost: Post = {
                id: 1,
                authorId: 2,
                content: 'just testing',
                createdAt: new Date(),
                published: false,
                title: 'hello',
                updatedAt: new Date(),
                viewCount: 0,
            }
            prisma.post.findUniqueOrThrow.mockResolvedValue(dummyPost)

            const result = await PostService.findPostById('200')

            expect(result).toStrictEqual(dummyPost)
        })
    })
})
