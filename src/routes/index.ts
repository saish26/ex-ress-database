/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Prisma } from '@prisma/client'
import prisma from '../libs/prisma'
import userRoutes from './user.route'
import postRouter from './post.route'
import { Router } from 'express'

const router = Router()

router.post(`/signup`, async (req, res) => {
    const { name, email, posts } = req.body

    const postData = posts?.map((post: Prisma.PostCreateInput) => {
        return { title: post?.title, content: post?.content }
    })
    const result = await prisma.user.create({
        data: {
            name,
            email,
            posts: {
                create: postData,
            },
        },
    })
    res.json(result)
})
router.use('/users', userRoutes)
router.use('/posts', postRouter)

router.put('/publish/:id', async (req, res) => {
    const { id } = req.params

    try {
        const postData = await prisma.post.findUnique({
            where: { id: Number(id) },
            select: {
                published: true,
            },
        })

        const updatedPost = await prisma.post.update({
            where: { id: Number(id) || undefined },
            data: { published: !postData?.published },
        })
        res.json(updatedPost)
    } catch (error) {
        res.json({ error: `Post with ID ${id} does not exist in the database` })
    }
})
router.get('/feed', async (req, res) => {
    const { searchString, skip, take, orderBy } = req.query

    const or: Prisma.PostWhereInput = searchString
        ? {
              OR: [
                  { title: { contains: searchString as string } },
                  { content: { contains: searchString as string } },
              ],
          }
        : {}

    const posts = await prisma.post.findMany({
        where: {
            published: true,
            ...or,
        },
        include: { author: true },
        take: Number(take) || undefined,
        skip: Number(skip) || undefined,
        orderBy: {
            updatedAt: orderBy as Prisma.SortOrder,
        },
    })

    res.json(posts)
})

export default router
