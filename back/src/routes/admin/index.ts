import express from 'express'
import { loadUserInfo } from '../../controllers/admin/loadUserInfo'

const router = express.Router()

router.get('/load/user', loadUserInfo)

export default router
