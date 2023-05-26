/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Router } from 'express'

import * as postController from '../controllers/post.controller'
import { validate } from '../utils/validate'
import { createPostDto } from '../validators/user.validator'

const router = Router()

router.post(`/`, validate(createPostDto), postController.create)

router.put('/:id/views', postController.updateByID)

router.delete(`/:id`, postController.deleteById)

router.get(`/:id`, postController.findByID)

export default router
