/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import Boom from '@hapi/boom'
import prisma from '../libs/prisma'

export const createPost = async (body: any) => {
    const { title, content, authorEmail } = body
    return await prisma.post.create({
        data: {
            title,
            content,
            author: { connect: { email: authorEmail } },
        },
    })
}

export const findPostById = async (id: string) => {
    try {
        return await prisma.post.findUniqueOrThrow({
            where: { id: Number(id) },
        })
    } catch (err: any) {
        if (err.code === 'P2025') {
            throw Boom.notFound('Post not found')
        } else {
            throw err
        }
    }
}

export const updatePostById = async (id: string) => {
    return await prisma.post.update({
        where: { id: Number(id) },
        data: {
            viewCount: {
                increment: 1,
            },
        },
    })
}

export const deleteById = async (id: string) => {
    return await prisma.post.delete({
        where: {
            id: Number(id),
        },
    })
}
