/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Router } from 'express'
import prisma from '../libs/prisma'

const router = Router()

router.get('/users', async (req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
})

router.get('/user/:id/drafts', async (req, res) => {
    const { id } = req.params

    const drafts = await prisma.user
        .findUnique({
            where: {
                id: Number(id),
            },
        })
        .posts({
            where: { published: false },
        })

    res.json(drafts)
})

export default router
