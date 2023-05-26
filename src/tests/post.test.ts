/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it } from 'vitest'
import request from 'supertest'
import app from '../libs/create-server'
import prisma from './helpers/prisma'
import { Post } from '@prisma/client'

describe('[POST] /api/posts', () => {
    it('should respond with a `200` status code and newly created post', async () => {
        const { status, body }: { status: number; body: Post } = await request(
            app
        )
            .post('/api/posts')
            .send({
                title: 'test 2',
                content: 'more test',
                authorEmail: 'alice@prisma.io',
            })

        const newPost = await prisma.post.findFirst()
        expect(status).toBe(200)
        expect(newPost).not.toBeNull()
        expect(newPost).toStrictEqual({
            ...body,
            createdAt: new Date(body.createdAt),
            updatedAt: new Date(body.updatedAt),
        })
    })
})
