import express from 'express'
import { checkClassType } from '../../controllers/auth/checkClassType'
import { checkIsInClass } from '../../controllers/auth/checkIsInClass'
import { joinClass } from '../../controllers/auth/joinClass'
import { register } from '../../controllers/auth/register'

const router = express.Router()

router.post('/class/join', joinClass)
router.post('/register', register)
router.get('/class/type', checkClassType)
router.post('/check/inclass', checkIsInClass)

export default router
